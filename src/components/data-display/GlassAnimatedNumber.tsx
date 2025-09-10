import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { OptimizedGlass } from '../../primitives';
import { useA11yId } from '../../utils/a11y';
import { useMotionPreferenceContext } from '../../contexts/MotionPreferenceContext';

export interface GlassAnimatedNumberProps {
  /** The target number to animate to */
  value: number;
  /** Starting value for animation */
  from?: number;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Animation easing function */
  easing?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
  /** Number of decimal places to show */
  decimals?: number;
  /** Whether to use comma separators */
  separator?: boolean;
  /** Prefix to show before the number */
  prefix?: string;
  /** Suffix to show after the number */
  suffix?: string;
  /** Custom formatter function */
  formatter?: (value: number) => string;
  /** Whether to animate on value change */
  animateOnChange?: boolean;
  /** Custom className */
  className?: string;
  /** Font size */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Animation variant */
  variant?: 'count' | 'scale' | 'glow';
  /** Respect user's motion preferences */
  respectMotionPreference?: boolean;
  /** ARIA label for the animated number */
  'aria-label'?: string;
}

// Easing functions
const easingFunctions = {
  linear: (t: number) => t,
  easeIn: (t: number) => t * t,
  easeOut: (t: number) => t * (2 - t),
  easeInOut: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
};

export const GlassAnimatedNumber = forwardRef<HTMLDivElement, GlassAnimatedNumberProps>(({
  value,
  from = 0,
  duration = 1000,
  easing = 'easeOut',
  decimals = 0,
  separator = false,
  prefix = '',
  suffix = '',
  formatter,
  animateOnChange = true,
  className = '',
  size = 'md',
  variant = 'count',
}, ref) => {
  const [displayValue, setDisplayValue] = useState(from);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const startValueRef = useRef<number>(from);
  const elementRef = useRef<HTMLDivElement>(null);

  // Forward ref
  useImperativeHandle(ref, () => elementRef.current as HTMLDivElement);

  const sizeClasses = {
    sm: 'glass-text-lg',
    md: 'glass-text-2xl',
    lg: 'text-4xl',
    xl: 'text-6xl',
  };

  // Format number with separators and decimals
  const formatNumber = (num: number): string => {
    if (formatter) {
      return formatter(num);
    }

    let formatted = num.toFixed(decimals);

    if (separator) {
      // Add comma separators for thousands
      formatted = formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return `${prefix}${formatted}${suffix}`;
  };

  // Animation loop
  const animate = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);

    const easedProgress = easingFunctions[easing](progress);
    const currentValue = startValueRef.current + (value - startValueRef.current) * easedProgress;

    setDisplayValue(currentValue);

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setDisplayValue(value);
      setIsAnimating(false);
    }
  };

  // Start animation when value changes
  useEffect(() => {
    if (!animateOnChange || value === startValueRef.current) {
      setDisplayValue(value);
      return;
    }

    setIsAnimating(true);
    startValueRef.current = displayValue;
    startTimeRef.current = undefined;

    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    // Start new animation
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, animateOnChange]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'scale':
        return {
          transform: isAnimating ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.2s ease',
        };
      case 'glow':
        return {
          textShadow: isAnimating
            ? '0 0 20px rgba(255,255,255,0.5), 0 0 40px ${glassStyles.borderColor || "rgba(255, 255, 255, 0.3)"}'
            : 'none',
          transition: 'text-shadow 0.3s ease',
        };
      case 'count':
      default:
        return {};
    }
  };

  return (
    <OptimizedGlass
      ref={elementRef}
      className={`inline-flex items-center justify-center font-mono font-bold glass-text-primary ${sizeClasses[size]} ${className}`}
      style={getVariantStyles()}
      elevation="level1"
      interactive={false}
    >
      <span className="tabular-nums">
        {formatNumber(displayValue)}
      </span>
    </OptimizedGlass>
  );
});

GlassAnimatedNumber.displayName = 'GlassAnimatedNumber';

// Compound component for animated counter with label
export const GlassAnimatedCounter: React.FC<{
  value: number;
  label?: string;
  from?: number;
  duration?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({
  value,
  label,
  from = 0,
  duration = 1500,
  size = 'lg',
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center glass-gap-2 ${className}`}>
      <GlassAnimatedNumber
        value={value}
        from={from}
        duration={duration}
        size={size}
        variant="scale"
        separator={true}
      />
      {label && (
        <OptimizedGlass
          className="glass-text-sm glass-text-primary/70 font-medium"
          elevation="level1"
        >
          {label}
        </OptimizedGlass>
      )}
    </div>
  );
};

// Compound component for animated progress/stat
export const GlassAnimatedStat: React.FC<{
  value: number;
  total?: number;
  label?: string;
  showPercentage?: boolean;
  duration?: number;
  className?: string;
}> = ({
  value,
  total,
  label,
  showPercentage = false,
  duration = 1000,
  className = '',
}) => {
  const percentage = total ? (value / total) * 100 : value;

  return (
    <div className={`flex flex-col glass-gap-2 ${className}`}>
      <div className="flex items-baseline glass-gap-2">
        <GlassAnimatedNumber
          value={value}
          duration={duration}
          size="lg"
          separator={true}
        />
        {showPercentage && total && (
          <GlassAnimatedNumber
            value={percentage}
            duration={duration}
            decimals={1}
            suffix="%"
            size="md"
            className="glass-text-primary/80"
          />
        )}
      </div>

      {label && (
        <OptimizedGlass
          className="glass-text-sm glass-text-primary/70"
          elevation="level1"
        >
          {label}
        </OptimizedGlass>
      )}

      {/* Progress bar */}
      {total && (
        <OptimizedGlass
          className="h-2 w-full glass-radius-full overflow-hidden"
          elevation="level1"
        >
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 glass-radius-full transition-all duration-1000 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </OptimizedGlass>
      )}
    </div>
  );
};

// Utility hook for managing animated numbers
export const useAnimatedNumber = (
  targetValue: number,
  options: {
    duration?: number;
    easing?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
    decimals?: number;
  } = {}
) => {
  const [currentValue, setCurrentValue] = useState(targetValue);
  const [isAnimating, setIsAnimating] = useState(false);

  const animateTo = (newValue: number) => {
    if (newValue === currentValue) return;

    setIsAnimating(true);
    const startValue = currentValue;
    const startTime = Date.now();
    const duration = options.duration || 1000;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = easingFunctions[options.easing || 'easeOut'](progress);
      const current = startValue + (newValue - startValue) * easedProgress;

      setCurrentValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentValue(newValue);
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  };

  return {
    value: currentValue,
    isAnimating,
    animateTo,
  };
};
