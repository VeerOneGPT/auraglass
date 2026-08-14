import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const logs = [];
page.on('console', m => { if (['warning','error'].includes(m.type())) logs.push(`[${m.type()}] ${m.text()}`); });
page.on('pageerror', e => logs.push(`[pageerror] ${e.message}`));
await page.goto('http://localhost:6006/iframe.html?id=navigation-glass-responsive-nav--default&viewMode=story&globals=previewMode:light', { waitUntil: 'load' });
for (const delay of [500,1500,3000,6000]) {
  await page.waitForTimeout(delay);
  const out = await page.evaluate(() => {
    const root = document.querySelector('#storybook-root');
    const nav = root?.querySelector('[role="navigation"]');
    const tabs = [...(root?.querySelectorAll('[role="tablist"]')||[])];
    return {
      navChildCount: nav?.childElementCount ?? null,
      tabCount: tabs.length,
      wrapperH: nav?.getBoundingClientRect().height ?? null,
    };
  });
  console.log(`after +${delay}ms:`, JSON.stringify(out));
}
console.log('LOGS:', JSON.stringify(logs,null,2));
await browser.close();
