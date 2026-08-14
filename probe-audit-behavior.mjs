import { chromium } from 'playwright';
const story = process.argv[2] || 'reference-legacy-components-glass-prism-comparison--default';
const viewport = (process.argv[3] || '1440x900').split('x').map(Number);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: viewport[0], height: viewport[1] } });
await page.goto(`http://localhost:6006/iframe.html?id=${story}&viewMode=story&globals=previewMode:light`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1800);
const result = await page.evaluate(() => {
  const isStorybookChrome = (node) => {
    const cls = String(node.className || "");
    if (/\bag-story-\b/.test(cls)) return true;
    if (node.closest('[class*="ag-story-"]')) return true;
    if (/\bglass-on-light\b/.test(cls)) return true;
    if (/\bcontrast-guard\b|\bglass-contrast-guard\b/.test(cls)) return true;
    if (/\bglass-sr-only\b/.test(cls)) return true;
    const tag = node.tagName.toLowerCase();
    if (tag === "a" && /skip-link|sr-only/i.test(cls)) return true;
    const style = window.getComputedStyle(node);
    const backdrop = style.backdropFilter || style.webkitBackdropFilter || "none";
    if (backdrop !== "none" || /glass-surface(?:-|$)/.test(cls)) return false;
    return false;
  };
  const root = document.querySelector('#storybook-root') || document.body;
  const all = [...root.querySelectorAll('*')];
  const candidates = all.filter(n => {
    const cls = String(n.className || '');
    const style = window.getComputedStyle(n);
    const box = n.getBoundingClientRect();
    if (box.width <= 1 || box.height <= 1) return false;
    if (style.display === 'none' || style.visibility === 'hidden') return false;
    if (Number(style.opacity || '1') <= 0.01) return false;
    const bf = style.backdropFilter || style.webkitBackdropFilter || 'none';
    return bf !== 'none' || /glass-surface(?:-|$)/.test(cls);
  });
  const excluded = candidates.filter(n => isStorybookChrome(n)).map(n => ({
    cls: String(n.className || '').slice(0, 140),
    bf: (getComputedStyle(n).backdropFilter || 'none').slice(0, 70),
    w: Math.round(n.getBoundingClientRect().width),
    h: Math.round(n.getBoundingClientRect().height),
  }));
  const included = candidates.filter(n => !isStorybookChrome(n)).map(n => ({
    cls: String(n.className || '').slice(0, 140),
    bf: (getComputedStyle(n).backdropFilter || 'none').slice(0, 70),
    w: Math.round(n.getBoundingClientRect().width),
    h: Math.round(n.getBoundingClientRect().height),
  }));
  return { excluded: excluded.slice(0, 10), included: included.slice(0, 10), countExcluded: excluded.length, countIncluded: included.length };
});
console.log(JSON.stringify(result, null, 2));
await browser.close();
