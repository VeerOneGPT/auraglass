module.exports = {
  displayName: 'Visual Regression Tests',
  testMatch: ['<rootDir>/tests/visual/**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/tests/visual/setup.js'],
  testTimeout: 60000,
  maxWorkers: 1, // Run visual tests serially to avoid conflicts
  
  // Image snapshot configuration
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  },
  
  // Coverage settings for visual tests
  collectCoverage: false, // Disable coverage for visual tests
  
  // Custom matchers
  setupFilesAfterEnv: [
    '<rootDir>/tests/visual/setup.js'
  ],
  
  // Module resolution
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};