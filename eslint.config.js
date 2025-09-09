/**
 * ESLint v9+ Configuration (Flat Config)
 * AuraGlass Design System with Glass Discipline Rules
 */

const auraglassPlugin = require('./eslint-plugin-auraglass.js');

module.exports = [
  // Main configuration for TypeScript/React files
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        project: './tsconfig.json'
      }
    },
    plugins: {
      'auraglass': auraglassPlugin
    },
    rules: {
      // AuraGlass Design System Rules - CRITICAL FOR UNIFIED GLASS
      'auraglass/no-inline-glass': 'error',
      'auraglass/require-glass-tokens': 'warn'
    }
  },

  // Storybook specific configuration - relax rules for demo purposes
  {
    files: ['src/**/*.stories.{js,jsx,ts,tsx}'],
    plugins: {
      'auraglass': auraglassPlugin
    },
    rules: {
      'auraglass/no-inline-glass': 'warn',
      'auraglass/require-glass-tokens': 'off'
    }
  },

  // Test files - allow inline glass for testing
  {
    files: ['**/*.{test,spec}.{js,jsx,ts,tsx}', '**/__tests__/**'],
    plugins: {
      'auraglass': auraglassPlugin
    },
    rules: {
      'auraglass/no-inline-glass': 'off',
      'auraglass/require-glass-tokens': 'off'
    }
  },

  // Configuration and script files - skip glass rules
  {
    files: ['*.config.{js,mjs,cjs}', 'scripts/**/*.{js,mjs,cjs}'],
    rules: {
      'auraglass/no-inline-glass': 'off',
      'auraglass/require-glass-tokens': 'off'
    }
  },

  // Global ignores
  {
    ignores: [
      'node_modules/**',
      'dist/**', 
      'build/**',
      'coverage/**',
      'src/styles/_deprecated/**',
      'src/styles/glass.generated.css',
      'reports/**'
    ]
  }
];