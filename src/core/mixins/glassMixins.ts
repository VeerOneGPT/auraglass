import { CSSProperties } from 'react';

export type GlassVariant = 'frosted' | 'crystal' | 'tinted' | 'metallic' | 'neon' | 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'info' | 'default' | 'elevated' | 'outlined' | 'interactive' | 'feature' | 'minimal' | 'outline' | 'floating';
export type BlurIntensity = 'none' | 'subtle' | 'medium' | 'strong' | 'intense';
export type GlassElevation = 0 | 1 | 2 | 3 | 4 | 'float' | number;

export interface GlassMixinOptions {
  variant?: GlassVariant;
  blur?: BlurIntensity;
  elevation?: GlassElevation;
  tint?: string;
  opacity?: number;
  borderRadius?: string;
  interactive?: boolean;
  performanceMode?: 'high' | 'balanced' | 'low';
  glow?: boolean;
  glowColor?: string;
  glowIntensity?: number;
}

export interface PerformanceOptions {
  mode?: 'high' | 'balanced' | 'low';
  prefersReducedMotion?: boolean;
  devicePixelRatio?: number;
}

// Performance-optimized blur values
const BLUR_VALUES = {
  none: '0px',
  subtle: '4px',
  medium: '8px',
  strong: '16px',
  intense: '24px',
} as const;

// Optimized shadow values for better performance
const ELEVATION_SHADOWS = {
  0: 'none',
  1: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
  2: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
  3: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
  4: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
  float: '0 20px 40px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22)',
} as const;

// Glass variant base styles
const GLASS_VARIANTS = {
  frosted: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  crystal: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  tinted: {
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
  },
  metallic: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  neon: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(0, 255, 255, 0.3)',
    boxShadow: '0 0 20px rgba(0, 255, 255, 0.1)',
  },
  primary: {
    background: 'rgba(59, 130, 246, 0.1)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
  },
  secondary: {
    background: 'rgba(107, 114, 128, 0.1)',
    border: '1px solid rgba(107, 114, 128, 0.3)',
  },
  error: {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
  },
  success: {
    background: 'rgba(34, 197, 94, 0.1)',
    border: '1px solid rgba(34, 197, 94, 0.3)',
  },
  warning: {
    background: 'rgba(245, 158, 11, 0.1)',
    border: '1px solid rgba(245, 158, 11, 0.3)',
  },
  info: {
    background: 'rgba(14, 165, 233, 0.1)',
    border: '1px solid rgba(14, 165, 233, 0.3)',
  },
  default: {
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  elevated: {
    background: 'rgba(255, 255, 255, 0.12)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
  },
  outlined: {
    background: 'transparent',
    border: '2px solid rgba(255, 255, 255, 0.3)',
  },
  interactive: {
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  feature: {
    background: 'rgba(255, 255, 255, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  minimal: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  outline: {
    background: 'transparent',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  floating: {
    background: 'rgba(255, 255, 255, 0.12)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
  },
} as const;

/**
 * Generate optimized glass morphism styles
 */
export const createGlassMixin = (options: GlassMixinOptions = {}): CSSProperties => {
  const {
    variant = 'frosted',
    blur = 'medium',
    elevation = 1,
    tint,
    opacity = 1,
    borderRadius = '12px',
    interactive = false,
    performanceMode = 'balanced',
    glow = false,
    glowColor = 'rgba(255, 255, 255, 0.5)',
    glowIntensity = 0.5,
  } = options;

  const baseStyles = GLASS_VARIANTS[variant];
  const blurValue = BLUR_VALUES[blur];
  const shadowValue = ELEVATION_SHADOWS[elevation as keyof typeof ELEVATION_SHADOWS] || ELEVATION_SHADOWS[1];

  // Performance optimizations based on mode
  const willChange = performanceMode === 'high' ? 'transform, opacity' : 'auto';
  const backfaceVisibility = performanceMode === 'high' ? 'hidden' : 'visible';

  const styles: CSSProperties = {
    ...baseStyles,
    backdropFilter: blur !== 'none' ? `blur(${blurValue})` : 'none',
    WebkitBackdropFilter: blur !== 'none' ? `blur(${blurValue})` : 'none', // Safari support
    boxShadow: shadowValue,
    borderRadius,
    opacity,
    willChange,
    backfaceVisibility: backfaceVisibility as any,
    transform: 'translateZ(0)', // Force hardware acceleration
  };

  // Apply custom tint if provided
  if (tint) {
    const tintRgba = hexToRgba(tint, 0.1);
    styles.background = `${styles.background}, ${tintRgba}`;
  }

  // Apply glow effect if enabled
  if (glow) {
    styles.boxShadow = `${styles.boxShadow}, 0 0 ${glowIntensity * 20}px ${glowColor}`;
  }

  // Interactive states
  if (interactive) {
    styles.cursor = 'pointer';
    styles.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
  }

  return styles;
};

/**
 * Generate hover state styles for glass elements
 */
export const createGlassHoverMixin = (options: GlassMixinOptions = {}): CSSProperties => {
  const {
    variant = 'frosted',
    elevation = 1,
    performanceMode = 'balanced',
  } = options;

  const hoverElevation = Math.min((elevation as number) + 1, 4) as GlassElevation;
  const baseStyles = GLASS_VARIANTS[variant];

  return {
    background: variant === 'frosted' 
      ? 'rgba(255, 255, 255, 0.15)'
      : baseStyles.background,
    boxShadow: ELEVATION_SHADOWS[hoverElevation as keyof typeof ELEVATION_SHADOWS] || ELEVATION_SHADOWS[1],
    transform: performanceMode === 'high' 
      ? 'translateY(-2px) scale(1.02)' 
      : 'translateY(-1px)',
  };
};

/**
 * Generate focus state styles for glass elements
 */
export const createGlassFocusMixin = (options: GlassMixinOptions = {}): CSSProperties => {
  const { tint = '#3b82f6' } = options;

  return {
    outline: 'none',
    boxShadow: `0 0 0 3px ${hexToRgba(tint, 0.3)}`,
    borderColor: hexToRgba(tint, 0.5),
  };
};

/**
 * Generate disabled state styles for glass elements
 */
export const createGlassDisabledMixin = (): CSSProperties => ({
  opacity: 0.5,
  cursor: 'not-allowed',
  pointerEvents: 'none',
  filter: 'grayscale(0.3)',
});

/**
 * Generate loading state styles for glass elements
 */
export const createGlassLoadingMixin = (): CSSProperties => ({
  position: 'relative',
  overflow: 'hidden',
  // Note: Pseudo-elements should be handled separately in styled-components or CSS modules
  // This mixin provides the base styles, pseudo-elements need to be added in the component
});

/**
 * Utility function to convert hex to rgba
 */
export const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * Generate CSS variables for glass themes
 */
export const generateGlassThemeVariables = (theme: {
  primary: string;
  secondary: string;
  accent: string;
  surface: string;
  background: string;
}): Record<string, string> => ({
  '--glass-primary': theme.primary,
  '--glass-secondary': theme.secondary,
  '--glass-accent': theme.accent,
  '--glass-surface': theme.surface,
  '--glass-background': theme.background,
  '--glass-primary-alpha': hexToRgba(theme.primary, 0.1),
  '--glass-secondary-alpha': hexToRgba(theme.secondary, 0.1),
  '--glass-accent-alpha': hexToRgba(theme.accent, 0.1),
});

/**
 * Responsive glass mixins for different screen sizes
 */
export const createResponsiveGlassMixin = (
  mobile: GlassMixinOptions,
  tablet: GlassMixinOptions,
  desktop: GlassMixinOptions
): Record<string, CSSProperties> => ({
  // Mobile first approach
  base: createGlassMixin({ ...mobile, performanceMode: 'low' }),
  tablet: createGlassMixin({ ...tablet, performanceMode: 'balanced' }),
  desktop: createGlassMixin({ ...desktop, performanceMode: 'high' }),
});

/**
 * Performance-optimized glass animation keyframes
 */
export const GLASS_ANIMATIONS = {
  shimmer: `
    @keyframes glass-shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
  `,
  float: `
    @keyframes glass-float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
  `,
  pulse: `
    @keyframes glass-pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.05); }
    }
  `,
  glow: `
    @keyframes glass-glow {
      0%, 100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.1); }
      50% { box-shadow: 0 0 40px rgba(255, 255, 255, 0.2); }
    }
  `,
};

/**
 * CSS-in-JS helper for injecting glass animations
 */
export const injectGlassAnimations = (): void => {
  if (typeof document === 'undefined') return;

  const styleId = 'glass-animations';
  if (document.getElementById(styleId)) return;

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = Object.values(GLASS_ANIMATIONS).join('\n');
  document.head.appendChild(style);
};

/**
 * Generate performance-optimized styles based on device capabilities
 */
export const createPerformanceMixin = (options: PerformanceOptions = {}): CSSProperties => {
  const {
    mode = 'balanced',
    prefersReducedMotion = false,
    devicePixelRatio = 1,
  } = options;

  const styles: CSSProperties = {};

  // Performance optimizations based on mode
  switch (mode) {
    case 'low':
      styles.willChange = 'auto';
      styles.backfaceVisibility = 'visible';
      styles.transform = 'none';
      styles.backdropFilter = 'none';
      styles.WebkitBackdropFilter = 'none';
      break;

    case 'high':
      styles.willChange = 'transform, opacity';
      styles.backfaceVisibility = 'hidden';
      styles.transform = 'translateZ(0)'; // Force hardware acceleration
      break;

    case 'balanced':
    default:
      styles.willChange = 'auto';
      styles.backfaceVisibility = 'visible';
      if (devicePixelRatio >= 2) {
        styles.transform = 'translateZ(0)';
      }
      break;
  }

  // Respect reduced motion preferences
  if (prefersReducedMotion) {
    styles.transition = 'none';
    styles.animation = 'none';
    styles.willChange = 'auto';
  }

  return styles;
};

/**
 * Create glass morphism CSS string for styled-components or emotion
 */
export const glassCSS = (options: GlassMixinOptions = {}): string => {
  const styles = createGlassMixin(options);

  return Object.entries(styles)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${cssKey}: ${value};`;
    })
    .join('\n  ');
};

/**
 * Advanced glass morphism with custom gradients and effects
 */
export const createAdvancedGlassMixin = (options: GlassMixinOptions & {
  gradient?: string[];
  noise?: boolean;
  reflection?: boolean;
  caustics?: boolean;
} = {}): CSSProperties => {
  const {
    gradient,
    noise = false,
    reflection = false,
    caustics = false,
    ...baseOptions
  } = options;

  const styles = createGlassMixin(baseOptions);

  // Custom gradient overlay
  if (gradient && gradient.length > 1) {
    const gradientString = `linear-gradient(135deg, ${gradient.join(', ')})`;
    styles.background = `${styles.background}, ${gradientString}`;
  }

  // Noise texture
  if (noise) {
    styles.background = `${styles.background}, url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`;
  }

  // Reflection effect
  if (reflection) {
    styles.position = 'relative';
    // Note: Reflection pseudo-element should be handled separately
    // This would typically be implemented as:
    // &::before {
    //   content: '';
    //   position: absolute;
    //   top: 10%;
    //   left: 10%;
    //   right: 60%;
    //   height: 20%;
    //   background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), transparent);
    //   border-radius: 50%;
    //   filter: blur(10px);
    // }
  }

  return styles;
};
