'use client';

// Removed circular imports - components import directly from source

import { cn } from '@/design-system/utilsCore';
import React, { forwardRef, useState } from 'react';
import { OptimizedGlass } from '../../primitives';
import { GlassButton } from '../button/GlassButton';

export interface GlassInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * GlassInput variant
   */
  variant?: 'default' | 'filled' | 'outlined' | 'minimal';
  /**
   * GlassInput size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * GlassInput state
   */
  state?: 'default' | 'error' | 'warning' | 'success';
  /**
   * Whether input is full width
   */
  fullWidth?: boolean;
  /**
   * Left icon
   */
  leftIcon?: React.ReactNode;
  /**
   * Right icon
   */
  rightIcon?: React.ReactNode;
  /**
   * Helper text
   */
  helperText?: string;
  /**
   * Error text
   */
  errorText?: string;
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Clear button
   */
  clearable?: boolean;
  /**
   * Custom clear function
   */
  onClear?: () => void;
}

/**
 * GlassInput component
 * A glassmorphism input field with various states and configurations
 */
export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  (
    {
      variant = 'default',
      size = 'md',
      state = 'default',
      fullWidth = false,
      leftIcon,
      rightIcon,
      helperText,
      errorText,
      loading = false,
      clearable = false,
      onClear,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const sizeClasses = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-5 text-base',
    };

    const variantClasses = {
      default: 'bg-background/50 border border-border/30',
      filled: 'bg-muted/50 border border-transparent',
      outlined: 'bg-transparent border-2 border-border',
      minimal: 'bg-transparent border-0 border-b border-border',
    };

    const stateClasses = {
      default: 'border-border/30 focus:border-primary/50',
      error: 'border-destructive/50 focus:border-destructive',
      warning: 'border-warning/50 focus:border-warning',
      success: 'border-success/50 focus:border-success',
    };

    const iconSize = {
      sm: 'w-4 h-4',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
    };

    const currentState = errorText ? 'error' : state;
    const displayHelperText = errorText || helperText;

    const handleClear = () => {
      if (onClear) {
        onClear();
      } else if (props?.onChange) {
        const event = {
          target: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>;
        props?.onChange(event);
      }
    };

    return (
      <div className={cn('relative', { 'w-full': fullWidth })}>
        <OptimizedGlass
          variant="frosted"
          elevation={isFocused ? 2 : 1}
          intensity="medium"
          depth={2}
          tint="neutral"
          border="subtle"
          animation="none"
          performanceMode="medium"
          liftOnHover
          press
          className={cn(
            'relative flex items-center transition-all duration-200 rounded-2xl',
            sizeClasses?.[size],
            variantClasses?.[variant],
            stateClasses?.[currentState],
            {
              'opacity-50': disabled,
              'ring-2 ring-primary/20': isFocused && currentState === 'default',
              'ring-2 ring-destructive/20': isFocused && currentState === 'error',
              'ring-2 ring-warning/20': isFocused && currentState === 'warning',
              'ring-2 ring-success/20': isFocused && currentState === 'success',
            },
            className
          )}
          aria-busy={loading || undefined}
        >
          {leftIcon && (
            <div className={cn('flex items-center justify-center mr-3 text-muted-foreground', iconSize?.[size])}>
              {leftIcon}
            </div>
          )}

          <input ref={ref}
            className={cn(
              'flex-1 bg-transparent border-0 outline-none glass-pulse-ring',
              'placeholder:text-muted-foreground',
              'text-foreground',
              'disabled:cursor-not-allowed',
              {
                'pr-8': clearable || rightIcon || loading,
              }
            )}
            disabled={disabled || loading}
            onFocus={(e) => {
              setIsFocused(true);
              props?.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props?.onBlur?.(e);
            }}
            {...((() => {
              const {
                variant,
                size,
                state,
                fullWidth,
                leftIcon,
                rightIcon,
                helperText,
                errorText,
                loading,
                clearable,
                onClear,
                className,
                ...validProps
              } = props as any;
              return validProps;
            })())}
          />

          <div className="flex items-center gap-1">
            {loading && (
              <div className={cn('animate-spin rounded-full border-2 border-current border-t-transparent', iconSize?.[size])} />
            )}

            {clearable && props?.value && !loading && (
              <GlassButton
                type="button"
                onClick={handleClear}
                className={cn(
                  'flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors',
                  iconSize?.[size]
                )}
              >
                ×
              </GlassButton>
            )}

            {rightIcon && !loading && (
              <div className={cn('flex items-center justify-center text-muted-foreground', iconSize?.[size])}>
                {rightIcon}
              </div>
            )}
          </div>
        </OptimizedGlass>

        {displayHelperText && (
          <p className={cn(
            'mt-1 text-xs',
            currentState === 'error' ? 'text-destructive' :
              currentState === 'warning' ? 'text-warning' :
                currentState === 'success' ? 'text-success' :
                  'text-muted-foreground'
          )}>
            {displayHelperText}
          </p>
        )}
      </div>
    );
  }
);

GlassInput.displayName = 'GlassInput';

// Backward-compat alias exports for legacy imports
export { GlassTextarea as GlassTextArea } from './GlassTextarea';
export type { GlassTextareaProps as GlassTextAreaProps } from './GlassTextarea';
