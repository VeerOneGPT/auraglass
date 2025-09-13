#!/usr/bin/env node
/**
 * Universal Glass Audit
 * Scans all component files, validates adherence to AuraGlass standards,
 * and produces per-file findings with concrete suggestions.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(process.cwd(), 'src', 'components');
const OUT_DIR = path.join(process.cwd(), 'reports');
const OUT_JSON = path.join(OUT_DIR, 'UNIVERSAL_GLASS_AUDIT.json');
const OUT_MD = path.join(OUT_DIR, 'UNIVERSAL_GLASS_AUDIT.md');

const isTSX = (p) => p.endsWith('.tsx');
const isStory = (p) => /\.stories\.tsx$/.test(p);
const isBak = (p) => p.endsWith('.bak');

const RAW_UTILITY_RE = /className\s*=\s*(["'`])([\s\S]*?)\1/gm;
const STYLE_ATTR_RE = /\bstyle\s*=\s*\{\{/g;
const INLINE_GLASS_RE = /backdrop-filter|backdropFilter|WebkitBackdropFilter|-webkit-backdrop-filter|box-shadow\s*:|boxShadow\s*:|background\s*:\s*(?:rgba\(|linear-gradient\()/g;
const TOKEN_USAGE_RE = /createGlassStyle|glassTokens|AURA_GLASS|glass-[a-z]/g;
const TYPOGRAPHY_RAW_RE = /\btext-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl)\b/g;
const TYPOGRAPHY_COMP_RE = /<Typography\b|glass-text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl)/g;
const INTERACTIVE_RE = /<button\b|<a\b|onClick\s*=|role=\s*(["'])button\1/g;
const FOCUS_RE = /focus-visible|glass-focus|GlassFocusRing|useGlassFocus/g;
const ARIA_RE = /\baria-[a-z-]+=/g;

// A utility is considered raw if it matches a common tailwind-like pattern and doesn't start with 'glass-'
const RAW_CLASS_TOKEN_PREFIX = /^(?:p|m|px|py|mx|my|gap|rounded|text|bg|border|shadow|w-|h-|min-w-|min-h-|grid-cols-|flex|inline-flex|grid|items-|justify-|space-y-|space-x-|truncate|overflow)/;

function listFiles(dir) {
  const out = [];
  (function walk(d) {
    const entries = fs.readdirSync(d, { withFileTypes: true });
    for (const e of entries) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.isFile() && isTSX(p) && !isStory(p) && !isBak(p)) out.push(p);
    }
  })(dir);
  return out.sort();
}

function analyzeFile(file) {
  const code = fs.readFileSync(file, 'utf8');
  const findings = [];
  let score = 100;

  // 1) Raw utilities
  const rawClasses = new Set();
  let m;
  while ((m = RAW_UTILITY_RE.exec(code))) {
    const classes = m[2].split(/\s+/).filter(Boolean);
    for (const k of classes) {
      if (k.startsWith('glass-') || k.startsWith('sb-') || k.startsWith('storybook-')) continue;
      if (RAW_CLASS_TOKEN_PREFIX.test(k)) rawClasses.add(k);
    }
  }
  if (rawClasses.size) {
    score -= Math.min(20, rawClasses.size * 0.5);
    findings.push({ type: 'raw-utilities', severity: 'warn', details: Array.from(rawClasses).slice(0, 40) });
  }

  // 2) Inline style attribute
  const styleAttrs = (code.match(STYLE_ATTR_RE) || []).length;
  if (styleAttrs) {
    score -= Math.min(15, styleAttrs * 3);
    findings.push({ type: 'inline-style-attr', severity: 'warn', count: styleAttrs });
  }

  // 3) Inline glass indicators
  const inlineGlass = (code.match(INLINE_GLASS_RE) || []).length;
  if (inlineGlass) {
    score -= Math.min(25, inlineGlass * 5);
    findings.push({ type: 'inline-glass', severity: 'error', count: inlineGlass });
  }

  // 4) Token usage present?
  const tokenUsage = TOKEN_USAGE_RE.test(code);
  if (!tokenUsage) {
    score -= 5;
    findings.push({ type: 'missing-tokens', severity: 'info', message: 'No glass token usage detected' });
  }

  // 5) Typography usage
  const hasTypographyComponent = TYPOGRAPHY_COMP_RE.test(code);
  const hasRawTypography = TYPOGRAPHY_RAW_RE.test(code);
  if (!hasTypographyComponent && hasRawTypography) {
    score -= 5;
    findings.push({ type: 'typography', severity: 'warn', message: 'Raw text-* classes; use Typography or glass-text-* tokens' });
  }

  // 6) Interaction/focus
  const interactive = INTERACTIVE_RE.test(code);
  const hasFocus = FOCUS_RE.test(code);
  if (interactive && !hasFocus) {
    score -= 5;
    findings.push({ type: 'focus', severity: 'info', message: 'Interactive content; ensure focus-visible rings via utilities/hooks' });
  }

  // 7) A11y attributes presence
  const ariaCount = (code.match(ARIA_RE) || []).length;
  if (interactive && ariaCount === 0) {
    findings.push({ type: 'a11y', severity: 'info', message: 'Consider aria-* attributes / roles for interactive elements' });
  }

  // Suggestions
  const suggestions = [];
  if (rawClasses.size) suggestions.push('Replace raw utilities with glass-* equivalents or tokens');
  if (styleAttrs) suggestions.push('Remove inline style attributes; use tokens, mixins, or utility classes');
  if (inlineGlass) suggestions.push('Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities');
  if (!hasTypographyComponent && hasRawTypography) suggestions.push('Use <Typography /> or glass-text-* tokens for consistent type');
  if (interactive && !hasFocus) suggestions.push('Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)');
  if (!tokenUsage) suggestions.push('Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)');

  return {
    file,
    score: Math.max(0, Math.round(score)),
    issues: findings,
    suggestions,
  };
}

function summarize(results) {
  const total = results.length;
  const pass = results.filter(r => r.score >= 95).length;
  const near = results.filter(r => r.score >= 85 && r.score < 95).length;
  const fail = total - pass - near;
  const topOffenders = [...results].sort((a,b) => a.score - b.score).slice(0, 25);

  const counts = results.reduce((acc, r) => {
    r.issues.forEach(i => {
      acc[i.type] = (acc[i.type] || 0) + 1;
    });
    return acc;
  }, {});

  return { total, pass, near, fail, counts, topOffenders };
}

function writeReports(results) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_JSON, JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2));

  const s = summarize(results);
  let md = '';
  md += `# Universal Glass Audit\n\n`;
  md += `Generated: ${new Date().toISOString()}\n\n`;
  md += `- Files audited: ${s.total}\n`;
  md += `- Pass (>=95): ${s.pass}\n`;
  md += `- Near (85–94): ${s.near}\n`;
  md += `- Needs work (<85): ${s.fail}\n`;
  md += `- Issue counts: ${Object.entries(s.counts).map(([k,v])=>`${k}:${v}`).join(', ')}\n\n`;
  md += `## Top 25 Needing Attention\n`;
  s.topOffenders.forEach(r => {
    md += `- ${r.score}/100 — ${path.relative(process.cwd(), r.file)} — ${r.suggestions.join('; ')}\n`;
  });

  md += `\n## File-by-File\n`;
  results.forEach(r => {
    md += `\n### ${path.relative(process.cwd(), r.file)}\n`;
    md += `- Score: ${r.score}/100\n`;
    if (r.issues.length === 0) md += `- Issues: none\n`;
    else {
      r.issues.forEach(i => {
        md += `- ${i.severity.toUpperCase()} ${i.type}${i.details?`: ${i.details.slice(0,10).join(', ')}`:''}${i.count?` (x${i.count})`:''}${i.message?` — ${i.message}`:''}\n`;
      });
    }
    if (r.suggestions.length) md += `- Suggestions: ${r.suggestions.join('; ')}\n`;
  });

  fs.writeFileSync(OUT_MD, md);
}

function main() {
  if (!fs.existsSync(ROOT)) {
    console.error('Components directory not found:', ROOT);
    process.exit(1);
  }
  const files = listFiles(ROOT);
  const results = files.map(analyzeFile);
  writeReports(results);
  const { total, pass, near, fail } = summarize(results);
  console.log(`Audited ${total} files. Pass: ${pass}, Near: ${near}, Needs work: ${fail}.`);
  console.log(`Reports written to:\n- ${path.relative(process.cwd(), OUT_JSON)}\n- ${path.relative(process.cwd(), OUT_MD)}`);
}

if (require.main === module) main();

