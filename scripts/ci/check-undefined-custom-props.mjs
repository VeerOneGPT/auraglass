#!/usr/bin/env node
/**
 * Fails when shipped CSS references a custom property that nothing defines.
 *
 * Motivation: `dist/styles/index.css` referenced `--aura-*` properties that were
 * only defined in `dist/tokens/tokens.css`. A consumer importing just
 * `aura-glass/styles` therefore resolved them to nothing — and because an
 * invalid argument inside `blur()` invalidates the whole declaration, entire
 * `backdrop-filter` rules silently disappeared at runtime.
 *
 * Usage:
 *   node scripts/ci/check-undefined-custom-props.mjs [--json]
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, relative } from 'node:path';

const ROOT = resolve(import.meta.dirname, '../..');

/**
 * Each entry is an independently-importable CSS surface: the set of files a
 * consumer gets when they import `entry`. A property is "defined" for that
 * entry only if one of the files in `defines` defines it.
 */
const ENTRIES = [
  {
    entry: 'aura-glass/styles',
    files: ['dist/styles/index.css'],
    defines: ['dist/styles/index.css'],
  },
  {
    entry: 'aura-glass/styles + aura-glass/tokens/css',
    files: ['dist/styles/index.css'],
    defines: ['dist/styles/index.css', 'dist/tokens/tokens.css'],
  },
];

const DEF_RE = /(^|[;{}\s])(--[A-Za-z0-9_-]+)\s*:/g;
const REF_RE = /var\(\s*(--[A-Za-z0-9_-]+)\s*(,|\))/g;

function readIfPresent(rel) {
  const abs = resolve(ROOT, rel);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8');
}

function collectDefined(rels) {
  const defined = new Set();
  for (const rel of rels) {
    const css = readIfPresent(rel);
    if (css === null) continue;
    for (const m of css.matchAll(DEF_RE)) defined.add(m[2]);
  }
  return defined;
}

/**
 * Collect references, recording whether each had a fallback and where it was.
 * A reference with a fallback (`var(--x, 12px)`) still degrades silently, so we
 * report it separately rather than treating it as safe.
 */
function collectReferences(rels) {
  const refs = new Map();
  for (const rel of rels) {
    const css = readIfPresent(rel);
    if (css === null) continue;
    const lines = css.split('\n');
    lines.forEach((line, i) => {
      for (const m of line.matchAll(REF_RE)) {
        const name = m[1];
        const hasFallback = m[2] === ',';
        if (!refs.has(name)) refs.set(name, { hasFallback: true, sites: [] });
        const rec = refs.get(name);
        if (!hasFallback) rec.hasFallback = false;
        rec.sites.push(`${rel}:${i + 1}`);
      }
    });
  }
  return refs;
}

let failed = false;
const report = [];

for (const { entry, files, defines } of ENTRIES) {
  const missingFiles = files.filter((f) => readIfPresent(f) === null);
  if (missingFiles.length) {
    console.error(
      `SKIP  ${entry}: missing ${missingFiles.join(', ')} (run \`npm run build\` first)`
    );
    continue;
  }

  const defined = collectDefined(defines);
  const refs = collectReferences(files);

  const undefinedRefs = [...refs.entries()]
    .filter(([name]) => !defined.has(name))
    .sort(([a], [b]) => a.localeCompare(b));

  report.push({ entry, undefined: undefinedRefs.map(([n, r]) => ({ name: n, ...r })) });

  if (undefinedRefs.length === 0) {
    console.log(`PASS  ${entry}: every referenced custom property is defined.`);
    continue;
  }

  failed = true;
  console.error(
    `\nFAIL  ${entry}: ${undefinedRefs.length} referenced custom propert${
      undefinedRefs.length === 1 ? 'y is' : 'ies are'
    } never defined.`
  );
  for (const [name, rec] of undefinedRefs) {
    const flag = rec.hasFallback ? 'fallback only' : 'NO FALLBACK — declaration drops';
    console.error(`      ${name}  (${flag})`);
    console.error(`        ${rec.sites.slice(0, 4).join(', ')}${rec.sites.length > 4 ? `, +${rec.sites.length - 4} more` : ''}`);
  }
}

if (process.argv.includes('--json')) {
  console.log('\n' + JSON.stringify(report, null, 2));
}

if (failed) {
  console.error(
    '\nA consumer importing only the failing entry gets silently broken styling.\n' +
      'Define the properties in that entry, or remove their usages.\n'
  );
  process.exit(1);
}
