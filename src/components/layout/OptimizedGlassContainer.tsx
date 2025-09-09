import React, { forwardRef, useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

import { createGlassStyle } from '../../core/mixins/glassMixins';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Box } from './Box';

// Types
export enum OptimizationLevel {
  NONE = 'none',
  LIGHT = 'light',
  MODERATE = 'moderate',
  HEAVY = 'heavy',
  MAXIMUM = 'heavy',
  AGGRESSIVE = 'heavy'
}

export interface OptimizedGlassContainerProps {
  children?: React.ReactNode;
  initialOptimizationLevel?: 'none' | 'light' | 'moderate' | 'heavy';
  autoOptimize?: boolean;
  performanceThreshold?: number;
  glassIntensity?: number;
  className?: string;
  style?: React.CSSProperties;
  targetFps?: number;
  checkInterval?: number;
  showIndicator?: boolean;
  preferReducedMotion?: boolean;
  preserveBlur?: boolean;
  onOptimizationChange?: (level: string) => void;
  maxOptimizationLevel?: 'none' | 'light' | 'moderate' | 'heavy';
}

// Styled components
const Container = styled.div<{
  $optimizationLevel: 'none' | 'light' | 'moderate' | 'heavy';
  $glassIntensity: number;
  $preserveBlur: boolean;
}>`
  position: relative;

  ${({ $glassIntensity, $optimizationLevel, $preserveBlur }) => {
    // Apply different glass effects based on optimization level
    let glassOptions;

    switch ($optimizationLevel) {
      case 'none':
        glassOptions = {
          intensity: $glassIntensity,
          backgroundOpacity: 0.6,
          blurStrength: 12,
        };
        break;

      case 'light':
        glassOptions = {
          intensity: $glassIntensity * 0.8,
          backgroundOpacity: 0.65,
          blurStrength: $preserveBlur ? 8 : 6,
        };
        break;

      case 'moderate':
        glassOptions = {
          intensity: $glassIntensity * 0.6,
          backgroundOpacity: 0.7,
          blurStrength: $preserveBlur ? 6 : 4,
        };
        break;

      case 'heavy':
        glassOptions = {
          intensity: $glassIntensity * 0.4,
          backgroundOpacity: 0.8,
          blurStrength: $preserveBlur ? 4 : 2,
        };
        break;

      default:
        glassOptions = {
          intensity: $glassIntensity,
          backgroundOpacity: 0.6,
          blurStrength: 10,
        };
    }

    return `
    background: rgba(255, 255, 255, ${glassOptions.backgroundOpacity});
    backdrop-filter: blur(${glassOptions.blurStrength}px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    `;
  }}

  ${({ $optimizationLevel }) => {
    // Only apply border effects for lower optimization levels
    if ($optimizationLevel === 'heavy') {
      return '';
    }

    return `
    border: 1px solid rgba(255, 255, 255, 0.3);
    `;
  }}
  
  /* Ensure smooth transitions between optimization levels */
  transition: background-color 0.3s ease, 
              backdrop-filter 0.5s ease, 
              border 0.3s ease, 
              box-shadow 0.5s ease;
`;

const PerformanceIndicator = styled.div<{
  $status: 'good' | 'warning' | 'critical';
}>`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ $status }) =>
    $status === 'good' ? '#4caf50' : $status === 'warning' ? '#ff9800' : '#f44336'};
  opacity: 0.7;
  transition: background-color 0.3s ease;
  z-index: 10;
`;

/**
 * A container that automatically optimizes glass effects based on performance
 */
export const OptimizedGlassContainer = forwardRef<HTMLDivElement, OptimizedGlassContainerProps>(
  (
    {
      children,
      initialOptimizationLevel = 'none',
      autoOptimize = true,
      performanceThreshold = 45,
      glassIntensity = 0.7,
      className,
      style,
      targetFps = 60,
      checkInterval = 2000,
      showIndicator = false,
      preferReducedMotion = true,
      preserveBlur = false,
      onOptimizationChange,
      maxOptimizationLevel = 'heavy',
      ...rest
    }: any,
    ref
  ) => {
    // State
    const [optimizationLevel, setOptimizationLevel] =
      useState<'none' | 'light' | 'moderate' | 'heavy'>(initialOptimizationLevel || 'none');
    const [fps, setFps] = useState<number>(0);

    // Refs
    const frameCountRef = useRef(0);
    const lastTimeRef = useRef(performance.now());
    const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Check if user prefers reduced motion
    const prefersReducedMotion = useReducedMotion();

    // Initialize based on device capability
    useEffect(() => {
      // If user prefers reduced motion, set higher optimization
      if (preferReducedMotion && prefersReducedMotion) {
        // Set higher optimization for reduced motion users
        const reducedMotionLevel = 'heavy';
        setOptimizationLevel(reducedMotionLevel);

        if (onOptimizationChange) {
          onOptimizationChange(reducedMotionLevel);
        }

        return;
      }

      // Simplified device capability check
      let initialLevel = initialOptimizationLevel || 'none';

      if (autoOptimize) {
        // Simplified auto-optimization logic
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
          // For low-end devices, use higher optimization
          initialLevel = 'heavy';
        } else if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 8) {
          // For mid-range devices, use moderate optimization
          initialLevel = 'moderate';
        }

        setOptimizationLevel(initialLevel);

        if (onOptimizationChange) {
          onOptimizationChange(initialLevel);
        }
      }
    }, [
      initialOptimizationLevel,
      autoOptimize,
      preferReducedMotion,
      prefersReducedMotion,
      onOptimizationChange,
      maxOptimizationLevel,
    ]);

    // Function to measure performance and update optimization
    const measurePerformance = useCallback(() => {
      const now = performance.now();
      frameCountRef.current++;

      const elapsed = now - lastTimeRef.current;

      if (elapsed >= 1000) {
        // Calculate FPS
        const currentFps = Math.round((frameCountRef.current * 1000) / elapsed);
        setFps(currentFps);

        // Reset counter
        frameCountRef.current = 0;
        lastTimeRef.current = now;

        // Update optimization level if auto-optimize is enabled
        if (autoOptimize && !prefersReducedMotion) {
          let newLevel = optimizationLevel;

          // Adjust optimization based on FPS
          if (currentFps < performanceThreshold * 0.5) {
            // Severe performance issues - max optimization
            newLevel = 'heavy';
          } else if (currentFps < performanceThreshold * 0.7) {
            // Significant performance issues - higher optimization
            newLevel = 'heavy';
          } else if (currentFps < performanceThreshold) {
            // Moderate performance issues - moderate optimization
            newLevel = 'moderate';
          } else if (currentFps > targetFps * 0.9 && optimizationLevel !== 'none') {
            // Good performance - gradually reduce optimization
            switch (optimizationLevel) {
              case 'heavy':
                newLevel = 'moderate';
                break;
              case 'moderate':
                newLevel = 'light';
                break;
              case 'light':
                newLevel = 'none';
                break;
              default:
                newLevel = 'none';
            }
          }

          // Update optimization level if changed
          if (newLevel !== optimizationLevel) {
            setOptimizationLevel(newLevel);

            if (onOptimizationChange) {
              onOptimizationChange(newLevel);
            }
          }
        }
      }

      requestAnimationFrame(measurePerformance);
    }, [
      autoOptimize,
      optimizationLevel,
      performanceThreshold,
      targetFps,
      prefersReducedMotion,
      onOptimizationChange,
      maxOptimizationLevel,
    ]);

    // Start performance measurement if auto-optimize is enabled
    useEffect(() => {
      if (autoOptimize) {
        // Initialize
        frameCountRef.current = 0;
        lastTimeRef.current = performance.now();

        // Start measurement loop
        const animFrameId = requestAnimationFrame(measurePerformance);

        // Cleanup
        return () => {
          cancelAnimationFrame(animFrameId);

          if (checkIntervalRef.current) {
            clearInterval(checkIntervalRef.current);
          }
        };
      }
    }, [autoOptimize, measurePerformance]);

    // Get status based on FPS and optimization level
    const getStatus = (): 'good' | 'warning' | 'critical' => {
      if (optimizationLevel === 'heavy') return 'critical';
      if (optimizationLevel === 'moderate') return 'warning';
      if (fps < performanceThreshold) return 'warning';
      return 'good';
    };

    return (
      <Container
        ref={ref}
        className={className}
        style={style}
        $optimizationLevel={optimizationLevel}
        $glassIntensity={glassIntensity}
        $preserveBlur={preserveBlur}
        {...rest}
      >
        {showIndicator && <PerformanceIndicator $status={getStatus()} />}

        {children}
      </Container>
    );
  }
);

OptimizedGlassContainer.displayName = 'OptimizedGlassContainer';
