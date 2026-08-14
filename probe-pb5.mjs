import { chromium } from '@playwright/test';
const url = 'http://localhost:6006';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 390, height: 844 } });
await p.goto(url + '/iframe.html?id=workflows-glass-page-builder--empty-builder&viewMode=story&globals=previewMode:light', { waitUntil: 'networkidle' });
await p.waitForTimeout(2500);
const out = await p.evaluate(() => {
  const root = document.querySelector('#storybook-root') || document.body;
  const tb = root.querySelector('[data-glass-component]');
  const rows = [];
  const dump = (el, label) => {
    if (!el) return null;
    const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
    return { label, rect: [Math.round(r.x), Math.round(r.width)], scrollW: el.scrollWidth, clientW: el.clientWidth, overflowX: cs.overflowX, display: cs.display, wrap: cs.flexWrap };
  };
  rows.push(dump(tb, 'toolbar'));
  if (tb) for (const c of tb.children) rows.push(dump(c, 'tb-child'));
  const groups = tb ? [...tb.querySelectorAll('div')].filter(d => d.children.length >= 3 && /glass-flex/.test(d.className)) : [];
  for (const g of groups.slice(0,8)) rows.push(dump(g, 'grp:' + String(g.className).slice(0,80)));
  return rows;
});
console.log(JSON.stringify(out, null, 2));
await b.close();
