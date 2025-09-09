'use client';

import { cn } from '@/design-system/utilsCore';
import React, { forwardRef } from 'react';
import { createGlassStyle } from '../../core/mixins/glassMixins';
import { OptimizedGlass } from '../../primitives';

export interface GlassContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Container size
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  /**
   * Container centering
   */
  centered?: boolean;
  /**
   * Container padding
   */
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /**
   * Responsive padding
   */
  responsivePadding?: {
    sm?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    md?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    lg?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    xl?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    '2xl'?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  };
  /**
   * Container variant
   */
  variant?: 'default' | 'fluid' | 'breakout';
  /**
   * Whether to apply glassmorphism background
   */
  glass?: boolean;
  /**
   * Glass elevation level
   */
  elevation?: 0 | 1 | 2 | 3 | 4 | 'float' | 'modal';
  /**
   * Border radius
   */
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

/**
 * GlassContainer component
 * Responsive container with glassmorphism styling and flexible sizing
 */
export const GlassContainer = forwardRef<HTMLDivElement, GlassContainerProps>(
  (
    {
      size = 'lg',
      centered = true,
      padding = 'md',
      responsivePadding,
      variant = 'default',
      glass = false,
      elevation = 1,
      radius = 'none',
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Filter out component-specific props that shouldn't be passed to DOM
    const {
      maxWidth,
      minWidth,
      maxHeight,
      minHeight,
      ...domProps
    } = props as any;
    const sizeClasses = {
      xs: 'max-w-xs',      // 320px
      sm: 'max-w-sm',      // 384px
      md: 'max-w-md',      // 448px
      lg: 'max-w-4xl',     // 896px
      xl: 'max-w-6xl',     // 1152px
      '2xl': 'max-w-7xl',  // 1280px
      full: 'max-w-full',
    };

    const paddingClasses = {
      none: 'p-0',
      xs: 'p-2',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-12',
      '2xl': 'p-16',
    };

    const variantClasses = {
      default: '',
      fluid: 'w-full',
      breakout: 'w-screen relative left-1/2 right-1/2 -mx-[50vw]',
    };

    const radiusClasses = {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      '2xl': 'rounded-2xl',
      full: 'rounded-full',
    };

    // Map elevation to OptimizedGlass elevation values
    const getGlassElevation = (elevation: GlassContainerProps['elevation']): 'level1' | 'level2' | 'level3' | 'level4' | 'level5' => {
      if (elevation === 'float') return 'level3' as const;
      if (elevation === 'modal') return 'level4' as const;
      if (typeof elevation === 'number') {
        const level = Math.min(5, Math.max(1, elevation + 1));
        switch (level) {
          case 1: return 'level1' as const;
          case 2: return 'level2' as const;
          case 3: return 'level3' as const;
          case 4: return 'level4' as const;
          case 5: return 'level5' as const;
          default: return 'level1' as const;
        }
      }
      return 'level1' as const;
    };

    const responsivePaddingClasses = responsivePadding ? [
      responsivePadding.sm && `sm:${paddingClasses[responsivePadding.sm]}`,
      responsivePadding.md && `md:${paddingClasses[responsivePadding.md]}`,
      responsivePadding.lg && `lg:${paddingClasses[responsivePadding.lg]}`,
      responsivePadding.xl && `xl:${paddingClasses[responsivePadding.xl]}`,
      responsivePadding['2xl'] && `2xl:${paddingClasses[responsivePadding['2xl']]}`,
    ].filter(Boolean) : [];

    if (glass) {
      return (
        <OptimizedGlass
          ref={ref}
          intent="neutral"
          elevation={getGlassElevation(elevation)}
          intensity="medium"
          depth={2}
          tint="neutral"
          border="subtle"
          animation="none"
          performanceMode="medium"
          className={cn(
            // Base container styles
            'w-full',

            // Size and centering
            sizeClasses[size],
            centered && 'mx-auto',

            // Variant
            variantClasses[variant],

            // Padding
            paddingClasses[padding],
            ...responsivePaddingClasses,

            // Radius
            radius === 'none' ? 'rounded-none' :
              radius === 'sm' ? 'rounded-sm' :
                radius === 'md' ? 'rounded-md' :
                  radius === 'lg' ? 'rounded-lg' :
                    radius === 'xl' ? 'rounded-xl' :
                      radius === '2xl' ? 'rounded-2xl' :
                        radius === 'full' ? 'rounded-full' : 'rounded-lg',

            className
          )}
          {...domProps}
        >
          {children}
        </OptimizedGlass>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          // Base container styles
          'w-full',

          // Size and centering
          sizeClasses[size],
          centered && 'mx-auto',

          // Variant
          variantClasses[variant],

          // Padding
          paddingClasses[padding],
          ...responsivePaddingClasses,

          className
        )}
        {...domProps}
      >
        {children}
      </div>
    );
  }
);

GlassContainer.displayName = 'GlassContainer';

// Simple Container alias for basic usage
export const Container = GlassContainer;
