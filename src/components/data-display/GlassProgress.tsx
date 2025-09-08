'use client';

import React, { forwardRef, useEffect, useState } from 'react';
import { OptimizedGlass } from '../../primitives/glass/OptimizedGlass';
import { Motion } from '../../primitives/motion/Motion';
import { cn } from '@/lib/utils';

export interface GlassProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Progress value (0-100)
   */
  value?: number;
  /**
   * Maximum value
   */
  max?: number;
  /**
   * Progress variant
   */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'gradient' | 'primary';
  /**
   * Progress size
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Progress shape
   */
  shape?: 'rounded' | 'pill' | 'square';
  /**
   * Whether to show value text
   */
  showValue?: boolean;
  /**
   * Custom value formatter
   */
  formatValue?: (value: number, max: number) => string;
  /**
   * Whether progress is indeterminate
   */
  indeterminate?: boolean;
  /**
   * Animation on value change
   */
  animated?: boolean;
  /**
   * Animation duration in ms
   */
  animationDuration?: number;
  /**
   * Whether to show stripes
   */
  striped?: boolean;
  /**
   * Custom label
   */
  label?: string;
  /**
   * Label position
   */
  labelPosition?: 'top' | 'bottom' | 'inline';
}

/**
 * GlassProgress component
 * A glassmorphism progress bar with various styles and animations
 */
export const GlassProgress = forwardRef<HTMLDivElement, GlassProgressProps>(
  (
    {
      value = 0,
      max = 100,
      variant = 'default',
      size = 'md',
      shape = 'rounded',
      showValue = false,
      formatValue,
      indeterminate = false,
      animated = true,
      animationDuration = 500,
      striped = false,
      label,
      labelPosition = 'top',
      className,
      ...props
    },
    ref
  ) => {
    const [animatedValue, setAnimatedValue] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    useEffect(() => {
      if (!mounted || indeterminate) return;

      if (animated) {
        const timer = setTimeout(() => {
          setAnimatedValue(value);
        }, 100);
        return () => clearTimeout(timer);
      } else {
        setAnimatedValue(value);
      }
    }, [value, animated, mounted, indeterminate]);

    const percentage = indeterminate ? 0 : Math.min(Math.max((animatedValue / max) * 100, 0), 100);

    const sizeClasses = {
      xs: 'h-1',
      sm: 'h-2',
      md: 'h-3',
      lg: 'h-4',
      xl: 'h-6',
    };

    const shapeClasses = {
      rounded: 'rounded-md',
      pill: 'rounded-full',
      square: 'rounded-none',
    };

    const variantClasses = {
      default: 'bg-primary',
      success: 'bg-success',
      warning: 'bg-warning',
      error: 'bg-destructive',
      gradient: 'bg-gradient-to-r from-primary via-secondary to-accent',
      primary: 'bg-primary',
    };

    const trackClasses = cn(
      'relative w-full overflow-hidden',
      'bg-muted/30 backdrop-blur-sm',
      sizeClasses[size],
      shapeClasses[shape]
    );

    const fillClasses = cn(
      'h-full transition-all ease-out relative',
      variantClasses[variant],
      {
        'bg-stripes': striped,
        'animate-pulse': indeterminate,
        'animate-progress-indeterminate': indeterminate,
      }
    );

    const formatDisplayValue = () => {
      if (formatValue) {
        return formatValue(value, max);
      }
      return `${Math.round(percentage)}%`;
    };

    const getLabelContent = () => {
      if (label) return label;
      if (showValue) return formatDisplayValue();
      return null;
    };

    const labelContent = getLabelContent();

    return (
      <div
        ref={ref}
        className={cn('w-full', className)}
        {...props}
      >
        {/* Top label */}
        {labelContent && labelPosition === 'top' && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">
              {label}
            </span>
            {showValue && (
              <span className="text-sm text-muted-foreground">
                {formatDisplayValue()}
              </span>
            )}
          </div>
        )}

        {/* Progress track */}
        <OptimizedGlass
          variant="frosted"
          elevation={0}
          intensity="medium"
          depth={2}
          tint="neutral"
          border="subtle"
          animation="none"
          performanceMode="medium"
          
          className={trackClasses}
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label || 'Progress'}
        >
          {/* Progress fill */}
          <div
            className={fillClasses}
            style={{
              width: indeterminate ? '100%' : `${percentage}%`,
              transitionDuration: animated ? `${animationDuration}ms` : '0ms',
            }}
          >
            {/* Sheen sweep on fill */}
            <div className="pointer-events-none absolute inset-0 glass-sheen" />
            {/* Inline label */}
            {labelContent && labelPosition === 'inline' && (
              <div className="flex items-center justify-center h-full px-2">
                <span className="text-xs font-medium text-white mix-blend-difference">
                  {showValue ? formatDisplayValue() : label}
                </span>
              </div>
            )}

            {/* Stripes overlay */}
            {striped && (
              <div className="absolute inset-0 bg-stripes opacity-20" />
            )}
          </div>
        </OptimizedGlass>

        {/* Bottom label */}
        {labelContent && labelPosition === 'bottom' && (
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm font-medium text-foreground">
              {label}
            </span>
            {showValue && (
              <span className="text-sm text-muted-foreground">
                {formatDisplayValue()}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

GlassProgress.displayName = 'GlassProgress';

/**
 * CircularProgress component
 */
export interface CircularProgressProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'size'> {
  /**
   * Progress value (0-100)
   */
  value?: number;
  /**
   * Maximum value
   */
  max?: number;
  /**
   * Progress variant
   */
  variant?: 'default' | 'success' | 'warning' | 'error';
  /**
   * Circle size
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Stroke width
   */
  strokeWidth?: number;
  /**
   * Whether progress is indeterminate
   */
  indeterminate?: boolean;
  /**
   * Whether to show value text
   */
  showValue?: boolean;
  /**
   * Custom content in center
   */
  children?: React.ReactNode;
}

export const CircularProgress = forwardRef<HTMLDivElement, CircularProgressProps>(
  (
    {
      value = 0,
      max = 100,
      variant = 'default',
      size = 'md',
      strokeWidth,
      indeterminate = false,
      showValue = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const [animatedValue, setAnimatedValue] = useState(0);

    useEffect(() => {
      if (indeterminate) return;
      
      const timer = setTimeout(() => {
        setAnimatedValue(value);
      }, 100);
      return () => clearTimeout(timer);
    }, [value, indeterminate]);

    const sizeConfig = {
      sm: { size: 40, stroke: strokeWidth || 3 },
      md: { size: 60, stroke: strokeWidth || 4 },
      lg: { size: 80, stroke: strokeWidth || 5 },
      xl: { size: 120, stroke: strokeWidth || 6 },
    };

    const config = sizeConfig[size];
    const radius = (config.size - config.stroke) / 2;
    const circumference = radius * 2 * Math.PI;
    const percentage = Math.min(Math.max((animatedValue / max) * 100, 0), 100);
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const variantColors = {
      default: 'stroke-primary',
      success: 'stroke-success',
      warning: 'stroke-warning',
      error: 'stroke-destructive',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center',
          className
        )}
        style={{ width: config.size, height: config.size }}
        {...props}
      >
        <svg
          className="transform -rotate-90"
          width={config.size}
          height={config.size}
        >
          {/* Background circle */}
          <circle
            cx={config.size / 2}
            cy={config.size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={config.stroke}
            fill="transparent"
            className="text-muted/20"
          />
          
          {/* Progress circle */}
          <circle
            cx={config.size / 2}
            cy={config.size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={config.stroke}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={indeterminate ? circumference * 0.25 : strokeDashoffset}
            strokeLinecap="round"
            className={cn(
              'transition-all duration-500 ease-out',
              variantColors[variant],
              {
                'animate-spin': indeterminate,
              }
            )}
            style={{
              transformOrigin: '50% 50%',
            }}
          />
          {/* Subtle glow overlay for finished arc */}
          {!indeterminate && (
            <circle
              cx={config.size / 2}
              cy={config.size / 2}
              r={radius}
              strokeWidth={config.stroke}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="stroke-white/10"
            />
          )}
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          {children || (showValue && (
            <span className="text-sm font-medium text-foreground">
              {Math.round(percentage)}%
            </span>
          ))}
        </div>
      </div>
    );
  }
);

CircularProgress.displayName = 'CircularProgress';

/**
 * StepProgress component
 */
export interface StepProgressProps {
  /**
   * Current step (0-based)
   */
  currentStep: number;
  /**
   * Total steps
   */
  totalSteps: number;
  /**
   * Step labels
   */
  steps?: string[];
  /**
   * Progress variant
   */
  variant?: 'default' | 'numbered' | 'minimal';
  /**
   * Orientation
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Whether completed steps are clickable
   */
  clickable?: boolean;
  /**
   * Step click handler
   */
  onStepClick?: (step: number) => void;
  className?: string;
}

export function StepProgress({
  currentStep,
  totalSteps,
  steps,
  variant = 'default',
  orientation = 'horizontal',
  size = 'md',
  clickable = false,
  onStepClick,
  className,
}: StepProgressProps) {
  const sizeClasses = {
    sm: {
      indicator: 'w-6 h-6 text-xs',
      line: orientation === 'horizontal' ? 'h-0.5' : 'w-0.5',
      label: 'text-xs',
    },
    md: {
      indicator: 'w-8 h-8 text-sm',
      line: orientation === 'horizontal' ? 'h-1' : 'w-1',
      label: 'text-sm',
    },
    lg: {
      indicator: 'w-10 h-10 text-base',
      line: orientation === 'horizontal' ? 'h-1.5' : 'w-1.5',
      label: 'text-base',
    },
  };

  const config = sizeClasses[size];

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'current';
    return 'pending';
  };

  const handleStepClick = (stepIndex: number) => {
    if (clickable && stepIndex <= currentStep && onStepClick) {
      onStepClick(stepIndex);
    }
  };

  return (
    <div
      className={cn(
        'flex',
        orientation === 'horizontal' ? 'items-center' : 'flex-col',
        className
      )}
    >
      {Array.from({ length: totalSteps }, (_, index) => {
        const status = getStepStatus(index);
        const isLast = index === totalSteps - 1;
        const stepLabel = steps?.[index];

        return (
          <div
            key={index}
            className={cn(
              'flex items-center',
              orientation === 'vertical' && 'flex-col',
              !isLast && orientation === 'horizontal' && 'flex-1'
            )}
          >
            {/* Step indicator */}
            <div
              className={cn(
                'flex items-center justify-center rounded-full font-medium',
                'border-2 transition-all duration-200',
                config.indicator,
                {
                  'bg-primary border-primary text-primary-foreground': status === 'completed',
                  'bg-primary border-primary text-primary-foreground ring-2 ring-primary/20': status === 'current',
                  'bg-background border-muted text-muted-foreground': status === 'pending',
                  'cursor-pointer hover:border-primary/50': clickable && index <= currentStep,
                }
              )}
              onClick={() => handleStepClick(index)}
            >
              {variant === 'numbered' || !steps ? (
                status === 'completed' ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  index + 1
                )
              ) : (
                <div className={cn(
                  'w-2 h-2 rounded-full',
                  status === 'completed' ? 'bg-primary-foreground' :
                  status === 'current' ? 'bg-primary-foreground' :
                  'bg-muted-foreground'
                )} />
              )}
            </div>

            {/* Step label */}
            {stepLabel && orientation === 'horizontal' && (
              <span
                className={cn(
                  'ml-2 font-medium',
                  config.label,
                  {
                    'text-primary': status === 'current',
                    'text-foreground': status === 'completed',
                    'text-muted-foreground': status === 'pending',
                  }
                )}
              >
                {stepLabel}
              </span>
            )}

            {/* Connecting line */}
            {!isLast && (
              <div
                className={cn(
                  'flex-1 bg-muted',
                  config.line,
                  orientation === 'horizontal' ? 'mx-4' : 'my-4',
                  {
                    'bg-primary': index < currentStep,
                  }
                )}
              />
            )}

            {/* Vertical label */}
            {stepLabel && orientation === 'vertical' && (
              <span
                className={cn(
                  'mt-2 text-center font-medium',
                  config.label,
                  {
                    'text-primary': status === 'current',
                    'text-foreground': status === 'completed',
                    'text-muted-foreground': status === 'pending',
                  }
                )}
              >
                {stepLabel}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
