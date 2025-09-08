import React, { forwardRef } from 'react';
import { cn } from '../lib/utilsComprehensive';
import { createGlassMixin, GlassVariant, BlurIntensity } from '../core/mixins/glassMixins';

export interface GlassProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Glass morphism variant */
  variant?: GlassVariant;

  /** Blur strength */
  blur?: BlurIntensity;

  /** Background opacity */
  opacity?: number;

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

  /** Custom CSS classes */
  className?: string;

  /** Children elements */
  children?: React.ReactNode;
}

const GlassCore = forwardRef<HTMLDivElement, GlassProps>(
  (
    {
      variant = 'frosted',
      blur = 'medium' as BlurIntensity,
      opacity = 0.1,
      rounded = 'md',
      glow = false,
      glowColor = 'rgba(255, 255, 255, 0.5)',
      glowIntensity = 0.5,
      hover = false,
      className,
      children,
      style,
      ...props
    },
    ref
  ) => {
    // Generate glass styles using the mixin
    const glassStyles = createGlassMixin({
      variant,
      blur,
      opacity,
      glow,
      glowColor,
      glowIntensity,
      borderRadius: rounded === 'none' ? '0px' : rounded === 'sm' ? '4px' : rounded === 'md' ? '8px' : rounded === 'lg' ? '12px' : rounded === 'xl' ? '16px' : rounded === 'full' ? '9999px' : '8px',
    });

    // Combine custom styles with glass styles
    const combinedStyles = {
      ...glassStyles,
      ...style,
    };

    return (
      <div
        ref={ref}
        className={cn(
          'glass-surface',
          {
            'glass-frosted': variant === 'frosted',
            'glass-crystal': variant === 'crystal',
            'glass-tinted': variant === 'tinted',
            'glass-metallic': variant === 'metallic',
            'glass-neon': variant === 'neon',
            'glass-hover': hover,
            'glass-glow': glow,
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

GlassCore.displayName = 'GlassCore';

export { GlassCore };
export default GlassCore;
