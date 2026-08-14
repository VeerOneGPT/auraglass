// Probe optimized-glass-surface overflow on key stories.
// Usage: node probe-overflow.mjs <storyId> [more story ids...]
import { chromium } from "playwright";
import { readFileSync, existsSync } from "fs";

const base = process.env.STORYBOOK_URL || "http://localhost:6006";
const ids = process.argv.slice(2);
if (!ids.length) {
  console.error("usage: node probe-overflow.mjs <storyId> [...]");
  process.exit(1);
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

for (const id of ids) {
  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    const url = `${base}/iframe.html?id=${id}&viewMode=story&globals=previewMode:light`;
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2500);
    const data = await page.evaluate(() => {
      const els = [...document.querySelectorAll(".optimized-glass-surface")];
      const doc = document.documentElement;
      const out = {
        doc: { sw: doc.scrollWidth, cw: doc.clientWidth },
        surfaces: els.map((el, i) => {
          const cs = getComputedStyle(el);
          const r = el.getBoundingClientRect();
          return {
            i,
            tag: el.tagName,
            cls: String(el.className).slice(0, 140),
            sw: el.scrollWidth,
            cw: el.clientWidth,
            ow: el.offsetWidth,
            rectW: Math.round(r.width),
            overflow: cs.overflow,
            minW: cs.minWidth,
            width: cs.width,
            display: cs.display,
            whiteSpace: cs.whiteSpace,
            flexWrap: cs.flexWrap,
            textOverflow: cs.textOverflow,
            padding: cs.padding,
            border: cs.borderWidth,
            backdrop: cs.backdropFilter || cs.webkitBackdropFilter || "none",
            bg: cs.backgroundColor,
            bgImg: cs.backgroundImage,
            font: cs.fontSize,
          };
        }),
      };
      // Also capture overflowing children (scrollWidth > clientWidth) with their classes
      out.overflowing = els
        .map((el) => ({ el, sw: el.scrollWidth, cw: el.clientWidth }))
        .filter((x) => x.sw > x.cw + 2)
        .map((x) => {
          const kids = [...x.el.children].map((k) => ({
            tag: k.tagName,
            cls: String(k.className).slice(0, 120),
            sw: k.scrollWidth,
            cw: k.clientWidth,
            ow: k.offsetWidth,
            text: (k.textContent || "").slice(0, 40),
            cs: (({ whiteSpace, overflow, minWidth, width, display, flex, flexShrink, flexBasis, position }) => ({ whiteSpace, overflow, minWidth, width, display, flex, flexShrink, flexBasis, position }))(getComputedStyle(k)),
          }));
          return { cls: String(x.el.className).slice(0, 140), sw: x.sw, cw: x.cw, kids };
        });
      return out;
    });
    console.log(`\n=== ${id} @ ${vp.name} (${vp.width}x${vp.height}) ===`);
    console.log(JSON.stringify(data, null, 1).slice(0, 8000));
  }
}
await browser.close();
