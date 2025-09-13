'use client';

import React, { forwardRef } from 'react';
import { cn } from '../../lib/utilsComprehensive';
import { useA11yId } from '@/utils/a11y';
import { useMotionPreferenceContext } from '@/contexts/MotionPreferenceContext';

export interface GlassSeparatorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  /** Orientation of the separator */
  orientation?: 'horizontal' | 'vertical';
  /** Visual variant */
  variant?: 'default' | 'gradient' | 'dashed' | 'dotted' | 'glow';
  /** Size/thickness of the separator */
  size?: 'sm' | 'md' | 'lg';
  /** Length of the separator (for vertical separators) */
  length?: string | number;
  /** Whether to add decorative elements */
  decorative?: boolean;
  /** Content to display in the center (for horizontal separators) */
  content?: React.ReactNode;
  /** Spacing around the content */
  spacing?: 'sm' | 'md' | 'lg';
  /** Whether to respect user's motion preferences */
  respectMotionPreference?: boolean;
  /** Accessibility label for screen readers */
  'aria-label'?: string;
}

export const GlassSeparator = forwardRef<HTMLDivElement, GlassSeparatorProps>(
  (
    {
      orientation = 'horizontal',
      variant = 'default',
      size = 'md',
      length,
      decorative = true,
      content,
      spacing = 'md',
      respectMotionPreference = true,
      'aria-label': ariaLabel,
      className,
      ...props
    },
    ref
  ) => {
    const sizeConfig = {
      sm: {
        thickness: orientation === 'horizontal' ? 'h-px' : 'w-px',
        contentGap: 'glass-gap-2',
        contentPadding: 'glass-px-2',
      },
      md: {
        thickness: orientation === 'horizontal' ? 'h-0.5' : 'w-0.5',
        contentGap: 'glass-gap-3',
        contentPadding: 'glass-px-3',
      },
      lg: {
        thickness: orientation === 'horizontal' ? 'h-1' : 'w-1',
        contentGap: 'glass-gap-4',
        contentPadding: 'glass-px-4',
      },
    };

    const spacingConfig = {
      sm: 'glass-gap-2 glass-px-2',
      md: 'glass-gap-3 glass-px-3',
      lg: 'glass-gap-4 glass-px-4',
    };

    const variantStyles = {
      default: 'bg-border/20',
      gradient: 'bg-gradient-to-r from-transparent via-border/20 to-transparent',
      dashed: 'border-dashed border-t border-border/20 bg-transparent',
      dotted: 'border-dotted border-t border-border/20 bg-transparent',
      glow: cn(
        'bg-gradient-to-r from-transparent via-primary/30 to-transparent',
        'shadow-lg shadow-primary/20 backdrop-blur-md'
      ),
    };

    const config = sizeConfig[size];
    const separatorId = useA11yId();
    const { prefersReducedMotion } = useMotionPreferenceContext();
    const shouldRespectMotion = respectMotionPreference && !prefersReducedMotion;

    // Handle separator with content
    if (content && orientation === 'horizontal') {
      return (
        <div
          ref={ref}
          id={separatorId}
          className={cn(
            'glass-separator-with-content',
            'flex items-center w-full',
            spacingConfig[spacing],
            // Motion preferences
            shouldRespectMotion && 'motion-safe:transition-all motion-reduce:transition-none',
            className
          )}
          role={decorative ? 'presentation' : 'separator'}
          aria-orientation={orientation}
          aria-label={ariaLabel || (content ? `Separator with content: ${content}` : undefined)}
          {...props}
        >
          {/* Left separator */}
          <div
            className={cn(
              'flex-1',
              config.thickness,
              variantStyles[variant]
            )}
          />
          
          {/* Content */}
          <div className={cn(
            'glass-separator-content',
            'flex items-center justify-center shrink-0',
            'glass-text-secondary glass-text-sm font-medium',
            config.contentPadding
          )}>
            {content}
          </div>
          
          {/* Right separator */}
          <div
            className={cn(
              'flex-1',
              config.thickness,
              variantStyles[variant]
            )}
          />
        </div>
      );
    }

    // Standard separator
    return (
      <div
        ref={ref}
        id={separatorId}
        className={cn(
          'glass-separator',
          
          // Orientation and size
          orientation === 'horizontal' 
            ? cn('w-full', config.thickness)
            : cn('h-full', config.thickness),
          
          // Length override
          length && (
            orientation === 'horizontal' 
              ? `w-[${typeof length === 'number' ? `${length}px` : length}]`
              : `h-[${typeof length === 'number' ? `${length}px` : length}]`
          ),
          
          // Variant styles
          variantStyles[variant],
          
          // Special handling for dashed/dotted
          (variant === 'dashed' || variant === 'dotted') && [
            orientation === 'horizontal' ? 'border-t' : 'border-l',
            config.thickness.replace('h-', 'border-t-').replace('w-', 'border-l-')
          ],
          
          // Motion preferences
          shouldRespectMotion && 'motion-safe:transition-all motion-reduce:transition-none',
          
          className
        )}
        role={decorative ? 'presentation' : 'separator'}
        aria-orientation={orientation}
        aria-label={ariaLabel || `${orientation} separator`}
        {...props}
      />
    );
  }
);

GlassSeparator.displayName = 'GlassSeparator';

// Utility components for common patterns
export const GlassHorizontalSeparator = forwardRef<HTMLDivElement, Omit<GlassSeparatorProps, 'orientation'>>(
  (props, ref) => <GlassSeparator ref={ref} orientation="horizontal" {...props} />
);

export const GlassVerticalSeparator = forwardRef<HTMLDivElement, Omit<GlassSeparatorProps, 'orientation'>>(
  (props, ref) => <GlassSeparator ref={ref} orientation="vertical" {...props} />
);

export const GlassGradientSeparator = forwardRef<HTMLDivElement, Omit<GlassSeparatorProps, 'variant'>>(
  (props, ref) => <GlassSeparator ref={ref} variant="gradient" {...props} />
);

export const GlassGlowSeparator = forwardRef<HTMLDivElement, Omit<GlassSeparatorProps, 'variant'>>(
  (props, ref) => <GlassSeparator ref={ref} variant="glow" {...props} />
);

GlassHorizontalSeparator.displayName = 'GlassHorizontalSeparator';
GlassVerticalSeparator.displayName = 'GlassVerticalSeparator';
GlassGradientSeparator.displayName = 'GlassGradientSeparator';
GlassGlowSeparator.displayName = 'GlassGlowSeparator';

export default GlassSeparator;
