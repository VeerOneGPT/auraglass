import { chromium } from '@playwright/test';
const url = process.env.STORYBOOK_URL || 'http://localhost:6006';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 768, height: 1024 } });
await p.goto(url + '/iframe.html?id=effects-glass-page-builder--default&globals=previewMode:light', { waitUntil: 'networkidle' });
await p.waitForTimeout(2500);
const out = await p.evaluate(() => {
  const root = document.querySelector('#storybook-root') || document.body;
  const res = [];
  const check = (sel) => {
    for (const el of root.querySelectorAll(sel)) {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      res.push({
        sel, cls: String(el.className).slice(0, 140),
        rect: [Math.round(r.width), Math.round(r.height)],
        scrollW: el.scrollWidth, clientW: el.clientWidth,
        overflowX: cs.overflowX, overflowY: cs.overflowY,
        display: cs.display, pos: cs.position,
      });
    }
  };
  check('div.glass-foundation-basic');
  check('div.glass-mx-auto');
  check('[data-glass-component]');
  return res;
});
console.log(JSON.stringify(out, null, 2));
await b.close();
