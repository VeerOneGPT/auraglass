'use client';

import React, { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/design-system/utilsCore';
import { glassTokens } from '../../tokens/glass';

export interface GlassProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * HTML element tag to render as
   */
  as?: React.ElementType;
  /**
   * Elevation level for depth perception
   */
  elevation?: 0 | 1 | 2 | 3 | 4 | 'float' | 'modal';
  
  /**
   * Glass variant for different visual styles
   */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'dark' | 'iridescent' | 'mesh' | 'feature';
  
  /**
   * Blur intensity for backdrop filter
   */
  blur?: 'none' | 'subtle' | 'medium' | 'strong' | 'intense';
  
  /**
   * Enable interactive states (hover, active)
   */
  interactive?: boolean;
  
  /**
   * Enable glow effect on hover
   */
  glow?: boolean;
  
  /**
   * Border radius preset
   */
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  
  /**
   * Padding preset
   */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Whether to include noise texture overlay
   */
  texture?: boolean;
  
  /**
   * Disabled state
   */
  disabled?: boolean;
  
  /**
   * Custom gradient background
   */
  gradient?: 'primary' | 'secondary' | 'radial' | 'mesh' | 'iridescent';
}

/**
 * Advanced Glass primitive component
 * Base component for glassmorphism effects with elevation system and advanced tokens
 */
export const GlassAdvanced = forwardRef<HTMLDivElement, GlassProps>(
  (
    {
      as: Component = 'div' as any,
      elevation = 1,
      variant = 'default',
      blur = 'medium',
      interactive = false,
      glow = false,
      radius = 'lg',
      padding = 'md',
      texture = true,
      gradient = 'primary',
      disabled = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Get elevation styles
    const getElevationStyles = () => {
      if (elevation === 0) return {};
      
      const elevationKey = elevation as keyof typeof glassTokens.elevation;
      const elevationStyles = glassTokens.elevation[elevationKey];
      
      return {
        boxShadow: elevationStyles.boxShadow,
        zIndex: elevationStyles.zIndex,
      };
    };
    
    // Get backdrop blur styles
    const getBlurStyles = () => {
      if (blur === 'none') return {};
      
      const blurValue = glassTokens.backdrop[blur];
      return {
        backdropFilter: blurValue,
        WebkitBackdropFilter: blurValue,
      };
    };
    
    // Get gradient background
    const getGradientBackground = () => {
      switch (gradient) {
        case 'primary':
          return glassTokens.gradients.primary;
        case 'secondary':
          return glassTokens.gradients.secondary;
        case 'radial':
          return glassTokens.gradients.primaryRadial;
        case 'mesh':
          return glassTokens.gradients.mesh;
        case 'iridescent':
          return glassTokens.gradients.iridescent;
        default:
          return glassTokens.gradients.primary;
      }
    };
    
    // Get variant-specific colors
    const getVariantStyles = () => {
      switch (variant) {
        case 'primary':
          return {
            background: getGradientBackground(),
            borderColor: glassTokens.border.primary,
          };
        case 'secondary':
          return {
            background: glassTokens.gradients.secondary,
            borderColor: glassTokens.border.secondary,
          };
        case 'success':
          return {
            background: `linear-gradient(135deg, ${glassTokens.surface.success} 0%, rgba(34, 197, 94, 0.4) 100%)`,
            borderColor: 'rgba(34, 197, 94, 0.4)',
          };
        case 'warning':
          return {
            background: `linear-gradient(135deg, ${glassTokens.surface.warning} 0%, rgba(245, 158, 11, 0.4) 100%)`,
            borderColor: 'rgba(245, 158, 11, 0.4)',
          };
        case 'error':
          return {
            background: `linear-gradient(135deg, ${glassTokens.surface.error} 0%, rgba(239, 68, 68, 0.4) 100%)`,
            borderColor: 'rgba(239, 68, 68, 0.4)',
          };
        case 'dark':
          return {
            background: `linear-gradient(135deg, ${glassTokens.surface.dark} 0%, ${glassTokens.surface.darkSubtle} 100%)`,
            borderColor: glassTokens.border.subtle,
          };
        case 'iridescent':
          return {
            background: glassTokens.gradients.iridescent,
            borderColor: glassTokens.border.gradient.rainbow,
          };
        case 'mesh':
          return {
            background: glassTokens.gradients.mesh,
            borderColor: glassTokens.border.primary,
          };
        case 'feature':
          return {
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.12) 50%, rgba(255, 255, 255, 0.15) 100%)",
            borderColor: glassTokens.border.subtle,
          };
        default:
          return {
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.12) 100%)",
            borderColor: glassTokens.border.primary,
          };
      }
    };
    
    // Always hide borders for clean glassmorphism look
    const hideBorder = true;
    
    // Combine all styles
    const glassStyles = {
      ...getElevationStyles(),
      ...getBlurStyles(),
      ...getVariantStyles(),
      position: 'relative' as const,
      overflow: 'hidden' as const,
      transition: interactive ? 'transform 200ms cubic-bezier(0, 0, 0.2, 1), box-shadow 200ms cubic-bezier(0, 0, 0.2, 1)' : undefined,
      willChange: interactive ? 'transform, box-shadow' : undefined,
    };
    
    // Radius classes
    const radiusClasses = {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      '2xl': 'rounded-2xl',
      full: 'rounded-full',
    };
    
    // Padding classes
    const paddingClasses = {
      none: '',
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-6',
      xl: 'p-8',
    };
    
    // Use remaining props directly since custom props were already destructured
    const domProps = props;

    return (
      <Component
        ref={ref}
        className={cn(
          'glass-primitive',
          radiusClasses[radius],
          paddingClasses[padding],
          interactive && 'glass-interactive cursor-pointer',
          glow && 'glass-glow',
          variant === 'iridescent' && 'animate-pulse',
          disabled && 'opacity-50 pointer-events-none',
          className
        )}
        style={glassStyles}
        {...domProps}
      >
        {/* Noise texture overlay */}
        {texture && (
          <div
            className="pointer-events-none absolute inset-0 z-[1] opacity-20 mix-blend-overlay"
            style={{
              backgroundImage: glassTokens.noise.subtle,
            }}
          />
        )}
        
        {/* Content wrapper */}
        <div className="glass-content relative z-[2]">
          {children}
        </div>
        
        {/* Glow effect */}
        {glow && (
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
            style={{
              background: `radial-gradient(circle at center, ${glassTokens.glow.primary}, transparent 70%)`,
            }}
          />
        )}
      </Component>
    );
  }
);

GlassAdvanced.displayName = 'GlassAdvanced';
