import React, { forwardRef, useMemo } from 'react';
import { cn } from '../lib/utilsComprehensive';
import { createGlassMixin, GlassVariant, BlurIntensity, GlassElevation } from '../core/mixins/glassMixins';
import { detectDevice } from '../utils/deviceCapabilities';

export interface OptimizedGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Glass morphism variant */
  variant?: GlassVariant;

  /** Blur strength */
  blur?: BlurIntensity;

  /** Background opacity */
  opacity?: number;

  /** Elevation level */
  elevation?: GlassElevation;

  /** Border radius */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

  /** Enable glow effect */
  glow?: boolean;

  /** Glow color */
  glowColor?: string;

  /** Glow intensity */
  glowIntensity?: number;

  /** Enable hover effects */
  hover?: boolean;

  /** Performance optimization level */
  optimization?: 'auto' | 'high' | 'medium' | 'low';

  /** Enable hardware acceleration */
  hardwareAcceleration?: boolean;

  /** Glass intensity (blur strength level) */
  intensity?: 'subtle' | 'medium' | 'strong' | 'intense' | 'ultra' | 'extreme';

  /** Glass depth effect */
  depth?: 'shallow' | 'medium' | 'deep' | 'extreme' | number;

  /** Glass tint color */
  tint?: string;

  /** Border configuration */
  border?: 'none' | 'subtle' | 'medium' | 'strong' | 'glow' | 'gradient' | 'neon' | 'dynamic' | 'particle';

  /** Enable interactive effects */
  interactive?: boolean;

  /** Enable press effect */
  press?: boolean;

  /** Animation preset */
  animation?: 'none' | 'fade' | 'slide' | 'scale' | 'bounce' | 'pulse' | 'float' | string;

  /** Performance mode */
  performanceMode?: 'high' | 'balanced' | 'low' | 'medium' | 'ultra';

  /** Enable lift on hover effect */
  liftOnHover?: boolean;

  /** Enable hover sheen effect */
  hoverSheen?: boolean;

  /** Lighting effect */
  lighting?: 'ambient' | 'directional' | 'point' | 'spot' | 'none' | 'iridescent' | 'volumetric' | 'caustic' | 'natural' | 'studio';

  /** Custom CSS classes */
  className?: string;

  /** Children elements */
  children?: React.ReactNode;
}

const OptimizedGlassCore = forwardRef<HTMLDivElement, OptimizedGlassProps>(
  (
    {
      variant = 'frosted',
      blur = 'standard',
      opacity = 0.1,
      elevation = 1,
      rounded = 'md',
      glow = false,
      glowColor = 'rgba(255, 255, 255, 0.5)',
      glowIntensity = 0.5,
      hover = false,
      optimization = 'auto',
      hardwareAcceleration = true,
      intensity = 'medium',
      depth = 'medium',
      tint,
      border = 'subtle',
      interactive = false,
      press = false,
      animation = 'none',
      performanceMode = 'balanced',
      liftOnHover = false,
      hoverSheen = false,
      lighting = 'none',
      className,
      children,
      style,
      ...props
    },
    ref
  ) => {
    // Detect device capabilities for optimization
    const device = useMemo(() => detectDevice(), []);

    // Determine optimization level based on device capabilities
    const computedOptimization = useMemo(() => {
      if (optimization !== 'auto') return optimization;

      if (device.capabilities.gpu && device.capabilities.hardwareAcceleration) {
        return 'high';
      } else if (device.capabilities.webgl) {
        return 'medium';
      } else {
        return 'low';
      }
    }, [optimization, device.capabilities]);

    // Optimize glass styles based on performance level
    const optimizedStyles = useMemo(() => {
      const baseStyles = createGlassMixin({
        variant,
        blur: computedOptimization === 'low' ? 'none' : (intensity === 'subtle' ? 'subtle' : intensity === 'medium' ? 'medium' : intensity === 'strong' ? 'strong' : 'intense'),
        opacity: computedOptimization === 'low' ? 0.05 : opacity,
        elevation,
        tint,
        interactive,
        glow: computedOptimization !== 'low' && glow,
        glowColor,
        glowIntensity,
        borderRadius: rounded === 'none' ? '0px' : rounded === 'sm' ? '4px' : rounded === 'md' ? '8px' : rounded === 'lg' ? '12px' : rounded === 'xl' ? '16px' : rounded === 'full' ? '9999px' : '8px',
      });

      // Add hardware acceleration
      if (hardwareAcceleration && computedOptimization !== 'low') {
        baseStyles.transform = baseStyles.transform || 'translateZ(0)';
        baseStyles.willChange = 'transform, opacity';
      }

      // Performance optimizations
      if (computedOptimization === 'low') {
        baseStyles.backdropFilter = 'none';
        baseStyles.WebkitBackdropFilter = 'none';
      }

      return baseStyles;
    }, [
      variant,
      blur,
      opacity,
      elevation,
      glow,
      glowColor,
      glowIntensity,
      rounded,
      computedOptimization,
      hardwareAcceleration,
      intensity,
      depth,
      tint,
      border,
      interactive,
      press,
      animation,
      performanceMode,
      liftOnHover,
      hoverSheen,
      lighting,
    ]);

    // Combine custom styles with optimized glass styles
    const combinedStyles = {
      ...optimizedStyles,
      ...style,
    };

    return (
      <div
        ref={ref}
        className={cn(
          'optimized-glass-surface',
          {
            'glass-frosted': variant === 'frosted',
            'glass-crystal': variant === 'crystal',
            'glass-tinted': variant === 'tinted',
            'glass-metallic': variant === 'metallic',
            'glass-neon': variant === 'neon',
            'glass-hover': hover,
            'glass-interactive': interactive,
            'glass-lift-on-hover': liftOnHover,
            'glass-hover-sheen': hoverSheen,
            'glass-glow': glow && computedOptimization !== 'low',
            'glass-optimized-high': computedOptimization === 'high',
            'glass-optimized-medium': computedOptimization === 'medium',
            'glass-optimized-low': computedOptimization === 'low',
            [`glass-intensity-${intensity}`]: intensity,
            [`glass-depth-${depth}`]: depth,
            [`glass-border-${border}`]: border && border !== 'none',
          },
          className
        )}
        style={combinedStyles}
        {...props}
      >
        {children}
      </div>
    );
  }
);

OptimizedGlassCore.displayName = 'OptimizedGlassCore';

export { OptimizedGlassCore };
export default OptimizedGlassCore;
