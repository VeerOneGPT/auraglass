#!/usr/bin/env node

/**
 * Blocks Storybook-only presentation rules that can make otherwise-correct
 * components appear chromatic, navy, or unreadable on the default light canvas.
 * Intentional dark/high-contrast selectors and semantic content accents remain
 * allowed; this gate targets canvas/material framing and blanket text overrides.
 */

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");

function walk(directory, output = []) {
  if (!fs.existsSync(directory)) return output;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(full, output);
    else if (/\.stories\.[cm]?[jt]sx?$/.test(entry.name)) output.push(full);
  }
  return output;
}

const files = [
  ...walk(path.join(root, "src")),
  path.join(root, ".storybook", "StorySurface.tsx"),
  path.join(root, ".storybook", "preview.tsx"),
].filter(fs.existsSync);

const forbidden = [
  {
    code: "chromatic-media-preview",
    pattern: /previewSurface\s*:\s*["']media["']/g,
    message: "Use a neutral StorySurface; media content may stay semantic inside the mounted component.",
  },
  {
    code: "legacy-chromatic-gradient",
    pattern: /linear-gradient\([^\n]*(?:#667eea|#764ba2)[^\n]*\)/gi,
    message: "Legacy purple/indigo story framing is forbidden.",
  },
  {
    code: "forced-white-light-text",
    pattern: /color\s*:\s*(?:["']?(?:#fff(?:fff)?|white)["']?)\s*!important/gi,
    message: "Do not blanket-force white text; scope a contrast rule to dark or high-contrast preview mode.",
    allow: (line) => /high-contrast|preview-mode[^\n]*(?:dark|high-contrast)|glass-surface-(?:blue|red)|background:\s*#000/.test(line),
  },
];

const findings = [];

for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  const lines = source.split(/\r?\n/);
  for (const rule of forbidden) {
    rule.pattern.lastIndex = 0;
    let match;
    while ((match = rule.pattern.exec(source))) {
      const lineNumber = source.slice(0, match.index).split(/\r?\n/).length;
      const context = lines.slice(Math.max(0, lineNumber - 4), lineNumber + 1).join(" ");
      if (rule.allow?.(context)) continue;
      findings.push({
        code: rule.code,
        file: path.relative(root, file),
        line: lineNumber,
        message: rule.message,
      });
    }
  }
}

if (findings.length) {
  console.error(`Story presentation audit failed (${findings.length} finding${findings.length === 1 ? "" : "s"}):`);
  for (const finding of findings) {
    console.error(`- ${finding.file}:${finding.line} [${finding.code}] ${finding.message}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Story presentation audit passed (${files.length} story/presentation files).`);
}
