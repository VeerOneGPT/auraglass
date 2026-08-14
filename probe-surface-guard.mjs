import { chromium } from 'playwright';
const story = process.argv[2] || 'foundations-liquid-glass-primitives-glass-advanced--default';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`http://localhost:6006/iframe.html?id=${story}&viewMode=story&globals=previewMode:light`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1200);
const rows = await page.evaluate(() => {
  const root = document.querySelector('#storybook-root') || document.body;
  const out = [];
  const all = [...root.querySelectorAll('*')].filter(n => /glass|liquid/i.test(n.className || ''));
  for (const n of all.slice(0, 400)) {
    const s = getComputedStyle(n);
    const b = n.getBoundingClientRect();
    if (b.width <= 1 || b.height <= 1) continue;
    const cls = String(n.className || '');
    const bf = s.backdropFilter || 'none';
    const isChromeByCls = /\bglass-on-light\b|\bag-story-\b|\bcontrast-guard\b|\bglass-sr-only\b/.test(cls);
    const inChromeAncestor = !!n.closest('[class*="ag-story-"]');
    if (bf !== 'none' || /glass-surface|optimized-glass-surface|liquid-glass-(?:material|surface|concentric|scroll-edge|layer)/.test(cls)) {
      out.push({
        cls: cls.slice(0, 130),
        bf: bf.slice(0, 80),
        w: Math.round(b.width), h: Math.round(b.height),
        isChromeByCls, inChromeAncestor,
      });
    }
  }
  return out.slice(0, 16);
});
console.log(JSON.stringify(rows, null, 2));
await browser.close();
