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
const STYLE_ATTR_INLINE_OBJ_RE = /style\s*=\s*\{\{([\s\S]*?)\}\}/gm;
// Inline glass: count CSS property usage only when not tokenized (no var()) or backgrounds with rgba/gradients
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

  // 1) Raw utilities (ignore variant prefixes and accept glass-* after variants)
  const rawClasses = new Set();
  let m;
  while ((m = RAW_UTILITY_RE.exec(code))) {
    const classes = m[2].split(/\s+/).filter(Boolean);
    for (let k of classes) {
      // Strip common variant prefixes (hover:, focus:, active:, dark:, group-hover:, responsive)
      k = k.replace(/^(?:hover:|focus:|active:|dark:|group-hover:|sm:|md:|lg:|xl:|2xl:)+/g, '');
      if (!k) continue;
      if (k.startsWith('glass-') || k.startsWith('sb-') || k.startsWith('storybook-')) continue;
      if (RAW_CLASS_TOKEN_PREFIX.test(k)) rawClasses.add(k);
    }
  }
  if (rawClasses.size) {
    score -= Math.min(20, rawClasses.size * 0.5);
    findings.push({ type: 'raw-utilities', severity: 'warn', details: Array.from(rawClasses).slice(0, 40) });
  }

  // 2) Inline style attribute (only penalize disallowed props)
  let inlineStyleOffenses = 0;
  let mStyle;
  while ((mStyle = STYLE_ATTR_INLINE_OBJ_RE.exec(code))) {
    const chunk = mStyle[1] || '';
    const hasBackdrop = /(backdropFilter|backdrop-filter)/.test(chunk);
    const hasBoxShadow = /(boxShadow|box-shadow)\s*:\s*[^,}]+/.test(chunk);
    const hasBadBg = /(background\s*:|backgroundColor\s*:)[^,}]+/.test(chunk) && /(rgba\(|#|linear-gradient\()/i.test(chunk);
    const hasBorderLiteral = /border\s*:\s*1px\s*solid\s*[^,}]+/.test(chunk) && /(rgba\(|#)/i.test(chunk);
    const hasDisallowed = hasBackdrop || hasBoxShadow || hasBadBg || hasBorderLiteral;
    if (hasDisallowed) inlineStyleOffenses++;
  }
  if (inlineStyleOffenses) {
    score -= Math.min(10, inlineStyleOffenses * 2);
    findings.push({ type: 'inline-style-attr', severity: 'warn', count: inlineStyleOffenses });
  }

  // 3) Inline glass indicators (CSS props only when not tokenized)
  let inlineGlassOffenses = 0;
  const cssPropRe = /(?:backdrop-filter|box-shadow)\s*:\s*([^;]+);/gi;
  let mm;
  while ((mm = cssPropRe.exec(code))) {
    const v = (mm[1] || '').trim();
    if (!/var\(/i.test(v)) inlineGlassOffenses++;
  }
  // literal backgrounds with rgba/gradient
  const bgLiteralRe = /background\s*:\s*(rgba\(|linear-gradient\()/gi;
  const bgLits = code.match(bgLiteralRe) || [];
  inlineGlassOffenses += bgLits.length;
  if (inlineGlassOffenses) {
    score -= Math.min(20, inlineGlassOffenses * 2);
    findings.push({ type: 'inline-glass', severity: 'error', count: inlineGlassOffenses });
  }

  // 4) Token usage present?
  const tokenUsage = TOKEN_USAGE_RE.test(code);
  if (!tokenUsage) findings.push({ type: 'missing-tokens', severity: 'info', message: 'No glass token usage detected' });

  // 5) Typography usage
  const hasTypographyComponent = TYPOGRAPHY_COMP_RE.test(code);
  const hasRawTypography = TYPOGRAPHY_RAW_RE.test(code);
  if (!hasTypographyComponent && hasRawTypography) {
    findings.push({ type: 'typography', severity: 'warn', message: 'Raw text-* classes; use Typography or glass-text-* tokens' });
  }

  // 6) Interaction/focus
  const interactive = INTERACTIVE_RE.test(code);
  const hasFocus = FOCUS_RE.test(code);
  if (interactive && !hasFocus) {
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
  if (inlineStyleOffenses) suggestions.push('Remove inline style attributes; use tokens, mixins, or utility classes');
  if (inlineGlassOffenses) suggestions.push('Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities');
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
