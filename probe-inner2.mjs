// Deep-dive pseudo-element geometry for the overflowing button.
// Usage: node probe-inner2.mjs <storyId>
import { chromium } from "playwright";

const base = process.env.STORYBOOK_URL || "http://localhost:6006";
const id = process.argv[2];
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const url = `${base}/iframe.html?id=${id}&viewMode=story&globals=previewMode:light`;
await page.goto(url, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2000);

const data = await page.evaluate(() => {
  const btns = [...document.querySelectorAll(".optimized-glass-surface")];
  return btns.map((btn, i) => {
    const measure = (which) => {
      const ps = getComputedStyle(btn, which);
      const r = (() => { try { return btn.getBoundingClientRect(); } catch { return null; } })();
      return {
        which,
        position: ps.position,
        top: ps.top,
        left: ps.left,
        right: ps.right,
        bottom: ps.bottom,
        width: ps.width,
        height: ps.height,
        minWidth: ps.minWidth,
        maxWidth: ps.maxWidth,
        transform: ps.transform,
        transformOrigin: ps.transformOrigin,
        overflow: ps.overflow,
        content: ps.content,
        display: ps.display,
        zIndex: ps.zIndex,
        pointerEvents: ps.pointerEvents,
        backgroundImage: ps.backgroundImage,
        boxShadow: ps.boxShadow,
        opacity: ps.opacity,
        marginLeft: ps.marginLeft,
        marginRight: ps.marginRight,
      };
    };
    return {
      i,
      cls: String(btn.className).slice(0, 200),
      sw: btn.scrollWidth,
      cw: btn.clientWidth,
      before: measure("::before"),
      after: measure("::after"),
    };
  });
});
console.log(JSON.stringify(data, null, 1).slice(0, 10000));
await browser.close();
