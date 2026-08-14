import { chromium } from 'playwright';
const targets = [
  ['toast','data-visualization-glass-toast--default'],
  ['wizard','workflows-glass-wizard-template--default'],
  ['button','controls-buttons-glass-button--default'],
  ['select-compound','controls-inputs-glass-select-compound--default'],
];
const browser = await chromium.launch({ channel: 'chromium' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
for (const [label, id] of targets) {
  try {
    await page.goto(`http://localhost:6006/iframe.html?id=${id}&viewMode=story&globals=previewMode:light`, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(900);
    const out = await page.evaluate(() => {
      const btns = [...document.querySelectorAll('button.optimized-glass-surface, button[class*="glass-surface"], .glass-select-trigger')].slice(0, 5);
      return btns.map((el) => {
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return {
          cls: (el.className.baseVal ?? el.className ?? '').toString().slice(0, 140),
          w: Math.round(r.width), scrollW: el.scrollWidth, clientW: el.clientWidth,
          boxSizing: cs.boxSizing, minWidth: cs.minWidth, padding: cs.padding, whiteSpace: cs.whiteSpace,
          overflow: cs.overflow, display: cs.display, bg: cs.backgroundColor, bgImage: (cs.backgroundImage||'').slice(0,140),
          border: cs.borderTopColor, backdrop: cs.backdropFilter,
        };
      });
    });
    console.log(JSON.stringify({ label, btns: out }, null, 1));
  } catch (e) { console.log(JSON.stringify({ label, error: String(e).slice(0,160) })); }
}
await browser.close();
