#!/usr/bin/env node
/**
 * AuraGlass codemod: Replace common Tailwind-like utilities with glass-* equivalents
 * - Scope: src/components (TS/TSX files)
 * - Conservative: only maps a curated set; logs leftovers
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(process.cwd(), 'src', 'components');
const exts = new Set(['.tsx', '.ts']);

const CLASS_MAP = new Map([
  // spacing
  [/\b(p|m|px|py|mx|my)-(\d+(?:-\d)?)\b/g, (m, k, v) => `glass-${k}-${v}`],
  [/\bgap-(\d+(?:-\d)?)\b/g, (m, v) => `glass-gap-${v}`],
  // radius
  [/\brounded-full\b/g, 'glass-radius-full'],
  [/\brounded-2xl\b/g, 'glass-radius-2xl'],
  [/\brounded-xl\b/g, 'glass-radius-xl'],
  [/\brounded-lg\b/g, 'glass-radius-lg'],
  [/\brounded-md\b/g, 'glass-radius-md'],
  [/\brounded-sm\b/g, 'glass-radius-sm'],
  [/\brounded\b/g, 'glass-radius'],
  // text
  [/\btext-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)\b/g, (m, v) => `glass-text-${v}`],
  [/\btext-white\b/g, 'glass-text-primary'],
  [/\btext-black\b/g, 'glass-text-inverse'],
  [/\btext-center\b/g, 'glass-text-center'],
  [/\btext-left\b/g, 'glass-text-left'],
  [/\btext-primary\b/g, 'glass-text-primary'],
  [/\btext-foreground\b/g, 'glass-text-primary'],
  [/\btext-gray-(?:[456789]00)\b/g, 'glass-text-secondary'],
  [/\btext-(blue|green|red|yellow|purple|orange|cyan)-(?:[4-9]00)\b/g, 'glass-text-primary'],
  [/\btext-(blue|green|red|yellow|purple|orange|cyan)-300\b/g, 'glass-text-secondary'],
  // bg
  [/\bbg-white\b/g, 'glass-surface-subtle'],
  [/\bbg-black\b/g, 'glass-surface-dark'],
  [/\bbg-gray-(50|100)\b/g, 'glass-surface-subtle'],
  [/\bbg-(blue|green|red|yellow)-(?:[4-9]00)\b/g, 'glass-surface-$1'],
  [/\bbg-primary\b/g, 'glass-surface-primary'],
  [/\bbg-transparent\b/g, 'glass-bg-transparent'],
  [/\bbg-gradient-to-(r|br)\b/g, 'glass-gradient-primary'],
  [/\bbg-(background|glass-surface)\/\d{1,2}\b/g, 'glass-surface-overlay'],
  [/\bbg-(?:gray|blue|green|red|yellow|purple|orange|cyan)-(50|100|200|300|700|900)\b/g, 'glass-surface-subtle'],
  [/\bbg-(?:gray|blue|green|red|yellow|purple|orange|cyan)-(400|500|600|800)\b/g, 'glass-surface-primary'],
  [/\bbg-current\b/g, 'glass-bg-transparent'],
  [/\bbg-muted(?:\/\d{1,2})?\b/g, 'glass-surface-subtle'],
  [/\bbg-opacity-50\b/g, 'glass-opacity-50'],
  [/\bbg-(?:black|white)\/\d{1,2}\b/g, 'glass-surface-overlay'],
  // border
  [/\bborder\b/g, 'glass-border'],
  [/\bborder-gray-(200|300|400)\b/g, 'glass-border-subtle'],
  [/\bborder-(blue|green|red|yellow)-(?:[3-9]00)\b/g, 'glass-border-$1'],
  // shadow
  [/\bshadow(?:-(sm|md|lg|xl|2xl))?\b/g, (m, v) => v ? `glass-shadow-${v}` : 'glass-shadow'],
  // layout/display
  [/\binline-flex\b/g, 'glass-inline-flex'],
  [/\bflex\b/g, 'glass-flex'],
  [/\bgrid\b/g, 'glass-grid'],
  [/\bitems-center\b/g, 'glass-items-center'],
  [/\bitems-start\b/g, 'glass-items-start'],
  [/\bitems-end\b/g, 'glass-items-end'],
  [/\bjustify-center\b/g, 'glass-justify-center'],
  [/\bjustify-between\b/g, 'glass-justify-between'],
  [/\bjustify-start\b/g, 'glass-justify-start'],
  [/\bjustify-end\b/g, 'glass-justify-end'],
  [/\bw-full\b/g, 'glass-w-full'],
  [/\bh-full\b/g, 'glass-h-full'],
  [/\bmin-w-0\b/g, 'glass-min-w-0'],
  [/\bmin-h-0\b/g, 'glass-min-h-0'],
  [/\bmin-h-full\b/g, 'glass-min-h-full'],
  [/\brelative\b/g, 'glass-relative'],
  [/\binset-0\b/g, 'glass-inset-0'],
  [/\btop-2\b/g, 'glass-top-2'],
  [/\b-?top-1\b/g, (m) => m.startsWith('-') ? 'glass--top-1' : 'glass-top-1'],
  [/\b-?top-2\b/g, (m) => m.startsWith('-') ? 'glass--top-2' : 'glass-top-2'],
  // sizing tokens (expanded)
  [/\bw-(1|2|3|4|5|6|8|10|12|16|20|24|32|48|64|80|96)\b/g, (m, n) => `glass-w-${n}`],
  [/\bh-(1|2|3|4|5|6|8|10|12|16|20|24|32|48|64|96)\b/g, (m, n) => `glass-h-${n}`],
  [/\bw-0\b/g, 'glass-w-0'],
  [/\bh-0\b/g, 'glass-h-0'],
  [/\bw-px\b/g, 'glass-w-px'],
  [/\bh-px\b/g, 'glass-h-px'],
  [/\bh-0\.5\b/g, 'glass-h-0-5'],
  [/\bh-screen\b/g, 'glass-h-screen'],
  [/\bw-1\/2\b/g, 'glass-w-1-2'],
  [/\bw-3\/4\b/g, 'glass-w-3-4'],
  // overflow & truncate
  [/\boverflow-y-auto\b/g, 'glass-overflow-y-auto'],
  [/\boverflow-auto\b/g, 'glass-overflow-auto'],
  [/\btruncate\b/g, 'glass-truncate'],
  // font weight and display
  [/\bfont-medium\b/g, 'glass-font-medium'],
  [/\bfont-semibold\b/g, 'glass-font-semibold'],
  [/\bfont-bold\b/g, 'glass-font-bold'],
  [/\bsr-only\b/g, 'glass-sr-only'],
  [/\bblock\b/g, 'glass-block'],
  [/\bopacity-90\b/g, 'glass-opacity-90'],
  [/\bopacity-30\b/g, 'glass-opacity-30'],
  [/\bopacity-10\b/g, 'glass-opacity-10'],
  // positioning
  [/\babsolute\b/g, 'glass-absolute'],
  [/\bfixed\b/g, 'glass-fixed'],
  [/\bz-50\b/g, 'glass-z-50'],
  [/\bz-10\b/g, 'glass-z-10'],
  [/\bmx-auto\b/g, 'glass-mx-auto'],
  // cursor
  [/\bcursor-pointer\b/g, 'glass-cursor-pointer'],
  // spacing shortcuts
  [/\bspace-y-(2|3|4)\b/g, (m,n)=>`glass-space-y-${n}`],
  [/\bmb-(1|2|3|4)\b/g, (m,n)=>`glass-mb-${n}`],
  [/\bmt-0\.5\b/g, 'glass-mt-0-5'],
  // text alignment/transform
  [/\btext-right\b/g, 'glass-text-right'],
  [/\buppercase\b/g, 'glass-uppercase'],
  [/\bcapitalize\b/g, 'glass-capitalize'],
  // backdrop blur
  [/\bbackdrop-blur-sm\b/g, 'glass-backdrop-blur-sm'],
  // sizes
  [/\bmax-h-64\b/g, 'glass-max-h-64'],
  // pointer events
  [/\bpointer-events-none\b/g, 'glass-pointer-events-none'],
  // overflow
  [/\boverflow-x-auto\b/g, 'glass-overflow-x-auto'],
  // min width
  [/\bmin-w-64\b/g, 'glass-min-w-64'],
  // color shortcuts (fall back to sensible tokens)
  [/\btext-white(?:\/\d+)?\b/g, 'glass-text-primary'],
  [/\bbg-white(?:\/\d+)?\b/g, 'glass-surface-overlay'],
  [/\bfrom-[a-z0-9-]+(?:\/\d+)?\b/g, 'glass-gradient-primary'],
  [/\bto-[a-z0-9-]+(?:\/\d+)?\b/g, 'glass-gradient-primary'],
  [/\bbg-gradient-glass-gradient-primary\b/g, 'glass-gradient-primary'],
  [/\btext-glass-text-secondary\b/g, 'glass-text-secondary'],
  [/\btext-glass-text\b/g, 'glass-text-primary'],
  // grid-cols-N
  [/\bgrid-cols-(\d{1,2})\b/g, (m, n) => `glass-grid-cols-${n}`],
]);

const leftovers = new Map();

function processFile(file) {
  const code = fs.readFileSync(file, 'utf8');
  const updated = code.replace(/className\s*=\s*(["\'])([^\1]*?)\1/g, (m, q, classes) => {
    let newVal = classes;
    for (const [re, rep] of CLASS_MAP) {
      newVal = newVal.replace(re, rep);
    }
    // record leftovers that still look tailwind-ish
    newVal.split(/\s+/).forEach(k => {
      if (!k) return;
      if (k.startsWith('glass-') || k.startsWith('sb-') || k.startsWith('storybook-')) return;
      if (/^(flex|grid|inline-flex|inline-grid|items-|justify-|w-|h-|bg-|text-|rounded|shadow|border|gap-)/.test(k)) {
        leftovers.set(k, (leftovers.get(k) || 0) + 1);
      }
    });
    return `className=${q}${newVal}${q}`;
  });

  if (updated !== code) {
    fs.writeFileSync(file, updated);
    return true;
  }
  return false;
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.isFile() && exts.has(path.extname(e.name))) processFile(p);
  }
}

function main() {
  if (!fs.existsSync(ROOT)) {
    console.error('No src/components folder found');
    process.exit(1);
  }
  console.log('🔧 Running tw-to-glass codemod on src/components ...');
  walk(ROOT);
  if (leftovers.size) {
    const reportPath = path.join(process.cwd(), 'reports', 'tw-to-glass-leftovers.json');
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(Object.fromEntries(leftovers), null, 2));
    console.log(`⚠️  Leftover utility classes recorded: ${reportPath}`);
  } else {
    console.log('✅ No leftovers. All mapped classes converted.');
  }
}

if (require.main === module) main();

module.exports = { processFile };
