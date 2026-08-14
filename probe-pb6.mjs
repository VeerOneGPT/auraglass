import { chromium } from '@playwright/test';
const url = 'http://localhost:6006';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 390, height: 844 } });
await p.goto(url + '/iframe.html?id=workflows-glass-page-builder--empty-builder&viewMode=story&globals=previewMode:light', { waitUntil: 'networkidle' });
await p.waitForTimeout(2500);
const out = await p.evaluate(() => {
  const root = document.querySelector('#storybook-root') || document.body;
  const toolbar = root.querySelector('[data-glass-component]');
  const rows = [];
  const walk = (el, depth=0) => {
    if (depth > 3) return;
    const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
    rows.push({ depth, tag: el.tagName, cls: String(el.className).slice(0,110), rect: [Math.round(r.width)], scrollW: el.scrollWidth, clientW: el.clientWidth, overflowX: cs.overflowX, display: cs.display });
    for (const c of el.children) walk(c, depth+1);
  };
  walk(toolbar);
  return rows;
});
console.log(JSON.stringify(out, null, 2));
await b.close();
