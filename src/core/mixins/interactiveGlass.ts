import { CSSProperties } from 'react';

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

export const interactiveGlass = (config: InteractiveGlassConfig = {}): CSSProperties => {
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

  const baseStyles: CSSProperties = {
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition,
    userSelect: 'none',
  };

  // Note: Interactive styles should be handled in styled-components or CSS modules
  // This mixin provides the base styles, interactive states need to be added separately
  // Example implementation:
  // &:hover { transform: scale(scale); }
  // &:active { transform: scale(scale * 0.98); }
  // &:focus { outline: 2px solid rgba(255, 255, 255, 0.5); }

  if (disabled) {
    baseStyles.opacity = 0.5;
    baseStyles.pointerEvents = 'none';
  }

  return baseStyles;
};

export const createInteractiveGlassVariants = () => ({
  button: interactiveGlass({
    hover: true,
    active: true,
    focus: true,
    scale: 1.05,
    glow: true,
  }),

  card: interactiveGlass({
    hover: true,
    active: false,
    focus: true,
    scale: 1.02,
    glow: false,
  }),

  input: interactiveGlass({
    hover: true,
    active: false,
    focus: true,
    scale: 1.01,
    glow: false,
  }),

  subtle: interactiveGlass({
    hover: true,
    active: false,
    focus: false,
    scale: 1.01,
    glow: false,
  }),

  disabled: interactiveGlass({
    hover: false,
    active: false,
    focus: false,
    disabled: true,
  }),
});

// Ripple effect utilities
export const createRippleEffect = (color: string = 'rgba(255, 255, 255, 0.3)'): CSSProperties => ({
  position: 'relative',
  overflow: 'hidden',
  // Note: Ripple pseudo-elements should be handled in components
  // Implementation would look like:
  // &::after {
  //   content: '';
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   width: 0;
  //   height: 0;
  //   border-radius: 50%;
  //   background: color;
  //   transform: translate(-50%, -50%);
  //   transition: width 0.6s, height 0.6s;
  // }
  // &:active::after {
  //   width: 300px;
  //   height: 300px;
  // }
});

// Magnetic effect utilities
export const createMagneticEffect = (strength: number = 0.3): CSSProperties => ({
  transition: 'transform 0.3s ease',
  // Note: Hover effect should be implemented as:
  // &:hover {
  //   transform: translate(strength * 10px, strength * -10px);
  // }
});

// Glass button variants
export const glassButtonVariants = {
  primary: {
    ...interactiveGlass({ scale: 1.05, glow: true }),
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
  },

  secondary: {
    ...interactiveGlass({ scale: 1.03, glow: false }),
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.9)',
  },

  ghost: {
    ...interactiveGlass({ scale: 1.02, glow: false }),
    background: 'transparent',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'rgba(255, 255, 255, 0.8)',
  },
};

// Interactive state management
export interface InteractiveState {
  isHovered: boolean;
  isActive: boolean;
  isFocused: boolean;
  isDisabled: boolean;
}

export const createInteractiveStateStyles = (state: InteractiveState): CSSProperties => {
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

// Accessibility helpers
export const createAccessibleInteractiveStyles = (): CSSProperties => ({
  // Note: These styles should be implemented in styled-components or CSS modules:
  // &:focus-visible {
  //   outline: 2px solid rgba(255, 255, 255, 0.8);
  //   outline-offset: 2px;
  // }
  // @media (prefers-contrast: high) {
  //   border: 2px solid currentColor;
  // }
  // @media (prefers-reduced-motion: reduce) {
  //   transition: none;
  //   &:hover { transform: none; }
  //   &:active { transform: none; }
  // }
});

// Touch device optimizations
export const createTouchOptimizedStyles = (): CSSProperties => ({
  // Increase touch target size
  minWidth: '44px',
  minHeight: '44px',

  // Note: Active state should be implemented as:
  // &:active {
  //   transform: scale(0.95);
  //   transition: transform 0.1s ease;
  // }

  // Prevent text selection on touch
  WebkitTouchCallout: 'none',
  WebkitUserSelect: 'none',
  KhtmlUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  userSelect: 'none',
});
