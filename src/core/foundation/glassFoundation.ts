/**
 * @deprecated Use createGlassStyle() from glassMixins instead
 * This file contains hardcoded glass foundation values that bypass our unified token system.
 * Migrate to: createGlassStyle({ intent, elevation, tier })
 * 
 * AURA GLASS - FOUNDATION ARCHITECTURE (DEPRECATED)
 * 
 * This module provides the architectural foundation for all glassmorphism components.
 * Components MUST use these utilities to ensure consistent, visible glass effects.
 */

import { CSSProperties } from 'react';
import { createGlassStyle } from '../mixins/glassMixins';

console.warn('[AuraGlass] glassFoundation.ts is deprecated. Use createGlassStyle() from glassMixins instead.');

// Foundation opacity values - THESE ARE MINIMUMS, never go below these
export const GLASS_FOUNDATION = {
  opacity: {
    subtle: 0.25,     // Visible presence (matches CSS --glass-bg)
    min: 0.25,        // Foundation minimum (matches CSS)
    standard: 0.3,    // Standard visibility (matches CSS) 
    strong: 0.4,      // High visibility (matches CSS --glass-bg-strong)
    bold: 0.5,        // Maximum foundation opacity
  },
  
  blur: {
    subtle: 'blur(8px)',
    standard: 'blur(16px)',
    strong: 'blur(24px)', 
    intense: 'blur(32px)',
  },
  
  enhancements: {
    saturate: 'saturate(180%)',
    brightness: 'brightness(1.15)',
    contrast: 'contrast(1.08)',
  },
  
  borders: {
    subtle: 'rgba(255, 255, 255, 0.2)',
    standard: 'rgba(255, 255, 255, 0.3)',
    strong: 'rgba(255, 255, 255, 0.4)',
    bold: 'rgba(255, 255, 255, 0.5)',
  },
  
  shadows: {
    subtle: '0 8px 32px rgba(0, 0, 0, 0.15)',
    standard: '0 12px 40px rgba(0, 0, 0, 0.2)',
    strong: '0 16px 48px rgba(0, 0, 0, 0.25)',
    bold: '0 20px 56px rgba(0, 0, 0, 0.3)',
  },
} as const;

export type GlassFoundationLevel = 'subtle' | 'standard' | 'strong' | 'bold';
export type GlassBlurLevel = 'subtle' | 'standard' | 'strong' | 'intense';

/**
 * @deprecated Use createGlassStyle() instead
 * @example createGlassStyle({ intent: 'neutral', elevation: 'level2', tier: 'high' })
 * 
 * Core foundation mixin - ALL components must use this as their base
 */
export function createGlassFoundation(
  level: GlassFoundationLevel = 'standard',
  blurLevel: GlassBlurLevel = 'standard'
): CSSProperties {
  console.warn('[AuraGlass] createGlassFoundation() is deprecated. Use createGlassStyle() instead.');
  
  const opacityKey = level;
  
  return {
    position: 'relative',
    backdropFilter: [
      GLASS_FOUNDATION.blur[blurLevel],
      GLASS_FOUNDATION.enhancements.saturate,
      GLASS_FOUNDATION.enhancements.brightness,
      GLASS_FOUNDATION.enhancements.contrast,
    ].join(' '),
    WebkitBackdropFilter: [
      GLASS_FOUNDATION.blur[blurLevel],
      GLASS_FOUNDATION.enhancements.saturate,
      GLASS_FOUNDATION.enhancements.brightness,
      GLASS_FOUNDATION.enhancements.contrast,
    ].join(' '),
    background: `rgba(255, 255, 255, ${GLASS_FOUNDATION.opacity[opacityKey]})`,
    border: `1px solid ${GLASS_FOUNDATION.borders[level]}`,
    boxShadow: GLASS_FOUNDATION.shadows[level],
    borderRadius: '16px',
  };
}

/**
 * Extended foundation mixin - allows components to enhance the foundation
 */
export function extendGlassFoundation(
  baseLevel: GlassFoundationLevel = 'standard',
  extensions: Partial<{
    opacity: number;
    blur: string;
    background: string;
    border: string;
    borderRadius: string;
    boxShadow: string;
    additionalFilters: string[];
  }> = {}
): CSSProperties {
  
  const foundation = createGlassFoundation(baseLevel);
  
  // Ensure opacity never goes below foundation minimum
  const safeOpacity = extensions.opacity && extensions.opacity>= GLASS_FOUNDATION.opacity.min 
    ? extensions.opacity 
    : GLASS_FOUNDATION.opacity[baseLevel];
  
  // Combine backdrop filters
  const baseFilters = [
    extensions.blur || GLASS_FOUNDATION.blur.standard,
    GLASS_FOUNDATION.enhancements.saturate,
    GLASS_FOUNDATION.enhancements.brightness,
    GLASS_FOUNDATION.enhancements.contrast,
  ];
  
  if (extensions.additionalFilters) {
    baseFilters.push(...extensions.additionalFilters);
  }
  
  return {
    ...foundation,
    backdropFilter: baseFilters.join(' '),
    WebkitBackdropFilter: baseFilters.join(' '),
    background: extensions.background || `rgba(255, 255, 255, ${safeOpacity})`,
    border: extensions.border || foundation.border,
    borderRadius: extensions.borderRadius || foundation.borderRadius,
    boxShadow: extensions.boxShadow || foundation.boxShadow,
  };
}

/**
 * Styled-components helper - injects foundation into styled-components CSS
 */
export function injectGlassFoundation(
  level: GlassFoundationLevel = 'standard',
  blurLevel: GlassBlurLevel = 'standard'
): string {
  const foundation = createGlassFoundation(level, blurLevel);
  
  return Object.entries(foundation)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${cssKey}: ${value};`;
    })
    .join('\n  ');
}

/**
 * CSS-in-JS template literal helper
 */
export function glassFoundationCSS(
  level: GlassFoundationLevel = 'standard',
  blurLevel: GlassBlurLevel = 'standard'
): string {
  return injectGlassFoundation(level, blurLevel);
}

/**
 * Validate that a component's glass values meet foundation requirements
 */
export function validateGlassFoundation(styles: {
  background?: string;
  backdropFilter?: string;
  opacity?: number;
}): boolean {
  // Extract opacity from background if it's rgba
  let actualOpacity = styles.opacity;
  
  if (!actualOpacity && styles.background) {
    const rgbaMatch = styles.background.match(/rgba\([\d,\s]+,\s*([\d.]+)\)/);
    if (rgbaMatch) {
      actualOpacity = parseFloat(rgbaMatch[1]);
    }
  }
  
  // Check if opacity meets minimum foundation requirements
  if (actualOpacity && actualOpacity < GLASS_FOUNDATION.opacity.min) {
    console.warn(`Glass component opacity ${actualOpacity} is below foundation minimum ${GLASS_FOUNDATION.opacity.min}`);
    return false;
  }
  
  // Check if backdrop filter exists
  if (!styles.backdropFilter || styles.backdropFilter === 'none') {
    console.warn('Glass component missing backdrop-filter');
    return false;
  }
  
  return true;
}

/**
 * Storybook mode enhancements
 */
export function enhanceForStorybookMode(
  foundation: CSSProperties,
  mode: 'studio' | 'showcase' = 'studio'
): CSSProperties {
  
  if (mode === 'showcase') {
    return {
      ...foundation,
      backdropFilter: [
        'blur(32px)',
        'saturate(250%)',
        'brightness(1.3)',
        'contrast(1.1)',
      ].join(' '),
      WebkitBackdropFilter: [
        'blur(32px)', 
        'saturate(250%)',
        'brightness(1.3)',
        'contrast(1.1)',
      ].join(' '),
      background: `rgba(255, 255, 255, ${GLASS_FOUNDATION.opacity.strong})`,
      border: `2px solid ${GLASS_FOUNDATION.borders.strong}`,
      boxShadow: [
        '0 0 80px rgba(59,130,246,0.3)',
        '0 0 160px rgba(147,51,234,0.15)', 
        GLASS_FOUNDATION.shadows.strong,
        '0 2px 0 rgba(255,255,255,0.3) inset',
      ].join(', '),
    };
  }
  
  // Studio mode - clean but properly visible
  return {
    ...foundation,
    background: `rgba(255, 255, 255, ${Math.max(GLASS_FOUNDATION.opacity.standard, 0.25)})`,
    border: `1px solid rgba(255, 255, 255, 0.35)`,
  };
}

/**
 * Performance-optimized foundation for mobile/low-power devices
 */
export function createOptimizedGlassFoundation(
  level: GlassFoundationLevel = 'standard'
): CSSProperties {
  return {
    position: 'relative',
    backdropFilter: GLASS_FOUNDATION.blur.subtle + ' ' + GLASS_FOUNDATION.enhancements.saturate,
    WebkitBackdropFilter: GLASS_FOUNDATION.blur.subtle + ' ' + GLASS_FOUNDATION.enhancements.saturate,
    background: `rgba(255, 255, 255, ${GLASS_FOUNDATION.opacity[level]})`,
    border: `1px solid ${GLASS_FOUNDATION.borders[level]}`,
    boxShadow: GLASS_FOUNDATION.shadows[level],
    borderRadius: '12px',
  };
}
