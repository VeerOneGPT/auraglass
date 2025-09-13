import { test, expect } from '@playwright/test';

function parseRGBA(input: string): [number, number, number, number] | null {
  const m = input.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!m) return null;
  const r = parseInt(m[1], 10), g = parseInt(m[2], 10), b = parseInt(m[3], 10);
  const a = m[4] ? parseFloat(m[4]) : 1;
  return [r, g, b, a];
}

function relLum([r, g, b]: [number, number, number]) {
  const srgb = [r, g, b].map((v) => v / 255).map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

function contrast(c1: [number, number, number], c2: [number, number, number]) {
  const L1 = relLum(c1);
  const L2 = relLum(c2);
  const [light, dark] = L1 >= L2 ? [L1, L2] : [L2, L1];
  return (light + 0.05) / (dark + 0.05);
}

async function getTokenColors(page: any, colorVarText: string, bgVarText: string) {
  return await page.evaluate(({ colorVarText, bgVarText }) => {
    const style = getComputedStyle(document.documentElement);
    const color = style.getPropertyValue(colorVarText).trim();
    const bg = style.getPropertyValue(bgVarText).trim();
    return { color, bg };
  }, { colorVarText, bgVarText });
}

test.describe('WCAG Contrast Tokens', () => {
  const pairs = [
    { color: '--glass-text-primary', bg: '--glass-bg-default', min: 4.5 },
    { color: '--glass-text-secondary', bg: '--glass-bg-default', min: 3.0 },
  ];

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  for (const mode of ['light', 'dark'] as const) {
    test(`tokens meet AA in ${mode} mode`, async ({ page }) => {
      if (mode === 'dark') {
        await page.emulateMedia({ colorScheme: 'dark' });
        await page.evaluate(() => document.documentElement.classList.add('dark'));
      } else {
        await page.emulateMedia({ colorScheme: 'light' });
        await page.evaluate(() => document.documentElement.classList.remove('dark'));
      }

      for (const { color, bg, min } of pairs) {
        const { color: c, bg: b } = await getTokenColors(page, color, bg);
        const pc = parseRGBA(c);
        const pb = parseRGBA(b);
        expect(pc, `${color} must be rgba`).toBeTruthy();
        expect(pb, `${bg} must be rgba`).toBeTruthy();
        if (pc && pb) {
          // Ignore alpha; approximate on RGB
          const ratio = contrast([pc[0], pc[1], pc[2]], [pb[0], pb[1], pb[2]]);
          expect(ratio).toBeGreaterThanOrEqual(min);
        }
      }
    });
  }
});

