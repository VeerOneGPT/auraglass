'use client';

import { GlassButton } from '../button/GlassButton';

import { cn } from '@/design-system/utilsCore';
import React, { forwardRef, useId } from 'react';
import { Motion } from '../../primitives';

export interface GlassSwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /** Whether the switch is checked */
  checked?: boolean;
  /** Whether the switch is checked by default (uncontrolled) */
  defaultChecked?: boolean;
  /** Callback when the switch state changes */
  onChange?: (checked: boolean) => void;
  /** Alias for onChange for compatibility */
  onCheckedChange?: (checked: boolean) => void;
  /** Size of the switch */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  /** Label text */
  label?: string;
  /** Description text */
  description?: string;
  /** Position of label relative to switch */
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';
  /** Whether the switch is disabled */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Icons for on/off states */
  icons?: {
    checked?: React.ReactNode;
    unchecked?: React.ReactNode;
  };
  /** Whether to show focus ring */
  focusRing?: boolean;
  /** Custom thumb content */
  thumbContent?: React.ReactNode;
}

export const GlassSwitch = forwardRef<HTMLButtonElement, GlassSwitchProps>(
  (
    {
      checked,
      defaultChecked = false,
      onChange,
      onCheckedChange,
      size = 'md',
      variant = 'default',
      label,
      description,
      labelPosition = 'right',
      disabled = false,
      loading = false,
      icons,
      focusRing = true,
      thumbContent,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const isChecked = checked !== undefined ? checked : internalChecked;
    const switchId = useId();
    const finalId = id || switchId;

    const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return;

      const newChecked = !isChecked;

      if (checked === undefined) {
        setInternalChecked(newChecked);
      }

      onChange?.(newChecked);
      onCheckedChange?.(newChecked);
      props.onClick?.(event);
    };

    const sizeConfig = {
      sm: {
        track: 'h-5 w-9',
        thumb: 'h-4 w-4',
        translate: 'translate-x-4',
        text: 'text-xs',
        gap: 'gap-2',
      },
      md: {
        track: 'h-6 w-11',
        thumb: 'h-5 w-5',
        translate: 'translate-x-5',
        text: 'text-sm',
        gap: 'gap-3',
      },
      lg: {
        track: 'h-7 w-14',
        thumb: 'h-6 w-6',
        translate: 'translate-x-7',
        text: 'text-base',
        gap: 'gap-4',
      },
    };

    const variantConfig = {
      default: {
        track: {
          checked: 'bg-primary border-primary/20',
          unchecked: 'bg-muted/50 border border-border/20',
        },
        thumb: {
          checked: 'bg-white shadow-lg',
          unchecked: 'bg-foreground/80 shadow-md',
        },
      },
      success: {
        track: {
          checked: 'bg-green-500 border-green-400/20',
          unchecked: 'bg-muted/50 border border-border/20',
        },
        thumb: {
          checked: 'bg-white shadow-lg',
          unchecked: 'bg-foreground/80 shadow-md',
        },
      },
      warning: {
        track: {
          checked: 'bg-amber-500 border-amber-400/20',
          unchecked: 'bg-muted/50 border border-border/20',
        },
        thumb: {
          checked: 'bg-white shadow-lg',
          unchecked: 'bg-foreground/80 shadow-md',
        },
      },
      error: {
        track: {
          checked: 'bg-red-500 border-red-400/20',
          unchecked: 'bg-muted/50 border border-border/20',
        },
        thumb: {
          checked: 'bg-white shadow-lg',
          unchecked: 'bg-foreground/80 shadow-md',
        },
      },
      info: {
        track: {
          checked: 'bg-blue-500 border-blue-400/20',
          unchecked: 'bg-muted/50 border border-border/20',
        },
        thumb: {
          checked: 'bg-white shadow-lg',
          unchecked: 'bg-foreground/80 shadow-md',
        },
      },
    };

    const config = sizeConfig[size];
    const colors = variantConfig[variant];

    const switchElement = (
      <GlassButton
        ref={ref}
        role="switch"
        type="button"
        aria-checked={isChecked}
        aria-labelledby={label ? `${finalId}-label` : undefined}
        aria-describedby={description ? `${finalId}-description` : undefined}
        disabled={disabled || loading}
        id={finalId}
        className={cn(
          // Base styles
          'glass-switch relative inline-flex shrink-0 cursor-pointer glass-ripple glass-press',
          'border backdrop-blur-md rounded-full transition-all duration-200',

          // Size
          config.track,

          // State colors
          isChecked ? colors.track.checked : colors.track.unchecked,

          // Disabled state
          disabled && 'opacity-50 cursor-not-allowed',

          // Loading state
          loading && 'cursor-wait',

          // Focus styles
          focusRing && [
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            'focus:ring-primary focus:ring-offset-background',
          ],

          className
        )}
        onClick={handleToggle}
        {...props}
      >
        {/* Subtle sheen on track */}
        <div className="pointer-events-none absolute inset-0 rounded-full glass-sheen" />

        {/* Thumb */}
        <Motion
          preset="scaleIn"
          className={cn(
            'pointer-events-none relative flex items-center justify-center',
            'rounded-full border backdrop-blur-sm transition-all duration-200',

            // Size
            config.thumb,

            // Position
            isChecked ? config.translate : 'translate-x-0.5',

            // Colors
            isChecked ? colors.thumb.checked : colors.thumb.unchecked,

            // Border
            'border-white/20',
          )}
        >
          {/* Loading spinner */}
          {loading && (
            <div className={cn(
              'animate-spin rounded-full border-2 border-current border-t-transparent',
              size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5'
            )} />
          )}

          {/* Icons */}
          {!loading && icons && (
            <div className={cn(
              'flex items-center justify-center',
              size === 'sm' ? 'text-xs' : 'text-sm'
            )}>
              {isChecked ? icons.checked : icons.unchecked}
            </div>
          )}

          {/* Custom thumb content */}
          {!loading && !icons && thumbContent && (
            <div className="flex items-center justify-center">
              {thumbContent}
            </div>
          )}

          {/* Thumb highlight */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
        </Motion>

        {/* Ripple is handled by glass-ripple utility */}
      </GlassButton>
    );

    const labelElement = label && (
      <label
        htmlFor={finalId}
        id={`${finalId}-label`}
        className={cn(
          'glass-switch-label cursor-pointer font-medium text-foreground',
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
          'glass-switch-description text-muted-foreground',
          size === 'sm' ? 'text-xs' : 'text-sm',
          disabled && 'opacity-70'
        )}
      >
        {description}
      </p>
    );

    // Render based on label position
    if (!label && !description) {
      return switchElement;
    }

    const containerClass = cn(
      'glass-switch-container flex items-start',
      config.gap,
      labelPosition === 'left' && 'flex-row-reverse',
      labelPosition === 'right' && 'flex-row',
      labelPosition === 'top' && 'flex-col',
      labelPosition === 'bottom' && 'flex-col-reverse',
    );

    return (
      <div className={containerClass}>
        {(labelPosition === 'left' || labelPosition === 'right') && (
          <div className="flex items-center">
            {switchElement}
          </div>
        )}

        {(labelPosition === 'top' || labelPosition === 'bottom') && switchElement}

        <div className="space-y-1">
          {labelElement}
          {descriptionElement}
        </div>
      </div>
    );
  }
);

GlassSwitch.displayName = 'GlassSwitch';

export default GlassSwitch;
