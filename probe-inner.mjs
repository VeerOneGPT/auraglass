// Inspect inner content of optimized-glass-surface button that overflows.
// Usage: node probe-inner.mjs <storyId>
import { chromium } from "playwright";

const base = process.env.STORYBOOK_URL || "http://localhost:6006";
const id = process.argv[2];
if (!id) { console.error("storyId required"); process.exit(1); }

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const url = `${base}/iframe.html?id=${id}&viewMode=story&globals=previewMode:light`;
await page.goto(url, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2000);

const data = await page.evaluate(() => {
  const btns = [...document.querySelectorAll(".optimized-glass-surface")];
  return btns.map((btn, i) => {
    const cs = getComputedStyle(btn);
    const inner = [...btn.children].map((k) => {
      const ks = getComputedStyle(k);
      return {
        tag: k.tagName,
        cls: String(k.className).slice(0, 150),
        sw: k.scrollWidth,
        cw: k.clientWidth,
        ow: k.offsetWidth,
        rectW: Math.round(k.getBoundingClientRect().width),
        text: (k.textContent || "").slice(0, 60),
        whiteSpace: ks.whiteSpace,
        overflow: ks.overflow,
        display: ks.display,
        minWidth: ks.minWidth,
        width: ks.width,
        padding: ks.padding,
        position: ks.position,
        left: ks.left,
        right: ks.right,
        transform: ks.transform,
        flexShrink: ks.flexShrink,
        flexBasis: ks.flexBasis,
      };
    });
    // also pseudo content
    const pseudo = (which) => {
      const ps = getComputedStyle(btn, which);
      return { content: ps.content, transform: ps.transform, width: ps.width, left: ps.left, right: ps.right };
    };
    return {
      i,
      cls: String(btn.className).slice(0, 220),
      sw: btn.scrollWidth,
      cw: btn.clientWidth,
      ow: btn.offsetWidth,
      rectW: Math.round(btn.getBoundingClientRect().width),
      text: (btn.textContent || "").slice(0, 80),
      overflow: cs.overflow,
      whiteSpace: cs.whiteSpace,
      padding: cs.padding,
      border: cs.borderWidth,
      minWidth: cs.minWidth,
      boxSizing: cs.boxSizing,
      position: cs.position,
      transform: cs.transform,
      inner,
      before: pseudo("::before"),
      after: pseudo("::after"),
    };
  });
});
console.log(JSON.stringify(data, null, 1).slice(0, 10000));
await browser.close();
