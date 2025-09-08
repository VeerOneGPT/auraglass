'use client';

import React, { forwardRef, useId, useState, useCallback, useRef, useEffect } from 'react';
import { OptimizedGlass } from '../../primitives/glass/OptimizedGlass';
import { Motion } from '../../primitives/motion/Motion';
import { cn } from '@/lib/utils';

export interface GlassSliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Current value(s) of the slider */
  value?: number | number[];
  /** Default value(s) (uncontrolled) */
  defaultValue?: number | number[];
  /** Callback when value changes */
  onChange?: (value: number | number[]) => void;
  /** Callback when value changes during drag */
  onValueChange?: (value: number | number[]) => void;
  /** Callback when drag starts */
  onValueCommit?: (value: number | number[]) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Orientation of the slider */
  orientation?: 'horizontal' | 'vertical';
  /** Size of the slider */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  /** Whether to show value labels */
  showValue?: boolean;
  /** Whether to show tick marks */
  showTicks?: boolean;
  /** Number of tick marks or array of tick values */
  ticks?: number | number[];
  /** Label for the slider */
  label?: string;
  /** Description text */
  description?: string;
  /** Custom thumb content */
  thumbContent?: React.ReactNode;
  /** Whether to invert the slider direction */
  inverted?: boolean;
  /** Format function for displayed values */
  formatValue?: (value: number) => string;
  /** Range mode (multiple thumbs) */
  range?: boolean;
}

export const GlassSlider = forwardRef<HTMLDivElement, GlassSliderProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      onValueChange,
      onValueCommit,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      orientation = 'horizontal',
      size = 'md',
      variant = 'default',
      showValue = false,
      showTicks = false,
      ticks,
      label,
      description,
      thumbContent,
      inverted = false,
      formatValue = (val) => val.toString(),
      range = false,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const sliderId = useId();
    const finalId = id || sliderId;
    const trackRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragIndex, setDragIndex] = useState(0);

    // Initialize internal value
    const getInitialValue = () => {
      if (value !== undefined) return value;
      if (defaultValue !== undefined) return defaultValue;
      return range ? [min, max] : min;
    };

    const [internalValue, setInternalValue] = useState(getInitialValue);
    const currentValue = value !== undefined ? value : internalValue;

    // Ensure value is always an array for consistent handling
    const valueArray = Array.isArray(currentValue) ? currentValue : [currentValue];
    const isRange = range || valueArray.length > 1;

    const sizeConfig = {
      sm: {
        track: orientation === 'horizontal' ? 'h-1.5' : 'w-1.5',
        thumb: 'h-4 w-4',
        label: 'text-xs',
        tick: 'h-1 w-px',
      },
      md: {
        track: orientation === 'horizontal' ? 'h-2' : 'w-2',
        thumb: 'h-5 w-5',
        label: 'text-sm',
        tick: 'h-1.5 w-px',
      },
      lg: {
        track: orientation === 'horizontal' ? 'h-3' : 'w-3',
        thumb: 'h-6 w-6',
        label: 'text-base',
        tick: 'h-2 w-px',
      },
    };

    const variantConfig = {
      default: {
        track: 'bg-muted/50',
        fill: 'bg-primary',
        thumb: 'bg-white border-primary/20 shadow-lg',
      },
      success: {
        track: 'bg-muted/50',
        fill: 'bg-green-500',
        thumb: 'bg-white border-green-400/20 shadow-lg',
      },
      warning: {
        track: 'bg-muted/50',
        fill: 'bg-amber-500',
        thumb: 'bg-white border-amber-400/20 shadow-lg',
      },
      error: {
        track: 'bg-muted/50',
        fill: 'bg-red-500',
        thumb: 'bg-white border-red-400/20 shadow-lg',
      },
      info: {
        track: 'bg-muted/50',
        fill: 'bg-blue-500',
        thumb: 'bg-white border-blue-400/20 shadow-lg',
      },
    };

    const config = sizeConfig[size];
    const colors = variantConfig[variant];

    // Utility functions
    const clampValue = (val: number) => Math.max(min, Math.min(max, val));
    
    const snapToStep = (val: number) => {
      const snapped = Math.round((val - min) / step) * step + min;
      return clampValue(snapped);
    };

    const getPercentage = (val: number) => {
      return ((val - min) / (max - min)) * 100;
    };

    const getValueFromPercentage = (percentage: number) => {
      const val = (percentage / 100) * (max - min) + min;
      return snapToStep(val);
    };

    // Generate tick marks
    const generateTicks = () => {
      if (!showTicks) return [];
      
      if (Array.isArray(ticks)) {
        return ticks.filter(tick => tick >= min && tick <= max);
      }
      
      const tickCount = typeof ticks === 'number' ? ticks : Math.max(2, Math.min(10, (max - min) / step + 1));
      const tickStep = (max - min) / (tickCount - 1);
      
      return Array.from({ length: tickCount }, (_, i) => min + i * tickStep);
    };

    const tickMarks = generateTicks();

    // Handle pointer events
    const getPointerPosition = (event: PointerEvent | React.PointerEvent) => {
      if (!trackRef.current) return 0;
      
      const rect = trackRef.current.getBoundingClientRect();
      const isHorizontal = orientation === 'horizontal';
      
      let position;
      if (isHorizontal) {
        position = ((event.clientX - rect.left) / rect.width) * 100;
      } else {
        position = ((rect.bottom - event.clientY) / rect.height) * 100;
      }
      
      return inverted ? 100 - position : position;
    };

    const updateValue = useCallback((newValueArray: number[]) => {
      const clampedValues = newValueArray.map(clampValue);
      const finalValue = isRange ? clampedValues : clampedValues[0];
      
      if (value === undefined) {
        setInternalValue(finalValue);
      }
      
      onChange?.(finalValue);
      onValueChange?.(finalValue);
    }, [value, onChange, onValueChange, isRange]);

    const handlePointerDown = (event: React.PointerEvent, thumbIndex: number) => {
      if (disabled) return;
      
      event.preventDefault();
      setIsDragging(true);
      setDragIndex(thumbIndex);
      
      const handlePointerMove = (e: PointerEvent) => {
        const percentage = getPointerPosition(e);
        const newValue = getValueFromPercentage(percentage);
        
        const newValues = [...valueArray];
        newValues[thumbIndex] = newValue;
        
        // Ensure range values don't cross
        if (isRange && newValues.length === 2) {
          if (thumbIndex === 0 && newValue > newValues[1]) {
            newValues[0] = newValues[1];
          } else if (thumbIndex === 1 && newValue < newValues[0]) {
            newValues[1] = newValues[0];
          }
        }
        
        updateValue(newValues);
      };
      
      const handlePointerUp = () => {
        setIsDragging(false);
        setDragIndex(0);
        onValueCommit?.(isRange ? valueArray : valueArray[0]);
        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', handlePointerUp);
      };
      
      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
    };

    const handleTrackClick = (event: React.PointerEvent) => {
      if (disabled || isDragging) return;
      
      const percentage = getPointerPosition(event);
      const newValue = getValueFromPercentage(percentage);
      
      if (isRange) {
        // Find closest thumb
        const distances = valueArray.map(val => Math.abs(val - newValue));
        const closestIndex = distances.indexOf(Math.min(...distances));
        
        const newValues = [...valueArray];
        newValues[closestIndex] = newValue;
        updateValue(newValues);
      } else {
        updateValue([newValue]);
      }
    };

    // Calculate fill styles
    const getFillStyle = () => {
      if (isRange && valueArray.length === 2) {
        const start = getPercentage(Math.min(...valueArray));
        const end = getPercentage(Math.max(...valueArray));
        
        if (orientation === 'horizontal') {
          return {
            left: `${start}%`,
            width: `${end - start}%`,
          };
        } else {
          return {
            bottom: `${start}%`,
            height: `${end - start}%`,
          };
        }
      } else {
        const percentage = getPercentage(valueArray[0]);
        
        if (orientation === 'horizontal') {
          return {
            width: `${percentage}%`,
          };
        } else {
          return {
            height: `${percentage}%`,
          };
        }
      }
    };

    // Render thumbs
    const renderThumbs = () => {
      return valueArray.map((val, index) => {
        const percentage = getPercentage(val);
        const position = orientation === 'horizontal' 
          ? { left: `${percentage}%` }
          : { bottom: `${percentage}%` };

        return (
          <Motion
            key={index}
            preset="scaleIn"
            className={cn(
              'glass-slider-thumb absolute flex items-center justify-center',
              'border backdrop-blur-sm rounded-full cursor-grab transition-all duration-200 glass-magnet glass-press',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
              'transform -translate-x-1/2 -translate-y-1/2',
              
              // Size
              config.thumb,
              
              // Colors
              colors.thumb,
              
              // States
              disabled && 'opacity-50 cursor-not-allowed',
              isDragging && dragIndex === index && 'scale-110 cursor-grabbing',
              
              // Position
              orientation === 'horizontal' ? 'top-1/2' : 'left-1/2'
            )}
            style={position}
            onPointerDown={(e) => handlePointerDown(e, index)}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={val}
            aria-valuetext={formatValue(val)}
            tabIndex={disabled ? -1 : 0}
          >
            {thumbContent || (
              <>
                <div className="absolute inset-0 rounded-full backdrop-blur-md bg-white/25 border border-white/40 shadow-[inset_0_1px_2px_rgba(255,255,255,0.35),inset_0_-1px_3px_rgba(0,0,0,0.25)]" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/15 to-transparent" />
              </>
            )}
            
            {showValue && (
              <div className={cn(
                'absolute whitespace-nowrap px-2 py-1 rounded-md',
                'bg-background/80 border border-border/20',
                'text-foreground font-medium backdrop-blur-sm',
                config.label,
                orientation === 'horizontal' ? '-top-10' : '-left-16'
              )}>
                {formatValue(val)}
              </div>
            )}
          </Motion>
        );
      });
    };

    return (
      <div className={cn('glass-slider-container', className)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={finalId}
            className={cn(
              'glass-slider-label block font-medium text-foreground mb-2',
              config.label
            )}
          >
            {label}
          </label>
        )}
        
        {/* Slider */}
        <div
          ref={ref}
          id={finalId}
          className={cn(
            'glass-slider relative flex items-center',
            orientation === 'horizontal' ? 'w-full h-6' : 'h-32 w-6',
            disabled && 'opacity-50',
          )}
          {...props}
        >
          {/* Track */}
          <div
            ref={trackRef}
            className={cn(
              'glass-slider-track relative backdrop-blur-sm rounded-full border border-border/20',
              orientation === 'horizontal' ? 'w-full' : 'h-full',
              config.track,
              colors.track,
              'cursor-pointer'
            )}
            onPointerDown={handleTrackClick}
          >
            {/* Tick marks */}
            {showTicks && (
              <div className="absolute inset-0">
                {tickMarks.map((tick, index) => {
                  const percentage = getPercentage(tick);
                  const position = orientation === 'horizontal'
                    ? { left: `${percentage}%` }
                    : { bottom: `${percentage}%` };
                  
                  return (
                    <div
                      key={index}
                      className={cn(
                        'absolute bg-foreground/30',
                        orientation === 'horizontal' 
                          ? cn(config.tick, 'top-1/2 transform -translate-y-1/2')
                          : cn(config.tick.replace('h-', 'w-').replace('w-px', 'h-px'), 'left-1/2 transform -translate-x-1/2')
                      )}
                      style={position}
                    />
                  );
                })}
              </div>
            )}
            
            {/* Fill */}
            <div
              className={cn(
                'glass-slider-fill absolute rounded-full transition-all duration-150',
                orientation === 'horizontal' ? 'h-full top-0' : 'w-full left-0',
                colors.fill
              )}
              style={getFillStyle()}
            >
              {/* Sheen sweep */}
              <div className="absolute inset-0 glass-sheen" />
            </div>
            
            {/* Background gradient */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          </div>
          
          {/* Thumbs */}
          {renderThumbs()}
        </div>
        
        {/* Description */}
        {description && (
          <p className={cn(
            'glass-slider-description text-muted-foreground mt-1',
            size === 'sm' ? 'text-xs' : 'text-sm'
          )}>
            {description}
          </p>
        )}
        
        {/* Min/Max labels */}
        {showValue && (
          <div className={cn(
            'flex justify-between mt-2',
            config.label,
            'text-muted-foreground'
          )}>
            <span>{formatValue(min)}</span>
            <span>{formatValue(max)}</span>
          </div>
        )}
      </div>
    );
  }
);

GlassSlider.displayName = 'GlassSlider';

export default GlassSlider;
