import React, { forwardRef, useMemo } from 'react';
import { createGlassStyle, GlassOptions } from '../core/mixins/glassMixins';
import { cn } from '../lib/utilsComprehensive';
import { detectDevice } from '../utils/deviceCapabilities';

// Polymorphic component type helper
type PolymorphicRef<T extends React.ElementType> = React.ComponentPropsWithRef<T>['ref'];
type PolymorphicComponentProps<T extends React.ElementType, Props = {}> = {
  as?: T;
} & Props & Omit<React.ComponentPropsWithoutRef<T>, keyof Props>;

export interface OptimizedGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The HTML element or component to render as */
  as?: React.ElementType;
  /** Glass intent (replaces variant) */
  intent?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';

  /** Glass elevation level */
  elevation?: 'level1' | 'level2' | 'level3' | 'level4' | 'level5';

  /** Performance tier */
  tier?: 'high' | 'medium' | 'low';

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

  /** Blur intensity for backdrop-filter */
  blur?: 'none' | 'subtle' | 'medium' | 'strong' | 'intense';

  /** Glass variant */
  variant?: 'clear' | 'frosted' | 'tinted' | 'luminous' | 'dynamic' | 'crystal';

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

const OptimizedGlassCore = forwardRef<
  React.ElementRef<any>,
  PolymorphicComponentProps<React.ElementType, OptimizedGlassProps>
>((props, ref) => {
  const {
    as: Component = 'div',
    intent = 'neutral',
    elevation = 'level2',
    tier = 'high',
    rounded = 'md',
    glow = false,
    glowColor = 'rgba(255, 255, 255, 0.5)',
    glowIntensity = 0.5,
    hover = false,
    interactive = false,
    press = false,
    animation = 'none',
    liftOnHover = false,
    hoverSheen = false,
    className,
    children,
    style,
    ...restProps
  } = props;
    // Detect device capabilities for auto tier selection
    const device = useMemo(() => detectDevice(), []);

    // Automatically determine performance tier based on device capabilities
    const computedTier = useMemo(() => {
      if (tier !== 'high') return tier; // Respect explicitly set tier

      // Auto-detect performance tier
      if (device.capabilities.gpu && device.capabilities.hardwareAcceleration) {
        return 'high';
      } else if (device.capabilities.webgl) {
        return 'medium';
      } else {
        return 'low';
      }
    }, [tier, device.capabilities]);

    // Use unified glass system with performance tier
    const glassStyles = useMemo(() => {
      const glassOptions: GlassOptions = {
        intent,
        elevation,
        tier: computedTier,
        interactive,
        hoverLift: liftOnHover,
        focusRing: interactive,
        press,
      };

      return createGlassStyle(glassOptions);
    }, [
      intent,
      elevation, 
      computedTier,
      interactive,
      liftOnHover,
      press,
    ]);

    // Add border radius and any custom styles 
    const combinedStyles = {
      ...glassStyles,
      borderRadius: rounded === 'none' ? '0px' : 
                   rounded === 'sm' ? '4px' : 
                   rounded === 'md' ? '8px' : 
                   rounded === 'lg' ? '12px' : 
                   rounded === 'xl' ? '16px' : 
                   rounded === 'full' ? '9999px' : '8px',
      ...style,
    };

    return (
      <Component
        ref={ref}
        className={cn(
          'optimized-glass-surface',
          `glass-${intent}-${elevation}`,
          {
            'glass-interactive': interactive,
            'glass-lift-on-hover': liftOnHover,
            'glass-hover-sheen': hoverSheen,
            'glass-glow': glow,
            'glass-press': press,
            'glass-tier-high': computedTier === 'high',
            'glass-tier-medium': computedTier === 'medium',
            'glass-tier-low': computedTier === 'low',
          },
          className
        )}
        style={combinedStyles}
        {...restProps}
      >
        {children}
      </Component>
    );
  }
);

OptimizedGlassCore.displayName = 'OptimizedGlassCore';

export { OptimizedGlassCore };
export default OptimizedGlassCore;
