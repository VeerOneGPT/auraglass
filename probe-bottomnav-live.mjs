import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const logs = [];
page.on('console', m => { if (m.type()==='warning'||m.type()==='error') logs.push(`[${m.type()}] ${m.text()}`); });
page.on('pageerror', e => logs.push(`[pageerror] ${e.message}`));
await page.goto('http://localhost:6006/iframe.html?id=navigation-glass-bottom-nav--default&viewMode=story&globals=previewMode:light', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2500);
const out = await page.evaluate(() => {
  const root = document.querySelector('#storybook-root');
  const tabs = [...(root?.querySelectorAll('[role="tablist"]')||[])];
  const navs = [...(root?.querySelectorAll('[aria-label="Bottom navigation"]')||[])];
  return {
    tabs: tabs.map(t=>{const b=t.getBoundingClientRect();const s=getComputedStyle(t);return {cls:String(t.className).slice(0,200),w:b.width,h:b.height,display:s.display,pos:s.position,bf:s.backdropFilter};}),
    navCount: navs.length,
    rootHTML: (root?.innerHTML||'').slice(0,400),
  };
});
console.log(JSON.stringify({...out, logs}, null, 2));
await browser.close();
