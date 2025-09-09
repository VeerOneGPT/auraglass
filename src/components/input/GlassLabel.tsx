'use client';

import React, { forwardRef } from 'react';
import { createGlassStyle } from '../../core/mixins/glassMixins';
import { cn } from '@/design-system/utilsCore';

export interface GlassLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Size of the label */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Visual variant */
  variant?: 'default' | 'muted' | 'accent' | 'success' | 'warning' | 'error';
  /** Whether the label is required */
  required?: boolean;
  /** Whether the label is for a disabled field */
  disabled?: boolean;
  /** Custom icon */
  icon?: React.ReactNode;
}

export const GlassLabel = forwardRef<HTMLLabelElement, GlassLabelProps>(
  (
    {
      size = 'md',
      variant = 'default',
      required = false,
      disabled = false,
      icon,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const sizeConfig = {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-sm',
      lg: 'text-base',
    };

    const variantConfig = {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      accent: 'text-primary',
      success: 'text-green-400',
      warning: 'text-amber-400',
      error: 'text-red-400',
    };

    return (
      <label
        ref={ref}
        className={cn(
          'glass-label',
          'font-medium leading-none',
          'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          
          // Size
          sizeConfig[size],
          
          // Variant
          variantConfig[variant],
          
          // Disabled state
          disabled && 'opacity-50 cursor-not-allowed',
          
          // Icon spacing
          icon && 'flex items-center gap-2',
          
          className
        )}
        {...props}
      >
        {icon && (
          <span className="shrink-0">
            {icon}
          </span>
        )}
        
        <span>
          {children}
          {required && (
            <span className="text-red-400 ml-1" aria-label="required">
              *
            </span>
          )}
        </span>
      </label>
    );
  }
);

GlassLabel.displayName = 'GlassLabel';

export default GlassLabel;
