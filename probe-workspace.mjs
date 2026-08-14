import { chromium } from 'playwright';
const browser = await chromium.launch({ channel: 'chromium' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:6006/iframe.html?id=workflows-collaborative-glass-workspace--default&viewMode=story&globals=previewMode:light', { waitUntil: 'networkidle', timeout: 20000 });
await page.waitForTimeout(1000);
const out = await page.evaluate(() => {
  return [...document.querySelectorAll('.workspace-glass-panel')].slice(0, 6).map((el) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      cls: (el.className.baseVal ?? el.className ?? '').toString().slice(0, 110),
      bgImage: (cs.backgroundImage || '').slice(0, 160),
      bgColor: cs.backgroundColor,
      backdrop: cs.backdropFilter,
      border: cs.borderTopColor,
      w: Math.round(r.width), scrollW: el.scrollWidth, clientW: el.clientWidth,
    };
  });
});
console.log(JSON.stringify(out, null, 1));
await browser.close();
