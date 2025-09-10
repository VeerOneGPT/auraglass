/**
 * Jest test setup file for AuraGlass
 * This file configures Jest globals and testing utilities
 */

import '@testing-library/jest-dom';

// Mock global APIs that might not be available in test environment
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
});

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
    takeRecords: jest.fn().mockReturnValue([]),
  })),
});

// Mock performance.memory for performance tests
Object.defineProperty(performance, 'memory', {
  writable: true,
  value: {
    usedJSHeapSize: 1000000,
    totalJSHeapSize: 2000000,
    jsHeapSizeLimit: 4000000000,
  },
});

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn().mockImplementation((cb) => {
  return setTimeout(cb, 16);
});

global.cancelAnimationFrame = jest.fn().mockImplementation((id) => {
  clearTimeout(id);
});

// Export common testing utilities
export * from './testingUtils';
