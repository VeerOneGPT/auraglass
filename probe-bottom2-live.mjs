import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('http://localhost:6006/iframe.html?id=navigation-glass-responsive-nav--default&viewMode=story&globals=previewMode:light', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1500);
const out = await page.evaluate(() => {
  const root = document.querySelector('#storybook-root');
  const tabs = [...(root?.querySelectorAll('[role="tablist"], [class*="bottom"], [class*="Bottom"], [class*="glass-h-16"], [class*="glass-h-14"], [class*="glass-h-20"]')||[])];
  return tabs.map((t) => {
    const s = getComputedStyle(t); const b = t.getBoundingClientRect();
    return {tag:t.tagName, cls:String(t.className).slice(0,220), w:b.width,h:b.height, display:s.display, position:s.position, top:b.top, bottom:b.bottom, sticky:s.position};
  }).filter(x=>x.w>0||x.h>0||/bottom/i.test(x.cls)).slice(0,30);
});
console.log(JSON.stringify(out, null, 2));
await browser.close();
