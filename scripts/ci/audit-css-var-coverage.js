#!/usr/bin/env node
/**
 * Report custom properties that dist/styles/index.css *consumes* via var()
 * but never *defines*, and which of those are recoverable from
 * dist/tokens/tokens.css.
 *
 * A var() with no definition and no fallback makes the browser drop the whole
 * declaration, so these are hard visual failures, not cosmetic drift.
 */
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..', '..');
const stylesPath = path.join(root, 'dist/styles/index.css');
const tokensPath = path.join(root, 'dist/tokens/tokens.css');

for (const p of [stylesPath, tokensPath]) {
  if (!fs.existsSync(p)) {
    console.error(`missing ${path.relative(root, p)} — run \`npm run build\` first`);
    process.exit(2);
  }
}

const styles = fs.readFileSync(stylesPath, 'utf8');
const tokens = fs.readFileSync(tokensPath, 'utf8');

const defsOf = (css) => new Set([...css.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]));

// Collect var() references and note whether a fallback is present. We only need
// to know "is there a comma at this nesting depth", so scan forward manually
// rather than trying to regex balanced parens.
function refsOf(css) {
  const out = new Map(); // name -> { hasFallbackSomewhere, bareCount }
  const re = /var\(\s*(--[\w-]+)/g;
  let m;
  while ((m = re.exec(css))) {
    const name = m[1];
    let i = re.lastIndex;
    let depth = 1;
    let hasFallback = false;
    while (i < css.length && depth > 0) {
      const c = css[i];
      if (c === '(') depth++;
      else if (c === ')') depth--;
      else if (c === ',' && depth === 1) { hasFallback = true; break; }
      i++;
    }
    const rec = out.get(name) || { hasFallbackSomewhere: false, bareCount: 0 };
    if (hasFallback) rec.hasFallbackSomewhere = true;
    else rec.bareCount++;
    out.set(name, rec);
  }
  return out;
}

const styleDefs = defsOf(styles);
const tokenDefs = defsOf(tokens);
const refs = refsOf(styles);

const undefined_ = [...refs.keys()].filter((n) => !styleDefs.has(n));
const bare = undefined_.filter((n) => refs.get(n).bareCount > 0);
const recoverable = undefined_.filter((n) => tokenDefs.has(n));
const bareRecoverable = bare.filter((n) => tokenDefs.has(n));
const orphan = undefined_.filter((n) => !tokenDefs.has(n));

console.log(`definitions in styles/index.css : ${styleDefs.size}`);
console.log(`definitions in tokens/tokens.css: ${tokenDefs.size}`);
console.log(`distinct var() refs in styles    : ${refs.size}`);
console.log('');
console.log(`undefined in styles/index.css    : ${undefined_.length}`);
console.log(`  ...of which recoverable from tokens.css : ${recoverable.length}`);
console.log(`  ...of which NOT in tokens.css (orphans) : ${orphan.length}`);
console.log('');
console.log(`used with NO fallback (declaration dropped): ${bare.length}`);
console.log(`  ...recoverable from tokens.css           : ${bareRecoverable.length}`);
console.log('');
console.log('--- bare + recoverable (fixed by loading tokens layer) ---');
for (const n of bareRecoverable.sort()) {
  console.log(`  ${n} = ${(tokens.match(new RegExp(`${n}\\s*:\\s*([^;}]+)`)) || [])[1]?.trim()}`);
}
if (orphan.length) {
  console.log('');
  console.log('--- orphans: defined NOWHERE (need real authoring) ---');
  for (const n of orphan.sort()) {
    const r = refs.get(n);
    console.log(`  ${n}  (bare uses: ${r.bareCount}, has fallback somewhere: ${r.hasFallbackSomewhere})`);
  }
}
