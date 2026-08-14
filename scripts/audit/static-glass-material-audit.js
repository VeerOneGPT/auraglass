#!/usr/bin/env node

/**
 * Static glass-material invariant gate.
 *
 * Runtime Chromium reports `backdrop-filter` and its WebKit spelling through
 * aliases on some versions.  That makes computed styles unable to prove that
 * authors shipped both declarations.  This gate audits the authored sources:
 *
 *   - CSS is parsed as CSS with PostCSS (never searched with declaration regexes).
 *   - CSS-bearing TypeScript template literals are selected through the Babel
 *     AST, then parsed with PostCSS.
 *   - TypeScript style objects/material records are classified through the AST.
 *   - Dynamic or composed TypeScript that cannot be proved is blocking triage,
 *     not a pass and not a guessed violation.
 *
 * Stories, tests, reports, build output, dependencies, and Storybook-only
 * support styles are deliberately outside the shipped-material scope.
 */

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const postcss = require("postcss");
const valueParser = require("postcss-value-parser");
const selectorParser = require("postcss-selector-parser");
const babelParser = require("@babel/parser");

const REPO_ROOT = path.resolve(__dirname, "../..");
const CANONICAL_BLURS = new Set([16, 24, 32, 40, 48]);
const MAX_EXPANSIONS = 64;
const DYNAMIC_SENTINEL = "__AURA_DYNAMIC_VALUE__";

const EXCLUDED_PATH_SEGMENTS = [
  "/__snapshots__/",
  "/__tests__/",
  "/tests/",
  "/stories/",
  "/reports/",
  "/docs/",
  "/scripts/",
];

const normalizePath = (filePath) => filePath.split(path.sep).join("/");

const isExcludedSourcePath = (filePath) => {
  const normalized = `/${normalizePath(filePath)}`;
  const basename = path.basename(filePath).toLowerCase();

  if (EXCLUDED_PATH_SEGMENTS.some((segment) => normalized.includes(segment))) {
    return true;
  }
  if (/\.(stories|story|test|spec)\.[cm]?[jt]sx?$/.test(basename)) return true;
  if (/\.d\.ts$/.test(basename)) return true;
  if (basename.includes("storybook")) return true;
  if (["testsetup.ts", "testsetup.tsx", "testingutils.ts", "testingutils.tsx"].includes(basename)) {
    return true;
  }
  return false;
};

const walk = (directory, output = []) => {
  if (!fs.existsSync(directory)) return output;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath, output);
    else output.push(fullPath);
  }
  return output;
};

const sourceLine = (record, node) =>
  (record.lineOffset || 0) + (node?.source?.start?.line || node?.loc?.start?.line || 1);

const sourceColumn = (node) =>
  node?.source?.start?.column || ((node?.loc?.start?.column ?? 0) + 1);

const sourceOffset = (record, node) => {
  if (typeof node?.source?.start?.offset === "number") return node.source.start.offset;
  if (typeof node?.start === "number") return node.start;
  const lines = String(record.css || "").split("\n");
  const line = Math.max(1, node?.source?.start?.line || 1);
  return lines.slice(0, line - 1).reduce((total, text) => total + text.length + 1, 0) +
    Math.max(0, sourceColumn(node) - 1);
};

const selectorFor = (node) => node?.selector || node?.name || "<inline-style>";

const isFallbackContext = (node) => {
  let current = node;
  while (current) {
    if (current.type === "atrule") {
      const name = String(current.name || "").toLowerCase();
      const params = String(current.params || "").toLowerCase();
      if (name.includes("keyframes")) return true;
      if (
        name === "media" &&
        /(forced-colors|prefers-contrast|prefers-reduced-transparency|print)/.test(params)
      ) {
        return true;
      }
      if (name === "supports" && /\bnot\b[\s\S]*backdrop-filter/.test(params)) {
        return true;
      }
    }
    current = current.parent;
  }
  return false;
};

const makeCollector = () => {
  const violations = [];
  const triage = [];
  const findingsByKey = new Map();

  const add = (bucket, finding) => {
    const normalized = {
      code: finding.code,
      file: normalizePath(finding.file),
      line: finding.line || 1,
      column: finding.column || 1,
      offset: finding.offset ?? null,
      subject: finding.subject || "<unknown>",
      message: finding.message,
      evidence: [finding.message],
      sourceKind: finding.sourceKind || "css",
    };
    // One lint finding represents one authored declaration/object location.
    // Multiple resolved runtime branches remain available as evidence instead
    // of inflating the actionable count with duplicate messages for one line.
    const key = [
      bucket,
      normalized.code,
      normalized.file,
      normalized.line,
      normalized.column,
      normalized.offset ?? "no-offset",
      normalized.subject,
    ].join("|");
    const existing = findingsByKey.get(key);
    if (existing) {
      if (!existing.evidence.includes(finding.message)) existing.evidence.push(finding.message);
      return;
    }
    (bucket === "violation" ? violations : triage).push(normalized);
    findingsByKey.set(key, normalized);
  };

  return {
    violations,
    triage,
    violation: (finding) => add("violation", finding),
    needsTriage: (finding) => add("triage", finding),
  };
};

const parseCssRecord = (record, collector) => {
  try {
    return {
      ...record,
      root: postcss.parse(record.css, { from: record.file }),
    };
  } catch (error) {
    collector.needsTriage({
      code: "css-parse-unresolved",
      file: record.file,
      line: record.lineOffset + (error.line || 1),
      subject: record.label || "stylesheet",
      message: `PostCSS could not parse this authored stylesheet: ${error.reason || error.message}`,
      sourceKind: record.sourceKind,
    });
    return null;
  }
};

const getTopLevelArguments = (nodes) => {
  const args = [];
  let current = [];
  for (const node of nodes || []) {
    if (node.type === "div" && node.value === ",") {
      args.push(current);
      current = [];
    } else {
      current.push(node);
    }
  }
  args.push(current);
  return args;
};

const combine = (left, right, limit = MAX_EXPANSIONS) => {
  const result = [];
  for (const a of left) {
    for (const b of right) {
      result.push(`${a}${b}`);
      if (result.length >= limit) return result;
    }
  }
  return result;
};

const buildCustomPropertyIndex = (records) => {
  const index = new Map();
  for (const record of records) {
    if (!record?.root) continue;
    record.root.walkDecls(/^--/, (decl) => {
      if (isFallbackContext(decl)) return;
      const item = {
        value: decl.value,
        file: record.file,
        line: sourceLine(record, decl),
        selector: selectorFor(decl.parent),
        sourceKind: record.sourceKind,
      };
      if (!index.has(decl.prop)) index.set(decl.prop, []);
      index.get(decl.prop).push(item);
    });
  }
  return index;
};

const GLOBAL_TOKEN_FILES = new Set([
  "src/styles/tokens.css",
  "src/styles/variables.css",
  "src/styles/glass.generated.css",
  "src/styles/generated/persona-variables.css",
]);

const isSameFileCustomProperty = (definition, context) =>
  definition.file === context?.file && definition.sourceKind === context?.sourceKind;

const isGlobalTokenDefinition = (definition) =>
  GLOBAL_TOKEN_FILES.has(definition.file) ||
  (definition.sourceKind === "css" &&
    (/^:(?:root|host)\b/i.test(definition.selector) ||
      definition.file.startsWith("src/styles/themes/")));

const definitionMatchesContext = (definition, context) => {
  if (!context?.file) return true;
  if (isSameFileCustomProperty(definition, context)) return true;
  // Imported/global token declarations can feed authored stylesheets. Local
  // class overrides cannot: treating every same-named custom property in the
  // repository as a runtime branch creates a false Cartesian product.
  return isGlobalTokenDefinition(definition);
};

const expandCssValue = (value, propertyIndex, context = null, stack = [], depth = 0) => {
  const unresolved = new Set();
  if (depth > 18) {
    unresolved.add(`expansion-depth:${stack.join(" -> ")}`);
    return { values: [], unresolved };
  }

  let ast;
  try {
    ast = valueParser(String(value));
  } catch {
    unresolved.add("value-parse");
    return { values: [], unresolved };
  }

  const expandNodes = (nodes) => {
    let variants = [""];
    for (const node of nodes || []) {
      let replacements;
      if (node.type === "function" && String(node.value).toLowerCase() === "var") {
        const args = getTopLevelArguments(node.nodes);
        const propertyName = valueParser.stringify(args[0] || []).trim();
        const fallback = args.length > 1
          ? valueParser.stringify(args.slice(1).flatMap((arg, index) => index === 0 ? arg : [{ type: "div", value: ",", before: "", after: "" }, ...arg]))
          : "";
        const allDefinitions = propertyIndex.get(propertyName) || [];
        const definitions = allDefinitions.filter((definition) => definitionMatchesContext(definition, context));
        const sameRuleDefinitions = definitions.filter(
          (definition) =>
            definition.file === context?.file &&
            definition.selector === context?.selector,
        );
        const globalDefinitions = definitions.filter(isGlobalTokenDefinition);
        const sameFileDefinitions = definitions.filter((definition) =>
          isSameFileCustomProperty(definition, context)
        );
        const usableDefinitions = sameRuleDefinitions.length
          ? sameRuleDefinitions
          : globalDefinitions.length
            ? globalDefinitions
            : sameFileDefinitions;
        const candidateValues = [...new Set(usableDefinitions.map((definition) => definition.value))];
        if (fallback.trim()) candidateValues.push(fallback.trim());

        if (!usableDefinitions.length && !fallback.trim()) unresolved.add(propertyName || "malformed-var");
        if (stack.includes(propertyName)) {
          unresolved.add(`cycle:${[...stack, propertyName].join(" -> ")}`);
          replacements = [];
        } else {
          replacements = [];
          for (const candidate of [...new Set(candidateValues)]) {
            const expanded = expandCssValue(candidate, propertyIndex, context, [...stack, propertyName], depth + 1);
            expanded.unresolved.forEach((entry) => unresolved.add(entry));
            replacements.push(...expanded.values);
            if (replacements.length >= MAX_EXPANSIONS) break;
          }
        }
      } else if (node.type === "function") {
        const nested = expandNodes(node.nodes || []);
        replacements = nested.map((body) => `${node.value}(${body})`);
      } else {
        replacements = [valueParser.stringify(node)];
      }

      if (!replacements.length) replacements = [valueParser.stringify(node)];
      variants = combine(variants, replacements);
      if (variants.length >= MAX_EXPANSIONS) {
        unresolved.add("expansion-overflow");
        break;
      }
    }
    return variants;
  };

  return { values: [...new Set(expandNodes(ast.nodes))], unresolved };
};

const parseCssNumber = (raw, { factor = false } = {}) => {
  const value = String(raw).trim();
  if (value.includes(DYNAMIC_SENTINEL)) return null;
  const match = value.match(/^(-?(?:\d+\.?\d*|\.\d+))(px|%)?$/i);
  if (!match) return null;
  const numeric = Number(match[1]);
  if (!Number.isFinite(numeric)) return null;
  if (factor) return match[2] === "%" ? numeric / 100 : numeric;
  return { numeric, unit: match[2] || "" };
};

const filterComponents = (value) => {
  const components = { blur: [], saturate: [], brightness: [], contrast: [] };
  let ast;
  try {
    ast = valueParser(value);
  } catch {
    return components;
  }
  ast.walk((node) => {
    if (node.type !== "function") return;
    const name = String(node.value).toLowerCase();
    if (Object.prototype.hasOwnProperty.call(components, name)) {
      components[name].push(valueParser.stringify(node.nodes).trim());
    }
  });
  return components;
};

const findingBase = (record, node, subject) => ({
  file: record.file,
  line: sourceLine(record, node),
  column: sourceColumn(node),
  offset: sourceOffset(record, node),
  subject,
  sourceKind: record.sourceKind,
});

const valueContext = (record, node) => ({
  file: record.file,
  selector: selectorFor(node?.parent),
  sourceKind: record.sourceKind,
});

const reportUnresolved = (collector, record, node, subject, property, unresolved) => {
  if (!unresolved.size) return;
  collector.needsTriage({
    ...findingBase(record, node, subject),
    code: "unresolved-css-value",
    message: `${property} cannot be proved statically (${[...unresolved].sort().join(", ")}).`,
  });
};

const analyzeFilter = ({ value, property, record, node, subject, propertyIndex, collector }) => {
  const expanded = expandCssValue(value, propertyIndex, valueContext(record, node));
  reportUnresolved(collector, record, node, subject, property, expanded.unresolved);
  const signatures = [];

  for (const variant of expanded.values) {
    const trimmed = variant.trim().toLowerCase();
    const isDynamic = variant.includes(DYNAMIC_SENTINEL);
    if (!trimmed || trimmed === "none") {
      collector.violation({
        ...findingBase(record, node, subject),
        code: "non-material-backdrop-filter",
        message: `${property} must be non-none on a glass surface (authored value: ${JSON.stringify(variant.trim())}).`,
      });
      continue;
    }

    const parts = filterComponents(variant);
    const signature = {};

    if (!parts.blur.length) {
      const finding = {
        ...findingBase(record, node, subject),
        code: isDynamic ? "dynamic-blur-unproven" : "missing-canonical-blur",
        message: isDynamic
          ? `${property} blur cannot be proved from a dynamic authored expression: ${JSON.stringify(variant.trim())}.`
          : `${property} lacks blur(16|24|32|40|48px): ${JSON.stringify(variant.trim())}.`,
      };
      if (isDynamic) collector.needsTriage(finding);
      else collector.violation(finding);
    } else {
      for (const rawBlur of parts.blur) {
        const parsed = parseCssNumber(rawBlur);
        if (!parsed) {
          collector.needsTriage({
            ...findingBase(record, node, subject),
            code: "dynamic-blur-unproven",
            message: `${property} blur cannot be resolved to the canonical scale: ${JSON.stringify(rawBlur)}.`,
          });
        } else if (parsed.unit.toLowerCase() !== "px" || !CANONICAL_BLURS.has(parsed.numeric)) {
          collector.violation({
            ...findingBase(record, node, subject),
            code: "noncanonical-blur",
            message: `${property} blur ${rawBlur} is outside {16,24,32,40,48}px.`,
          });
        } else {
          signature.blur = parsed.numeric;
        }
      }
    }

    for (const component of ["saturate", "brightness", "contrast"]) {
      if (!parts[component].length) {
        const finding = {
          ...findingBase(record, node, subject),
          code: isDynamic ? `dynamic-${component}-unproven` : `missing-${component}`,
          message: isDynamic
            ? `${property} ${component}() cannot be proved from a dynamic authored expression: ${JSON.stringify(variant.trim())}.`
            : `${property} lacks ${component}() in the full glass filter chain: ${JSON.stringify(variant.trim())}.`,
        };
        if (isDynamic) collector.needsTriage(finding);
        else collector.violation(finding);
        continue;
      }
      const parsed = parseCssNumber(parts[component][0], { factor: true });
      if (parsed === null || typeof parsed === "object") {
        collector.needsTriage({
          ...findingBase(record, node, subject),
          code: `dynamic-${component}-unproven`,
          message: `${property} ${component} cannot be resolved: ${JSON.stringify(parts[component][0])}.`,
        });
        continue;
      }
      signature[component] = parsed;
      const invalid =
        (component === "saturate" && parsed < 1.4) ||
        (component === "brightness" && parsed < 1) ||
        (component === "contrast" && (parsed < 0.95 || parsed > 1.2));
      if (invalid) {
        collector.violation({
          ...findingBase(record, node, subject),
          code: `${component}-outside-contract`,
          message: `${property} ${component}(${parts[component][0]}) is outside the contract (${component === "saturate" ? ">=1.4" : component === "brightness" ? ">=1.0" : "0.95..1.2"}).`,
        });
      }
    }
    signatures.push(signature);
  }

  return signatures;
};

const parseChannel = (raw) => {
  const text = String(raw).trim();
  if (text.includes(DYNAMIC_SENTINEL)) return null;
  if (/%$/.test(text)) return Math.round(Number.parseFloat(text) * 2.55);
  const number = Number.parseFloat(text);
  return Number.isFinite(number) ? number : null;
};

const parseAlpha = (raw) => {
  if (raw === undefined || raw === null || raw === "") return 1;
  const text = String(raw).trim();
  if (text.includes(DYNAMIC_SENTINEL)) return null;
  const number = Number.parseFloat(text);
  if (!Number.isFinite(number)) return null;
  return /%$/.test(text) ? number / 100 : number;
};

const hslToRgb = (hue, saturation, lightness) => {
  const h = (((hue % 360) + 360) % 360) / 360;
  const s = saturation / 100;
  const l = lightness / 100;
  if (s === 0) {
    const channel = Math.round(l * 255);
    return [channel, channel, channel];
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hueToRgb = (t) => {
    let value = t;
    if (value < 0) value += 1;
    if (value > 1) value -= 1;
    if (value < 1 / 6) return p + (q - p) * 6 * value;
    if (value < 1 / 2) return q;
    if (value < 2 / 3) return p + (q - p) * (2 / 3 - value) * 6;
    return p;
  };
  return [hueToRgb(h + 1 / 3), hueToRgb(h), hueToRgb(h - 1 / 3)].map((channel) => Math.round(channel * 255));
};

const parseFunctionalColor = (name, body) => {
  const lowerName = String(name).toLowerCase();
  const commaParts = body.split(",").map((part) => part.trim());
  let channels;
  let alpha;

  if (commaParts.length >= 3) {
    channels = commaParts.slice(0, 3);
    alpha = commaParts[3];
  } else {
    const slashParts = body.split("/");
    channels = slashParts[0].trim().split(/\s+/);
    alpha = slashParts[1]?.trim();
  }
  if (channels.length < 3) return null;

  if (lowerName === "rgb" || lowerName === "rgba") {
    const rgb = channels.slice(0, 3).map(parseChannel);
    const parsedAlpha = parseAlpha(alpha);
    if (rgb.some((value) => value === null) || parsedAlpha === null) return null;
    return { r: rgb[0], g: rgb[1], b: rgb[2], a: parsedAlpha, raw: `${name}(${body})` };
  }

  if (lowerName === "hsl" || lowerName === "hsla") {
    const hue = Number.parseFloat(channels[0]);
    const saturation = Number.parseFloat(channels[1]);
    const lightness = Number.parseFloat(channels[2]);
    const parsedAlpha = parseAlpha(alpha);
    if (![hue, saturation, lightness].every(Number.isFinite) || parsedAlpha === null) return null;
    const [r, g, b] = hslToRgb(hue, saturation, lightness);
    return { r, g, b, a: parsedAlpha, raw: `${name}(${body})` };
  }
  return null;
};

const parseHexColor = (raw) => {
  const value = raw.toLowerCase();
  if (!/^#[0-9a-f]{3,8}$/.test(value)) return null;
  let hex = value.slice(1);
  if (hex.length === 3 || hex.length === 4) hex = [...hex].map((char) => char + char).join("");
  if (hex.length !== 6 && hex.length !== 8) return null;
  return {
    r: Number.parseInt(hex.slice(0, 2), 16),
    g: Number.parseInt(hex.slice(2, 4), 16),
    b: Number.parseInt(hex.slice(4, 6), 16),
    a: hex.length === 8 ? Number.parseInt(hex.slice(6, 8), 16) / 255 : 1,
    raw,
  };
};

const parseSingleColor = (raw) => {
  const text = raw.trim();
  if (/^transparent$/i.test(text)) return { r: 0, g: 0, b: 0, a: 0, raw: text };
  if (/^white$/i.test(text)) return { r: 255, g: 255, b: 255, a: 1, raw: text };
  if (/^black$/i.test(text)) return { r: 0, g: 0, b: 0, a: 1, raw: text };
  const hex = parseHexColor(text);
  if (hex) return hex;
  const functional = text.match(/^([a-z]+)\(([\s\S]*)\)$/i);
  if (functional) return parseFunctionalColor(functional[1], functional[2]);
  return null;
};

const splitTopLevelText = (text) => {
  const parts = [];
  let depth = 0;
  let start = 0;
  for (let index = 0; index < text.length; index += 1) {
    if (text[index] === "(") depth += 1;
    else if (text[index] === ")") depth = Math.max(0, depth - 1);
    else if (text[index] === "," && depth === 0) {
      parts.push(text.slice(start, index).trim());
      start = index + 1;
    }
  }
  parts.push(text.slice(start).trim());
  return parts;
};

const parseColorMix = (body) => {
  const args = splitTopLevelText(body);
  if (args.length !== 3 || !/^in\s+srgb/i.test(args[0])) return null;

  const parseStop = (stop) => {
    const percentageMatch = stop.match(/\s+(-?(?:\d+\.?\d*|\.\d+))%\s*$/);
    const weight = percentageMatch ? Number(percentageMatch[1]) / 100 : null;
    const colorText = percentageMatch ? stop.slice(0, percentageMatch.index).trim() : stop.trim();
    const color = parseSingleColor(colorText);
    return color ? { color, weight } : null;
  };

  const first = parseStop(args[1]);
  const second = parseStop(args[2]);
  if (!first || !second) return null;
  const firstWeight = first.weight ?? (second.weight === null ? 0.5 : 1 - second.weight);
  const secondWeight = second.weight ?? 1 - firstWeight;
  const total = firstWeight + secondWeight || 1;
  const w1 = firstWeight / total;
  const w2 = secondWeight / total;
  const alpha = first.color.a * w1 + second.color.a * w2;
  if (alpha === 0) return { r: 0, g: 0, b: 0, a: 0, raw: `color-mix(${body})` };
  return {
    r: (first.color.r * first.color.a * w1 + second.color.r * second.color.a * w2) / alpha,
    g: (first.color.g * first.color.a * w1 + second.color.g * second.color.a * w2) / alpha,
    b: (first.color.b * first.color.a * w1 + second.color.b * second.color.a * w2) / alpha,
    a: alpha,
    raw: `color-mix(${body})`,
  };
};

const extractColors = (value) => {
  const colors = [];
  const unsupported = [];
  let ast;
  try {
    ast = valueParser(value);
  } catch {
    return { colors, unsupported: ["unparseable-color-value"] };
  }

  const visit = (nodes) => {
    for (const node of nodes || []) {
      if (node.type === "word") {
        const parsed = parseSingleColor(node.value);
        if (parsed) colors.push(parsed);
      } else if (node.type === "function") {
        const name = String(node.value).toLowerCase();
        const body = valueParser.stringify(node.nodes);
        if (["rgb", "rgba", "hsl", "hsla"].includes(name)) {
          const parsed = parseFunctionalColor(name, body);
          if (parsed) colors.push(parsed);
          else unsupported.push(`${name}(${body})`);
        } else if (name === "color-mix") {
          const parsed = parseColorMix(body);
          if (parsed) colors.push(parsed);
          else unsupported.push(`color-mix(${body})`);
        } else if (name === "var" || body.includes(DYNAMIC_SENTINEL)) {
          unsupported.push(`${name}(${body})`);
        } else if (name !== "url") {
          visit(node.nodes);
        }
      }
    }
  };
  visit(ast.nodes);
  return { colors, unsupported };
};

const isWhiteNeutral = ({ r, g, b }) =>
  Math.min(r, g, b) >= 245 && Math.max(r, g, b) - Math.min(r, g, b) <= 6;

const isCanonicalScrim = ({ r, g, b, a }) =>
  Math.abs(r - 15) <= 2 &&
  Math.abs(g - 23) <= 2 &&
  Math.abs(b - 42) <= 2 &&
  a >= 0.2 &&
  a <= 0.3;

const isForbiddenMaterialColor = (color) =>
  !isWhiteNeutral(color) && color.a > 0.00001 && !isCanonicalScrim(color);

const analyzeFill = ({ value, property, record, node, subject, propertyIndex, collector }) => {
  const expanded = expandCssValue(value, propertyIndex, valueContext(record, node));
  reportUnresolved(collector, record, node, subject, property, expanded.unresolved);

  for (const variant of expanded.values) {
    const { colors, unsupported } = extractColors(variant);
    if (unsupported.length || variant.includes(DYNAMIC_SENTINEL)) {
      collector.needsTriage({
        ...findingBase(record, node, subject),
        code: "material-fill-unresolved",
        message: `${property} contains a color expression that cannot be proved: ${JSON.stringify(unsupported[0] || variant.trim())}.`,
      });
    }

    let sawWhite = false;
    for (const color of colors) {
      if (color.a <= 0.00001) continue;
      if (isWhiteNeutral(color)) {
        sawWhite = true;
        if (color.a < 0.08 || color.a > 0.35) {
          collector.violation({
            ...findingBase(record, node, subject),
            code: "white-frost-alpha-outside-contract",
            message: `${property} neutral-white stop alpha ${Number(color.a.toFixed(4))} is outside [0.08,0.35] (${color.raw}).`,
          });
        }
      } else if (isForbiddenMaterialColor(color)) {
        collector.violation({
          ...findingBase(record, node, subject),
          code: "dark-or-chromatic-material-fill",
          message: `${property} contains a non-neutral material color (${color.raw}); only white frost or rgba(15,23,42,0.20..0.30) scrim is permitted.`,
        });
      }
    }

    if (!sawWhite && !unsupported.length && !variant.includes(DYNAMIC_SENTINEL)) {
      collector.violation({
        ...findingBase(record, node, subject),
        code: "missing-white-frost",
        message: `${property} has no neutral-white frost stop in [0.08,0.35]: ${JSON.stringify(variant.trim())}.`,
      });
    }
  }
};

const analyzeBorder = ({ value, property, record, node, subject, propertyIndex, collector }) => {
  if (/^\s*(?:0(?:px)?|none)\b/i.test(value) || /^\s*transparent\s*$/i.test(value)) {
    collector.violation({
      ...findingBase(record, node, subject),
      code: "missing-visible-border",
      message: `${property} does not provide the required visible border floor: ${JSON.stringify(value.trim())}.`,
    });
    return;
  }

  const expanded = expandCssValue(value, propertyIndex, valueContext(record, node));
  reportUnresolved(collector, record, node, subject, property, expanded.unresolved);
  for (const variant of expanded.values) {
    const { colors, unsupported } = extractColors(variant);
    if (unsupported.length || variant.includes(DYNAMIC_SENTINEL)) {
      collector.needsTriage({
        ...findingBase(record, node, subject),
        code: "border-color-unresolved",
        message: `${property} color cannot be proved: ${JSON.stringify(unsupported[0] || variant.trim())}.`,
      });
    }
    if (!colors.length && !unsupported.length) {
      collector.needsTriage({
        ...findingBase(record, node, subject),
        code: "border-color-unresolved",
        message: `${property} has no statically resolvable color: ${JSON.stringify(variant.trim())}.`,
      });
    }
    for (const color of colors) {
      if (color.a < 0.12) {
        collector.violation({
          ...findingBase(record, node, subject),
          code: "border-alpha-below-floor",
          message: `${property} alpha ${Number(color.a.toFixed(4))} is below 0.12 (${color.raw}).`,
        });
      }
    }
  }
};

const lastDeclaration = (rule, propertyNames) => {
  let result = null;
  rule.each((node) => {
    if (node.type === "decl" && propertyNames.includes(String(node.prop).toLowerCase())) result = node;
  });
  return result;
};

const hasMaterialFill = (decl) =>
  Boolean(decl && !/^\s*(?:none|transparent|inherit|initial|unset)\s*$/i.test(decl.value));

const isStrongSurfaceSelector = (selector) => {
  const lower = selector.toLowerCase();
  return (
    /\[(?:data-)?(?:liquid-)?glass-material/.test(lower) ||
    /\.glass(?:\b|[-_](?:foundation|surface|material|panel|card|modal|dialog|popover|sheet|shell|container|nav|menu|toolbar))/.test(lower) ||
    /\.(?:optimized-glass-surface|[a-z0-9_-]+glass)\b/.test(lower)
  );
};

const isDecorativeSelector = (selector) =>
  /(?:focus|glow|sheen|noise|highlight|blur-layer|underline|particle|reflection|refraction|effect)/i.test(selector);

const isBackdropScrimSelector = (selector) =>
  /\.(?:[a-z0-9_-]*(?:overlay|backdrop|scrim))\b/i.test(selector) &&
  !/(?:surface|material|card|panel|modal|dialog|popover|sheet|shell|container|nav|menu|toolbar)/i.test(selector);

const rightmostSelectorClassSets = (selector, { composition = false } = {}) => {
  const alternatives = [];
  try {
    selectorParser((root) => {
      root.each((selectorNode) => {
        const expandSelector = (currentSelector) => {
          const nodes = currentSelector.nodes || [];
          const combinatorIndex = nodes.reduce((last, node, index) =>
            node.type === "combinator" ? index : last, -1);
          let safe = !composition || combinatorIndex === -1;
          let sets = [new Set()];

          for (const node of nodes.slice(combinatorIndex + 1)) {
            if (node.type === "class") {
              sets.forEach((set) => set.add(node.value));
              continue;
            }
            if (node.type === "comment") continue;
            if (
              node.type === "pseudo" &&
              [":is", ":where", ":global", ":local"].includes(String(node.value).toLowerCase()) &&
              node.nodes?.length
            ) {
              const nested = node.nodes.flatMap((nestedSelector) => {
                const result = expandSelector(nestedSelector);
                safe &&= result.safe;
                return result.sets;
              });
              sets = sets.flatMap((base) => nested.map((addition) => new Set([...base, ...addition])));
              continue;
            }
            // A state, attribute, ID, element, or functional relationship makes
            // a border conditional. Such a selector cannot prove that a simpler
            // material selector always receives the border.
            if (composition) safe = false;
          }
          return { sets, safe };
        };

        const expanded = expandSelector(selectorNode);
        for (const classes of expanded.sets) {
          if (classes.size) alternatives.push({ classes, safe: expanded.safe });
        }
      });
    }).processSync(selector);
  } catch {
    return [];
  }
  return alternatives;
};

const compositionContext = (node) => {
  const context = [];
  let current = node?.parent;
  while (current) {
    if (current.type === "rule") context.push(`rule:${current.selector}`);
    if (current.type === "atrule" && ["media", "supports", "container", "scope", "document"].includes(String(current.name).toLowerCase())) {
      context.push(`@${String(current.name).toLowerCase()} ${String(current.params || "").trim()}`);
    }
    current = current.parent;
  }
  return context.reverse();
};

const contextApplies = (borderContext, surfaceContext) =>
  borderContext.length <= surfaceContext.length &&
  borderContext.every((entry, index) => entry === surfaceContext[index]);

const buildBorderCompositionIndex = (record) => {
  const index = [];
  record.root.walkRules((rule) => {
    if (isFallbackContext(rule)) return;
    const border = lastDeclaration(rule, ["border", "border-color"]);
    if (!border) return;
    for (const alternative of rightmostSelectorClassSets(rule.selector || "", { composition: true })) {
      if (!alternative.safe) continue;
      index.push({ classes: alternative.classes, context: compositionContext(rule), border });
    }
  });
  return index;
};

const composedBorderDeclarations = (record, rule) => {
  const targets = rightmostSelectorClassSets(rule.selector || "");
  if (!targets.length || !record.borderCompositionIndex) return [];
  const surfaceContext = compositionContext(rule);
  const declarations = [];
  for (const target of targets) {
    const matches = record.borderCompositionIndex.filter((entry) =>
      contextApplies(entry.context, surfaceContext) &&
      [...entry.classes].every((className) => target.classes.has(className))
    );
    if (!matches?.length) return [];
    declarations.push(...matches.map((entry) => entry.border));
  }
  return [...new Set(declarations)];
};

const selectorMaterialProfile = (selector) => {
  let strong = false;
  let standaloneStrong = false;
  let nativeControl = false;
  let decorative = false;
  let stateOnly = false;
  try {
    selectorParser((root) => {
      root.walkClasses((classNode) => {
        const name = String(classNode.value || "").toLowerCase();
        let topLevelNode = classNode;
        while (topLevelNode.parent && topLevelNode.parent.type !== "selector") topLevelNode = topLevelNode.parent;
        const topSelector = topLevelNode.parent;
        const combinatorIndex = (topSelector?.nodes || []).reduce(
          (last, node, index) => node.type === "combinator" ? index : last,
          -1,
        );
        const isRightmostCompound = topSelector ? topSelector.index(topLevelNode) > combinatorIndex : true;
        const isStrongName =
          /^(?:glass|liquid-glass-material|optimized-glass-surface|[a-z0-9_-]*glass)$/.test(name) ||
          /^(?:glass|liquid-glass)-(?:foundation|surface|material|panel|card|modal|dialog|popover|sheet|shell|container|nav|menu|toolbar)(?:$|-)/.test(name);
        if (isRightmostCompound && isStrongName) {
          strong = true;
          if (combinatorIndex === -1) standaloneStrong = true;
        }
        if (isRightmostCompound && /^(?:glass|liquid-glass)-(?:focus|glow|sheen|noise|highlight|blur|underline|particle|reflection|refraction|effect|range)(?:$|-)/.test(name)) decorative = true;
        if (isRightmostCompound && /^(?:glass-)?(?:state|hover|active|focus)/.test(name)) stateOnly = true;
      });
      root.walkTags((tagNode) => {
        const name = String(tagNode.value || "").toLowerCase();
        if (!["input", "select", "textarea", "option"].includes(name)) return;
        let topLevelNode = tagNode;
        while (topLevelNode.parent && topLevelNode.parent.type !== "selector") topLevelNode = topLevelNode.parent;
        const nodes = topLevelNode.parent?.nodes || [];
        const combinatorIndex = nodes.reduce(
          (last, node, index) => node.type === "combinator" ? index : last,
          -1,
        );
        if ((topLevelNode.parent?.index(topLevelNode) ?? 0) > combinatorIndex) nativeControl = true;
      });
    }).processSync(selector);
  } catch {
    return {
      strong: isStrongSurfaceSelector(selector),
      standaloneStrong: false,
      nativeControl: false,
      decorative: isDecorativeSelector(selector),
      stateOnly: false,
    };
  }
  return {
    strong,
    standaloneStrong,
    nativeControl,
    decorative: decorative || isDecorativeSelector(selector),
    stateOnly,
  };
};

const analyzeSurfaceRule = (record, rule, propertyIndex, collector, metrics) => {
  if (isFallbackContext(rule)) return;
  const selector = rule.selector || "<anonymous-rule>";
  const standard = lastDeclaration(rule, ["backdrop-filter"]);
  const webkit = lastDeclaration(rule, ["-webkit-backdrop-filter"]);
  const background = lastDeclaration(rule, ["background"]);
  const backgroundColor = lastDeclaration(rule, ["background-color"]);
  const border = lastDeclaration(rule, ["border", "border-color"]);
  const composedBorders = border ? [] : composedBorderDeclarations(record, rule);
  const fill = background || backgroundColor;
  const explicitFilter = Boolean(standard || webkit);
  const selectorProfile = selectorMaterialProfile(selector);
  const strongSelector = selectorProfile.standaloneStrong;
  const stateOverride = /:(?:hover|active|focus|focus-visible|focus-within)\b/.test(selector);
  const decorativeOnly =
    selectorProfile.decorative &&
    !/(?:surface|material|card|panel|modal|dialog|popover|sheet|shell|container|nav|menu|toolbar)/i.test(selector);
  const backdropScrim = isBackdropScrimSelector(selector);
  const materialSurface =
    !decorativeOnly && !backdropScrim && !selectorProfile.nativeControl && !selectorProfile.stateOnly && !stateOverride &&
    ((explicitFilter && hasMaterialFill(fill)) ||
      (strongSelector && hasMaterialFill(fill) && Boolean(border || composedBorders.length)));

  if (!materialSurface) {
    if (
      explicitFilter &&
      (standard ? !webkit : !standard) &&
      !decorativeOnly &&
      !backdropScrim &&
      !selectorProfile.nativeControl &&
      !selectorProfile.stateOnly &&
      !stateOverride
    ) {
      collector.violation({
        ...findingBase(record, standard || webkit, selector),
        code: standard ? "filter-utility-missing-webkit" : "filter-utility-missing-standard",
        message: "A non-decorative backdrop-filter utility authors only one browser spelling.",
      });
    }
    if (explicitFilter) metrics.cssFilterUtilities += 1;
    return;
  }

  metrics.cssSurfaces += 1;
  if (!standard) {
    collector.violation({
      ...findingBase(record, rule, selector),
      code: "missing-standard-backdrop-filter",
      message: "Real glass surface lacks an authored backdrop-filter declaration in the same rule.",
    });
  }
  if (!webkit) {
    collector.violation({
      ...findingBase(record, rule, selector),
      code: "missing-webkit-backdrop-filter",
      message: "Real glass surface lacks an authored -webkit-backdrop-filter declaration in the same rule.",
    });
  }

  const standardSignatures = standard
    ? analyzeFilter({ value: standard.value, property: "backdrop-filter", record, node: standard, subject: selector, propertyIndex, collector })
    : [];
  const webkitSignatures = webkit
    ? analyzeFilter({ value: webkit.value, property: "-webkit-backdrop-filter", record, node: webkit, subject: selector, propertyIndex, collector })
    : [];

  if (standardSignatures.length === 1 && webkitSignatures.length === 1) {
    const a = standardSignatures[0];
    const b = webkitSignatures[0];
    if (["blur", "saturate", "brightness", "contrast"].some((key) => a[key] !== undefined && b[key] !== undefined && a[key] !== b[key])) {
      collector.violation({
        ...findingBase(record, rule, selector),
        code: "backdrop-filter-spellings-diverge",
        message: "Standard and WebKit filter spellings resolve to different material chains.",
      });
    }
  }

  if (background) analyzeFill({ value: background.value, property: "background", record, node: background, subject: selector, propertyIndex, collector });
  if (backgroundColor) analyzeFill({ value: backgroundColor.value, property: "background-color", record, node: backgroundColor, subject: selector, propertyIndex, collector });

  if (border) {
    analyzeBorder({ value: border.value, property: border.prop, record, node: border, subject: selector, propertyIndex, collector });
  } else if (composedBorders.length) {
    composedBorders.forEach((composedBorder) => analyzeBorder({
      value: composedBorder.value,
      property: composedBorder.prop,
      record,
      node: composedBorder,
      subject: selector,
      propertyIndex,
      collector,
    }));
  } else {
    collector.violation({
      ...findingBase(record, rule, selector),
      code: "missing-visible-border",
      message: "Real glass surface has no border declaration in this rule or another rule targeting the same surface class.",
    });
  }
};

const isMaterialFillProperty = (property) =>
  /^(?:--glass-(?:(?:neutral|primary|success|warning|danger|info)-level[1-5]-surface|gradient-(?:neutral)|marketing-glass-bg(?:-(?:subtle|strong))?)|--glass-theme-background-surface|--aura-(?:color-glass-surface|color-global-background-glass|marketing-surface-showcase-background))$/i.test(property);

const isMaterialBorderProperty = (property) =>
  /^(?:--glass-(?:(?:neutral|primary|success|warning|danger|info)-level[1-5]-border-color|border-(?:default|hover|active|subtle|strong)|marketing-glass-border(?:-strong)?)|--aura-(?:color-glass-border|color-global-border-soft|marketing-surface-showcase-border))$/i.test(property);

const isCanonicalBlurProperty = (property) =>
  /^(?:--glass-blur-(?:sm|md|lg|xl|2xl)|--glass-(?:neutral|primary|success|warning|danger|info)-level[1-5]-blur|--aura-glass-neutral-level[1-5]-backdrop-blur|--glass-marketing-glass-blur)$/i.test(property);

const analyzeCustomProperties = (records, propertyIndex, collector, metrics) => {
  for (const record of records) {
    if (!record?.root) continue;
    record.root.walkDecls(/^--/, (decl) => {
      if (isFallbackContext(decl)) return;
      const subject = `${decl.prop} (${selectorFor(decl.parent)})`;
      if (isMaterialFillProperty(decl.prop)) {
        metrics.cssMaterialTokens += 1;
        analyzeFill({ value: decl.value, property: decl.prop, record, node: decl, subject, propertyIndex, collector });
      } else if (isMaterialBorderProperty(decl.prop)) {
        metrics.cssMaterialTokens += 1;
        analyzeBorder({ value: decl.value, property: decl.prop, record, node: decl, subject, propertyIndex, collector });
      } else if (isCanonicalBlurProperty(decl.prop)) {
        metrics.cssMaterialTokens += 1;
        const expanded = expandCssValue(decl.value, propertyIndex, valueContext(record, decl));
        reportUnresolved(collector, record, decl, subject, decl.prop, expanded.unresolved);
        for (const variant of expanded.values) {
          const parsed = parseCssNumber(variant);
          if (!parsed) {
            collector.needsTriage({
              ...findingBase(record, decl, subject),
              code: "blur-token-unresolved",
              message: `${decl.prop} cannot be resolved to a pixel value: ${JSON.stringify(variant.trim())}.`,
            });
          } else if (parsed.unit.toLowerCase() !== "px" || !CANONICAL_BLURS.has(parsed.numeric)) {
            collector.violation({
              ...findingBase(record, decl, subject),
              code: "noncanonical-blur-token",
              message: `${decl.prop} is ${variant.trim()}, outside {16,24,32,40,48}px.`,
            });
          }
        }
      } else if (decl.prop === "--glass-filter-base") {
        metrics.cssMaterialTokens += 1;
        // The canonical blur is supplied by a separate token at call sites. Add
        // a known-good blur here so the common analyzer can still prove every
        // enhancement component and its numeric contract at the declaration.
        analyzeFilter({
          value: `blur(24px) ${decl.value}`,
          property: decl.prop,
          record,
          node: decl,
          subject,
          propertyIndex,
          collector,
        });
      }
    });
  }
};

const unwrapExpression = (node) => {
  let current = node;
  while (current && ["TSAsExpression", "TSTypeAssertion", "TSNonNullExpression", "ParenthesizedExpression"].includes(current.type)) {
    current = current.expression;
  }
  return current;
};

const traverseAst = (node, visitor, ancestors = []) => {
  if (!node || typeof node !== "object") return;
  if (typeof node.type === "string") visitor(node, ancestors);
  const nextAncestors = typeof node.type === "string" ? [...ancestors, node] : ancestors;
  for (const [key, value] of Object.entries(node)) {
    if (["loc", "start", "end", "extra", "errors", "tokens", "comments"].includes(key)) continue;
    if (Array.isArray(value)) value.forEach((child) => traverseAst(child, visitor, nextAncestors));
    else if (value && typeof value === "object") traverseAst(value, visitor, nextAncestors);
  }
};

const parseTsRecord = (record, collector) => {
  try {
    return {
      ...record,
      ast: babelParser.parse(record.source, {
        sourceType: "unambiguous",
        errorRecovery: true,
        plugins: ["typescript", "jsx", "decorators-legacy", "classProperties", "dynamicImport"],
      }),
    };
  } catch (error) {
    collector.needsTriage({
      code: "typescript-parse-unresolved",
      file: record.file,
      line: error.loc?.line || 1,
      subject: "TypeScript source",
      message: `Babel could not parse shipped TypeScript: ${error.message}`,
      sourceKind: "typescript",
    });
    return null;
  }
};

const buildTsBindings = (ast) => {
  const bindings = new Map();
  traverseAst(ast, (node) => {
    if (node.type !== "VariableDeclarator" || node.id?.type !== "Identifier" || !node.init) return;
    bindings.set(node.id.name, unwrapExpression(node.init));
  });
  return bindings;
};

const buildScopedTsBindings = (ast) => {
  const bindings = new Map();
  traverseAst(ast, (node, ancestors) => {
    if (node.type !== "VariableDeclarator" || node.id?.type !== "Identifier" || !node.init) return;
    const scope = [...ancestors].reverse().find((ancestor) =>
      ancestor.type === "BlockStatement" ||
      ancestor.type === "Program" ||
      /Function/.test(ancestor.type)
    );
    const entry = {
      value: unwrapExpression(node.init),
      declarationStart: node.start ?? -1,
      scopeStart: scope?.start ?? 0,
      scopeEnd: scope?.end ?? Number.MAX_SAFE_INTEGER,
    };
    if (!bindings.has(node.id.name)) bindings.set(node.id.name, []);
    bindings.get(node.id.name).push(entry);
  });
  return bindings;
};

const scopedBindingForIdentifier = (identifier, scopedBindings) => {
  if (!identifier || identifier.type !== "Identifier" || !scopedBindings?.has(identifier.name)) return null;
  const offset = identifier.start ?? Number.MAX_SAFE_INTEGER;
  const candidates = scopedBindings.get(identifier.name).filter((entry) =>
    entry.declarationStart <= offset && entry.scopeStart <= offset && entry.scopeEnd >= offset
  );
  candidates.sort((left, right) => {
    const leftSpan = left.scopeEnd - left.scopeStart;
    const rightSpan = right.scopeEnd - right.scopeStart;
    return leftSpan - rightSpan || right.declarationStart - left.declarationStart;
  });
  return candidates[0]?.value || null;
};

const resolvedObjectExpression = (input, bindings, stack = new Set()) => {
  const node = unwrapExpression(input);
  if (!node) return null;
  if (node.type === "ObjectExpression") return node;
  if (node.type !== "Identifier" || stack.has(node.name) || !bindings.has(node.name)) return null;
  return resolvedObjectExpression(bindings.get(node.name), bindings, new Set([...stack, node.name]));
};

const effectiveObjectProperties = (object, constants, bindings, stack = new Set()) => {
  const map = new Map();
  for (const property of object.properties || []) {
    if (property.type === "SpreadElement") {
      const spreadObject = resolvedObjectExpression(property.argument, bindings);
      if (!spreadObject || stack.has(spreadObject)) continue;
      const inherited = effectiveObjectProperties(spreadObject, constants, bindings, new Set([...stack, spreadObject]));
      for (const [name, inheritedProperty] of inherited) map.set(name, inheritedProperty);
      continue;
    }
    if (property.type !== "ObjectProperty") continue;
    const name = propertyName(property, constants);
    if (name) map.set(name, property);
  }
  return map;
};

const ancestorName = (ancestors) => {
  for (let index = ancestors.length - 1; index >= 0; index -= 1) {
    const ancestor = ancestors[index];
    if (ancestor.type === "VariableDeclarator" && ancestor.id?.type === "Identifier") return ancestor.id.name;
    if ((ancestor.type === "FunctionDeclaration" || ancestor.type === "FunctionExpression") && ancestor.id?.name) return ancestor.id.name;
    if (ancestor.type === "ObjectProperty" || ancestor.type === "ObjectMethod") {
      if (ancestor.key?.type === "Identifier") return ancestor.key.name;
      if (ancestor.key?.type === "StringLiteral") return ancestor.key.value;
    }
  }
  return "inline-style";
};

const ancestorFunctionName = (ancestors) => {
  for (let index = ancestors.length - 1; index >= 0; index -= 1) {
    const ancestor = ancestors[index];
    if ((ancestor.type === "FunctionDeclaration" || ancestor.type === "FunctionExpression") && ancestor.id?.name) {
      return ancestor.id.name;
    }
    if ((ancestor.type === "ObjectMethod" || ancestor.type === "ClassMethod") && ancestor.key) {
      if (ancestor.key.type === "Identifier") return ancestor.key.name;
      if (ancestor.key.type === "StringLiteral") return ancestor.key.value;
    }
    if (ancestor.type === "VariableDeclarator" && ancestor.id?.type === "Identifier") {
      const init = unwrapExpression(ancestor.init);
      if (init?.type === "ArrowFunctionExpression" || init?.type === "FunctionExpression") return ancestor.id.name;
    }
  }
  return "";
};

const buildStringConstants = (ast) => {
  const constants = new Map();
  traverseAst(ast, (node) => {
    if (node.type !== "VariableDeclarator" || node.id?.type !== "Identifier") return;
    const init = unwrapExpression(node.init);
    if (init?.type === "StringLiteral") constants.set(node.id.name, init.value);
  });
  return constants;
};

const propertyName = (property, constants) => {
  if (!property) return null;
  const key = unwrapExpression(property.key);
  if (!property.computed && key?.type === "Identifier") return key.name;
  if (key?.type === "StringLiteral") return key.value;
  if (key?.type === "Identifier" && constants.has(key.name)) return constants.get(key.name);
  return null;
};

const expressionSource = (record, node) =>
  node && Number.isInteger(node.start) && Number.isInteger(node.end)
    ? record.source.slice(node.start, node.end)
    : "<dynamic-expression>";

const referencedExpressionNodes = (input, constants, bindings, stack = new Set()) => {
  const node = unwrapExpression(input);
  if (!node) return [];

  if (node.type === "Identifier" && bindings?.has(node.name) && !stack.has(node.name)) {
    return referencedExpressionNodes(
      bindings.get(node.name),
      constants,
      bindings,
      new Set([...stack, node.name]),
    );
  }

  if (node.type !== "MemberExpression") return [node];
  const objectTargets = referencedExpressionNodes(node.object, constants, bindings, stack);
  const fixedKey = !node.computed && node.property?.type === "Identifier"
    ? node.property.name
    : node.property?.type === "StringLiteral" || node.property?.type === "NumericLiteral"
      ? String(node.property.value)
      : node.property?.type === "Identifier" && constants.has(node.property.name)
        ? constants.get(node.property.name)
        : null;
  const results = [];

  for (const objectTarget of objectTargets) {
    if (objectTarget.type !== "ObjectExpression") continue;
    const properties = effectiveObjectProperties(objectTarget, constants, bindings || new Map());
    if (fixedKey !== null) {
      const property = properties.get(String(fixedKey));
      if (property?.value) results.push(property.value);
    } else {
      // A computed lookup into a closed object-literal domain is statically
      // provable by enumerating every possible value. This handles typed style
      // maps such as tokens.blur[blur] without assuming one runtime branch.
      for (const property of properties.values()) {
        if (property?.value) results.push(property.value);
      }
    }
  }
  return results;
};

const expressionValues = (record, input, constants, stack = new Set()) => {
  const node = unwrapExpression(input);
  if (!node) return { values: [], dynamic: true };
  if (node.type === "StringLiteral") return { values: [node.value], dynamic: false };
  if (node.type === "NumericLiteral") return { values: [String(node.value)], dynamic: false };
  if (node.type === "TemplateLiteral") {
    let values = [node.quasis[0]?.value?.cooked ?? node.quasis[0]?.value?.raw ?? ""];
    let dynamic = false;
    node.expressions.forEach((expression, index) => {
      const evaluated = expressionValues(record, expression, constants, stack);
      const expressionValuesToUse = evaluated.values.length
        ? evaluated.values
        : [`${DYNAMIC_SENTINEL}:${expressionSource(record, expression)}`];
      values = combine(values, expressionValuesToUse);
      values = values.map((value) => value + (node.quasis[index + 1]?.value?.cooked ?? node.quasis[index + 1]?.value?.raw ?? ""));
      dynamic ||= evaluated.dynamic;
    });
    return { values: [...new Set(values)], dynamic };
  }
  if (node.type === "Identifier" && constants.has(node.name)) {
    return { values: [constants.get(node.name)], dynamic: false };
  }
  if (node.type === "Identifier" && record.scopedBindings) {
    const scopedValue = scopedBindingForIdentifier(node, record.scopedBindings);
    const key = `${node.name}@${scopedValue?.start ?? "unresolved"}`;
    if (scopedValue && !stack.has(key)) {
      return expressionValues(record, scopedValue, constants, new Set([...stack, key]));
    }
  }
  if ((node.type === "Identifier" || node.type === "MemberExpression") && record.bindings) {
    const key = node.type === "Identifier" ? node.name : `${node.start}:${node.end}`;
    if (!stack.has(key)) {
      const targets = referencedExpressionNodes(node, constants, record.bindings, new Set([...stack, key]));
      if (targets.length && !(targets.length === 1 && targets[0] === node)) {
        const evaluated = targets.map((target) => expressionValues(record, target, constants, new Set([...stack, key])));
        return {
          values: [...new Set(evaluated.flatMap((item) => item.values))],
          dynamic: evaluated.some((item) => item.dynamic),
        };
      }
    }
  }
  if (node.type === "ConditionalExpression") {
    const consequent = expressionValues(record, node.consequent, constants, stack);
    const alternate = expressionValues(record, node.alternate, constants, stack);
    return { values: [...consequent.values, ...alternate.values], dynamic: consequent.dynamic || alternate.dynamic };
  }
  if (node.type === "LogicalExpression") {
    const left = expressionValues(record, node.left, constants, stack);
    const right = expressionValues(record, node.right, constants, stack);
    return { values: [...left.values, ...right.values], dynamic: true };
  }
  return { values: [`${DYNAMIC_SENTINEL}:${expressionSource(record, node)}`], dynamic: true };
};

const objectProperties = (object, constants) => {
  const map = new Map();
  for (const property of object.properties || []) {
    if (property.type !== "ObjectProperty") continue;
    const name = propertyName(property, constants);
    if (name) map.set(name, property);
  }
  return map;
};

const tsRecordForNode = (record, node) => ({
  file: record.file,
  lineOffset: 0,
  sourceKind: "typescript",
  css: "",
  root: null,
  _tsNode: node,
});

const analyzeTsValue = ({ mode, property, propertyNode, valueNode, record, subject, constants, propertyIndex, collector }) => {
  const evaluated = expressionValues(record, valueNode, constants);
  const pseudoRecord = tsRecordForNode(record, propertyNode);
  for (const value of evaluated.values) {
    if (value.includes(DYNAMIC_SENTINEL)) {
      collector.needsTriage({
        ...findingBase(pseudoRecord, propertyNode, subject),
        code: `dynamic-${mode}-unproven`,
        message: `${property} is composed from a non-literal TypeScript expression: ${JSON.stringify(expressionSource(record, valueNode))}.`,
      });
      continue;
    }
    if (mode === "fill") analyzeFill({ value, property, record: pseudoRecord, node: propertyNode, subject, propertyIndex, collector });
    else if (mode === "border") analyzeBorder({ value, property, record: pseudoRecord, node: propertyNode, subject, propertyIndex, collector });
    else if (mode === "filter") analyzeFilter({ value, property, record: pseudoRecord, node: propertyNode, subject, propertyIndex, collector });
  }
  if (evaluated.dynamic && !evaluated.values.some((value) => value.includes(DYNAMIC_SENTINEL))) {
    collector.needsTriage({
      ...findingBase(pseudoRecord, propertyNode, subject),
      code: `dynamic-${mode}-unproven`,
      message: `${property} is composed dynamically and all runtime branches cannot be proved.`,
    });
  }
  return evaluated;
};

const extractObjectColorNode = (property, constants, nestedKey) => {
  const value = unwrapExpression(property?.value);
  if (value?.type !== "ObjectExpression") return property?.value;
  const nested = objectProperties(value, constants).get(nestedKey);
  return nested?.value;
};

const analyzeTsMaterialSpec = ({ object, properties, record, constants, propertyIndex, collector, subject, metrics }) => {
  metrics.tsMaterialSpecs += 1;
  const pseudoRecord = tsRecordForNode(record, object);
  const blurProperty = properties.get("backdropBlur");
  const blurNode = extractObjectColorNode(blurProperty, constants, "px") || blurProperty?.value;
  const blur = expressionValues(record, blurNode, constants);
  for (const value of blur.values) {
    const normalized = /^\d+(?:\.\d+)?$/.test(value) ? `${value}px` : value;
    const parsed = parseCssNumber(normalized);
    if (!parsed) {
      collector.needsTriage({
        ...findingBase(pseudoRecord, blurProperty, subject),
        code: "ts-material-blur-unresolved",
        message: `backdropBlur cannot be proved canonical: ${JSON.stringify(value)}.`,
      });
    } else if (parsed.unit.toLowerCase() !== "px" || !CANONICAL_BLURS.has(parsed.numeric)) {
      collector.violation({
        ...findingBase(pseudoRecord, blurProperty, subject),
        code: "ts-material-noncanonical-blur",
        message: `backdropBlur ${normalized} is outside {16,24,32,40,48}px.`,
      });
    }
  }

  const backgroundProperty = properties.get("background") || properties.get("surface");
  const backgroundValue = properties.has("surface")
    ? extractObjectColorNode(backgroundProperty, constants, "base")
    : backgroundProperty?.value;
  if (backgroundValue) {
    analyzeTsValue({ mode: "fill", property: properties.has("surface") ? "surface.base" : "background", propertyNode: backgroundProperty, valueNode: backgroundValue, record, subject, constants, propertyIndex, collector });
  } else {
    collector.needsTriage({
      ...findingBase(pseudoRecord, object, subject),
      code: "ts-material-fill-unproven",
      message: "Material specification does not expose a statically provable background/surface.base value.",
    });
  }

  const overlayValue = properties.has("surface")
    ? extractObjectColorNode(backgroundProperty, constants, "overlay")
    : null;
  if (overlayValue) {
    analyzeTsValue({ mode: "fill", property: "surface.overlay", propertyNode: backgroundProperty, valueNode: overlayValue, record, subject, constants, propertyIndex, collector });
  }

  const borderProperty = properties.get("border");
  const borderValue = extractObjectColorNode(borderProperty, constants, "color") || borderProperty?.value;
  if (borderValue) {
    analyzeTsValue({ mode: "border", property: "border", propertyNode: borderProperty, valueNode: borderValue, record, subject, constants, propertyIndex, collector });
  }

  const standard = properties.get("backdropFilter");
  const webkit = properties.get("WebkitBackdropFilter") || properties.get("webkitBackdropFilter");
  if (standard || webkit) {
    if (!standard) collector.violation({ ...findingBase(pseudoRecord, object, subject), code: "ts-material-missing-standard-filter", message: "Material object lacks backdropFilter." });
    if (!webkit) collector.violation({ ...findingBase(pseudoRecord, object, subject), code: "ts-material-missing-webkit-filter", message: "Material object lacks WebkitBackdropFilter." });
    if (standard) analyzeTsValue({ mode: "filter", property: "backdropFilter", propertyNode: standard, valueNode: standard.value, record, subject, constants, propertyIndex, collector });
    if (webkit) analyzeTsValue({ mode: "filter", property: "WebkitBackdropFilter", propertyNode: webkit, valueNode: webkit.value, record, subject, constants, propertyIndex, collector });
  }
};

const analyzeTsStyleObject = ({ object, properties, record, constants, propertyIndex, collector, subject, metrics, spreadsResolved }) => {
  metrics.tsStyleObjects += 1;
  const pseudoRecord = tsRecordForNode(record, object);
  const standard = properties.get("backdropFilter");
  const webkit = properties.get("WebkitBackdropFilter") || properties.get("webkitBackdropFilter");
  const background = properties.get("background") || properties.get("backgroundColor");
  const border = properties.get("border") || properties.get("borderColor");
  const hasUnresolvedSpread = (object.properties || []).some((property) => property.type === "SpreadElement") && !spreadsResolved;

  if (!standard) {
    const finding = { ...findingBase(pseudoRecord, object, subject), code: "ts-surface-missing-standard-filter", message: "TypeScript glass surface lacks backdropFilter in this style object." };
    (hasUnresolvedSpread ? collector.needsTriage : collector.violation)(finding);
  }
  if (!webkit) {
    const finding = { ...findingBase(pseudoRecord, object, subject), code: "ts-surface-missing-webkit-filter", message: "TypeScript glass surface lacks WebkitBackdropFilter in this style object." };
    (hasUnresolvedSpread ? collector.needsTriage : collector.violation)(finding);
  }
  if (standard) analyzeTsValue({ mode: "filter", property: "backdropFilter", propertyNode: standard, valueNode: standard.value, record, subject, constants, propertyIndex, collector });
  if (webkit) analyzeTsValue({ mode: "filter", property: "WebkitBackdropFilter", propertyNode: webkit, valueNode: webkit.value, record, subject, constants, propertyIndex, collector });
  if (background) analyzeTsValue({ mode: "fill", property: propertyName(background, constants), propertyNode: background, valueNode: background.value, record, subject, constants, propertyIndex, collector });
  else collector.needsTriage({ ...findingBase(pseudoRecord, object, subject), code: "ts-surface-fill-composition-unproven", message: "Material fill is not authored in this style object and cannot be proved across composition." });
  if (border) analyzeTsValue({ mode: "border", property: propertyName(border, constants), propertyNode: border, valueNode: border.value, record, subject, constants, propertyIndex, collector });
  else collector.needsTriage({ ...findingBase(pseudoRecord, object, subject), code: "ts-surface-border-composition-unproven", message: "Visible border and its 0.12 alpha floor cannot be proved in this style object." });
};

const cssTemplateText = (record, template) => {
  let text = template.quasis[0]?.value?.cooked ?? template.quasis[0]?.value?.raw ?? "";
  template.expressions.forEach((expression, index) => {
    text += DYNAMIC_SENTINEL;
    text += template.quasis[index + 1]?.value?.cooked ?? template.quasis[index + 1]?.value?.raw ?? "";
  });

  if (/<style>\s*\{?\\?`?/i.test(text)) {
    text = text.replace(/^[\s\S]*?<style>\s*\{?\\?`?\s*/i, "");
    text = text.replace(/\s*\\?`?\}?<\/style>[\s\S]*$/i, "");
  }

  const hasRule = /(?:^|\n)\s*(?:[.#[:]|@media|@supports)[^\n{]*\{/.test(text);
  if (!hasRule && /(?:backdrop-filter|background|border)\s*:/.test(text)) {
    return `.audit-inline-style {\n${text}\n}`;
  }
  return text;
};

const extractTsCssRecords = (tsRecords) => {
  const cssRecords = [];
  for (const record of tsRecords) {
    if (!record?.ast) continue;
    traverseAst(record.ast, (node, ancestors) => {
      if (node.type !== "TemplateLiteral") return;
      const literalText = node.quasis.map((quasi) => quasi.value.cooked ?? quasi.value.raw ?? "").join("");
      if (!/(?:^|[;{\s])-?webkit-backdrop-filter\s*:|(?:^|[;{\s])backdrop-filter\s*:/.test(literalText)) return;
      const css = cssTemplateText(record, node);
      cssRecords.push({
        file: record.file,
        css,
        lineOffset: Math.max(0, (node.loc?.start?.line || 1) - 1),
        sourceKind: "typescript-css-template",
        label: ancestorName(ancestors),
      });
    });
  }
  return cssRecords;
};

const analyzeTsRecords = (records, propertyIndex, collector, metrics) => {
  for (const record of records) {
    if (!record?.ast) continue;
    const constants = buildStringConstants(record.ast);
    const bindings = buildTsBindings(record.ast);
    record.bindings = bindings;
    record.scopedBindings = buildScopedTsBindings(record.ast);
    const analyzedRanges = [];

    traverseAst(record.ast, (node, ancestors) => {
      if (node.type !== "ObjectExpression") return;
      const directProperties = objectProperties(node, constants);
      const properties = effectiveObjectProperties(node, constants, bindings);
      const spreadsResolved = (node.properties || [])
        .filter((property) => property.type === "SpreadElement")
        .every((property) => Boolean(resolvedObjectExpression(property.argument, bindings)));
      const subject = ancestorName(ancestors);
      const isMaterialSpec = properties.has("backdropBlur") && properties.has("border") && (properties.has("surface") || properties.has("background"));
      if (isMaterialSpec) {
        analyzeTsMaterialSpec({ object: node, properties, record, constants, propertyIndex, collector, subject, metrics });
        analyzedRanges.push([node.start, node.end]);
        return;
      }

      const hasFilter = properties.has("backdropFilter") || properties.has("WebkitBackdropFilter") || properties.has("webkitBackdropFilter");
      const functionName = ancestorFunctionName(ancestors);
      const namedFactorySurface = /createGlassStyle|buildSurfaceStyles|buildLiquidGlassStyles/i.test(`${subject} ${functionName}`) && (directProperties.has("background") || directProperties.has("backgroundColor"));
      const hasMaterialContext = /glass|material|surface/i.test(subject) && (properties.has("background") || properties.has("backgroundColor")) && properties.has("border");
      if ((hasFilter && (properties.has("background") || properties.has("backgroundColor") || hasMaterialContext)) || namedFactorySurface) {
        analyzeTsStyleObject({ object: node, properties, record, constants, propertyIndex, collector, subject, metrics, spreadsResolved });
        analyzedRanges.push([node.start, node.end]);
      }
    });

    const withinAnalyzedRange = (node) => analyzedRanges.some(([start, end]) => node.start >= start && node.end <= end);
    traverseAst(record.ast, (node, ancestors) => {
      if (node.type !== "ObjectExpression" || withinAnalyzedRange(node)) return;
      const properties = objectProperties(node, constants);
      const standard = properties.get("backdropFilter");
      const webkit = properties.get("WebkitBackdropFilter") || properties.get("webkitBackdropFilter");
      if (!standard && !webkit) return;

      const parent = ancestors[ancestors.length - 1];
      const isObjectAssignStyleOverride =
        parent?.type === "CallExpression" &&
        parent.callee?.type === "MemberExpression" &&
        parent.callee.object?.type === "Identifier" &&
        parent.callee.object.name === "Object" &&
        parent.callee.property?.type === "Identifier" &&
        parent.callee.property.name === "assign" &&
        parent.arguments?.includes(node) &&
        /style/i.test(expressionSource(record, parent.arguments[0]));
      if (!isObjectAssignStyleOverride && !(standard && webkit)) return;

      metrics.tsFilterMutationGroups += 1;
      const subject = `${ancestorName(ancestors)}:filter-override`;
      const pseudoRecord = tsRecordForNode(record, node);
      if (!standard || !webkit) {
        collector.violation({
          ...findingBase(pseudoRecord, node, subject),
          code: "ts-filter-object-one-sided",
          message: "A TypeScript style override object must write both backdropFilter and WebkitBackdropFilter.",
        });
      }
      if (standard) analyzeTsValue({ mode: "filter", property: "backdropFilter", propertyNode: standard, valueNode: standard.value, record, subject, constants, propertyIndex, collector });
      if (webkit) analyzeTsValue({ mode: "filter", property: "WebkitBackdropFilter", propertyNode: webkit, valueNode: webkit.value, record, subject, constants, propertyIndex, collector });
    });

    const assignmentGroups = new Map();
    traverseAst(record.ast, (node, ancestors) => {
      if (node.type !== "AssignmentExpression" || withinAnalyzedRange(node)) return;
      const left = unwrapExpression(node.left);
      if (left?.type !== "MemberExpression") return;
      const prop = left.computed
        ? left.property?.type === "StringLiteral" ? left.property.value : null
        : left.property?.name;
      if (!["backdropFilter", "WebkitBackdropFilter", "webkitBackdropFilter"].includes(prop)) return;
      const objectText = expressionSource(record, left.object);
      if (/\.style$/.test(objectText) && /(support|compat|probe|test)/i.test(`${record.file} ${ancestorName(ancestors)}`)) return;
      const functionAncestor = [...ancestors].reverse().find((ancestor) => /Function/.test(ancestor.type));
      const key = `${functionAncestor?.start || 0}:${objectText}`;
      if (!assignmentGroups.has(key)) assignmentGroups.set(key, { subject: `${ancestorName(ancestors)}:${objectText}`, standard: [], webkit: [] });
      const group = assignmentGroups.get(key);
      (prop === "backdropFilter" ? group.standard : group.webkit).push(node);
    });

    for (const group of assignmentGroups.values()) {
      metrics.tsFilterMutationGroups += 1;
      const pseudoRecord = tsRecordForNode(record, group.standard[0] || group.webkit[0]);
      if (!group.standard.length || !group.webkit.length) {
        collector.needsTriage({
          ...findingBase(pseudoRecord, group.standard[0] || group.webkit[0], group.subject),
          code: "ts-filter-mutation-one-sided",
          message: "A TypeScript filter mutation writes only one browser spelling in this lexical style group; material/decorative intent requires review.",
        });
        continue;
      }
      for (const assignment of [...group.standard, ...group.webkit]) {
        const prop = assignment.left.property.name || assignment.left.property.value;
        analyzeTsValue({ mode: "filter", property: prop, propertyNode: assignment, valueNode: assignment.right, record, subject: group.subject, constants, propertyIndex, collector });
      }
    }

    traverseAst(record.ast, (node, ancestors) => {
      if (node.type !== "VariableDeclarator" || node.id?.type !== "Identifier") return;
      if (!/glass.*(?:surface|material)|(?:surface|material).*glass/i.test(node.id.name)) return;
      const init = unwrapExpression(node.init);
      if (!["StringLiteral", "TemplateLiteral"].includes(init?.type)) return;
      metrics.tsMaterialTokens += 1;
      analyzeTsValue({ mode: "fill", property: node.id.name, propertyNode: node, valueNode: init, record, subject: node.id.name, constants, propertyIndex, collector });
    });
  }
};

const countBy = (findings, key) => Object.fromEntries(
  [...findings.reduce((map, finding) => map.set(finding[key], (map.get(finding[key]) || 0) + 1), new Map()).entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
);

const auditSourceSet = ({ cssSources, tsSources }) => {
  const collector = makeCollector();
  const parsedTs = tsSources.map((record) => parseTsRecord(record, collector)).filter(Boolean);
  const inlineCssSources = extractTsCssRecords(parsedTs);
  const parsedCss = [...cssSources, ...inlineCssSources].map((record) => parseCssRecord(record, collector)).filter(Boolean);
  const propertyIndex = buildCustomPropertyIndex(parsedCss);
  parsedCss.forEach((record) => {
    record.borderCompositionIndex = buildBorderCompositionIndex(record);
  });
  const metrics = {
    cssFiles: cssSources.length,
    tsFiles: tsSources.length,
    tsCssTemplates: inlineCssSources.length,
    cssSurfaces: 0,
    cssFilterUtilities: 0,
    cssMaterialTokens: 0,
    tsMaterialSpecs: 0,
    tsStyleObjects: 0,
    tsFilterMutationGroups: 0,
    tsMaterialTokens: 0,
  };

  analyzeCustomProperties(parsedCss, propertyIndex, collector, metrics);
  for (const record of parsedCss) {
    record.root.walkRules((rule) => analyzeSurfaceRule(record, rule, propertyIndex, collector, metrics));
  }
  analyzeTsRecords(parsedTs, propertyIndex, collector, metrics);

  collector.violations.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line || a.code.localeCompare(b.code));
  collector.triage.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line || a.code.localeCompare(b.code));
  return {
    status: collector.violations.length === 0 && collector.triage.length === 0 ? "pass" : "fail",
    scope: {
      included: ["src/**/*.css", "src/**/*.ts", "src/**/*.tsx", "AST-classified CSS template literals"],
      excluded: ["stories and Storybook-only support", "tests/snapshots", "reports/docs/scripts", "dist/dependencies"],
    },
    metrics,
    summary: {
      violationCount: collector.violations.length,
      blockingTriageCount: collector.triage.length,
      filesWithViolations: new Set(collector.violations.map((finding) => finding.file)).size,
      filesWithTriage: new Set(collector.triage.map((finding) => finding.file)).size,
      violationsByCode: countBy(collector.violations, "code"),
      triageByCode: countBy(collector.triage, "code"),
    },
    violations: collector.violations,
    triage: collector.triage,
  };
};

const repositorySources = () => {
  const allFiles = walk(path.join(REPO_ROOT, "src"));
  const included = allFiles.filter((filePath) => !isExcludedSourcePath(path.relative(REPO_ROOT, filePath)));
  const cssSources = included
    .filter((filePath) => filePath.endsWith(".css"))
    .map((filePath) => ({
      file: normalizePath(path.relative(REPO_ROOT, filePath)),
      css: fs.readFileSync(filePath, "utf8"),
      lineOffset: 0,
      sourceKind: filePath.includes(".generated.") || normalizePath(filePath).includes("/generated/") ? "generated-css" : "css",
      label: path.basename(filePath),
    }));
  const tsSources = included
    .filter((filePath) => /\.[cm]?tsx?$/.test(filePath))
    .map((filePath) => ({
      file: normalizePath(path.relative(REPO_ROOT, filePath)),
      source: fs.readFileSync(filePath, "utf8"),
    }));
  return { cssSources, tsSources };
};

const formatFinding = (finding) =>
  `- ${finding.code}: ${finding.file}:${finding.line} (${finding.subject}) — ${finding.message}`;

const printHumanReport = (report) => {
  console.log("Static glass material invariant audit");
  console.log("=====================================");
  console.log(`Status: ${report.status.toUpperCase()}`);
  console.log(`Scanned: ${report.metrics.cssFiles} CSS files, ${report.metrics.tsFiles} TS/TSX files, ${report.metrics.tsCssTemplates} AST-classified inline CSS templates`);
  console.log(`Classified: ${report.metrics.cssSurfaces} CSS surfaces, ${report.metrics.cssFilterUtilities} filter utilities, ${report.metrics.cssMaterialTokens} CSS material tokens, ${report.metrics.tsMaterialSpecs} TS material specs, ${report.metrics.tsStyleObjects} TS style objects, ${report.metrics.tsFilterMutationGroups} TS filter mutation groups`);
  console.log(`Definite violations: ${report.summary.violationCount} in ${report.summary.filesWithViolations} files`);
  console.log(`Blocking triage: ${report.summary.blockingTriageCount} in ${report.summary.filesWithTriage} files`);

  console.log("\nDefinite violations");
  if (!report.violations.length) console.log("- None");
  else report.violations.forEach((finding) => console.log(formatFinding(finding)));

  console.log("\nBlocking TypeScript/CSS-composition triage");
  if (!report.triage.length) console.log("- None");
  else report.triage.forEach((finding) => console.log(formatFinding(finding)));

  console.log("\nGate policy");
  console.log("- Both definite violations and unresolved triage exit non-zero; dynamic authored material never silently passes.");
};

const runSelfTest = () => {
  const valid = `
    :root {
      --glass-blur-md: 24px;
      --glass-filter-base: saturate(1.8) brightness(1.05) contrast(1.05);
      --glass-gradient-neutral: linear-gradient(135deg, rgba(255,255,255,.20), rgba(255,255,255,.08));
      --glass-border-default: rgba(255,255,255,.16);
    }
    .glass-surface-fixture {
      background: var(--glass-gradient-neutral);
      border: 1px solid var(--glass-border-default);
      backdrop-filter: blur(var(--glass-blur-md)) var(--glass-filter-base);
      -webkit-backdrop-filter: blur(var(--glass-blur-md)) var(--glass-filter-base);
    }
    .glass-surface-fixture .glass-text-primary {
      background: rgba(255,255,255,.12);
      border: 1px solid rgba(255,255,255,.16);
    }
  `;
  const validReport = auditSourceSet({ cssSources: [{ file: "src/valid.css", css: valid, lineOffset: 0, sourceKind: "css" }], tsSources: [] });
  assert.equal(validReport.status, "pass", JSON.stringify(validReport, null, 2));
  assert.equal(validReport.metrics.cssSurfaces, 1, "ancestor glass classes must not classify descendant utilities as material surfaces");

  const invalid = `
    .glass-card {
      background: linear-gradient(rgba(255,255,255,.06), rgba(12,22,42,.72));
      border: 1px solid rgba(255,255,255,.08);
      backdrop-filter: blur(22px) saturate(1.2);
    }
  `;
  const invalidReport = auditSourceSet({ cssSources: [{ file: "src/invalid.css", css: invalid, lineOffset: 0, sourceKind: "css" }], tsSources: [] });
  const invalidCodes = new Set(invalidReport.violations.map((finding) => finding.code));
  [
    "missing-webkit-backdrop-filter",
    "noncanonical-blur",
    "saturate-outside-contract",
    "missing-brightness",
    "missing-contrast",
    "white-frost-alpha-outside-contract",
    "dark-or-chromatic-material-fill",
    "border-alpha-below-floor",
  ].forEach((code) => assert(invalidCodes.has(code), `self-test did not detect ${code}`));

  const dynamicTs = `
    const blur = input;
    export const style = {
      background: "rgba(255,255,255,.18)",
      border: "1px solid rgba(255,255,255,.16)",
      backdropFilter: \`blur(\${blur}px) saturate(1.8) brightness(1.05) contrast(1.05)\`,
      WebkitBackdropFilter: \`blur(\${blur}px) saturate(1.8) brightness(1.05) contrast(1.05)\`,
    };
  `;
  const dynamicReport = auditSourceSet({ cssSources: [], tsSources: [{ file: "src/dynamic.ts", source: dynamicTs }] });
  assert(dynamicReport.triage.some((finding) => finding.code === "dynamic-filter-unproven"), "dynamic TypeScript filter must block as triage");

  const decorative = `.glass-focus-glow { backdrop-filter: blur(8px); }`;
  const decorativeReport = auditSourceSet({ cssSources: [{ file: "src/decorative.css", css: decorative, lineOffset: 0, sourceKind: "css" }], tsSources: [] });
  assert.equal(decorativeReport.violations.length, 0, "decorative filters must not be mislabeled as real glass surfaces");

  const splitBorder = `
    .glass-surface-split {
      background: rgba(255,255,255,.18);
      backdrop-filter: blur(24px) saturate(1.8) brightness(1.05) contrast(1.05);
      -webkit-backdrop-filter: blur(24px) saturate(1.8) brightness(1.05) contrast(1.05);
    }
    :is(.glass-surface-split, .unrelated) { border: 1px solid rgba(255,255,255,.16); }
  `;
  const splitBorderReport = auditSourceSet({ cssSources: [{ file: "src/split.css", css: splitBorder, lineOffset: 0, sourceKind: "css" }], tsSources: [] });
  assert.equal(splitBorderReport.status, "pass", JSON.stringify(splitBorderReport, null, 2));

  const conditionalBorder = splitBorder.replace(
    ":is(.glass-surface-split, .unrelated) { border:",
    ".glass-surface-split:hover { border:",
  );
  const conditionalBorderReport = auditSourceSet({ cssSources: [{ file: "src/conditional-border.css", css: conditionalBorder, lineOffset: 0, sourceKind: "css" }], tsSources: [] });
  assert(
    conditionalBorderReport.violations.some((finding) => finding.code === "missing-visible-border"),
    "a state-only or more-specific rule must not falsely prove the base surface border",
  );

  const missingBorder = `.glass-surface-borderless { background: rgba(255,255,255,.18); backdrop-filter: blur(24px) saturate(1.8) brightness(1.05) contrast(1.05); -webkit-backdrop-filter: blur(24px) saturate(1.8) brightness(1.05) contrast(1.05); }`;
  const missingBorderReport = auditSourceSet({ cssSources: [{ file: "src/borderless.css", css: missingBorder, lineOffset: 0, sourceKind: "css" }], tsSources: [] });
  assert(missingBorderReport.violations.some((finding) => finding.code === "missing-visible-border"), "an authored material surface without a composed border must fail definitively");

  const oneSidedUtility = `.design-blur-md { backdrop-filter: blur(24px); }`;
  const oneSidedReport = auditSourceSet({ cssSources: [{ file: "src/utility.css", css: oneSidedUtility, lineOffset: 0, sourceKind: "css" }], tsSources: [] });
  assert(oneSidedReport.violations.some((finding) => finding.code === "filter-utility-missing-webkit"), "non-decorative filter utilities must author both browser spellings");

  const finiteTs = `
    const tokens = {
      blur: { sm: "16px", md: "24px", lg: "32px", xl: "40px" },
      gradient: {
        default: "linear-gradient(rgba(255,255,255,.24), rgba(255,255,255,.12))",
        primary: "linear-gradient(rgba(255,255,255,.30), rgba(255,255,255,.10))",
      },
    };
    const style = {
      background: tokens.gradient[variant],
      border: "1px solid rgba(255,255,255,.18)",
      backdropFilter: \`blur(\${tokens.blur[blur]}) saturate(1.5) brightness(1.05) contrast(1.05)\`,
      WebkitBackdropFilter: \`blur(\${tokens.blur[blur]}) saturate(1.5) brightness(1.05) contrast(1.05)\`,
    };
  `;
  const finiteTsReport = auditSourceSet({ cssSources: [], tsSources: [{ file: "src/finite.ts", source: finiteTs }] });
  assert.equal(finiteTsReport.status, "pass", JSON.stringify(finiteTsReport, null, 2));

  const invalidFiniteTs = finiteTs.replace('lg: "32px"', 'lg: "28px"');
  const invalidFiniteTsReport = auditSourceSet({ cssSources: [], tsSources: [{ file: "src/finite-invalid.ts", source: invalidFiniteTs }] });
  assert(invalidFiniteTsReport.violations.some((finding) => finding.code === "noncanonical-blur"), "every branch of a finite TypeScript lookup must be audited");

  const invalidMaterialRecord = `
    const glassMaterials = {
      regular: {
        backdropBlur: "24px",
        backdropFilter: "blur(24px) saturate(1.35) brightness(1.05) contrast(1.05)",
        WebkitBackdropFilter: "blur(24px) saturate(1.35) brightness(1.05) contrast(1.05)",
        background: "rgba(255,255,255,.18)",
        border: "rgba(255,255,255,.16)",
      },
    };
  `;
  const invalidMaterialRecordReport = auditSourceSet({ cssSources: [], tsSources: [{ file: "src/material-record.ts", source: invalidMaterialRecord }] });
  assert(
    invalidMaterialRecordReport.violations.some((finding) => finding.code === "saturate-outside-contract"),
    "TypeScript material-record filter chains must be audited, not only their blur metadata",
  );

  const invalidObjectAssignOverride = `
    function buildGlassStyle() {
      const style = {};
      const canonicalFilter = "blur(24px) saturate(1.35) brightness(1.05) contrast(1.05)";
      Object.assign(style, {
        backdropFilter: canonicalFilter,
        WebkitBackdropFilter: canonicalFilter,
      });
      return style;
    }
  `;
  const invalidObjectAssignReport = auditSourceSet({ cssSources: [], tsSources: [{ file: "src/object-assign.ts", source: invalidObjectAssignOverride }] });
  assert(
    invalidObjectAssignReport.violations.some((finding) => finding.code === "saturate-outside-contract"),
    "Object.assign style overrides must be classified and their scoped identifier values proved",
  );

  console.log("Static glass material audit self-test: PASS (CSS/TS valid, violations, dynamic-triage, finite lookups, material records, Object.assign overrides, decorative exclusions, border composition/floors, and aliases)");
};

const main = () => {
  if (process.argv.includes("--self-test")) {
    runSelfTest();
    return;
  }
  const report = auditSourceSet(repositorySources());
  if (process.argv.includes("--json")) console.log(JSON.stringify(report, null, 2));
  else printHumanReport(report);
  process.exitCode = report.status === "pass" ? 0 : 1;
};

if (require.main === module) main();

module.exports = {
  auditSourceSet,
  isExcludedSourcePath,
  runSelfTest,
};
