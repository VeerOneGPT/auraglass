import { chromium } from '@playwright/test';
const url = 'http://localhost:6006';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 768, height: 1024 } });
await p.goto(url + '/iframe.html?id=workflows-glass-page-builder--empty-builder&viewMode=story&globals=previewMode:light', { waitUntil: 'networkidle' });
await p.waitForTimeout(2500);
const out = await p.evaluate(() => {
  const root = document.querySelector('#storybook-root') || document.body;
  const res = [];
  for (const el of root.querySelectorAll('*')) {
    const cls = String(el.className || '');
    if (!/glass-foundation-basic|glass-mx-auto/.test(cls)) continue;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    res.push({
      cls: cls.slice(0, 160),
      rect: [Math.round(r.width), Math.round(r.height)],
      scrollW: el.scrollWidth, clientW: el.clientWidth, scrollH: el.scrollHeight, clientH: el.clientHeight,
      overflowX: cs.overflowX, overflowY: cs.overflowY, display: cs.display,
    });
  }
  return res;
});
console.log(JSON.stringify(out, null, 2));
await b.close();
