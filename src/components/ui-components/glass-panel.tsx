'use client';

import React from 'react';
// PerformantGlass removed - using OptimizedGlass
import { OptimizedGlass, OptimizedGlassProps } from '@/design-system/primitives/glass/OptimizedGlass';
import { cn } from '@/lib/utils';

export interface GlassPanelProps extends Omit<OptimizedGlassProps, 'variant'> {
  /**
   * Panel variant style
   */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  /**
   * Panel elevation
   */
  elevation?: 0 | 1 | 2 | 3 | 4;
  /**
   * Whether the panel is interactive
   */
  interactive?: boolean;
  /**
   * Panel padding
   */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Panel content
   */
  children: React.ReactNode;
}

/**
 * GlassPanel component
 * A glassmorphism panel using the proper PerformantGlass primitive
 */
const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({
    className,
    elevation = 1,
    variant = 'default',
    interactive = false,
    padding = 'md',
    children,
    ...props
  }, ref) => {
    const getGlassVariant = (): OptimizedGlassProps['variant'] => {
      switch (variant) {
        case 'primary':
          return 'primary';
        case 'success':
          return 'success';
        case 'warning':
          return 'warning';
        case 'error':
          return 'error';
        default:
          return 'default';
      }
    };

    return (
      <OptimizedGlass
        ref={ref}
        elevation={elevation}
        variant={getGlassVariant()}
        interactive={interactive}
        className={cn(
          'relative overflow-hidden transition-all duration-200',
          // Map padding to className since OptimizedGlass doesn't have padding prop
          padding === 'none' ? 'p-0' :
            padding === 'sm' ? 'p-2' :
              padding === 'md' ? 'p-4' :
                padding === 'lg' ? 'p-6' :
                  padding === 'xl' ? 'p-8' : 'p-4',
          className
        )}
        {...props}
      >
        {children}
      </OptimizedGlass>
    );
  }
);

GlassPanel.displayName = 'GlassPanel';

export { GlassPanel };
