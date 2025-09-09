/**
 * @deprecated Use createGlassStyle() from glassMixins instead
 * This file contains hardcoded glass values that bypass our token system.
 * Migrate to: createGlassStyle({ intent, elevation, tier })
 */

import { createGlassStyle, GlassOptions } from './glassMixins';

console.warn('[AuraGlass] glassSurface.ts is deprecated. Use createGlassStyle() from glassMixins instead.');

/**
 * @deprecated Use createGlassStyle() instead
 * @example createGlassStyle({ intent: 'neutral', elevation: 'level2' })
 */
export const glassSurface = (() => {
  console.warn('[AuraGlass] glassSurface export is deprecated. Use createGlassStyle().');
  return createGlassStyle({ intent: 'neutral', elevation: 'level2' });
})();

/**
 * @deprecated Use createGlassStyle({ interactive: true }) instead
 * @example createGlassStyle({ intent: 'neutral', elevation: 'level3', interactive: true })
 */
export const glassSurfaceHover = (() => {
  console.warn('[AuraGlass] glassSurfaceHover export is deprecated. Use createGlassStyle({ interactive: true }).');
  return createGlassStyle({ intent: 'neutral', elevation: 'level3', interactive: true });
})();

/**
 * @deprecated Use createGlassStyle() instead
 * @example createGlassStyle({ intent: 'neutral', elevation: 'level1' })
 */
export const glassSurfaceActive = (() => {
  console.warn('[AuraGlass] glassSurfaceActive export is deprecated. Use createGlassStyle().');
  return createGlassStyle({ intent: 'neutral', elevation: 'level1' });
})();

/**
 * @deprecated Use createGlassStyle() instead
 * @example createGlassStyle({ intent: 'neutral', elevation: 'level2', tier: 'high' })
 */
export const glassSurfaceFn = (options: {
  elevation?: string | number;
  backgroundOpacity?: number;
  blurStrength?: string;
  borderOpacity?: number;
  themeContext?: any;
} = {}) => {
  console.warn('[AuraGlass] glassSurfaceFn is deprecated. Use createGlassStyle() with proper intent/elevation/tier options.');
  
  // Map old options to new GlassOptions
  const glassOptions: GlassOptions = {
    intent: 'neutral',
    elevation: 'level2',
    tier: 'high',
  };
  
  // Basic elevation mapping
  if (typeof options.elevation === 'number') {
    if (options.elevation <= 1) glassOptions.elevation = 'level1';
    else if (options.elevation <= 2) glassOptions.elevation = 'level2';
    else if (options.elevation <= 3) glassOptions.elevation = 'level3';
    else glassOptions.elevation = 'level4';
  }
  
  return createGlassStyle(glassOptions);
};

/**
 * @deprecated Use createGlassStyle() instead
 * @example createGlassStyle({ intent: 'neutral', elevation: 'level2', tier: 'high' })
 */
export const glassSurfaceFunction = glassSurfaceFn;
