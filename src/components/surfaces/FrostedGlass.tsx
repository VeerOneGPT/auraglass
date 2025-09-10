'use client';

/**
 * FrostedGlass Component
 *
 * A modern glass surface with frosted ice effects.
 * Migrated to use OptimizedGlass architecture.
 */
import React, { forwardRef, useRef, useState } from 'react';
import { cn } from '@/lib/utilsComprehensive';
import { OptimizedGlass, Motion } from '../../primitives';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useGlassParallax } from '../../hooks/useGlassParallax';
import { FrostedGlassProps } from './types';

/**
 * FrostedGlass Component
 * Modern implementation using OptimizedGlass with frost effects
 */
export const FrostedGlass = forwardRef<HTMLDivElement, FrostedGlassProps>(
  (
    {
      children,
      className,
      style,
      elevation = 'level2',
      blurStrength = 'standard',
      opacity = 'medium',
      borderOpacity = 'medium',
      borderWidth = 1,
      fullWidth = false,
      fullHeight = false,
      borderRadius = 'md',
      interactive = true,
      padding = 16,
      intensity = 0.5,
      frostColor = 'rgba(255, 255, 255, 0.8)',
      animate = true,
      pattern = 'noise',
      backgroundColor,
      specular = true,
      glow = false,
      lightAngle = 135,
      parallax = false,
      parallaxStrength = 10,
      ...rest
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const shouldAnimate = animate && !prefersReducedMotion;
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Handle parallax when enabled
    useGlassParallax(containerRef, { 
      strength: parallaxStrength, 
      enabled: parallax && !prefersReducedMotion 
    });

    // Map blur strength to intensity
    const intensityMap = {
      none: 'subtle' as const,
      light: 'subtle' as const,
      standard: 'medium' as const,
      heavy: 'strong' as const,
    };

    // Map border radius
    const radiusMap = {
      none: 'rounded-none',
      sm: 'glass-radius-sm',
      md: 'glass-radius-md',
      lg: 'glass-radius-lg',
      xl: 'glass-radius-xl',
      full: 'glass-radius-full',
    };

    // Map elevation to OptimizedGlass elevation levels
    const getElevationLevel = (elev: any) => {
      if (typeof elev === 'string' && elev.startsWith('level')) {
        return elev as 'level1' | 'level2' | 'level3' | 'level4';
      }
      const numElev = typeof elev === 'number' ? elev : 2;
      if (numElev <= 1) return 'level1';
      if (numElev <= 2) return 'level2';
      if (numElev <= 3) return 'level3';
      return 'level4';
    };

    // Generate frost pattern styles
    const getFrostPattern = () => {
      switch (pattern) {
        case 'lines':
          return {
            backgroundImage: `
              linear-gradient(90deg, ${frostColor} 1px, transparent 1px),
              linear-gradient(${frostColor} 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          };
        case 'crystals':
          return {
            backgroundImage: `
              radial-gradient(${frostColor} 5%, transparent 5%), 
              radial-gradient(${frostColor} 5%, transparent 5%)
            `,
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0, 15px 15px',
          };
        case 'noise':
        default:
          return {
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px',
          };
      }
    };

    // Handle mouse events
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    // Merge refs
    const setRefs = (node: HTMLDivElement | null) => {
      (containerRef as any).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };

    const frostPatternStyles = getFrostPattern();
    const glowColor = typeof glow === 'string' ? glow : glow === true ? 'primary' : false;

    return (
      <Motion
        preset={shouldAnimate ? "fadeIn" : "none"}
        className="relative isolate"
      >
        <OptimizedGlass
          ref={setRefs}
          intent="neutral"
          elevation={getElevationLevel(elevation)}
          intensity={intensityMap[blurStrength]}
          depth={2}
          tint="cool"
          border={borderOpacity === 'none' ? 'none' : 'subtle'}
          animation={shouldAnimate ? "breathe" : "none"}
          performanceMode="high"
          liftOnHover={interactive}
          press={interactive}
          className={cn(
            // Base styles
            'relative block box-border overflow-hidden isolate',
            'transition-all duration-300',
            
            // Size
            fullWidth && 'w-full',
            fullHeight && 'h-full',
            !fullWidth && !fullHeight && 'w-auto h-auto',
            
            // Border radius
            typeof borderRadius === 'string' ? radiusMap[borderRadius] : `rounded-[${borderRadius}px]`,
            
            // Padding
            typeof padding === 'number' ? `p-${Math.round(padding / 4)}` : 'glass-p-4',
            
            // Interactive styles
            interactive && [
              'cursor-pointer',
              'hover:-translate-y-0.5',
              'active:translate-y-0',
            ],
            
            // Glow effect
            glowColor && {
              'primary': 'drop-shadow-[0_0_18px_rgba(59,130,246,0.28)]',
              'success': 'drop-shadow-[0_0_18px_rgba(16,185,129,0.28)]',
              'warning': 'drop-shadow-[0_0_18px_rgba(245,158,11,0.28)]',
              'danger': 'drop-shadow-[0_0_18px_rgba(239,68,68,0.28)]',
              'info': 'drop-shadow-[0_0_18px_rgba(14,165,233,0.28)]',
            }[glowColor],
            
            className
          )}
          style={{
            backgroundColor,
            borderWidth: borderWidth > 0 ? `${borderWidth}px` : undefined,
            ...style,
          } as React.CSSProperties}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...rest}
        >
          {/* Frost pattern overlay */}
          <div 
            className={cn(
              'absolute inset-0 pointer-events-none mix-blend-overlay',
              shouldAnimate && 'animate-frost-grow'
            )}
            style={{
              ...frostPatternStyles,
              opacity: 0.3 + intensity * 0.5,
            }}
          />
          
          {/* Frost sparkles */}
          <div 
            className={cn(
              'absolute inset-0 pointer-events-none',
              shouldAnimate && 'animate-frost-sparkle'
            )}
            style={{
              backgroundImage: `radial-gradient(${frostColor} 1px, transparent 1px)`,
              backgroundSize: '30px 30px',
              opacity: intensity * 0.4,
            }}
          />
          
          {/* Specular highlight and edge frost */}
          <div 
            className="absolute inset-0 pointer-events-none rounded-inherit"
            style={{
              // Edge frost
              boxShadow: `inset 0 0 ${5 + intensity * 15}px ${frostColor}`,
              opacity: isHovered ? 0.3 + intensity * 0.4 : 0.2 + intensity * 0.3,
              // Specular highlight
              background: specular ? `
                radial-gradient(${intensity * 80 + 40}% ${intensity * 40 + 40}% at 50% -10%, rgba(255,255,255, ${Math.min(0.35, 0.12 + intensity * 0.35)}) 0%, rgba(255,255,255,0.0) 60%),
                linear-gradient(${lightAngle}deg, rgba(255,255,255,0.18), rgba(255,255,255,0.00) 35%)
              ` : undefined,
              mixBlendMode: specular ? 'screen' : 'normal',
              transform: parallax ? 'translate(var(--glass-parallax-x), var(--glass-parallax-y))' : undefined,
              transition: 'transform 150ms ease-out, opacity 300ms ease',
            }}
          />
          
          {/* Content */}
          <div className="relative z-10">
            {children}
          </div>
        </OptimizedGlass>
      </Motion>
    );
  }
);

FrostedGlass.displayName = 'FrostedGlass';

export default FrostedGlass;