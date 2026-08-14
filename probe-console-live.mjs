import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const logs = [];
page.on('console', m => logs.push(`[${m.type()}] ${m.text()}`));
page.on('pageerror', e => logs.push(`[pageerror] ${e.message}`));
await page.goto('http://localhost:6006/iframe.html?id=navigation-glass-responsive-nav--default&viewMode=story&globals=previewMode:light', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2500);
const out = await page.evaluate(() => {
  const doc = document;
  const nav = doc.querySelector('[role="navigation"]');
  const tabs = [...doc.querySelectorAll('[role="tablist"]')];
  const portals = [...doc.querySelectorAll('[data-portal], body > div:not(#storybook-root)')].map(e => ({tag:e.tagName, cls:String(e.className).slice(0,100), children:e.childElementCount}));
  return {
    navChildCount: nav?.childElementCount ?? null,
    navHTML: nav?.innerHTML.slice(0,300) ?? null,
    tabCount: tabs.length,
    portalInfo: portals.slice(0,10),
    storyRootHTML: (doc.querySelector('#storybook-root')?.innerHTML || '').slice(0,200),
  };
});
console.log(JSON.stringify({...out, logs}, null, 2));
await browser.close();
