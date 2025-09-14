/**
 * @deprecated Use createGlassStyle() from glassMixins instead
 * This file contains hardcoded glass values that bypass our token system.
 * Migrate to: createGlassStyle()
 */

import { createGlassStyle } from './glassMixins';

console.warn('[AuraGlass] glassBorder.ts is deprecated. Use createGlassStyle() instead.');

/**
 * @deprecated Use createGlassStyle() instead
 * @example createGlassStyle({ intent: 'neutral', elevation: 'level2' })
 */
export const glassBorder: { border: string | number; borderRadius: string | number } = (() => {
  console.warn('[AuraGlass] glassBorder export is deprecated. Use createGlassStyle().');
  const styles = createGlassStyle();
  return {
    border: styles.border || '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: styles.borderRadius || '8px',
  };
})();

/**
 * @deprecated Use createGlassStyle({ interactive: true }) instead
 * @example createGlassStyle({ intent: 'neutral', elevation: 'level2', interactive: true })
 */
export const glassBorderHover: { border: string | number; borderRadius: string | number } = (() => {
  console.warn('[AuraGlass] glassBorderHover export is deprecated. Use createGlassStyle({ interactive: true }).');
  const styles = createGlassStyle({ intent: 'neutral', elevation: 'level3', interactive: true });
  return {
    border: styles.border || '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: styles.borderRadius || '8px',
  };
})();
