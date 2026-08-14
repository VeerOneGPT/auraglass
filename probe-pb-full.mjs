import { chromium } from 'playwright';
const story = 'workflows-glass-page-builder--empty-builder';
const viewport = (process.argv[2] || '390x844').split('x').map(Number);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: viewport[0], height: viewport[1] } });
await page.goto(`http://localhost:6006/iframe.html?id=${story}&viewMode=story&globals=previewMode:light`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2000);
const rows = await page.evaluate(() => {
  const isChrome = (node) => {
    const cls = String(node.className || '');
    if (/\bag-story-\b/.test(cls)) return true;
    if (node.closest('[class*="ag-story-"]')) return true;
    if (/\bglass-on-light\b/.test(cls)) return true;
    if (/\bcontrast-guard\b|\bglass-contrast-guard\b/.test(cls)) return true;
    if (/\bglass-sr-only\b/.test(cls)) return true;
    return false;
  };
  const root = document.querySelector('#storybook-root') || document.body;
  const out = [];
  const all = [...root.querySelectorAll('[class*="glass"]')].filter(n => {
    if (isChrome(n)) return false;
    const s = getComputedStyle(n);
    const cls = String(n.className || '');
    const bf = s.backdropFilter || s.webkitBackdropFilter || 'none';
    return bf !== 'none' || /glass-surface(?:-|$)/.test(cls) || /glass-foundation/.test(cls);
  });
  for (const n of all) {
    const s = getComputedStyle(n);
    const b = n.getBoundingClientRect();
    const cls = String(n.className || '').slice(0, 110);
    const rec = { cls, w: Math.round(b.width), h: Math.round(b.height), sw: n.scrollWidth, cw: n.clientWidth, ox: s.overflowX };
    if (b.width <= 1 || b.height <= 1) rec.issue = 'tiny';
    else if (n.scrollWidth > n.clientWidth + 2 && s.overflowX !== 'auto' && s.overflowX !== 'scroll') rec.issue = 'overflow';
    else continue;
    out.push(rec);
  }
  return out;
});
console.log(JSON.stringify(rows, null, 2));
await browser.close();
