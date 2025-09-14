#!/usr/bin/env node
/**
 * Fix all files currently scored <85 in UNIVERSAL_GLASS_AUDIT.json by applying
 * tokenization replacers (same as fix-top-n.js) across those files.
 */
const fs = require('fs');
const path = require('path');

const AUDIT_JSON = path.join(process.cwd(), 'reports', 'UNIVERSAL_GLASS_AUDIT.json');
if (!fs.existsSync(AUDIT_JSON)) {
  console.error('Audit JSON not found:', AUDIT_JSON);
  process.exit(1);
}
const audit = require(AUDIT_JSON);
const candidates = audit.results.filter(r => r.score < 85);

const REPLACERS = [
  // CSS-like (styled-components or CSS files)
  { re: /backdrop-filter\s*:\s*blur\([^\)]*?\)\s*;?/gi, to: 'backdrop-filter: var(--glass-backdrop-blur);' },
  { re: /-webkit-backdrop-filter\s*:\s*blur\([^\)]*?\)\s*;?/gi, to: '-webkit-backdrop-filter: var(--glass-backdrop-blur);' },
  { re: /box-shadow\s*:\s*[^;]+;/gi, to: 'box-shadow: var(--glass-elev-2);' },
  { re: /background(?:-color)?\s*:\s*rgba\([^\)]*\)\s*;?/gi, to: 'background: var(--glass-bg-default);' },
  { re: /border\s*:\s*1px\s*solid\s*rgba\([^\)]*\)\s*;?/gi, to: 'border: 1px solid var(--glass-border-default);' },
  // JSX style objects (string values)
  { re: /backdropFilter:\s*'blur\([^']*\)'/g, to: "backdropFilter: 'var(--glass-backdrop-blur)'" },
  { re: /WebkitBackdropFilter:\s*'blur\([^']*\)'/g, to: "WebkitBackdropFilter: 'var(--glass-backdrop-blur)'" },
  { re: /boxShadow:\s*'[^']*'/g, to: "boxShadow: 'var(--glass-elev-2)'" },
  { re: /background\s*:\s*'rgba\([^']*\)'/g, to: "background: 'var(--glass-bg-default)'" },
  { re: /backgroundColor\s*:\s*'rgba\([^']*\)'/g, to: "backgroundColor: 'var(--glass-bg-default)'" },
  { re: /border\s*:\s*'1px\s*solid\s*rgba\([^']*\)'/g, to: "border: '1px solid var(--glass-border-default)'" },
];

let modified = 0;
for (const r of candidates) {
  const file = r.file;
  try {
    let src = fs.readFileSync(file, 'utf8');
    let before = src;
    for (const { re, to } of REPLACERS) src = src.replace(re, to);
    if (src !== before) {
      fs.writeFileSync(file, src);
      modified++;
    }
  } catch (e) {
    // skip unreadable
  }
}
console.log(`fix-needs-work: modified ${modified}/${candidates.length} files`);

