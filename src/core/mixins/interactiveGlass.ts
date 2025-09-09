/**
 * @deprecated Use createGlassStyle() from glassMixins instead
 * This file contains hardcoded glass interaction patterns that bypass our token system.
 * Migrate to: createGlassStyle({ interactive: true, hoverLift: true, focusRing: true })
 */

import { CSSProperties } from 'react';
import { createGlassStyle } from './glassMixins';

console.warn('[AuraGlass] interactiveGlass.ts is deprecated. Use createGlassStyle({ interactive: true }) from glassMixins instead.');

export interface InteractiveGlassConfig {
  hover?: boolean;
  active?: boolean;
  focus?: boolean;
  disabled?: boolean;
  scale?: number;
  glow?: boolean;
  ripple?: boolean;
  transition?: string;
}

/**
 * @deprecated Use createGlassStyle({ interactive: true, hoverLift: true, focusRing: true }) instead
 * @example createGlassStyle({ intent: 'neutral', elevation: 'level2', interactive: true, hoverLift: true })
 */
export const interactiveGlass = (config: InteractiveGlassConfig = {}): CSSProperties => {
  console.warn('[AuraGlass] interactiveGlass() is deprecated. Use createGlassStyle({ interactive: true, hoverLift: true, focusRing: true }).');
  
  const {
    hover = true,
    active = true,
    focus = true,
    disabled = false,
    scale = 1.02,
    glow = true,
    ripple = false,
    transition = 'all 0.2s ease',
  } = config;

  // Use the unified glass style with interactive options
  const baseStyles = createGlassStyle({
    intent: 'neutral',
    elevation: 'level2',
    interactive: true,
    hoverLift: hover,
    focusRing: focus,
  });

  // Add legacy interactive behavior
  const legacyStyles: CSSProperties = {
    cursor: disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
  };

  if (disabled) {
    legacyStyles.opacity = 0.5;
    legacyStyles.pointerEvents = 'none';
  }

  return { ...baseStyles, ...legacyStyles };
};

/**
 * @deprecated Use createGlassStyle() with appropriate options instead
 * @example createGlassStyle({ intent: 'primary', elevation: 'level2', interactive: true, hoverLift: true })
 */
export const createInteractiveGlassVariants = () => {
  console.warn('[AuraGlass] createInteractiveGlassVariants is deprecated. Use createGlassStyle() with intent/elevation/interactive options.');
  
  return {
    button: createGlassStyle({ intent: 'primary', elevation: 'level2', interactive: true, hoverLift: true, focusRing: true }),
    card: createGlassStyle({ intent: 'neutral', elevation: 'level2', interactive: true, hoverLift: true, focusRing: true }),
    input: createGlassStyle({ intent: 'neutral', elevation: 'level1', interactive: true, focusRing: true }),
    subtle: createGlassStyle({ intent: 'neutral', elevation: 'level1', interactive: true }),
    disabled: createGlassStyle({ intent: 'neutral', elevation: 'level1', interactive: false }),
  };
};

/**
 * @deprecated Use createGlassStyle({ interactive: true, ripple: true }) instead
 * @example createGlassStyle({ intent: 'primary', elevation: 'level2', interactive: true, ripple: true })
 */
export const createRippleEffect = (color: string = 'rgba(255, 255, 255, 0.3)'): CSSProperties => {
  console.warn('[AuraGlass] createRippleEffect is deprecated. Use createGlassStyle({ interactive: true, ripple: true }).');
  
  return {
    position: 'relative',
    overflow: 'hidden',
    // Note: Ripple effects are now handled by the unified glass system
    // Use createGlassStyle({ interactive: true, ripple: true }) instead
  };
};

/**
 * @deprecated Use createGlassStyle({ interactive: true, hoverLift: true }) instead
 * @example createGlassStyle({ intent: 'primary', elevation: 'level3', interactive: true, hoverLift: true })
 */
export const createMagneticEffect = (strength: number = 0.3): CSSProperties => {
  console.warn('[AuraGlass] createMagneticEffect is deprecated. Use createGlassStyle({ interactive: true, hoverLift: true }).');
  
  return {
    transition: 'transform 0.3s ease',
    // Note: Magnetic effects are now handled by the unified glass system
    // Use createGlassStyle({ interactive: true, hoverLift: true }) instead
  };
};

/**
 * @deprecated Use createGlassStyle() with appropriate intent instead
 * @example createGlassStyle({ intent: 'primary', elevation: 'level2', interactive: true })
 */
export const glassButtonVariants = (() => {
  console.warn('[AuraGlass] glassButtonVariants is deprecated. Use createGlassStyle() with intent: "primary", "secondary", etc.');
  
  return {
    primary: createGlassStyle({ intent: 'primary', elevation: 'level2', interactive: true, hoverLift: true, focusRing: true }),
    secondary: createGlassStyle({ intent: 'secondary', elevation: 'level2', interactive: true, hoverLift: true, focusRing: true }),
    ghost: createGlassStyle({ intent: 'neutral', elevation: 'level1', interactive: true, hoverLift: true, focusRing: true }),
  };
})();

// Interactive state management
export interface InteractiveState {
  isHovered: boolean;
  isActive: boolean;
  isFocused: boolean;
  isDisabled: boolean;
}

/**
 * @deprecated Use createGlassStyle({ interactive: true, hoverLift: true, focusRing: true }) instead
 * @example createGlassStyle({ intent: 'primary', elevation: 'level2', interactive: true, hoverLift: true, focusRing: true })
 */
export const createInteractiveStateStyles = (state: InteractiveState): CSSProperties => {
  console.warn('[AuraGlass] createInteractiveStateStyles is deprecated. Use createGlassStyle({ interactive: true, hoverLift: true, focusRing: true }).');
  
  const styles: CSSProperties = {};

  if (state.isDisabled) {
    styles.opacity = 0.5;
    styles.cursor = 'not-allowed';
    styles.pointerEvents = 'none';
  } else {
    if (state.isHovered) {
      styles.transform = 'scale(1.02)';
      styles.boxShadow = '0 0 20px rgba(255, 255, 255, 0.2)';
    }

    if (state.isActive) {
      styles.transform = 'scale(0.98)';
    }

    if (state.isFocused) {
      styles.outline = '2px solid rgba(255, 255, 255, 0.5)';
      styles.outlineOffset = '2px';
    }
  }

  return styles;
};

/**
 * @deprecated Use createGlassStyle({ interactive: true, focusRing: true, a11y: true }) instead
 * @example createGlassStyle({ intent: 'primary', elevation: 'level2', interactive: true, focusRing: true, a11y: true })
 */
export const createAccessibleInteractiveStyles = (): CSSProperties => {
  console.warn('[AuraGlass] createAccessibleInteractiveStyles is deprecated. Use createGlassStyle({ interactive: true, focusRing: true, a11y: true }).');
  
  return {
    // Note: These styles are now handled by the unified glass system
    // Use createGlassStyle({ interactive: true, focusRing: true, a11y: true }) instead
  };
};

/**
 * @deprecated Use createGlassStyle({ interactive: true, touchOptimized: true }) instead
 * @example createGlassStyle({ intent: 'primary', elevation: 'level2', interactive: true, touchOptimized: true })
 */
export const createTouchOptimizedStyles = (): CSSProperties => {
  console.warn('[AuraGlass] createTouchOptimizedStyles is deprecated. Use createGlassStyle({ interactive: true, touchOptimized: true }).');
  
  return {
    // Increase touch target size
    minWidth: '44px',
    minHeight: '44px',

    // Note: Touch optimizations are now handled by the unified glass system
    // Use createGlassStyle({ interactive: true, touchOptimized: true }) instead

    // Prevent text selection on touch
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    KhtmlUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    userSelect: 'none',
  };
};
