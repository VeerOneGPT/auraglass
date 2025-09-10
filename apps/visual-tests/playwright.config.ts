import { defineConfig, devices } from '@playwright/test';

/**
 * AuraGlass Visual Testing Configuration
 * Matrix: Light/Dark × Viewports × Motion × LTR/RTL
 */

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results.json' }],
    ['junit', { outputFile: 'junit.xml' }],
  ],
  
  use: {
    baseURL: 'http://localhost:6006',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    // Desktop - Light Theme
    {
      name: 'Desktop Chrome Light',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
        colorScheme: 'light',
      },
    },
    {
      name: 'Desktop Firefox Light',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1440, height: 900 },
        colorScheme: 'light',
      },
    },
    {
      name: 'Desktop Safari Light',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1440, height: 900 },
        colorScheme: 'light',
      },
    },
    
    // Desktop - Dark Theme
    {
      name: 'Desktop Chrome Dark',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
        colorScheme: 'dark',
      },
    },
    
    // Tablet
    {
      name: 'iPad Light',
      use: {
        ...devices['iPad'],
        colorScheme: 'light',
      },
    },
    {
      name: 'iPad Dark',
      use: {
        ...devices['iPad'],
        colorScheme: 'dark',
      },
    },
    
    // Mobile
    {
      name: 'iPhone 14 Light',
      use: {
        ...devices['iPhone 14'],
        colorScheme: 'light',
      },
    },
    {
      name: 'iPhone 14 Dark',
      use: {
        ...devices['iPhone 14'],
        colorScheme: 'dark',
      },
    },
    {
      name: 'Pixel 7 Light',
      use: {
        ...devices['Pixel 7'],
        colorScheme: 'light',
      },
    },
    
    // Reduced Motion
    {
      name: 'Desktop Reduced Motion',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
        reducedMotion: 'reduce',
      },
    },
    
    // High Contrast
    {
      name: 'Desktop High Contrast',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
        forcedColors: 'active',
      },
    },
    
    // RTL
    {
      name: 'Desktop RTL',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
        locale: 'ar-SA',
      },
    },
    
    // Ultra-wide
    {
      name: 'Ultra-wide',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    
    // Small Mobile
    {
      name: 'Small Mobile',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 320, height: 568 },
      },
    },
  ],

  webServer: {
    command: 'npm run storybook',
    url: 'http://localhost:6006',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});