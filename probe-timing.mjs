// Measure scrollWidth over time to catch the sheen animation window.
// Usage: node probe-timing.mjs <storyId>
import { chromium } from "playwright";

const base = process.env.STORYBOOK_URL || "http://localhost:6006";
const id = process.argv[2];
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 768, height: 1024 } });
const url = `${base}/iframe.html?id=${id}&viewMode=story&globals=previewMode:light`;
await page.goto(url, { waitUntil: "domcontentloaded" });

const samples = [];
for (let t = 0; t <= 3000; t += 150) {
  await page.waitForTimeout(150);
  const s = await page.evaluate(() => {
    const btn = document.querySelector(".optimized-glass-surface");
    if (!btn) return null;
    const cs = getComputedStyle(btn, "::after");
    return {
      sw: btn.scrollWidth,
      cw: btn.clientWidth,
      afterWidth: cs.width,
      afterLeft: cs.left,
      afterRight: cs.right,
      afterTransform: cs.transform,
      afterOpacity: cs.opacity,
    };
  });
  if (s) samples.push({ t, ...s });
}
console.log(JSON.stringify(samples, null, 1));
await browser.close();
