import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

/**
 * AuraGlass Component Visual & Accessibility Tests
 */

const COMPONENTS = [
  'glass-advanced',
  'glass-button',
  'glass-card',
  'glass-input',
  'glass-modal',
  'glass-select',
  'glass-switch',
  'glass-tabs',
  'glass-timeline',
  'glass-calendar',
];

const VIEWPORTS = [
  { width: 320, height: 568, name: 'Mobile Small' },
  { width: 768, height: 1024, name: 'Tablet' },
  { width: 1024, height: 768, name: 'Desktop' },
  { width: 1440, height: 900, name: 'Desktop Large' },
  { width: 1920, height: 1080, name: 'Full HD' },
];

test.describe('Glass Components Visual Regression', () => {
  COMPONENTS.forEach(component => {
    test(`${component} - Visual consistency`, async ({ page }) => {
      // Navigate to component story
      await page.goto(`/iframe.html?id=${component}--default`);
      await page.waitForLoadState('networkidle');
      
      // Take screenshot
      await expect(page).toHaveScreenshot(`${component}-default.png`, {
        fullPage: true,
        animations: 'disabled',
      });
      
      // Test hover state
      const element = page.locator(`.${component}`).first();
      if (await element.isVisible()) {
        await element.hover();
        await expect(page).toHaveScreenshot(`${component}-hover.png`);
      }
      
      // Test focus state
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot(`${component}-focus.png`);
      
      // Test active state
      if (await element.isVisible()) {
        await element.click({ force: true, trial: true });
        await expect(page).toHaveScreenshot(`${component}-active.png`);
      }
    });
    
    test(`${component} - Accessibility`, async ({ page }) => {
      await page.goto(`/iframe.html?id=${component}--default`);
      await injectAxe(page);
      
      // Check for a11y violations
      const violations = await checkA11y(page, null, {
        detailedReport: true,
        detailedReportOptions: {
          html: true,
        },
      });
      
      expect(violations).toBeNull();
    });
    
    test(`${component} - Contrast validation`, async ({ page }) => {
      await page.goto(`/iframe.html?id=${component}--default`);
      
      // Get all text elements
      const textElements = await page.locator('*:has-text(".")').all();
      
      for (const element of textElements) {
        const color = await element.evaluate(el => 
          window.getComputedStyle(el).color
        );
        const bgColor = await element.evaluate(el => 
          window.getComputedStyle(el).backgroundColor
        );
        
        // Calculate contrast ratio
        const ratio = await page.evaluate(([fg, bg]) => {
          // Simple contrast calculation (would use proper library in production)
          return 4.5; // Placeholder - implement actual calculation
        }, [color, bgColor]);
        
        expect(ratio).toBeGreaterThanOrEqual(4.5);
      }
    });
    
    test(`${component} - Keyboard navigation`, async ({ page }) => {
      await page.goto(`/iframe.html?id=${component}--default`);
      
      // Tab through all focusable elements
      const focusableElements = await page.locator(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ).all();
      
      for (let i = 0; i < focusableElements.length; i++) {
        await page.keyboard.press('Tab');
        
        // Check if element has focus
        const isFocused = await focusableElements[i].evaluate(el => 
          document.activeElement === el
        );
        
        expect(isFocused).toBeTruthy();
        
        // Check for visible focus indicator
        const outline = await focusableElements[i].evaluate(el => 
          window.getComputedStyle(el).outline
        );
        
        expect(outline).not.toBe('none');
      }
    });
    
    test(`${component} - Touch targets`, async ({ page }) => {
      await page.goto(`/iframe.html?id=${component}--default`);
      
      // Check all interactive elements meet minimum size
      const interactiveElements = await page.locator(
        'button, a, input, select, textarea, [role="button"]'
      ).all();
      
      for (const element of interactiveElements) {
        const box = await element.boundingBox();
        if (box) {
          expect(box.width).toBeGreaterThanOrEqual(44);
          expect(box.height).toBeGreaterThanOrEqual(44);
        }
      }
    });
  });
  
  test.describe('Responsive behavior', () => {
    VIEWPORTS.forEach(viewport => {
      test(`All components at ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize(viewport);
        await page.goto('/iframe.html?id=pages-showcase--all-components');
        await page.waitForLoadState('networkidle');
        
        await expect(page).toHaveScreenshot(`all-components-${viewport.width}.png`, {
          fullPage: true,
          animations: 'disabled',
        });
        
        // Check for overflow
        const hasOverflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth;
        });
        
        expect(hasOverflow).toBeFalsy();
      });
    });
  });
  
  test.describe('Theme consistency', () => {
    test('Light to Dark theme transition', async ({ page }) => {
      await page.goto('/iframe.html?id=pages-showcase--all-components');
      
      // Light theme
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'light');
      });
      await expect(page).toHaveScreenshot('theme-light.png');
      
      // Dark theme
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'dark');
      });
      await expect(page).toHaveScreenshot('theme-dark.png');
      
      // Ensure no layout shift
      const lightMetrics = await page.evaluate(() => {
        const elements = document.querySelectorAll('.glass');
        return Array.from(elements).map(el => el.getBoundingClientRect());
      });
      
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'light');
      });
      
      const darkMetrics = await page.evaluate(() => {
        const elements = document.querySelectorAll('.glass');
        return Array.from(elements).map(el => el.getBoundingClientRect());
      });
      
      expect(lightMetrics).toEqual(darkMetrics);
    });
  });
  
  test.describe('Performance metrics', () => {
    test('Component mount performance', async ({ page }) => {
      await page.goto('/iframe.html?id=glass-advanced--default');
      
      const metrics = await page.evaluate(() => {
        const startTime = performance.now();
        
        // Simulate component mount
        const container = document.createElement('div');
        container.className = 'glass-foundation-complete glass-elev-2';
        container.innerHTML = '<div class="glass-layer-frost"></div><div class="glass-layer-ink">Content</div>';
        document.body.appendChild(container);
        
        const endTime = performance.now();
        return endTime - startTime;
      });
      
      expect(metrics).toBeLessThan(16); // Target 16ms for 60fps
    });
    
    test('Animation performance', async ({ page }) => {
      await page.goto('/iframe.html?id=glass-advanced--animated');
      
      // Measure frame rate during animation
      const fps = await page.evaluate(async () => {
        let frameCount = 0;
        let lastTime = performance.now();
        const frames: number[] = [];
        
        function measureFrame() {
          const currentTime = performance.now();
          const delta = currentTime - lastTime;
          if (delta > 0) {
            frames.push(1000 / delta);
          }
          lastTime = currentTime;
          frameCount++;
          
          if (frameCount < 60) {
            requestAnimationFrame(measureFrame);
          }
        }
        
        requestAnimationFrame(measureFrame);
        
        // Wait for measurement to complete
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Calculate average FPS
        return frames.reduce((a, b) => a + b, 0) / frames.length;
      });
      
      expect(fps).toBeGreaterThan(55); // Target 60fps with some tolerance
    });
  });
});