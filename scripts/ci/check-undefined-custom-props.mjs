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
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, relative } from 'node:path';

const ROOT = resolve(import.meta.dirname, '../..');

/**
 * Custom properties supplied by a framework at use-time rather than by our CSS.
 * Tailwind's gradient utilities (`from-*`/`via-*`/`to-*`) define
 * `--tw-gradient-stops`; our `.bg-gradient-radial` / `.bg-gradient-conic`
 * helpers are documented to be used alongside them.
 */
const EXTERNALLY_DEFINED = new Set(['--tw-gradient-stops']);

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
 * Custom properties that our own TS/TSX sets at runtime, via either
 * `element.style.setProperty('--x', …)` or an inline style object
 * (`{ '--x': … }`). These are legitimately absent from the stylesheet: the
 * component that reads them is also the component that writes them, so a
 * consumer importing only the CSS is not broken.
 */
const RUNTIME_SET_RE = [
  /setProperty\(\s*['"`](--[A-Za-z0-9_-]+)['"`]/g,
  /['"`](--[A-Za-z0-9_-]+)['"`]\s*:/g,
];

function collectRuntimeSet(dir = resolve(ROOT, 'src'), out = new Set()) {
  for (const dirent of readdirSync(dir, { withFileTypes: true })) {
    const abs = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      if (dirent.name === 'node_modules' || dirent.name === '__snapshots__') continue;
      collectRuntimeSet(abs, out);
      continue;
    }
    if (!/\.(ts|tsx|js|jsx|mjs)$/.test(dirent.name)) continue;
    const src = readFileSync(abs, 'utf8');
    for (const re of RUNTIME_SET_RE) {
      for (const m of src.matchAll(re)) out.add(m[1]);
    }
  }
  return out;
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
const runtimeSet = collectRuntimeSet();

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

  const unresolved = [...refs.entries()]
    .filter(([name]) => !defined.has(name))
    .sort(([a], [b]) => a.localeCompare(b));

  // Split out references that are satisfied outside the stylesheet.
  const runtime = unresolved.filter(([n]) => runtimeSet.has(n));
  const external = unresolved.filter(([n]) => EXTERNALLY_DEFINED.has(n));
  const unaccounted = unresolved.filter(
    ([n]) => !runtimeSet.has(n) && !EXTERNALLY_DEFINED.has(n)
  );

  // A reference with no fallback makes the whole declaration invalid at
  // compute time, so the consumer loses that style outright — that is a build
  // failure. A reference with a fallback still renders the fallback value, so
  // it degrades rather than breaks: report it, but do not fail on it.
  const breaking = unaccounted.filter(([, rec]) => !rec.hasFallback);
  const degraded = unaccounted.filter(([, rec]) => rec.hasFallback);

  report.push({
    entry,
    breaking: breaking.map(([n, r]) => ({ name: n, ...r })),
    degraded: degraded.map(([n, r]) => ({ name: n, ...r })),
    runtimeSet: runtime.map(([n]) => n),
    externallyDefined: external.map(([n]) => n),
  });

  const note = [
    runtime.length ? `${runtime.length} set at runtime by src/` : null,
    external.length ? `${external.length} provided by Tailwind` : null,
  ]
    .filter(Boolean)
    .join(', ');

  if (breaking.length === 0) {
    console.log(
      `PASS  ${entry}: no declaration-dropping references${note ? ` (${note})` : ''}.`
    );
  } else {
    failed = true;
    console.error(
      `\nFAIL  ${entry}: ${breaking.length} referenced custom propert${
        breaking.length === 1 ? 'y is' : 'ies are'
      } never defined and ${breaking.length === 1 ? 'has' : 'have'} no fallback.`
    );
    for (const [name, rec] of breaking) {
      console.error(`      ${name}  — declaration drops`);
      console.error(`        ${formatSites(rec.sites)}`);
    }
  }

  if (degraded.length) {
    console.warn(
      `WARN  ${entry}: ${degraded.length} referenced custom propert${
        degraded.length === 1 ? 'y is' : 'ies are'
      } never defined but always fall back, so styling degrades silently ` +
        'instead of breaking. These are theming gaps, not build breaks.'
    );
  }
}

function formatSites(sites) {
  const shown = sites.slice(0, 4).join(', ');
  return sites.length > 4 ? `${shown}, +${sites.length - 4} more` : shown;
}

if (process.argv.includes('--json')) {
  console.log('\n' + JSON.stringify(report, null, 2));
}

if (failed) {
  console.error(
    '\nA declaration referencing an undefined custom property with no fallback\n' +
      'is invalid at compute time, so a consumer importing only that entry loses\n' +
      'the style entirely. Define the properties in that entry, or add fallbacks.\n'
  );
  process.exit(1);
}
