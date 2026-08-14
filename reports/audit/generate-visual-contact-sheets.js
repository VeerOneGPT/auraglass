#!/usr/bin/env node
/*
 * Build a deterministic, human-reviewable index for the full AuraGlass visual
 * evidence run. The source evidence is opened read-only. Generated files are
 * published under reports/audit/visual-contact-sheets only after
 * the complete 498-item / 1,494-PNG inventory and run identity are validated.
 *
 * Usage:
 *   node reports/audit/generate-visual-contact-sheets.js --dry-run
 *   node reports/audit/generate-visual-contact-sheets.js
 *
 * Optional:
 *   --root <dir>        Evidence root (default: reports/audit/visual-all)
 *   --output <dir>      Output root (default: reports/audit/visual-contact-sheets)
 *   --batch-size <n>    Images per contact sheet (default: 24)
 *   --columns <n>       Contact-sheet columns (default: 4)
 *   --magick <path>     ImageMagick 7 executable (default: magick on PATH)
 *   --font <path>       Font file used for labels
 */

"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const repoRoot = path.resolve(__dirname, "../..");
const auditRoot = path.join(repoRoot, "reports", "audit");
const defaultEvidenceRoot = path.join(auditRoot, "visual-all");
const defaultOutputRoot = path.join(auditRoot, "visual-contact-sheets");
const manifestFilename = "visual-run-manifest.json";
const verifierSummaryFilename = "visual-summary.json";
const visualTargetManifestRelativePath = "reports/public-visual-target-manifest.json";

const expected = Object.freeze({
  exports: 470,
  recipes: 28,
  visualTotal: 498,
  nonvisual: 1,
  auditedTotal: 499,
  pngTotal: 1_494,
});

const viewports = Object.freeze([
  { name: "desktop", width: 1440, height: 900, thumbnail: "320x200>" },
  { name: "tablet", width: 768, height: 1024, thumbnail: "270x360>" },
  { name: "mobile", width: 390, height: 844, thumbnail: "180x390>" },
]);

class AuditInputError extends Error {
  constructor(message, details = []) {
    super(message);
    this.name = "AuditInputError";
    this.details = details;
  }
}

function usage() {
  return [
    "AuraGlass full visual contact-sheet generator",
    "",
    "Usage:",
    "  node reports/audit/generate-visual-contact-sheets.js --dry-run",
    "  node reports/audit/generate-visual-contact-sheets.js",
    "",
    "Options:",
    "  --root <dir>        Evidence root (reports/audit/visual-all)",
    "  --output <dir>      Generated output root (reports/audit/visual-contact-sheets)",
    "  --batch-size <n>    Images per contact sheet (24)",
    "  --columns <n>       Columns per contact sheet (4)",
    "  --magick <path>     ImageMagick 7 executable (magick)",
    "  --font <path>       Label font file",
    "  --dry-run           Validate only; write nothing",
    "  --help              Show this help",
    "",
    "The command fails closed on a missing/stale manifest, inventory drift,",
    "unexpected or missing PNGs, wrong dimensions, or mixed-run sidecars.",
  ].join("\n");
}

function positiveInteger(value, option) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new AuditInputError(`${option} must be a positive integer, received ${JSON.stringify(value)}`);
  }
  return parsed;
}

function parseArgs(argv) {
  const options = {
    evidenceRoot: defaultEvidenceRoot,
    outputRoot: defaultOutputRoot,
    batchSize: 24,
    columns: 4,
    magick: "magick",
    font: null,
    dryRun: false,
    help: false,
  };
  let outputExplicit = false;
  const takeValue = (at, option) => {
    if (!argv[at + 1] || argv[at + 1].startsWith("--")) {
      throw new AuditInputError(`${option} requires a value`);
    }
    return argv[at + 1];
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--dry-run") options.dryRun = true;
    else if (arg === "--help" || arg === "-h") options.help = true;
    else if (arg === "--root") {
      options.evidenceRoot = path.resolve(repoRoot, takeValue(index, arg));
      index += 1;
    } else if (arg === "--output") {
      options.outputRoot = path.resolve(repoRoot, takeValue(index, arg));
      outputExplicit = true;
      index += 1;
    } else if (arg === "--batch-size") {
      options.batchSize = positiveInteger(takeValue(index, arg), arg);
      index += 1;
    } else if (arg === "--columns") {
      options.columns = positiveInteger(takeValue(index, arg), arg);
      index += 1;
    } else if (arg === "--magick") {
      options.magick = takeValue(index, arg);
      index += 1;
    } else if (arg === "--font") {
      options.font = path.resolve(repoRoot, takeValue(index, arg));
      index += 1;
    } else {
      throw new AuditInputError(`unknown option ${JSON.stringify(arg)}`);
    }
  }
  if (options.batchSize > 32) {
    throw new AuditInputError("--batch-size must be <= 32 so each review sheet remains manageable and memory-bounded");
  }
  if (options.columns > options.batchSize) {
    throw new AuditInputError("--columns cannot exceed --batch-size");
  }
  if (!outputExplicit) {
    options.outputRoot =
      options.evidenceRoot === defaultEvidenceRoot
        ? defaultOutputRoot
        : path.join(
            path.dirname(options.evidenceRoot),
            `${path.basename(options.evidenceRoot)}-contact-sheets`
          );
  }
  return options;
}

function isInside(parent, candidate) {
  const relative = path.relative(parent, candidate);
  return relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative);
}

function slash(value) {
  return value.split(path.sep).join("/");
}

function repoRelative(absolutePath) {
  return slash(path.relative(repoRoot, absolutePath));
}

function readJson(file, description) {
  let raw;
  try {
    raw = fs.readFileSync(file, "utf8");
  } catch (error) {
    throw new AuditInputError(`cannot read ${description}: ${repoRelative(file)}`, [error.message]);
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new AuditInputError(`invalid JSON in ${description}: ${repoRelative(file)}`, [error.message]);
  }
}

function sha256File(file) {
  const hash = crypto.createHash("sha256");
  const descriptor = fs.openSync(file, "r");
  const buffer = Buffer.allocUnsafe(1024 * 1024);
  try {
    let bytesRead;
    do {
      bytesRead = fs.readSync(descriptor, buffer, 0, buffer.length, null);
      if (bytesRead > 0) hash.update(buffer.subarray(0, bytesRead));
    } while (bytesRead > 0);
  } finally {
    fs.closeSync(descriptor);
  }
  return hash.digest("hex");
}

function updateHashFromFile(hash, file) {
  const descriptor = fs.openSync(file, "r");
  const buffer = Buffer.allocUnsafe(1024 * 1024);
  try {
    let bytesRead;
    do {
      bytesRead = fs.readSync(descriptor, buffer, 0, buffer.length, null);
      if (bytesRead > 0) hash.update(buffer.subarray(0, bytesRead));
    } while (bytesRead > 0);
  } finally {
    fs.closeSync(descriptor);
  }
}

function safeRepoArtifact(relativePath) {
  const absolutePath = path.resolve(repoRoot, relativePath);
  const relative = path.relative(repoRoot, absolutePath);
  if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`artifact path escapes repository: ${relativePath}`);
  }
  return absolutePath;
}

function repositoryFingerprintPath(relativePath) {
  const absolutePath = safeRepoArtifact(relativePath);
  if (fs.existsSync(absolutePath)) return relativePath;
  if (relativePath.startsWith("recipes/")) return "src/registry/recipes.ts";
  throw new Error(`source fingerprint input does not exist: ${relativePath}`);
}

function sourceFingerprint(relativePaths) {
  const hash = crypto.createHash("sha256");
  for (const relativePath of [...new Set(relativePaths)].sort()) {
    const absolutePath = safeRepoArtifact(relativePath);
    if (!fs.existsSync(absolutePath) || !fs.statSync(absolutePath).isFile()) {
      throw new Error(`source fingerprint input is missing or not a file: ${relativePath}`);
    }
    hash.update(relativePath);
    hash.update("\0");
    updateHashFromFile(hash, absolutePath);
    hash.update("\0");
  }
  return `sha256:${hash.digest("hex")}`;
}

function toExportId(name, fallbackIndex) {
  const base = String(name)
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .toLowerCase()
    .replace(/^-+|-+$/g, "");
  return `${base}${fallbackIndex === undefined ? "" : `-${fallbackIndex}`}`;
}

function authoritativeInventory() {
  const publicAuditFile = path.join(repoRoot, "reports", "public-export-audit.json");
  const recipeEvidenceFile = path.join(
    repoRoot,
    "reports",
    "3.3-release",
    "recipe-render-evidence.json"
  );
  const visualTargetManifestFile = path.join(
    repoRoot,
    ...visualTargetManifestRelativePath.split("/")
  );
  const publicAudit = readJson(publicAuditFile, "public export audit");
  const recipeEvidence = readJson(recipeEvidenceFile, "recipe render evidence");
  const visualTargetManifest = readJson(
    visualTargetManifestFile,
    "public visual target manifest"
  );
  const seen = new Map();
  const exports = (publicAudit.entries || [])
    .filter((entry) => entry.isComponentLike)
    .map((entry) => {
      const repeat = seen.get(entry.exportName) || 0;
      seen.set(entry.exportName, repeat + 1);
      return {
        id: toExportId(entry.exportName, repeat > 0 ? repeat + 1 : undefined),
        name: entry.exportName,
        kind: "export",
        sourcePath: entry.sourcePath,
      };
    });
  const recipes = (recipeEvidence.screenshots || []).map((recipe) => ({
    id: toExportId(`recipe-${recipe.id}`),
    name: recipe.id,
    kind: "recipe",
    sourcePath: `recipes/${recipe.id}`,
  }));
  const nonvisual = (publicAudit.nonVisualPublicExports || (publicAudit.entries || [])
    .filter((entry) => entry.nonVisualReason)
    .map((entry) => ({
      exportName: entry.exportName,
      sourcePath: entry.sourcePath,
      reason: entry.nonVisualReason,
    })))
    .map((entry) => ({
      name: entry.exportName,
      sourcePath: entry.sourcePath,
      reason: entry.reason,
    }));
  const hashes = {
    publicExportAuditSha256: sha256File(publicAuditFile),
    recipeEvidenceSha256: sha256File(recipeEvidenceFile),
  };
  if (fs.existsSync(visualTargetManifestFile)) {
    hashes.publicVisualTargetManifestSha256 = sha256File(visualTargetManifestFile);
  }
  return {
    exports,
    recipes,
    nonvisual,
    visualItems: [...exports, ...recipes],
    hashes,
    visualTargetManifest,
  };
}

function validateVisualTargetManifest(authority) {
  const manifest = authority.visualTargetManifest;
  const failures = [];
  if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) {
    throw new AuditInputError("public visual target manifest must be an object");
  }
  if (manifest.schemaVersion !== 1) {
    failures.push("public visual target manifest schemaVersion must equal 1");
  }
  if (
    typeof manifest.generatedAt !== "string" ||
    Number.isNaN(Date.parse(manifest.generatedAt))
  ) {
    failures.push("public visual target manifest generatedAt must be a valid timestamp");
  }
  const entries = Array.isArray(manifest.entries) ? manifest.entries : [];
  if (entries.length !== expected.exports) {
    failures.push(`public visual target manifest must contain ${expected.exports} entries, found ${entries.length}`);
  }
  const summary = manifest.summary || {};
  if (
    summary.publicVisualExportCount !== expected.exports ||
    summary.coverageIdentityCount !== expected.exports ||
    summary.unclassifiedCount !== 0 ||
    summary.nonvisualExclusionCount !== expected.nonvisual
  ) {
    failures.push(
      `public visual target manifest summary must declare ${expected.exports} visual exports / ${expected.exports} coverage identities / 0 unclassified / ${expected.nonvisual} nonvisual`
    );
  }
  const byCoverageId = new Map();
  const bySymbol = new Map();
  const allowed = new Set(["canonical", "alias", "coveredBy"]);
  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index];
    if (!entry || typeof entry !== "object") {
      failures.push("public visual target manifest contains a malformed entry");
      continue;
    }
    const wanted = authority.exports[index];
    if (
      !wanted ||
      entry.exportName !== wanted.name ||
      entry.sourcePath !== wanted.sourcePath ||
      entry.coverageId !== wanted.id
    ) {
      failures.push(
        `public visual target manifest entry ${index} does not exactly match the ordered public export inventory`
      );
    }
    if (!allowed.has(entry.classification)) {
      failures.push(`${String(entry.exportName)}: invalid visual-target classification ${JSON.stringify(entry.classification)}`);
    }
    if (typeof entry.coverageId !== "string" || !/^[a-z0-9][a-z0-9-]*$/.test(entry.coverageId)) {
      failures.push(`${String(entry.exportName)}: invalid coverageId ${JSON.stringify(entry.coverageId)}`);
      continue;
    }
    if (byCoverageId.has(entry.coverageId)) failures.push(`duplicate visual coverageId ${entry.coverageId}`);
    byCoverageId.set(entry.coverageId, entry);
    const symbolKey = `${String(entry.exportName)}\0${String(entry.sourcePath)}`;
    if (bySymbol.has(symbolKey)) failures.push(`duplicate visual target symbol/source ${entry.exportName}`);
    bySymbol.set(symbolKey, entry);
  }
  for (const item of authority.exports) {
    const entry = bySymbol.get(`${item.name}\0${item.sourcePath}`);
    if (!entry) failures.push(`public visual target manifest is missing ${item.name} (${item.sourcePath})`);
    else if (entry.coverageId !== item.id) {
      failures.push(`${item.name}: coverageId ${entry.coverageId} does not equal runtime evidence id ${item.id}`);
    }
  }
  const exclusions = Array.isArray(manifest.nonvisualExclusions)
    ? manifest.nonvisualExclusions
    : [];
  if (exclusions.length !== expected.nonvisual) {
    failures.push(`public visual target manifest must contain ${expected.nonvisual} nonvisual exclusion`);
  } else {
    const actual = exclusions[0] || {};
    const wanted = authority.nonvisual[0] || {};
    const publicTargetFields = [
      ["exportName", "name"],
      ["sourcePath", "sourcePath"],
      ["reason", "reason"],
    ];
    for (const [actualField, wantedField] of publicTargetFields) {
      if (actual[actualField] !== wanted[wantedField]) {
        failures.push(
          `public visual target nonvisual ${actualField} does not match authoritative classification`
        );
      }
    }
    if (actual.classification !== "nonvisual") {
      failures.push('public visual target nonvisual classification must equal "nonvisual"');
    }
  }
  if (failures.length) {
    throw new AuditInputError("public visual target manifest failed validation", failures);
  }
}

function sameValue(actual, wanted) {
  return actual === wanted;
}

function validateManifest(evidenceRoot, authority) {
  const manifestFile = path.join(evidenceRoot, manifestFilename);
  if (!fs.existsSync(manifestFile)) {
    throw new AuditInputError(
      `missing required full-run manifest: ${repoRelative(manifestFile)}`,
      [
        "Contact sheets were not generated because this evidence tree has no atomic full-run provenance.",
        "Complete the full CAPTURE_ALL_VISUALS run before retrying.",
      ]
    );
  }
  const manifest = readJson(manifestFile, "visual run manifest");
  const failures = [];
  if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) {
    failures.push("manifest must be an object");
  }
  if (manifest.schemaVersion !== 1) {
    failures.push("schemaVersion must equal 1");
  }
  if (typeof manifest.runId !== "string" || manifest.runId.trim() === "") {
    failures.push("runId must be a non-empty string");
  }
  if (typeof manifest.generatedAt !== "string" || Number.isNaN(Date.parse(manifest.generatedAt))) {
    failures.push("generatedAt must be a valid timestamp");
  }
  if (manifest.scope !== "full") failures.push(`scope must be "full", received ${JSON.stringify(manifest.scope)}`);
  if (!/^sha256:[a-f0-9]{64}$/i.test(String(manifest.sourceFingerprint || ""))) {
    failures.push("sourceFingerprint must be a sha256:<64 hex chars> value");
  }

  const audited = manifest.inventory && manifest.inventory.audited;
  if (
    !audited ||
    audited.total !== expected.auditedTotal ||
    audited.visual !== expected.visualTotal ||
    audited.nonvisual !== expected.nonvisual
  ) {
    failures.push(
      `inventory.audited must be ${expected.auditedTotal} total / ${expected.visualTotal} visual / ${expected.nonvisual} nonvisual`
    );
  }
  const hashes = (manifest.inventory && manifest.inventory.hashes) || {};
  for (const [field, wanted] of Object.entries(authority.hashes)) {
    if (hashes[field] !== wanted) {
      failures.push(`inventory hash ${field} does not match the current authoritative report`);
    }
  }

  const manifestItems = manifest.inventory && manifest.inventory.visualItems;
  const manifestById = new Map();
  if (!Array.isArray(manifestItems)) {
    failures.push("inventory.visualItems must be an array");
  } else {
    if (manifestItems.length !== expected.visualTotal) {
      failures.push(`inventory.visualItems must contain exactly ${expected.visualTotal} entries, found ${manifestItems.length}`);
    }
    for (const item of manifestItems) {
      if (!item || typeof item !== "object" || typeof item.id !== "string") {
        failures.push("inventory.visualItems contains a malformed item");
        continue;
      }
      if (!/^[a-z0-9][a-z0-9-]*$/.test(item.id)) {
        failures.push(`visual item id is not a safe slug: ${JSON.stringify(item.id)}`);
      }
      if (manifestById.has(item.id)) failures.push(`duplicate manifest visual id: ${item.id}`);
      manifestById.set(item.id, item);
    }
  }

  const expectedById = new Map(authority.visualItems.map((item) => [item.id, item]));
  for (const wanted of authority.visualItems) {
    const item = manifestById.get(wanted.id);
    if (!item) {
      failures.push(`manifest is missing authoritative visual item ${wanted.id}`);
      continue;
    }
    for (const field of ["id", "name", "kind", "sourcePath"]) {
      if (!sameValue(item[field], wanted[field])) {
        failures.push(`${wanted.id}: manifest ${field} does not match the authoritative inventory`);
      }
    }
    const hasStoryId = typeof item.storyId === "string" && item.storyId.trim() !== "";
    const hasRecipeHarness = typeof item.recipeHarness === "string" && item.recipeHarness.trim() !== "";
    if (wanted.kind === "export" && (!hasStoryId || hasRecipeHarness)) {
      failures.push(`${wanted.id}: export must have storyId and no recipeHarness`);
    }
    if (wanted.kind === "recipe" && (!hasRecipeHarness || hasStoryId)) {
      failures.push(`${wanted.id}: recipe must have recipeHarness and no storyId`);
    }
    const artifacts = item.artifacts;
    if (!artifacts || typeof artifacts !== "object" || Array.isArray(artifacts)) {
      failures.push(`${wanted.id}: manifest artifacts must describe all three viewports`);
    } else {
      const artifactKeys = Object.keys(artifacts).sort();
      const expectedArtifactKeys = viewports.map((viewport) => viewport.name).sort();
      if (
        artifactKeys.length !== expectedArtifactKeys.length ||
        artifactKeys.some((key, index) => key !== expectedArtifactKeys[index])
      ) {
        failures.push(`${wanted.id}: manifest artifacts must contain exactly desktop, tablet, and mobile`);
      }
      for (const viewport of viewports) {
        const artifact = artifacts[viewport.name];
        const pngPath = `reports/audit/visual-all/${wanted.id}/${viewport.name}.png`;
        const sidecarPath = `reports/audit/visual-all/${wanted.id}/${viewport.name}.computed-styles.json`;
        if (
          !artifact ||
          artifact.screenshot?.path !== pngPath ||
          !/^[a-f0-9]{64}$/i.test(String(artifact.screenshot?.sha256 || "")) ||
          artifact.computedStyles?.path !== sidecarPath ||
          !/^[a-f0-9]{64}$/i.test(String(artifact.computedStyles?.sha256 || ""))
        ) {
          failures.push(
            `${wanted.id}/${viewport.name}: manifest artifact paths and SHA-256 digests must match the canonical evidence layout`
          );
        }
      }
    }
  }
  for (const id of manifestById.keys()) {
    if (!expectedById.has(id)) failures.push(`manifest contains unexpected visual item ${id}`);
  }

  const kindCounts = { export: 0, recipe: 0 };
  for (const item of manifestById.values()) {
    if (item.kind === "export" || item.kind === "recipe") kindCounts[item.kind] += 1;
    else failures.push(`${item.id}: unsupported kind ${JSON.stringify(item.kind)}`);
  }
  if (kindCounts.export !== expected.exports || kindCounts.recipe !== expected.recipes) {
    failures.push(
      `manifest kind coverage must be ${expected.exports} exports + ${expected.recipes} recipes, found ${kindCounts.export} + ${kindCounts.recipe}`
    );
  }
  const exclusions = manifest.inventory && manifest.inventory.nonvisualExclusions;
  let expectedNonvisualTestPath = null;
  if (!Array.isArray(exclusions) || exclusions.length !== expected.nonvisual) {
    failures.push(`inventory.nonvisualExclusions must contain exactly ${expected.nonvisual} entry`);
  } else {
    const wanted = authority.nonvisual[0];
    const actual = exclusions[0] || {};
    for (const field of ["name", "sourcePath", "reason"]) {
      if (!wanted || actual[field] !== wanted[field]) {
        failures.push(`nonvisual exclusion ${field} does not match the authoritative inventory`);
      }
    }
    expectedNonvisualTestPath = wanted?.sourcePath.replace(
      /\.(ts|tsx|js|jsx|mjs|cjs)$/,
      ".test.ts"
    );
    const tests = Array.isArray(actual.tests) ? actual.tests : [];
    if (
      tests.length !== 1 ||
      tests[0]?.path !== expectedNonvisualTestPath ||
      tests[0]?.status !== "pass" ||
      typeof tests[0]?.command !== "string" ||
      tests[0].command.trim() === ""
    ) {
      failures.push("nonvisual exclusion must contain its exact passing behavior-test evidence");
    }
    if (
      actual.apiTestEvidence?.path !== expectedNonvisualTestPath ||
      actual.apiTestEvidence?.status !== "pass"
    ) {
      failures.push("nonvisual exclusion must contain its exact passing API-test evidence");
    }
    if (
      expectedNonvisualTestPath &&
      (!fs.existsSync(safeRepoArtifact(expectedNonvisualTestPath)) ||
        !fs.statSync(safeRepoArtifact(expectedNonvisualTestPath)).isFile())
    ) {
      failures.push(`nonvisual behavior-test evidence does not exist: ${expectedNonvisualTestPath}`);
    }
  }

  try {
    const fingerprintPaths = [
      "reports/public-export-audit.json",
      "reports/3.3-release/recipe-render-evidence.json",
      ...(fs.existsSync(safeRepoArtifact(visualTargetManifestRelativePath))
        ? [visualTargetManifestRelativePath]
        : []),
      ...[...manifestById.values()].map((item) =>
        repositoryFingerprintPath(item.sourcePath)
      ),
      ...(Array.isArray(exclusions)
        ? exclusions.flatMap((entry) => [
            entry.sourcePath,
            ...(Array.isArray(entry.tests)
              ? entry.tests.map((testEntry) => testEntry.path)
              : []),
          ])
        : []),
    ];
    const currentFingerprint = sourceFingerprint(fingerprintPaths);
    if (manifest.sourceFingerprint !== currentFingerprint) {
      failures.push(
        "sourceFingerprint does not match the current audited sources; the visual evidence is stale"
      );
    }
  } catch (error) {
    failures.push(`cannot verify sourceFingerprint: ${error.message}`);
  }

  if (failures.length > 0) {
    throw new AuditInputError("visual run manifest failed provenance/inventory validation", failures);
  }
  return {
    manifest,
    manifestFile,
    manifestById,
    manifestSnapshot: {
      bytes: fs.statSync(manifestFile).size,
      sha256: sha256File(manifestFile),
    },
  };
}

function pngHeader(file) {
  const descriptor = fs.openSync(file, "r");
  try {
    const header = Buffer.alloc(33);
    const bytesRead = fs.readSync(descriptor, header, 0, header.length, 0);
    const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    if (
      bytesRead < 33 ||
      !header.subarray(0, 8).equals(signature) ||
      header.toString("ascii", 12, 16) !== "IHDR"
    ) {
      throw new Error("missing PNG signature or IHDR header");
    }
    return {
      width: header.readUInt32BE(16),
      height: header.readUInt32BE(20),
      bitDepth: header[24],
      colorType: header[25],
      compression: header[26],
      filter: header[27],
      interlace: header[28],
    };
  } finally {
    fs.closeSync(descriptor);
  }
}

function walkPngs(root) {
  const found = [];
  const visit = (current) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const absolute = path.join(current, entry.name);
      if (entry.isSymbolicLink()) {
        if (entry.name.toLowerCase().endsWith(".png")) found.push(absolute);
        continue;
      }
      if (entry.isDirectory()) visit(absolute);
      else if (entry.name.toLowerCase().endsWith(".png")) found.push(absolute);
    }
  };
  visit(root);
  return found.sort();
}

function validateSidecar(file, item, viewport, runId) {
  const failures = [];
  if (!fs.existsSync(file)) {
    return {
      failures: [`missing same-run sidecar ${repoRelative(file)}`],
      snapshot: null,
    };
  }
  const stat = fs.lstatSync(file);
  if (!stat.isFile() || stat.isSymbolicLink()) {
    return {
      failures: [`sidecar is not a regular file: ${repoRelative(file)}`],
      snapshot: null,
    };
  }
  let sidecar;
  try {
    sidecar = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    return {
      failures: [`invalid sidecar JSON ${repoRelative(file)}: ${error.message}`],
      snapshot: null,
    };
  }
  const identity = [
    ["runId", runId],
    ["id", item.id],
    ["name", item.name],
    ["kind", item.kind],
    ["sourcePath", item.sourcePath],
  ];
  for (const [field, wanted] of identity) {
    if (sidecar[field] !== wanted) failures.push(`${repoRelative(file)}: ${field} does not match the full-run manifest`);
  }
  if (item.kind === "export") {
    if (sidecar.storyId !== item.storyId || sidecar.recipeHarness !== null) {
      failures.push(`${repoRelative(file)}: export story provenance does not match the manifest`);
    }
  } else if (sidecar.recipeHarness !== item.recipeHarness || sidecar.storyId !== null) {
    failures.push(`${repoRelative(file)}: recipe harness provenance does not match the manifest`);
  }
  if (
    !sidecar.viewport ||
    sidecar.viewport.name !== viewport.name ||
    sidecar.viewport.width !== viewport.width ||
    sidecar.viewport.height !== viewport.height
  ) {
    failures.push(
      `${repoRelative(file)}: viewport identity must be ${viewport.name} ${viewport.width}x${viewport.height}`
    );
  }
  return {
    failures,
    snapshot: {
      bytes: stat.size,
      sha256: sha256File(file),
    },
  };
}

function lexicographic(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

function validateEvidence(evidenceRoot, manifest, manifestById) {
  const failures = [];
  if (!fs.existsSync(evidenceRoot)) {
    throw new AuditInputError(`evidence root does not exist: ${repoRelative(evidenceRoot)}`);
  }
  const rootStat = fs.lstatSync(evidenceRoot);
  if (!rootStat.isDirectory() || rootStat.isSymbolicLink()) {
    throw new AuditInputError(`evidence root must be a real directory: ${repoRelative(evidenceRoot)}`);
  }

  const expectedIds = new Set(manifestById.keys());
  const rootEntries = fs.readdirSync(evidenceRoot, { withFileTypes: true });
  const rootSymlinks = rootEntries.filter((entry) => entry.isSymbolicLink()).map((entry) => entry.name);
  if (rootSymlinks.length) failures.push(`evidence root contains symlink entries: ${rootSymlinks.join(", ")}`);
  const allDirectories = rootEntries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort(lexicographic);
  const actualDirectories = allDirectories;
  const unexpectedDirectories = actualDirectories.filter((id) => !expectedIds.has(id));
  const missingDirectories = [...expectedIds].filter((id) => !actualDirectories.includes(id)).sort(lexicographic);
  if (actualDirectories.length !== expected.visualTotal) {
    failures.push(`expected exactly ${expected.visualTotal} evidence directories, found ${actualDirectories.length}`);
  }
  if (unexpectedDirectories.length) failures.push(`unexpected evidence directories: ${unexpectedDirectories.join(", ")}`);
  if (missingDirectories.length) failures.push(`missing evidence directories: ${missingDirectories.join(", ")}`);

  const expectedPngs = new Set();
  const records = [];
  const items = [...manifestById.values()].sort((a, b) => lexicographic(a.id, b.id));
  const kindOrdinals = { export: 0, recipe: 0 };
  for (let overallIndex = 0; overallIndex < items.length; overallIndex += 1) {
    const item = items[overallIndex];
    kindOrdinals[item.kind] += 1;
    const itemDir = path.join(evidenceRoot, item.id);
    if (!fs.existsSync(itemDir)) continue;
    const itemStat = fs.lstatSync(itemDir);
    if (!itemStat.isDirectory() || itemStat.isSymbolicLink()) {
      failures.push(`evidence item is not a real directory: ${repoRelative(itemDir)}`);
      continue;
    }
    const screenshots = [];
    for (const viewport of viewports) {
      const png = path.join(itemDir, `${viewport.name}.png`);
      expectedPngs.add(path.resolve(png));
      if (!fs.existsSync(png)) {
        failures.push(`missing screenshot ${repoRelative(png)}`);
        continue;
      }
      const stat = fs.lstatSync(png);
      if (!stat.isFile() || stat.isSymbolicLink()) {
        failures.push(`screenshot is not a regular file: ${repoRelative(png)}`);
        continue;
      }
      let header;
      try {
        header = pngHeader(png);
      } catch (error) {
        failures.push(`invalid PNG ${repoRelative(png)}: ${error.message}`);
        continue;
      }
      if (header.width !== viewport.width || header.height !== viewport.height) {
        failures.push(
          `${repoRelative(png)} is ${header.width}x${header.height}; expected ${viewport.width}x${viewport.height}`
        );
      }
      const sidecar = path.join(itemDir, `${viewport.name}.computed-styles.json`);
      const sidecarValidation = validateSidecar(sidecar, item, viewport, manifest.runId);
      failures.push(...sidecarValidation.failures);
      const pngSha256 = sha256File(png);
      const manifestArtifact = item.artifacts?.[viewport.name];
      if (manifestArtifact?.screenshot?.sha256 !== pngSha256) {
        failures.push(`${repoRelative(png)} SHA-256 does not match the full-run manifest`);
      }
      if (
        sidecarValidation.snapshot &&
        manifestArtifact?.computedStyles?.sha256 !== sidecarValidation.snapshot.sha256
      ) {
        failures.push(`${repoRelative(sidecar)} SHA-256 does not match the full-run manifest`);
      }
      screenshots.push({
        viewport: viewport.name,
        width: header.width,
        height: header.height,
        bytes: stat.size,
        mtimeMs: stat.mtimeMs,
        sha256: pngSha256,
        absolutePath: png,
        sourcePath: repoRelative(png),
        sidecarAbsolutePath: sidecar,
        sidecarPath: repoRelative(sidecar),
        sidecarBytes: sidecarValidation.snapshot?.bytes || 0,
        sidecarSha256: sidecarValidation.snapshot?.sha256 || null,
      });
    }
    records.push({
      overallOrdinal: overallIndex + 1,
      kindOrdinal: kindOrdinals[item.kind],
      id: item.id,
      name: item.name,
      kind: item.kind,
      sourcePath: item.sourcePath,
      storyId: item.storyId || null,
      recipeHarness: item.recipeHarness || null,
      screenshots,
    });
  }

  const actualPngs = actualDirectories.flatMap((id) => {
    const itemDir = path.join(evidenceRoot, id);
    return fs.existsSync(itemDir) && fs.statSync(itemDir).isDirectory()
      ? walkPngs(itemDir).map((file) => path.resolve(file))
      : [];
  });
  const actualPngSet = new Set(actualPngs);
  const missingPngs = [...expectedPngs].filter((file) => !actualPngSet.has(file));
  const unexpectedPngs = actualPngs.filter((file) => !expectedPngs.has(file));
  if (expectedPngs.size !== expected.pngTotal) {
    failures.push(`internal expected PNG inventory is ${expectedPngs.size}, not ${expected.pngTotal}`);
  }
  if (actualPngs.length !== expected.pngTotal) {
    failures.push(`expected exactly ${expected.pngTotal} PNGs, found ${actualPngs.length}`);
  }
  if (missingPngs.length) {
    failures.push(`missing expected PNGs: ${missingPngs.slice(0, 20).map(repoRelative).join(", ")}`);
  }
  if (unexpectedPngs.length) {
    failures.push(`unexpected PNGs: ${unexpectedPngs.slice(0, 20).map(repoRelative).join(", ")}`);
  }
  const expectedRootFiles = new Set([
    manifestFilename,
    verifierSummaryFilename,
    "visual-summary.md",
  ]);
  const unexpectedRootFiles = rootEntries
    .filter((entry) => entry.isFile() && !expectedRootFiles.has(entry.name))
    .map((entry) => entry.name)
    .sort(lexicographic);
  if (unexpectedRootFiles.length) {
    failures.push(`unexpected files at evidence root: ${unexpectedRootFiles.join(", ")}`);
  }
  for (const item of items) {
    const itemDir = path.join(evidenceRoot, item.id);
    if (!fs.existsSync(itemDir) || !fs.statSync(itemDir).isDirectory()) continue;
    const expectedNames = new Set(
      viewports.flatMap((viewport) => [
        `${viewport.name}.png`,
        `${viewport.name}.computed-styles.json`,
      ])
    );
    const unexpectedEntries = fs
      .readdirSync(itemDir, { withFileTypes: true })
      .filter((entry) => !entry.isFile() || !expectedNames.has(entry.name))
      .map((entry) => entry.name)
      .sort(lexicographic);
    if (unexpectedEntries.length) {
      failures.push(`${item.id}: unexpected evidence entries: ${unexpectedEntries.join(", ")}`);
    }
  }
  if (records.length !== expected.visualTotal) {
    failures.push(`validated item records total ${records.length}, expected ${expected.visualTotal}`);
  }
  const screenshotCount = records.reduce((sum, item) => sum + item.screenshots.length, 0);
  if (screenshotCount !== expected.pngTotal) {
    failures.push(`validated screenshot records total ${screenshotCount}, expected ${expected.pngTotal}`);
  }
  if (failures.length > 0) {
    throw new AuditInputError("visual evidence failed exact coverage/run-identity validation", failures);
  }
  return records;
}

function loadVerifierSummary(evidenceRoot, manifest, records) {
  const file = path.join(evidenceRoot, verifierSummaryFilename);
  const unavailable = (state, detail) => ({
    state,
    authoritative: false,
    status: "unverified",
    detail,
    byId: new Map(),
  });
  if (!fs.existsSync(file)) {
    return unavailable("not-found", `${repoRelative(file)} is absent; contact sheets are labeled UNVERIFIED`);
  }
  let summary;
  try {
    summary = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    return unavailable("invalid", `${repoRelative(file)} is invalid JSON: ${error.message}`);
  }
  if (
    summary.provenance?.runId !== manifest.runId ||
    summary.provenance?.sourceFingerprint !== manifest.sourceFingerprint
  ) {
    return unavailable(
      "stale",
      `${repoRelative(file)} does not match manifest run/fingerprint ${manifest.runId}; its verdicts were not used`
    );
  }
  if (!Array.isArray(summary.items)) {
    return unavailable("invalid", `${repoRelative(file)} has no item results; its verdicts were not used`);
  }
  const byId = new Map();
  let duplicateSummaryId = null;
  for (const item of summary.items) {
    if (item && typeof item.id === "string") {
      if (byId.has(item.id)) duplicateSummaryId = item.id;
      else byId.set(item.id, item);
    }
  }
  const expectedIds = new Set(records.map((item) => item.id));
  const sameIds = byId.size === expectedIds.size && [...expectedIds].every((id) => byId.has(id));
  if (!sameIds || duplicateSummaryId) {
    return unavailable(
      "invalid",
      duplicateSummaryId
        ? `${repoRelative(file)} repeats item ${duplicateSummaryId}; its verdicts were not used`
        : `${repoRelative(file)} does not cover the same ${expected.visualTotal} IDs; its verdicts were not used`
    );
  }
  const malformed = records.flatMap((record) => {
    const item = byId.get(record.id);
    if (!item || (item.status !== "pass" && item.status !== "fail")) {
      return [`${record.id}: missing pass/fail item verdict`];
    }
    const viewportResults = Array.isArray(item.viewports) ? item.viewports : [];
    const viewportByName = new Map(viewportResults.map((viewport) => [viewport.viewport, viewport]));
    return viewports.flatMap((viewport) => {
      const result = viewportByName.get(viewport.name);
      return result && typeof result.passed === "boolean"
        ? []
        : [`${record.id}/${viewport.name}: missing boolean verifier verdict`];
    });
  });
  if (malformed.length) {
    return unavailable(
      "invalid",
      `${repoRelative(file)} has malformed item/viewport verdicts; its verdicts were not used (${malformed.slice(0, 3).join("; ")})`
    );
  }
  return {
    state: "same-run",
    authoritative: true,
    status: summary.status === "pass" ? "pass" : "fail",
    detail: `${repoRelative(file)} matches manifest run ${manifest.runId}`,
    byId,
  };
}

function applyVerifierResults(records, verifier) {
  return records.map((record) => {
    const result = verifier.authoritative ? verifier.byId.get(record.id) : null;
    const viewportResults = new Map(
      Array.isArray(result?.viewports)
        ? result.viewports.map((viewport) => [viewport.viewport, viewport])
        : []
    );
    return {
      ...record,
      status: result?.status === "pass" ? "pass" : result ? "fail" : "unverified",
      reasons: Array.isArray(result?.reasons) ? result.reasons : [],
      screenshots: record.screenshots.map((screenshot) => {
        const viewport = viewportResults.get(screenshot.viewport);
        return {
          ...screenshot,
          status: viewport
            ? viewport.passed === true
              ? "pass"
              : "fail"
            : result
              ? result.status === "pass"
                ? "pass"
                : "fail"
              : "unverified",
          reasons: Array.isArray(viewport?.reasons) ? viewport.reasons : [],
        };
      }),
    };
  });
}

function resolveFont(explicitFont) {
  const candidates = [
    explicitFont,
    "/System/Library/Fonts/SFNSMono.ttf",
    "/System/Library/Fonts/Supplemental/Menlo.ttc",
    "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf",
    "/usr/share/fonts/TTF/DejaVuSansMono.ttf",
    "C:\\Windows\\Fonts\\consola.ttf",
  ].filter(Boolean);
  return candidates.find((candidate) => fs.existsSync(candidate)) || null;
}

function validateRenderer(command, font) {
  const version = spawnSync(command, ["-version"], { encoding: "utf8", timeout: 10_000 });
  if (version.error || version.status !== 0) {
    throw new AuditInputError(
      `ImageMagick 7 is required to render contact sheets; could not run ${JSON.stringify(command)}`,
      [version.error?.message || version.stderr?.trim() || `exit status ${version.status}`]
    );
  }
  const output = `${version.stdout || ""}\n${version.stderr || ""}`;
  if (!/ImageMagick 7\./.test(output)) {
    throw new AuditInputError(`${JSON.stringify(command)} is not ImageMagick 7`, [output.trim().split("\n")[0]]);
  }
  if (!font) {
    throw new AuditInputError(
      "no deterministic label font was found",
      ["Pass an existing font file with --font <path>."]
    );
  }
  return output.trim().split("\n")[0];
}

function chunks(values, size) {
  const result = [];
  for (let index = 0; index < values.length; index += size) {
    result.push(values.slice(index, index + size));
  }
  return result;
}

function shortRunId(runId) {
  if (runId.length <= 32) return runId;
  return `${runId.slice(0, 21)}...${runId.slice(-8)}`;
}

function renderSheet({ command, font, outputFile, title, viewport, items, columns, kindTotal }) {
  const args = [
    "montage",
    "-background",
    "#07111f",
    "-fill",
    "#eef5ff",
    "-font",
    font,
    "-pointsize",
    "11",
    "-gravity",
    "center",
    "-title",
    title,
  ];
  for (const item of items) {
    const screenshot = item.screenshots.find((candidate) => candidate.viewport === viewport.name);
    const label = [
      `${String(item.kindOrdinal).padStart(3, "0")}/${kindTotal} | ${item.kind} | ${screenshot.status.toUpperCase()}`,
      item.id,
      `${viewport.name} | ${viewport.width}x${viewport.height}`,
    ].join("\n");
    args.push("-label", label, screenshot.absolutePath);
  }
  args.push(
    "-thumbnail",
    viewport.thumbnail,
    "-tile",
    `${columns}x`,
    "-geometry",
    "+10+10",
    "-strip",
    "-sampling-factor",
    "4:2:0",
    "-quality",
    "88",
    outputFile
  );
  const result = spawnSync(command, args, {
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
    timeout: 10 * 60 * 1000,
  });
  if (result.error || result.status !== 0) {
    throw new AuditInputError(`ImageMagick failed while rendering ${repoRelative(outputFile)}`, [
      result.error?.message || result.stderr?.trim() || `exit status ${result.status}`,
    ]);
  }
  if (!fs.existsSync(outputFile) || fs.statSync(outputFile).size === 0) {
    throw new AuditInputError(`ImageMagick did not produce ${repoRelative(outputFile)}`);
  }
}

function htmlEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function markdownEscape(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/\|/g, "\\|").replace(/`/g, "\\`");
}

function urlPath(value) {
  return slash(value)
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
}

function relativeLink(outputRoot, target) {
  return urlPath(path.relative(outputRoot, target));
}

function byteLabel(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MiB`;
  return `${Math.ceil(bytes / 1024)} KiB`;
}

function reasonList(reasons) {
  if (!reasons || reasons.length === 0) return "";
  return `<details><summary>Failure detail</summary><ul>${reasons
    .map((reason) => `<li>${htmlEscape(reason)}</li>`)
    .join("")}</ul></details>`;
}

function htmlIndex({ manifest, verifier, records, sheets, outputRoot, evidenceRoot }) {
  const statusCounts = {
    pass: records.filter((item) => item.status === "pass").length,
    fail: records.filter((item) => item.status === "fail").length,
    unverified: records.filter((item) => item.status === "unverified").length,
  };
  const sheetSections = ["export", "recipe"].flatMap((kind) =>
    viewports.map((viewport) => {
      const group = sheets.filter((sheet) => sheet.kind === kind && sheet.viewport === viewport.name);
      return [
        `<section class="sheet-group"><h3>${htmlEscape(kind)} / ${htmlEscape(viewport.name)} <span>${group.length} batches</span></h3>`,
        '<div class="sheet-grid">',
        ...group.map(
          (sheet) =>
            `<a class="sheet" href="${htmlEscape(urlPath(sheet.relativePath))}"><img loading="lazy" src="${htmlEscape(urlPath(sheet.relativePath))}" alt="${htmlEscape(sheet.title)}"><strong>${htmlEscape(sheet.filename)}</strong><small>${sheet.itemCount} targets; ${sheet.failed} failed, ${sheet.unverified} unverified</small></a>`
        ),
        "</div></section>",
      ].join("\n");
    })
  );
  const rows = records.map((item) => {
    const links = viewports.map((viewport) => {
      const screenshot = item.screenshots.find((candidate) => candidate.viewport === viewport.name);
      const href = relativeLink(outputRoot, screenshot.absolutePath);
      return `<td><a class="png-link status-${screenshot.status}" href="${htmlEscape(href)}">${htmlEscape(viewport.name)}.png</a><small>${screenshot.width}x${screenshot.height}; ${byteLabel(screenshot.bytes)}<br>sha256 ${screenshot.sha256.slice(0, 12)}...</small>${reasonList(screenshot.reasons)}</td>`;
    });
    return `<tr data-kind="${item.kind}" data-status="${item.status}" data-search="${htmlEscape(
      `${item.id} ${item.name} ${item.sourcePath}`.toLowerCase()
    )}"><td>${item.overallOrdinal}</td><td><span class="pill kind">${item.kind}</span><br><span class="pill status-${item.status}">${item.status}</span></td><td><strong>${htmlEscape(item.id)}</strong><small>${htmlEscape(item.name)}<br>${htmlEscape(item.sourcePath)}</small>${reasonList(item.reasons)}</td>${links.join("")}</tr>`;
  });
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AuraGlass full visual review index</title>
<style>
:root{color-scheme:dark;--bg:#040a13;--panel:#0b1625;--line:#24364c;--text:#eaf2ff;--muted:#9fb1c8;--pass:#43d17d;--fail:#ff667d;--warn:#ffc95c;--link:#84b9ff}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font:14px/1.45 ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}main{max-width:1680px;margin:auto;padding:32px}h1{font-size:32px;margin:.15em 0}h2{margin-top:42px;border-bottom:1px solid var(--line);padding-bottom:10px}h3{margin:28px 0 12px;text-transform:capitalize}h3 span,small,.muted{color:var(--muted);font-weight:400}.warning{padding:14px 16px;border:1px solid var(--warn);background:#2a210b;border-radius:10px}.bad{border-color:var(--fail);background:#2b0d15}.summary{display:flex;gap:10px;flex-wrap:wrap;margin:18px 0}.metric{background:var(--panel);border:1px solid var(--line);padding:12px 16px;border-radius:10px}.metric strong{font-size:20px;display:block}.sheet-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px}.sheet{display:flex;flex-direction:column;gap:6px;color:var(--link);text-decoration:none;background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:10px}.sheet:hover{border-color:var(--link)}.sheet img{width:100%;height:210px;object-fit:contain;background:#02060c}label{margin-right:12px}input,select{background:var(--panel);color:var(--text);border:1px solid var(--line);border-radius:6px;padding:8px}.controls{position:sticky;top:0;z-index:2;padding:12px;background:rgba(4,10,19,.96);border-bottom:1px solid var(--line)}.table-wrap{overflow:auto;border:1px solid var(--line);border-radius:10px}table{width:100%;border-collapse:collapse;min-width:1180px}th,td{padding:10px;vertical-align:top;text-align:left;border-bottom:1px solid var(--line)}th{position:sticky;top:57px;background:#101d2d;z-index:1}td small{display:block;margin-top:5px}.png-link{display:inline-block;font-weight:700;color:var(--link)}.pill{display:inline-block;border:1px solid var(--line);border-radius:999px;padding:1px 7px;margin:1px 0;font-size:11px;text-transform:uppercase}.status-pass{color:var(--pass);border-color:var(--pass)}.status-fail{color:var(--fail);border-color:var(--fail)}.status-unverified{color:var(--warn);border-color:var(--warn)}details{max-width:440px;margin-top:6px;color:var(--fail)}code{word-break:break-all}a{color:var(--link)}@media(max-width:760px){main{padding:18px}.controls{position:static}th{position:static}}
</style>
</head>
<body><main>
<p class="muted">AuraGlass certification evidence / deterministic manual-review navigation</p>
<h1>Full visual review index</h1>
<p>This index exposes every original PNG and every automated failure it can authoritatively associate with this run. Contact sheets are review aids, not proof that a human reviewed the images.</p>
<div class="summary">
  <div class="metric"><strong>${records.length}</strong>visual targets</div>
  <div class="metric"><strong>${records.reduce((sum, item) => sum + item.screenshots.length, 0)}</strong>original PNGs</div>
  <div class="metric"><strong>${expected.exports}</strong>exports</div>
  <div class="metric"><strong>${expected.recipes}</strong>recipes</div>
  <div class="metric"><strong>${sheets.length}</strong>contact sheets</div>
  <div class="metric"><strong>${statusCounts.pass}/${statusCounts.fail}/${statusCounts.unverified}</strong>pass / fail / unverified</div>
</div>
<p><strong>Run:</strong> <code>${htmlEscape(manifest.runId)}</code><br><strong>Captured:</strong> ${htmlEscape(manifest.generatedAt)}<br><strong>Source fingerprint:</strong> <code>${htmlEscape(manifest.sourceFingerprint)}</code><br><strong>Evidence root:</strong> <code>${htmlEscape(repoRelative(evidenceRoot))}</code></p>
<p class="warning${verifier.status === "fail" ? " bad" : ""}"><strong>Automated verifier: ${htmlEscape(verifier.status.toUpperCase())}.</strong> ${htmlEscape(verifier.detail)}</p>
<h2>Contact sheets</h2>
${sheetSections.join("\n")}
<h2>Original PNG inventory</h2>
<p>Each link opens the unchanged full-resolution source PNG. SHA-256 prefixes below correspond to the complete digests in <a href="inventory.json">inventory.json</a>.</p>
<div class="controls"><label>Search <input id="search" type="search" placeholder="ID, name, or source path"></label><label>Kind <select id="kind"><option value="all">all</option><option value="export">export</option><option value="recipe">recipe</option></select></label><label>Status <select id="status"><option value="all">all</option><option value="pass">pass</option><option value="fail">fail</option><option value="unverified">unverified</option></select></label><span id="shown"></span></div>
<div class="table-wrap"><table><thead><tr><th>#</th><th>Kind / status</th><th>Target</th><th>Desktop</th><th>Tablet</th><th>Mobile</th></tr></thead><tbody id="inventory">
${rows.join("\n")}
</tbody></table></div>
<script>
const search=document.querySelector('#search'),kind=document.querySelector('#kind'),status=document.querySelector('#status'),rows=[...document.querySelectorAll('#inventory tr')],shown=document.querySelector('#shown');
function filter(){const q=search.value.trim().toLowerCase();let count=0;for(const row of rows){const visible=(!q||row.dataset.search.includes(q))&&(kind.value==='all'||row.dataset.kind===kind.value)&&(status.value==='all'||row.dataset.status===status.value);row.hidden=!visible;if(visible)count++}shown.textContent=count+' / '+rows.length+' targets shown'}
search.addEventListener('input',filter);kind.addEventListener('change',filter);status.addEventListener('change',filter);filter();
</script>
</main></body></html>\n`;
}

function markdownIndex({ manifest, verifier, records, sheets, outputRoot, evidenceRoot }) {
  const lines = [
    "# AuraGlass full visual review index",
    "",
    "This index links every unchanged full-resolution source PNG. Contact sheets are navigation aids; their existence does not claim that a human completed visual review.",
    "",
    `- Run: \`${manifest.runId}\``,
    `- Captured: ${manifest.generatedAt}`,
    `- Source fingerprint: \`${manifest.sourceFingerprint}\``,
    `- Evidence root: \`${repoRelative(evidenceRoot)}\``,
    `- Coverage: ${records.length} targets (${expected.exports} exports + ${expected.recipes} recipes), ${records.reduce((sum, item) => sum + item.screenshots.length, 0)} PNGs`,
    `- Automated verifier: **${verifier.status.toUpperCase()}** — ${verifier.detail}`,
    "",
    "## Contact sheets",
    "",
  ];
  for (const kind of ["export", "recipe"]) {
    for (const viewport of viewports) {
      const group = sheets.filter((sheet) => sheet.kind === kind && sheet.viewport === viewport.name);
      lines.push(`### ${kind} / ${viewport.name}`, "");
      for (const sheet of group) {
        lines.push(
          `- [${markdownEscape(sheet.filename)}](${urlPath(sheet.relativePath)}) — ${sheet.itemCount} targets; ${sheet.failed} failed, ${sheet.unverified} unverified`
        );
      }
      lines.push("");
    }
  }
  lines.push(
    "## Original PNG inventory",
    "",
    "Complete SHA-256 digests and file sizes are in [`inventory.json`](inventory.json).",
    "",
    "| # | Kind | Status | Target | Desktop | Tablet | Mobile |",
    "| ---: | --- | --- | --- | --- | --- | --- |"
  );
  for (const item of records) {
    const cells = viewports.map((viewport) => {
      const screenshot = item.screenshots.find((candidate) => candidate.viewport === viewport.name);
      const href = relativeLink(outputRoot, screenshot.absolutePath);
      return `[PNG](${href}) ${screenshot.status.toUpperCase()} (${screenshot.width}x${screenshot.height})`;
    });
    lines.push(
      `| ${item.overallOrdinal} | ${item.kind} | ${item.status.toUpperCase()} | \`${markdownEscape(item.id)}\`<br>${markdownEscape(item.name)} | ${cells.join(" | ")} |`
    );
  }
  lines.push("", "## Reproduce", "", "```sh", "node reports/audit/generate-visual-contact-sheets.js --dry-run", "node reports/audit/generate-visual-contact-sheets.js", "```", "");
  return lines.join("\n");
}

function inventoryJson({ manifest, verifier, records, sheets, rendererVersion }) {
  return {
    schemaVersion: 1,
    run: {
      runId: manifest.runId,
      generatedAt: manifest.generatedAt,
      scope: manifest.scope,
      sourceFingerprint: manifest.sourceFingerprint,
    },
    coverage: {
      expected: { ...expected },
      actual: {
        exports: records.filter((item) => item.kind === "export").length,
        recipes: records.filter((item) => item.kind === "recipe").length,
        visualTotal: records.length,
        pngTotal: records.reduce((sum, item) => sum + item.screenshots.length, 0),
      },
      exact: true,
    },
    sourceIntegrity: {
      originalsOpenedReadOnly: true,
      postGenerationSha256Recheck: "pass",
    },
    verifier: {
      state: verifier.state,
      authoritative: verifier.authoritative,
      status: verifier.status,
      detail: verifier.detail,
    },
    renderer: rendererVersion,
    contactSheets: sheets,
    items: records.map((item) => ({
      overallOrdinal: item.overallOrdinal,
      kindOrdinal: item.kindOrdinal,
      id: item.id,
      name: item.name,
      kind: item.kind,
      sourcePath: item.sourcePath,
      storyId: item.storyId,
      recipeHarness: item.recipeHarness,
      status: item.status,
      reasons: item.reasons,
      screenshots: item.screenshots.map(
        ({ absolutePath, mtimeMs, sidecarAbsolutePath, ...screenshot }) => screenshot
      ),
    })),
  };
}

function assertSourcesUnchanged(records, manifestSnapshot, evidenceRoot) {
  const failures = [];
  const manifestStat = fs.statSync(manifestSnapshot.file);
  if (
    manifestStat.size !== manifestSnapshot.bytes ||
    sha256File(manifestSnapshot.file) !== manifestSnapshot.sha256
  ) {
    failures.push(`${repoRelative(manifestSnapshot.file)} changed while contact sheets were being generated`);
  }
  for (const item of records) {
    for (const screenshot of item.screenshots) {
      try {
        const stat = fs.statSync(screenshot.absolutePath);
        const digest = sha256File(screenshot.absolutePath);
        if (stat.size !== screenshot.bytes || stat.mtimeMs !== screenshot.mtimeMs || digest !== screenshot.sha256) {
          failures.push(`${screenshot.sourcePath} changed while contact sheets were being generated`);
        }
      } catch (error) {
        failures.push(`${screenshot.sourcePath} became unreadable while contact sheets were being generated: ${error.message}`);
      }
      try {
        const sidecarStat = fs.statSync(screenshot.sidecarAbsolutePath);
        if (
          sidecarStat.size !== screenshot.sidecarBytes ||
          sha256File(screenshot.sidecarAbsolutePath) !== screenshot.sidecarSha256
        ) {
          failures.push(`${screenshot.sidecarPath} changed while contact sheets were being generated`);
        }
      } catch (error) {
        failures.push(`${screenshot.sidecarPath} became unreadable while contact sheets were being generated: ${error.message}`);
      }
    }
  }
  const currentPngs = records.flatMap((item) => walkPngs(path.join(evidenceRoot, item.id)));
  const expectedPaths = new Set(
    records.flatMap((item) => item.screenshots.map((screenshot) => path.resolve(screenshot.absolutePath)))
  );
  if (
    currentPngs.length !== expected.pngTotal ||
    currentPngs.some((file) => !expectedPaths.has(path.resolve(file)))
  ) {
    failures.push("the evidence-root PNG inventory changed while contact sheets were being generated");
  }
  if (failures.length) throw new AuditInputError("source screenshots changed during generation", failures);
}

function validateGeneratedIndexes(html, markdown, records) {
  const missing = [];
  const countOccurrences = (source, needle) => {
    let count = 0;
    let at = 0;
    while ((at = source.indexOf(needle, at)) !== -1) {
      count += 1;
      at += needle.length;
    }
    return count;
  };
  for (const item of records) {
    for (const screenshot of item.screenshots) {
      const link = relativeLink(defaultOutputRoot, screenshot.absolutePath);
      if (countOccurrences(html, `href="${htmlEscape(link)}"`) !== 1) {
        missing.push(`HTML (must occur exactly once): ${screenshot.sourcePath}`);
      }
      if (countOccurrences(markdown, `](${link})`) !== 1) {
        missing.push(`Markdown (must occur exactly once): ${screenshot.sourcePath}`);
      }
    }
  }
  if (missing.length) {
    throw new AuditInputError("generated indexes do not link every original PNG", missing.slice(0, 30));
  }
}

function validateCustomGeneratedIndexes(html, markdown, records, outputRoot) {
  const failures = [];
  const countOccurrences = (source, needle) => {
    let count = 0;
    let at = 0;
    while ((at = source.indexOf(needle, at)) !== -1) {
      count += 1;
      at += needle.length;
    }
    return count;
  };
  for (const item of records) {
    for (const screenshot of item.screenshots) {
      const link = relativeLink(outputRoot, screenshot.absolutePath);
      if (countOccurrences(html, `href="${htmlEscape(link)}"`) !== 1) {
        failures.push(`HTML (must occur exactly once): ${screenshot.sourcePath}`);
      }
      if (countOccurrences(markdown, `](${link})`) !== 1) {
        failures.push(`Markdown (must occur exactly once): ${screenshot.sourcePath}`);
      }
    }
  }
  if (failures.length) {
    throw new AuditInputError("custom-output indexes do not link every original PNG exactly once", failures.slice(0, 30));
  }
}

function atomicWrite(file, value) {
  const temporary = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(temporary, value);
  fs.renameSync(temporary, file);
}

function safeRemoveGeneratedDirectory(directory, allowedOutputRoot = null) {
  const matchesAllowedOutput =
    allowedOutputRoot &&
    (directory === allowedOutputRoot ||
      directory.startsWith(`${allowedOutputRoot}.staging-`) ||
      directory.startsWith(`${allowedOutputRoot}.backup-`));
  const reservedDefaultOutput =
    directory === defaultOutputRoot ||
    directory.startsWith(`${defaultOutputRoot}.staging-`) ||
    directory.startsWith(`${defaultOutputRoot}.backup-`);
  if (
    !isInside(auditRoot, directory) ||
    directory === defaultEvidenceRoot ||
    directory === auditRoot ||
    (!matchesAllowedOutput && !reservedDefaultOutput)
  ) {
    throw new AuditInputError(`refusing to remove unsafe generated-output path ${directory}`);
  }
  fs.rmSync(directory, { recursive: true, force: true });
}

function publish(stagingRoot, outputRoot) {
  const backupRoot = `${outputRoot}.backup-${process.pid}`;
  const hadOutput = fs.existsSync(outputRoot);
  if (fs.existsSync(backupRoot)) safeRemoveGeneratedDirectory(backupRoot, outputRoot);
  if (hadOutput) fs.renameSync(outputRoot, backupRoot);
  try {
    fs.renameSync(stagingRoot, outputRoot);
  } catch (error) {
    if (hadOutput && fs.existsSync(backupRoot)) fs.renameSync(backupRoot, outputRoot);
    throw error;
  }
  if (hadOutput && fs.existsSync(backupRoot)) safeRemoveGeneratedDirectory(backupRoot, outputRoot);
}

function build(options, manifest, manifestSnapshot, records, verifier) {
  const overlapsEvidence =
    options.outputRoot === options.evidenceRoot ||
    isInside(options.outputRoot, options.evidenceRoot);
  const nestedInEvidence = isInside(options.evidenceRoot, options.outputRoot);
  if (!isInside(auditRoot, options.outputRoot) || overlapsEvidence || nestedInEvidence) {
    throw new AuditInputError(
      `--output must be a dedicated directory below ${repoRelative(auditRoot)} and must not contain or sit inside the evidence root`
    );
  }
  const font = resolveFont(options.font);
  const rendererVersion = validateRenderer(options.magick, font);
  const stagingRoot = `${options.outputRoot}.staging-${process.pid}`;
  if (fs.existsSync(stagingRoot)) safeRemoveGeneratedDirectory(stagingRoot, options.outputRoot);
  fs.mkdirSync(stagingRoot, { recursive: true });
  const sheets = [];
  try {
    for (const kind of ["export", "recipe"]) {
      const kindItems = records.filter((item) => item.kind === kind);
      for (const viewport of viewports) {
        const batches = chunks(kindItems, options.batchSize);
        for (let batchIndex = 0; batchIndex < batches.length; batchIndex += 1) {
          const batch = batches[batchIndex];
          const totalBatches = batches.length;
          const batchNumber = String(batchIndex + 1).padStart(3, "0");
          const batchTotal = String(totalBatches).padStart(3, "0");
          const filename = `${kind}-${viewport.name}-${batchNumber}-of-${batchTotal}.jpg`;
          const relativePath = path.posix.join("sheets", kind, viewport.name, filename);
          const outputFile = path.join(stagingRoot, ...relativePath.split("/"));
          fs.mkdirSync(path.dirname(outputFile), { recursive: true });
          const failed = batch.filter((item) => {
            const screenshot = item.screenshots.find((candidate) => candidate.viewport === viewport.name);
            return screenshot.status === "fail";
          }).length;
          const unverified = batch.filter((item) => {
            const screenshot = item.screenshots.find((candidate) => candidate.viewport === viewport.name);
            return screenshot.status === "unverified";
          }).length;
          const title = [
            `AuraGlass | ${kind} | ${viewport.name}`,
            `batch ${batchIndex + 1}/${totalBatches} | targets ${batch[0].kindOrdinal}-${batch[batch.length - 1].kindOrdinal}/${kindItems.length}`,
            `run ${shortRunId(manifest.runId)} | failed ${failed} | unverified ${unverified}`,
          ].join("\n");
          renderSheet({
            command: options.magick,
            font,
            outputFile,
            title,
            viewport,
            items: batch,
            columns: options.columns,
            kindTotal: kindItems.length,
          });
          sheets.push({
            kind,
            viewport: viewport.name,
            batch: batchIndex + 1,
            batches: totalBatches,
            filename,
            relativePath,
            title,
            itemCount: batch.length,
            firstOrdinal: batch[0].kindOrdinal,
            lastOrdinal: batch[batch.length - 1].kindOrdinal,
            failed,
            unverified,
          });
        }
      }
    }

    assertSourcesUnchanged(records, manifestSnapshot, options.evidenceRoot);
    const html = htmlIndex({
      manifest,
      verifier,
      records,
      sheets,
      outputRoot: options.outputRoot,
      evidenceRoot: options.evidenceRoot,
    });
    const markdown = markdownIndex({
      manifest,
      verifier,
      records,
      sheets,
      outputRoot: options.outputRoot,
      evidenceRoot: options.evidenceRoot,
    });
    // The default path is the production contract; custom output paths still
    // receive an independent exact-link assertion below.
    if (options.outputRoot === defaultOutputRoot) validateGeneratedIndexes(html, markdown, records);
    else validateCustomGeneratedIndexes(html, markdown, records, options.outputRoot);
    atomicWrite(path.join(stagingRoot, "index.html"), html);
    atomicWrite(path.join(stagingRoot, "index.md"), markdown);
    atomicWrite(
      path.join(stagingRoot, "inventory.json"),
      `${JSON.stringify(inventoryJson({ manifest, verifier, records, sheets, rendererVersion }), null, 2)}\n`
    );
    publish(stagingRoot, options.outputRoot);
    return { sheets, rendererVersion };
  } catch (error) {
    if (fs.existsSync(stagingRoot)) safeRemoveGeneratedDirectory(stagingRoot, options.outputRoot);
    throw error;
  }
}

function dryRunSummary(options, manifest, records, verifier) {
  const counts = {
    exports: records.filter((item) => item.kind === "export").length,
    recipes: records.filter((item) => item.kind === "recipe").length,
    pngs: records.reduce((sum, item) => sum + item.screenshots.length, 0),
  };
  return [
    "Visual contact-sheet preflight PASS (dry-run; wrote nothing).",
    `Run: ${manifest.runId}`,
    `Evidence: ${repoRelative(options.evidenceRoot)}`,
    `Coverage: ${counts.exports} exports + ${counts.recipes} recipes = ${records.length} targets; ${counts.pngs} PNGs across ${viewports.length} viewports`,
    `Same-run sidecars: ${counts.pngs}/${counts.pngs}`,
    `Automated verifier: ${verifier.status.toUpperCase()} (${verifier.state})`,
    `Planned output: ${repoRelative(options.outputRoot)}`,
    `Planned sheets: ${["export", "recipe"].reduce((sum, kind) => sum + viewports.length * Math.ceil(records.filter((item) => item.kind === kind).length / options.batchSize), 0)}`,
    "Note: dry-run validates provenance, exact coverage, dimensions, sidecars, and SHA-256 inventory; it does not invoke ImageMagick.",
  ].join("\n");
}

function reportError(error) {
  console.error(`Visual contact-sheet generation FAILED: ${error.message}`);
  if (Array.isArray(error.details)) {
    const limit = 60;
    for (const detail of error.details.slice(0, limit)) console.error(`- ${detail}`);
    if (error.details.length > limit) console.error(`- ... ${error.details.length - limit} more failure(s)`);
  }
}

function main(argv = process.argv.slice(2)) {
  try {
    const options = parseArgs(argv);
    if (options.help) {
      console.log(usage());
      return 0;
    }
    const authority = authoritativeInventory();
    validateVisualTargetManifest(authority);
    const baselineFailures = [];
    if (authority.exports.length !== expected.exports) {
      baselineFailures.push(`authoritative visual exports changed: ${authority.exports.length} != ${expected.exports}`);
    }
    if (authority.recipes.length !== expected.recipes) {
      baselineFailures.push(`authoritative recipes changed: ${authority.recipes.length} != ${expected.recipes}`);
    }
    if (authority.nonvisual.length !== expected.nonvisual) {
      baselineFailures.push(`authoritative nonvisual exclusions changed: ${authority.nonvisual.length} != ${expected.nonvisual}`);
    }
    if (baselineFailures.length) {
      throw new AuditInputError("authoritative inventory baseline changed; review this generator before continuing", baselineFailures);
    }
    const { manifest, manifestFile, manifestById, manifestSnapshot } = validateManifest(
      options.evidenceRoot,
      authority
    );
    const rawRecords = validateEvidence(options.evidenceRoot, manifest, manifestById);
    const verifier = loadVerifierSummary(options.evidenceRoot, manifest, rawRecords);
    const records = applyVerifierResults(rawRecords, verifier);
    if (options.dryRun) {
      console.log(dryRunSummary(options, manifest, records, verifier));
      return 0;
    }
    const result = build(
      options,
      manifest,
      { file: manifestFile, ...manifestSnapshot },
      records,
      verifier
    );
    console.log(
      [
        `Visual contact-sheet generation PASS: ${records.length} targets / ${expected.pngTotal} original PNG links / ${result.sheets.length} sheets.`,
        `Wrote ${repoRelative(path.join(options.outputRoot, "index.html"))}`,
        `Wrote ${repoRelative(path.join(options.outputRoot, "index.md"))}`,
        `Wrote ${repoRelative(path.join(options.outputRoot, "inventory.json"))}`,
        `Source PNGs re-hashed after rendering: unchanged (${expected.pngTotal}/${expected.pngTotal}).`,
      ].join("\n")
    );
    return 0;
  } catch (error) {
    reportError(error);
    return 1;
  }
}

if (require.main === module) process.exitCode = main();

module.exports = {
  authoritativeInventory,
  htmlEscape,
  main,
  markdownEscape,
  parseArgs,
  pngHeader,
  sourceFingerprint,
  toExportId,
  urlPath,
  validateManifest,
};
