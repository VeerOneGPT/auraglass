import { chromium } from 'playwright';
const story = process.argv[2];
const url = `http://localhost:6006/iframe.html?id=${story}&viewMode=story&globals=previewMode:light`;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(url, { waitUntil: 'networkidle' });
await p.waitForTimeout(2500);
const data = await p.evaluate(() => {
  const root = document.querySelector('#storybook-root') || document.body;
  const out = [];
  const all = [...root.querySelectorAll('*')];
  for (const el of all) {
    const cls = String(el.className||'');
    if (/glass/.test(cls)) {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      out.push({tag: el.tagName.toLowerCase(), cls: cls.slice(0,150), w: Math.round(r.width), h: Math.round(r.height), bf: (cs.backdropFilter||'none').slice(0,70), bg: cs.backgroundColor, bgImage: (cs.backgroundImage||'').slice(0,110)});
    }
  }
  return out.slice(0, 40);
});
console.log(JSON.stringify(data, null, 1));
await b.close();
