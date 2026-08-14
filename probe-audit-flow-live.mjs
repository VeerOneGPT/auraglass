import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 390, height: 844 });
await page.addInitScript(() => {
  window.matchMedia = window.matchMedia || ((query) => ({
    matches: false, media: query, onchange: null,
    addListener: () => undefined, removeListener: () => undefined,
    addEventListener: () => undefined, removeEventListener: () => undefined,
    dispatchEvent: () => false,
  }));
});
const logs = [];
page.on('console', m => { if (['warning','error'].includes(m.type())) logs.push(`[${m.type()}] ${m.text()}`); });
page.on('pageerror', e => logs.push(`[pageerror] ${e.message}`));
await page.goto('http://localhost:6006/iframe.html?id=navigation-glass-responsive-nav--default&viewMode=story&globals=previewMode:light', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2500);
const out = await page.evaluate(() => {
  const root = document.querySelector('#storybook-root');
  const nav = root?.querySelector('[role="navigation"]');
  return {
    navHTML: nav?.innerHTML.slice(0,300) ?? 'NO NAV',
    navChildren: nav?.childElementCount ?? null,
    tabs: [...(root?.querySelectorAll('[role="tablist"]')||[])].length,
  };
});
console.log(JSON.stringify({...out, logs}, null, 2));
await browser.close();
