'use client';

import { GlassInput } from './GlassInput';

import { cn } from '@/design-system/utils';
import { Check, Minus } from 'lucide-react';
import React, { forwardRef, useId } from 'react';
import { Motion } from '../../primitives/motion/Motion';

export interface GlassCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Indeterminate state (partially checked) */
  indeterminate?: boolean;
  /** Callback when the checkbox state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Size of the checkbox */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  /** Label text */
  label?: string;
  /** Description text */
  description?: string;
  /** Position of label relative to checkbox */
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Whether to show focus ring */
  focusRing?: boolean;
  /** Custom check icon */
  checkIcon?: React.ReactNode;
  /** Custom indeterminate icon */
  indeterminateIcon?: React.ReactNode;
  /** Error message */
  error?: string;
}

export const GlassCheckbox = forwardRef<HTMLInputElement, GlassCheckboxProps>(
  (
    {
      checked,
      indeterminate = false,
      onCheckedChange,
      onChange,
      size = 'md',
      variant = 'default',
      label,
      description,
      labelPosition = 'right',
      disabled = false,
      loading = false,
      focusRing = true,
      checkIcon,
      indeterminateIcon,
      error,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const checkboxId = useId();
    const finalId = id || checkboxId;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || loading) return;

      const newChecked = event.target.checked;
      onCheckedChange?.(newChecked);
      onChange?.(event);
    };

    const sizeConfig = {
      sm: {
        box: 'h-4 w-4',
        icon: 'h-3 w-3',
        text: 'text-xs',
        gap: 'gap-2',
      },
      md: {
        box: 'h-5 w-5',
        icon: 'h-4 w-4',
        text: 'text-sm',
        gap: 'gap-3',
      },
      lg: {
        box: 'h-6 w-6',
        icon: 'h-5 w-5',
        text: 'text-base',
        gap: 'gap-4',
      },
    };

    const variantConfig = {
      default: {
        checked: 'bg-primary border-primary/20 text-primary-foreground',
        unchecked: 'bg-background/50 border border-border/20',
        hover: 'hover:border-primary/50',
      },
      success: {
        checked: 'bg-green-500 border-green-400/20 text-white',
        unchecked: 'bg-background/50 border border-border/20',
        hover: 'hover:border-green-400/50',
      },
      warning: {
        checked: 'bg-amber-500 border-amber-400/20 text-white',
        unchecked: 'bg-background/50 border border-border/20',
        hover: 'hover:border-amber-400/50',
      },
      error: {
        checked: 'bg-red-500 border-red-400/20 text-white',
        unchecked: 'bg-background/50 border border-border/20',
        hover: 'hover:border-red-400/50',
      },
      info: {
        checked: 'bg-blue-500 border-blue-400/20 text-white',
        unchecked: 'bg-background/50 border border-border/20',
        hover: 'hover:border-blue-400/50',
      },
    };

    const config = sizeConfig[size];
    const colors = variantConfig[variant];
    const isCheckedOrIndeterminate = checked || indeterminate;

    const checkboxElement = (
      <div className="relative inline-flex items-center">
        {/* Hidden input */}
        <GlassInput ref={ref}
          type="checkbox"
          id={finalId}
          checked={checked}
          onChange={handleChange}
          disabled={disabled || loading}
          className="sr-only"
          aria-describedby={description ? `${finalId}-description` : undefined}
          {...props} />

        {/* Visual checkbox */}
        <label
          htmlFor={finalId}
          className={cn(
            'glass-checkbox-box relative inline-flex items-center justify-center',
            'border backdrop-blur-md rounded-md transition-all duration-200 glass-ripple',
            'cursor-pointer group',

            // Size
            config.box,

            // State colors
            isCheckedOrIndeterminate ? colors.checked : colors.unchecked,

            // Hover effects
            !disabled && colors.hover,

            // Disabled state
            disabled && 'opacity-50 cursor-not-allowed',

            // Loading state
            loading && 'cursor-wait',

            // Focus styles
            focusRing && [
              'focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2',
              'focus-within:ring-primary focus-within:ring-offset-background',
            ],

            // Error state
            error && !isCheckedOrIndeterminate && 'border-red-400/50',
          )}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 rounded-md bg-gradient-to-br from-white/10 to-transparent" />

          {/* Check/indeterminate icon */}
          <Motion
            preset="scaleIn"
            className={cn(
              'flex items-center justify-center',
              config.icon,
              isCheckedOrIndeterminate ? 'opacity-100' : 'opacity-0',
            )}
          >
            {loading && (
              <div className={cn(
                'animate-spin rounded-full border-2 border-current border-t-transparent',
                size === 'sm' ? 'w-2.5 h-2.5' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'
              )} />
            )}

            {!loading && indeterminate && (
              indeterminateIcon || <Minus className={config.icon} strokeWidth={3} />
            )}

            {!loading && !indeterminate && checked && (
              checkIcon || <Check className={config.icon} strokeWidth={3} />
            )}
          </Motion>

          {/* Interaction sheen */}
          <div className="absolute inset-0 rounded-md glass-sheen opacity-0 group-hover:opacity-100 transition-opacity" />
        </label>
      </div>
    );

    const labelElement = label && (
      <label
        htmlFor={finalId}
        className={cn(
          'glass-checkbox-label cursor-pointer font-medium text-foreground',
          config.text,
          disabled && 'cursor-not-allowed opacity-70'
        )}
      >
        {label}
      </label>
    );

    const descriptionElement = description && (
      <p
        id={`${finalId}-description`}
        className={cn(
          'glass-checkbox-description text-muted-foreground',
          size === 'sm' ? 'text-xs' : 'text-sm',
          disabled && 'opacity-70'
        )}
      >
        {description}
      </p>
    );

    const errorElement = error && (
      <p className={cn(
        'glass-checkbox-error text-red-400',
        size === 'sm' ? 'text-xs' : 'text-sm'
      )}>
        {error}
      </p>
    );

    // Render based on label position
    if (!label && !description && !error) {
      return checkboxElement;
    }

    const containerClass = cn(
      'glass-checkbox-container flex',
      config.gap,
      labelPosition === 'left' && 'flex-row-reverse items-start',
      labelPosition === 'right' && 'flex-row items-start',
      labelPosition === 'top' && 'flex-col',
      labelPosition === 'bottom' && 'flex-col-reverse',
      className
    );

    return (
      <div className={containerClass}>
        {(labelPosition === 'left' || labelPosition === 'right') && (
          <div className="flex items-start pt-0.5">
            {checkboxElement}
          </div>
        )}

        {(labelPosition === 'top' || labelPosition === 'bottom') && checkboxElement}

        <div className="space-y-1 min-w-0 flex-1">
          {labelElement}
          {descriptionElement}
          {errorElement}
        </div>
      </div>
    );
  }
);

GlassCheckbox.displayName = 'GlassCheckbox';

export default GlassCheckbox;
