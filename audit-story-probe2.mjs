import { chromium } from 'playwright';

const storybookUrl = 'http://localhost:6006';
const id = process.argv[2];
const viewport = { width: 1440, height: 900 };

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport });
const url = `${storybookUrl}/iframe.html?id=${encodeURIComponent(id)}&viewMode=story&globals=previewMode:light`;
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
await page.waitForTimeout(2500);
const result = await page.evaluate(() => {
  const all = [...document.querySelectorAll('*')];
  const report = [];
  for (const el of all) {
    const s = getComputedStyle(el) || {}; const back = s.backdropFilter || "none"; const wback = s.webkitBackdropFilter || "none"; const bgIm = s.backgroundImage || "none";
    const b = el.getBoundingClientRect();
    const cls = (el.className && el.className.toString) ? el.className.toString() : (el.getAttribute?.('class') || '');
    if (!cls) continue;
    const gl = /glass|ag-|liquid/i.test(cls);
    const hasBd = back !== "none" || wback !== "none";
    const hasBg = s.backgroundColor !== "rgba(0, 0, 0, 0)" || bgIm !== "none";
    if (!gl && !hasBd && !hasBg) continue;
    report.push({
      cls: cls.slice(0, 300),
      w: Math.round(b.width), h: Math.round(b.height),
      scrollW: el.scrollWidth, clientW: el.clientWidth,
      bd: back.slice(0, 120), webkitBd: wback.slice(0, 120),
      bg: s.backgroundColor, bgImage: bgIm.slice(0, 160),
    });
  }
  return report;
});
console.log(JSON.stringify(result, null, 1));
await browser.close();
