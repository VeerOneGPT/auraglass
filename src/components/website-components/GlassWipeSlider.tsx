"use client";

import { useAnimationDuration, useMotionAwareAnimation } from '../../hooks/useMotionPreference';
import { cn } from '../../lib/utilsComprehensive';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

// Icons for handle indicators
const ChevronLeftIcon = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
  </svg>
);

const ChevronUpIcon = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

// Preset positions for common comparisons
export const SLIDER_PRESETS = {
  BEFORE_ONLY: 0,
  QUARTER: 25,
  HALF: 50,
  THREE_QUARTER: 75,
  AFTER_ONLY: 100,
} as const;

type PresetPosition = typeof SLIDER_PRESETS[keyof typeof SLIDER_PRESETS];

export interface SliderMetric {
  label: string;
  beforeValue: string | number;
  afterValue: string | number;
  unit?: string;
  format?: 'number' | 'percentage' | 'currency' | 'time';
  highlight?: boolean;
}

export interface ComparisonLabels {
  before: string;
  after: string;
  beforeDescription?: string;
  afterDescription?: string;
}

interface GlassWipeSliderProps {
  // Content
  beforeContent: React.ReactNode;
  afterContent: React.ReactNode;

  // Configuration
  className?: string;
  initialPosition?: number; // 0-100
  orientation?: 'horizontal' | 'vertical';

  // Behavior
  enableSnapping?: boolean;
  snapThreshold?: number; // Distance to snap to presets (default: 5)
  enableMomentum?: boolean;
  momentumMultiplier?: number;
  debounceMs?: number;

  // Visual customization
  handleSize?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  showProgress?: boolean;
  showMetrics?: boolean;
  labels?: ComparisonLabels;
  metrics?: SliderMetric[];

  // Track styling
  trackStyle?: 'default' | 'minimal' | 'bold';
  gradientOverlay?: boolean;

  // Layout
  height?: string | number;
  minHeight?: string | number;

  // Callbacks
  onPositionChange?: (position: number) => void;
  onSnapToPreset?: (preset: PresetPosition) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

export function GlassWipeSlider({
  beforeContent,
  afterContent,
  className,
  initialPosition = 50,
  orientation = 'horizontal',
  enableSnapping = true,
  snapThreshold = 5,
  enableMomentum = true,
  momentumMultiplier = 0.3,
  debounceMs = 16,
  handleSize = 'md',
  showLabels = true,
  showProgress = true,
  showMetrics = false,
  labels = { before: 'Before', after: 'After' },
  metrics = [],
  trackStyle = 'default',
  gradientOverlay = true,
  height = '24rem', // h-96
  minHeight,
  onPositionChange,
  onSnapToPreset,
  onDragStart,
  onDragEnd,
}: GlassWipeSliderProps) {
  // Motion-aware hooks
  const { getAnimationProps, getTransition } = useMotionAwareAnimation();
  const { duration } = useAnimationDuration(200);

  // State management
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [velocity, setVelocity] = useState(0);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const lastUpdateTime = useRef(Date.now());
  const lastPosition = useRef(initialPosition);
  const animationFrame = useRef<number | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Motion values for smooth animations
  const motionX = useMotionValue(initialPosition);
  const motionY = useMotionValue(initialPosition);
  const springX = useSpring(motionX, { stiffness: 300, damping: 30 });
  const springY = useSpring(motionY, { stiffness: 300, damping: 30 });

  const handleTransform = useTransform(
    orientation === 'horizontal' ? springX : springY,
    [0, 100],
    orientation === 'horizontal'
      ? ['translateX(-50%) translateY(-50%)', 'translateX(-50%) translateY(-50%)']
      : ['translateX(-50%) translateY(-50%)', 'translateX(-50%) translateY(-50%)']
  );

  // Snap to preset positions
  const snapToNearestPreset = useCallback((currentPos: number) => {
    if (!enableSnapping) return currentPos;

    const presetValues = Object.values(SLIDER_PRESETS);
    const nearest = presetValues.reduce((prev, curr) =>
      Math.abs(curr - currentPos) < Math.abs(prev - currentPos) ? curr : prev
    );

    if (Math.abs(nearest - currentPos) <= snapThreshold) {
      onSnapToPreset?.(nearest as PresetPosition);
      return nearest;
    }

    return currentPos;
  }, [enableSnapping, snapThreshold, onSnapToPreset]);

  // Apply momentum when drag ends
  const applyMomentum = useCallback(() => {
    if (!enableMomentum || Math.abs(velocity) < 0.1) return;

    const startPos = position;
    const targetPos = Math.max(0, Math.min(100, position + velocity * momentumMultiplier * 10));
    const snappedPos = snapToNearestPreset(targetPos);

    // Animate to final position
    const startTime = Date.now();
    const duration = Math.min(800, Math.abs(snappedPos - startPos) * 20);

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out cubic)
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentPos = startPos + (snappedPos - startPos) * easedProgress;

      setPosition(currentPos);
      motionX.set(currentPos);
      motionY.set(currentPos);

      if (progress < 1) {
        animationFrame.current = requestAnimationFrame(animate);
      } else {
        setVelocity(0);
      }
    };

    animationFrame.current = requestAnimationFrame(animate);
  }, [position, velocity, enableMomentum, momentumMultiplier, snapToNearestPreset]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    onDragStart?.();

    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }

    const clientPos = orientation === 'horizontal' ? e.clientX : e.clientY;
    handleMove(clientPos);

    // Reset velocity tracking
    lastUpdateTime.current = Date.now();
    lastPosition.current = position;
  };

  const handleMove = useCallback((clientPos: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const size = orientation === 'horizontal' ? rect.width : rect.height;
    const offset = orientation === 'horizontal'
      ? clientPos - rect.left
      : clientPos - rect.top;

    const newPosition = (offset / size) * 100;
    const clampedPosition = Math.max(0, Math.min(100, newPosition));

    // Calculate velocity for momentum
    const now = Date.now();
    const timeDelta = now - lastUpdateTime.current;
    const positionDelta = clampedPosition - lastPosition.current;

    if (timeDelta > 0) {
      setVelocity(positionDelta / timeDelta);
    }

    lastUpdateTime.current = now;
    lastPosition.current = clampedPosition;

    setPosition(clampedPosition);
    motionX.set(clampedPosition);
    motionY.set(clampedPosition);

    // Debounced callback
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      onPositionChange?.(clampedPosition);
    }, debounceMs);
  }, [orientation, onPositionChange, debounceMs]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const clientPos = orientation === 'horizontal' ? e.clientX : e.clientY;
        handleMove(clientPos);
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        onDragEnd?.();

        // Apply momentum and snapping
        setTimeout(() => {
          applyMomentum();
        }, 0);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches?.[0]) {
        e.preventDefault();
        const touch = e.touches?.[0];
        const clientPos = orientation === 'horizontal' ? touch.clientX : touch.clientY;
        handleMove(clientPos);
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMove, orientation, applyMomentum, onDragEnd]);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    onDragStart?.();

    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }

    if (e.touches?.[0]) {
      const touch = e.touches?.[0];
      const clientPos = orientation === 'horizontal' ? touch.clientX : touch.clientY;
      handleMove(clientPos);

      // Reset velocity tracking
      lastUpdateTime.current = Date.now();
      lastPosition.current = position;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : e.ctrlKey || e.metaKey ? 25 : 1;
    let newPosition = position;
    let shouldSnap = false;

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        newPosition = Math.max(0, position - step);
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        newPosition = Math.min(100, position + step);
        break;
      case 'Home':
        e.preventDefault();
        newPosition = SLIDER_PRESETS.BEFORE_ONLY;
        shouldSnap = true;
        break;
      case 'End':
        e.preventDefault();
        newPosition = SLIDER_PRESETS.AFTER_ONLY;
        shouldSnap = true;
        break;
      case 'PageUp':
        e.preventDefault();
        newPosition = SLIDER_PRESETS.QUARTER;
        shouldSnap = true;
        break;
      case 'PageDown':
        e.preventDefault();
        newPosition = SLIDER_PRESETS.THREE_QUARTER;
        shouldSnap = true;
        break;
      case ' ':
      case 'Enter':
        e.preventDefault();
        newPosition = SLIDER_PRESETS.HALF;
        shouldSnap = true;
        break;
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
        e.preventDefault();
        const presetIndex = parseInt(e.key);
        const presetValues = Object.values(SLIDER_PRESETS);
        if (presetIndex < (presetValues?.length || 0)) {
          newPosition = presetValues[presetIndex];
          shouldSnap = true;
        }
        break;
    }

    if (newPosition !== position) {
      setPosition(newPosition);
      motionX.set(newPosition);
      motionY.set(newPosition);
      onPositionChange?.(newPosition);

      if (shouldSnap) {
        onSnapToPreset?.(newPosition as PresetPosition);
      }
    }
  };

  // Handle size variants
  const handleSizes = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-14 h-14',
  };

  // Dynamic styles based on props
  const containerHeight = typeof height === 'string' ? height : `${height}px`;
  const containerMinHeight = minHeight ? (typeof minHeight === 'string' ? minHeight : `${minHeight}px`) : undefined;

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  // Computed values
  const isVertical = orientation === 'vertical';
  const cursorClass = isVertical ? 'cursor-row-resize' : 'cursor-col-resize';
  const clipPath = isVertical
    ? `inset(${100 - position}% 0 0 0)`
    : `inset(0 ${100 - position}% 0 0)`;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden rounded-lg select-none glass-card-motion-aware",
        cursorClass,
        {
          'h-96': !height || height === '24rem',
        },
        className
      )}
      style={{
        height: containerHeight,
        minHeight: containerMinHeight,
      }}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      aria-label={`${labels.before} vs ${labels.after} comparison slider. Use arrow keys, Home, End, or number keys 0-5 for presets.`}
      aria-describedby={showMetrics && (metrics?.length || 0) > 0 ? 'slider-metrics' : undefined}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {/* Before content (background layer) */}
      <div className="absolute inset-0 w-full h-full">
        {beforeContent}
      </div>

      {/* After content (clipped layer) */}
      <div
        className="absolute inset-0 overflow-hidden transition-all duration-75 ease-out"
        style={{
          clipPath,
          ...(isVertical
            ? { width: '100%', height: '100%' }
            : { width: '100%', height: '100%' }
          )
        }}
      >
        {afterContent}
      </div>

      {/* Gradient overlay for smooth transitions */}
      {gradientOverlay && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            ...(isVertical ? {
              top: `${position}%`,
              left: 0,
              right: 0,
              height: '20px',
              transform: 'translateY(-50%)',
              background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 50%, transparent 100%)'
            } : {
              left: `${position}%`,
              top: 0,
              bottom: 0,
              width: '20px',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.1) 50%, transparent 100%)'
            }),
            opacity: isHovered || isDragging ? 0.5 : 0.2
          }}
        />
      )}

      {/* Glass divider line */}
      <div
        className={cn(
          "absolute backdrop-blur-md shadow-lg transition-all duration-200 ease-out",
          {
            // Horizontal orientation
            'top-0 bottom-0 bg-gradient-to-b from-white/40 via-white/60 to-white/40': !isVertical,
            'w-0.5': !isVertical && trackStyle === 'minimal',
            'w-1': !isVertical && trackStyle === 'default',
            'w-2': !isVertical && trackStyle === 'bold',

            // Vertical orientation  
            'left-0 right-0 bg-gradient-to-r from-white/40 via-white/60 to-white/40': isVertical,
            'h-0.5': isVertical && trackStyle === 'minimal',
            'h-1': isVertical && trackStyle === 'default',
            'h-2': isVertical && trackStyle === 'bold',
          }
        )}
        style={{
          ...(isVertical ? {
            top: `${position}%`,
            transform: 'translateY(-50%)',
          } : {
            left: `${position}%`,
            transform: 'translateX(-50%)',
          }),
          boxShadow: isDragging || isHovered
            ? '0 0 20px rgba(59, 130, 246, 0.6)'
            : '0 0 10px rgba(255, 255, 255, 0.3)'
        }}
      >
        {/* Glass effect overlay */}
        <div className={cn(
          "absolute inset-0",
          isVertical
            ? "bg-gradient-to-t from-transparent via-white/20 to-transparent"
            : "bg-gradient-to-r from-transparent via-white/20 to-transparent"
        )} />

        {/* Active glow effect */}
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-300",
            isVertical
              ? "bg-gradient-to-t from-cyan-500/20 via-blue-500/30 to-cyan-500/20"
              : "bg-gradient-to-r from-cyan-500/20 via-blue-500/30 to-cyan-500/20"
          )}
          style={{
            opacity: isDragging || isHovered ? 0.8 : 0
          }}
        />
      </div>

      {/* Interactive handle */}
      <motion.div
        ref={handleRef}
        className={cn(
          "absolute cursor-grab active:cursor-grabbing touch-target z-20",
          handleSizes?.[handleSize],
          {
            'top-1/2 -translate-y-1/2': !isVertical,
            'left-1/2 -translate-x-1/2': isVertical,
          }
        )}
        style={{
          ...(isVertical ? {
            top: `${position}%`,
            transform: 'translateY(-50%) translateX(-50%)',
          } : {
            left: `${position}%`,
            transform: 'translateX(-50%) translateY(-50%)',
          })
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        {...getAnimationProps({
          whileHover: { scale: 1.1 },
          whileTap: { scale: 0.95 },
          animate: {
            boxShadow: isDragging || isFocused
              ? '0 0 30px rgba(59, 130, 246, 0.6)'
              : isHovered
                ? '0 0 25px rgba(255, 255, 255, 0.4)'
                : '0 0 20px rgba(255, 255, 255, 0.3)'
          },
        })}
        transition={getTransition(duration / 1000)}
      >
        {/* Glass handle */}
        <div className="w-full h-full rounded-full glass-foundation-complete bg-glass-gradient-strong backdrop-blur-md-medium border border-white/30 flex items-center justify-center group relative overflow-hidden">
          {/* Arrow indicators */}
          <div className={cn(
            "flex items-center gap-1 text-white/70 group-hover:text-white/90 transition-colors duration-200 relative z-10",
            isVertical ? "flex-col" : "flex-row"
          )}>
            {isVertical ? (
              <>
                <ChevronUpIcon />
                <div className="w-1 h-1 rounded-full bg-current opacity-50" />
                <ChevronDownIcon />
              </>
            ) : (
              <>
                <ChevronLeftIcon />
                <div className="w-1 h-1 rounded-full bg-current opacity-50" />
                <ChevronRightIcon />
              </>
            )}
          </div>

          {/* Multi-layer glow effects */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-500/30 transition-opacity duration-200"
            style={{
              opacity: isDragging ? 0.7 : 0
            }}
          />

          {/* Focus ring */}
          {isFocused && (
            <div className="absolute -inset-1 rounded-full border-2 border-blue-400/50 animate-pulse" />
          )}

          {/* Ripple effect for interactions */}
          <div
            className="absolute inset-0 rounded-full bg-white/20 scale-0 transition-transform duration-200"
            style={{
              transform: isDragging ? 'scale(1.5)' : 'scale(0)',
              opacity: isDragging ? 0.3 : 0
            }}
          />
        </div>
      </motion.div>

      {/* Labels */}
      {showLabels && (
        <>
          <motion.div
            className={cn(
              "absolute chip chip-muted text-sm pointer-events-none z-10",
              isVertical ? "top-4 left-1/2 transform -translate-x-1/2" : "top-4 left-4"
            )}
            {...getAnimationProps({
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
            })}
            transition={getTransition(0.3, 'ease-out')}
          >
            <div className="font-medium">{labels.after}</div>
            {labels.afterDescription && (
              <div className="text-xs text-white/60 mt-0.5">{labels.afterDescription}</div>
            )}
          </motion.div>

          <motion.div
            className={cn(
              "absolute chip chip-muted text-sm pointer-events-none z-10",
              isVertical ? "bottom-4 left-1/2 transform -translate-x-1/2" : "top-4 right-4"
            )}
            {...getAnimationProps({
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
            })}
            transition={getTransition(0.3, 'ease-out')}
          >
            <div className="font-medium">{labels.before}</div>
            {labels.beforeDescription && (
              <div className="text-xs text-white/60 mt-0.5">{labels.beforeDescription}</div>
            )}
          </motion.div>
        </>
      )}

      {/* Progress indicator */}
      {showProgress && (
        <motion.div
          className={cn(
            "absolute chip chip-muted text-xs pointer-events-none z-10",
            isVertical
              ? "bottom-4 right-4"
              : "bottom-4 left-1/2 transform -translate-x-1/2"
          )}
          {...getAnimationProps({
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
          })}
          transition={getTransition(0.3, 'ease-out')}
        >
          <div className="flex items-center gap-2">
            <div className="font-mono font-medium">{Math.round(position)}%</div>
            {enableSnapping && (
              <div className="w-1 h-1 rounded-full bg-white/40" />
            )}
          </div>
        </motion.div>
      )}

      {/* Preset position indicators */}
      {enableSnapping && (
        <div className="absolute inset-0 pointer-events-none z-5">
          {Object.entries(SLIDER_PRESETS).map(([key, value]) => (
            <div
              key={key}
              className={cn(
                "absolute w-2 h-2 rounded-full bg-white/30 backdrop-blur-md border border-white/20 transition-all duration-200",
                Math.abs(position - value) <= snapThreshold ? 'bg-blue-400/60 scale-125' : ''
              )}
              style={{
                ...(isVertical ? {
                  top: `${value}%`,
                  left: '50%',
                  transform: 'translateX(-50%) translateY(-50%)'
                } : {
                  left: `${value}%`,
                  top: '50%',
                  transform: 'translateX(-50%) translateY(-50%)'
                })
              }}
            />
          ))}
        </div>
      )}

      {/* Metrics comparison overlay */}
      {showMetrics && (metrics?.length || 0) > 0 && (
        <div
          id="slider-metrics"
          className={cn(
            "absolute glass-foundation-complete bg-glass-gradient-strong backdrop-blur-md-medium border border-white/20 rounded-lg p-4 z-10 max-w-sm",
            isVertical
              ? "top-1/2 right-4 transform -translate-y-1/2"
              : "top-4 left-1/2 transform -translate-x-1/2"
          )}
          style={{
            opacity: isHovered || isDragging || isFocused ? 0.95 : 0.7
          }}
        >
          <div className="space-y-2">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center justify-between text-sm",
                  metric?.highlight ? 'text-cyan-300 font-semibold' : 'text-white/80'
                )}
              >
                <span className="font-medium">{metric?.label}</span>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-red-300">{metric?.beforeValue}{metric?.unit}</span>
                  <span className="text-white/50">→</span>
                  <span className="text-green-300">{metric?.afterValue}{metric?.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Keyboard instructions */}
      <div className="sr-only">
        Use arrow keys to adjust the comparison. Press Home for 0%, End for 100%, Space for 50%.
        Number keys 0-5 jump to preset positions. Shift+arrows for larger steps.
      </div>
    </div>
  );
}

// Comparison content components for common use cases
export function ComparisonImage({
  src,
  alt,
  className,
  loading = 'lazy'
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={1200}
      height={800}
      className={cn("w-full h-full object-cover transition-all duration-300", className)}
      loading={loading}
    />
  );
}

export function ComparisonContent({
  children,
  className,
  background = 'gradient'
}: {
  children: React.ReactNode;
  className?: string;
  background?: 'gradient' | 'solid' | 'glass' | 'transparent';
}) {
  const backgroundClasses = {
    gradient: 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900',
    solid: 'bg-slate-900',
    glass: 'glass-foundation-complete bg-glass-gradient-subtle backdrop-blur-md-medium',
    transparent: 'bg-transparent'
  };

  return (
    <div className={cn(
      "w-full h-full flex items-center justify-center p-8 transition-all duration-300",
      backgroundClasses?.[background],
      className
    )}>
      {children}
    </div>
  );
}

// Pre-built comparison layouts
export function FeatureComparison({
  beforeFeatures,
  afterFeatures,
  title,
  className
}: {
  beforeFeatures: Array<{ name: string; available: boolean; highlight?: boolean }>;
  afterFeatures: Array<{ name: string; available: boolean; highlight?: boolean }>;
  title?: string;
  className?: string;
}) {
  return (
    <ComparisonContent className={className} background="glass">
      <div className="w-full max-w-md space-y-4">
        {title && (
          <h3 className="text-lg font-semibold text-white text-center mb-6">{title}</h3>
        )}
        <div className="space-y-2">
          {beforeFeatures.map((feature, index) => {
            const afterFeature = afterFeatures?.[index];
            return (
              <div key={feature.name} className="flex items-center justify-between py-2 px-3 surface-1">
                <span className={cn(
                  "text-sm",
                  feature.highlight ? 'text-cyan-300 font-medium' : 'text-white/90'
                )}>
                  {feature.name}
                </span>
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    feature.available ? 'bg-green-400' : 'bg-red-400'
                  )} />
                  {afterFeature && (
                    <>
                      <span className="text-white/40">→</span>
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        afterFeature.available ? 'bg-green-400' : 'bg-red-400'
                      )} />
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ComparisonContent>
  );
}

// Performance metrics comparison
export function MetricsComparison({
  metrics,
  title,
  className
}: {
  metrics: SliderMetric[];
  title?: string;
  className?: string;
}) {
  return (
    <ComparisonContent className={className} background="glass">
      <div className="w-full max-w-lg space-y-4">
        {title && (
          <h3 className="text-xl font-semibold text-white text-center mb-6">{title}</h3>
        )}
        <div className="grid gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="surface-1 p-4">
              <div className="text-center space-y-3">
                <div className={cn(
                  "text-sm font-medium",
                  metric?.highlight ? 'text-cyan-300' : 'text-white/80'
                )}>
                  {metric?.label}
                </div>
                <div className="flex items-center justify-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-300 font-mono">
                      {metric?.beforeValue}{metric?.unit}
                    </div>
                    <div className="text-xs text-white/50 mt-1">Before</div>
                  </div>
                  <div className="text-white/40 text-xl">→</div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-300 font-mono">
                      {metric?.afterValue}{metric?.unit}
                    </div>
                    <div className="text-xs text-white/50 mt-1">After</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ComparisonContent>
  );
}

// Usage examples for AuraOne vs competitors
export const AURAONE_COMPARISON_EXAMPLES = {
  SCALE_AI: {
    labels: {
      before: "Scale AI",
      after: "AuraOne",
      beforeDescription: "Traditional approach",
      afterDescription: "Next-gen platform"
    },
    metrics: [
      {
        label: "Model Training Speed",
        beforeValue: "2-4",
        afterValue: "< 1",
        unit: " weeks",
        highlight: true
      },
      {
        label: "Accuracy Improvement",
        beforeValue: "85",
        afterValue: "97",
        unit: "%",
        highlight: true
      },
      {
        label: "Infrastructure Cost",
        beforeValue: "$10K",
        afterValue: "$2K",
        unit: "/month",
        highlight: true
      },
      {
        label: "Setup Complexity",
        beforeValue: "High",
        afterValue: "Low",
        unit: ""
      }
    ]
  },
  OPENAI_GYM: {
    labels: {
      before: "OpenAI Gym",
      after: "AuraOne",
      beforeDescription: "Research-focused",
      afterDescription: "Production-ready"
    },
    metrics: [
      {
        label: "Environment Setup",
        beforeValue: "Hours",
        afterValue: "Minutes",
        unit: "",
        highlight: true
      },
      {
        label: "Scalability",
        beforeValue: "Limited",
        afterValue: "Unlimited",
        unit: "",
        highlight: true
      },
      {
        label: "Production Features",
        beforeValue: "Basic",
        afterValue: "Enterprise",
        unit: "",
        highlight: true
      }
    ]
  }
} as const;
