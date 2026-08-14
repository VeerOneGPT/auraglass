import { chromium } from '@playwright/test';
const url = 'http://localhost:6006';
const b = await chromium.launch();
for (const vp of [{width:390,height:844},{width:768,height:1024}]) {
  const p = await b.newPage({ viewport: vp });
  await p.goto(url + '/iframe.html?id=workflows-glass-page-builder--empty-builder&viewMode=story&globals=previewMode:light', { waitUntil: 'networkidle' });
  await p.waitForTimeout(2200);
  const out = await p.evaluate(() => {
    const root = document.querySelector('#storybook-root') || document.body;
    const tb = root.querySelector('[data-glass-component]');
    const rows = [];
    const dump = (el, label) => {
      if (!el) return null;
      const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
      return { label, rect: [Math.round(r.x), Math.round(r.width)], scrollW: el.scrollWidth, clientW: el.clientWidth, overflowX: cs.overflowX, display: cs.display, wrap: cs.flexWrap, cls: String(el.className).slice(0,100) };
    };
    rows.push(dump(tb, 'toolbar'));
    if (tb) for (const c of tb.children) rows.push(dump(c, 'toolbar-child'));
    const main = root.querySelector('div.glass-overflow-auto');
    if (main) {
      rows.push(dump(main, 'root'));
      const kids = [...main.children];
      rows.push(...kids.map((k,i)=>dump(k,'main'+i)));
    }
    return rows;
  });
  console.log('VP', vp.width); console.log(JSON.stringify(out, null, 2));
  await p.close();
}
await b.close();
