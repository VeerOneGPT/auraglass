#!/usr/bin/env node
/**
 * Fix Top-N Offenders
 * Reads UNIVERSAL_GLASS_AUDIT.json, selects N lowest-score component files,
 * applies safe tokenization replacements for inline glass & superficial styles.
 */
const fs = require('fs');
const path = require('path');

const AUDIT_JSON = path.join(process.cwd(), 'reports', 'UNIVERSAL_GLASS_AUDIT.json');
const OUT_SUMMARY = path.join(process.cwd(), 'reports', 'UNIVERSAL_GLASS_FIX_SUMMARY.md');

const N = parseInt(process.argv[2] || '50', 10);
const OFFSET = parseInt(process.argv[3] || '0', 10);

if (!fs.existsSync(AUDIT_JSON)) {
  console.error('Audit JSON not found:', AUDIT_JSON);
  process.exit(1);
}

const audit = require(AUDIT_JSON);
const files = audit.results
  .slice()
  .sort((a, b) => a.score - b.score)
  .map(r => r.file)
  .filter(f => f.includes(path.sep + 'src' + path.sep + 'components' + path.sep))
  .slice(OFFSET, OFFSET + N);

const changes = [];

const REPLACERS = [
  // Backdrop filter
  { re: /backdrop-filter\s*:\s*blur\([^\)]*?\)\s*;?/g, to: 'backdrop-filter: var(--glass-backdrop-blur);' },
  { re: /-webkit-backdrop-filter\s*:\s*blur\([^\)]*?\)\s*;?/g, to: '-webkit-backdrop-filter: var(--glass-backdrop-blur);' },
  // White-ish backgrounds to bg token
  { re: /background(?:-color)?\s*:\s*rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0?\.?\d+\s*\)\s*;?/gi, to: 'background: var(--glass-bg-default);' },
  // Generic border rgba -> token
  { re: /border\s*:\s*1px\s*solid\s*rgba\([^\)]*?\)\s*;?/gi, to: 'border: 1px solid var(--glass-border-default);' },
  // Box shadow literals -> elevation token (conservative)
  { re: /box-shadow\s*:\s*[^;]+;/gi, to: 'box-shadow: var(--glass-elev-2);' },
  // Inline style object string values in JSX
  { re: /background:\s*'rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0?\.?\d+\s*\)'/gi, to: "background: 'var(--glass-bg-default)'" },
  { re: /backdropFilter:\s*'blur\([^\)]*\)'/g, to: "backdropFilter: 'var(--glass-backdrop-blur)'" },
  { re: /WebkitBackdropFilter:\s*'blur\([^\)]*\)'/g, to: "WebkitBackdropFilter: 'var(--glass-backdrop-blur)'" },
  { re: /border:\s*'1px\s*solid\s*rgba\([^\)]*\)'/gi, to: "border: '1px solid var(--glass-border-default)'" },
  { re: /boxShadow:\s*'[^']*'/gi, to: "boxShadow: 'var(--glass-elev-2)'" },
];

for (const file of files) {
  let source;
  try { source = fs.readFileSync(file, 'utf8'); } catch (e) { continue; }
  let updated = source;
  let count = 0;
  for (const { re, to } of REPLACERS) {
    const before = updated;
    updated = updated.replace(re, to);
    if (updated !== before) count++;
  }
  if (count > 0 && updated !== source) {
    fs.writeFileSync(file, updated);
    changes.push({ file, patternsApplied: count });
  }
}

// Write summary
let md = `# Universal Glass Fix Summary\n\n`;
md += `Targeted files: ${files.length}\n`;
md += `Modified: ${changes.length}\n\n`;
changes.slice(0, 200).forEach(c => { md += `- ${path.relative(process.cwd(), c.file)} (${c.patternsApplied} patterns)\n`; });
fs.mkdirSync(path.dirname(OUT_SUMMARY), { recursive: true });
fs.writeFileSync(OUT_SUMMARY, md);

console.log(`Modified ${changes.length}/${files.length} files. Summary: ${path.relative(process.cwd(), OUT_SUMMARY)}`);
