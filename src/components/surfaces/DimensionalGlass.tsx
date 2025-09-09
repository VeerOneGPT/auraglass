/**
 * DimensionalGlass Component
 *
 * A glass surface with enhanced depth and dimensional effects.
 */
import React, { forwardRef, useState, useRef, useEffect, useMemo, MutableRefObject } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { createGlassStyle, glassCSS } from '../../core/mixins/glassMixins';
import { createThemeContext } from '../../core/themeContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { usePhysicsInteraction, PhysicsInteractionOptions } from '../../hooks/usePhysicsInteraction';
import { SpringConfig, SpringPresets } from '../../animations/physics/springPhysics';
import { useAnimationContext } from '../../contexts/AnimationContext';
import { AnimationProps } from '../../animations/types';
import { mergePhysicsRef } from '../../utils/refUtils';

import { DimensionalGlassProps } from './types';

// Subtle floating animation
const float = keyframes`
  0% { transform: translateY(0px) translateZ(0); }
  50% { transform: translateY(-5px) translateZ(20px); }
  100% { transform: translateY(0px) translateZ(0); }
`;

// Add internal content wrapper to apply tilt/scale without affecting layout
const DimensionalContent = styled.div`
  transform-style: preserve-3d;
  will-change: transform;
`;

// Styled components
const DimensionalContainer = styled.div<{
  $elevation: number;
  $blurStrength: 'none' | 'light' | 'standard' | 'heavy';
  $opacity: 'low' | 'medium' | 'high' | number;
  $borderOpacity: 'none' | 'subtle' | 'light' | 'medium' | 'strong';
  $borderWidth: number;
  $fullWidth: boolean;
  $fullHeight: boolean;
  $borderRadius: number | string;
  $interactive: boolean;
  $padding: string | number;
  $depth: number;
  $parallax: boolean;
  $dynamicShadow: boolean;
  $animate: boolean;
  $zIndex: number;
  $backgroundColor: string;
  $isHovered: boolean;
  $reducedMotion: boolean;
  $maxTilt?: number;
  $hoverScale?: number;
}>`
  position: relative;
  display: block;
  width: ${props => (props.$fullWidth ? '100%' : 'auto')};
  height: ${props => (props.$fullHeight ? '100%' : 'auto')};
  border-radius: ${props =>
    typeof props.$borderRadius === 'number' ? `${props.$borderRadius}px` : props.$borderRadius};
  padding: ${props =>
    typeof props.$padding === 'number' ? `${props.$padding}px` : props.$padding};
  box-sizing: border-box;
  overflow: hidden;
  z-index: ${props => props.$zIndex};

  /* Apply glass surface effect */
  ${glassCSS({ intent: 'neutral', elevation: 'level2', tier: 'high' })}

  /* Custom background color */
  background-color: ${props => props.$backgroundColor};

  /* Border */
  border-width: ${props => props.$borderWidth}px;
  border-style: solid;
  border-color: ${props => {
    switch (props.$borderOpacity) {
      case 'none':
        return 'transparent';
      case 'subtle':
        return 'rgba(255, 255, 255, 0.05)';
      case 'light':
        return 'rgba(255, 255, 255, 0.2)';
      case 'medium':
        return 'rgba(255, 255, 255, 0.35)';
      case 'strong':
        return 'rgba(255, 255, 255, 0.45)';
    }
  }};

  /* Depth effect using transform and shadow */
  transform-style: preserve-3d;
  /* Base transform for depth/shadow, hover effect applied to inner Content */
  transform: ${props => `translateZ(${props.$isHovered ? props.$depth * 10 : 0}px)`};

  /* Animation if enabled */
  ${props =>
    props.$animate &&
    !props.$reducedMotion &&
    css`
      animation: ${css`${float} 6s ease-in-out infinite`};
    `}

  /* Perspective effect for children */
  & > * {
    transform: translateZ(${props => props.$depth * 5}px);
  }
`;

/**
 * DimensionalGlass Component
 *
 * A glass surface with enhanced depth and dimensional effects.
 */
const DimensionalGlassComponent = (
  props: DimensionalGlassProps,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const {
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
    borderRadius = 12,
    interactive = true,
    padding = 16,
    depth = 0.5,
    dynamicShadow = true,
    animate = false,
    zIndex = 1,
    backgroundColor = 'rgba(255, 255, 255, 0.1)',
    maxTilt = 5,
    hoverScale = 1.02,
    animationConfig,
    disableAnimation,
    motionSensitivity,
    ...rest
  } = props;

  // Get context and reduced motion preference
  const { defaultSpring } = useAnimationContext();
  const prefersReducedMotion = useReducedMotion();
  const finalDisableAnimation = disableAnimation ?? prefersReducedMotion;
  const usePhysics = interactive && !finalDisableAnimation;

  // --- Physics Interaction Setup --- 
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate final physics configuration
  const finalInteractionConfig = useMemo<Partial<PhysicsInteractionOptions>>(() => {
    const baseOptions: Partial<PhysicsInteractionOptions> = {
      scale: 1.02,
      stiffness: SpringPresets.default.stiffness,
      damping: SpringPresets.default.damping,
      mass: SpringPresets.default.mass,
    };
    
    let contextResolvedConfig: Partial<SpringConfig> = {};
    if (typeof defaultSpring === 'string' && defaultSpring in SpringPresets) {
      contextResolvedConfig = SpringPresets[defaultSpring as keyof typeof SpringPresets];
    } else if (typeof defaultSpring === 'object' && defaultSpring !== null) {
      contextResolvedConfig = defaultSpring;
    }
    
    let propResolvedConfig: Partial<PhysicsInteractionOptions> = {}; // Use PhysicsInteractionOptions here
    const configProp = animationConfig;
    if (typeof configProp === 'string' && configProp in SpringPresets) {
      const preset = SpringPresets[configProp as keyof typeof SpringPresets];
      propResolvedConfig = {
        stiffness: preset.stiffness,
        damping: preset.damping,
        mass: preset.mass
      };
    } else if (typeof configProp === 'object' && configProp !== null) {
        if ('stiffness' in configProp || 'damping' in configProp || 'mass' in configProp) {
           propResolvedConfig = configProp as Partial<PhysicsInteractionOptions>;
        }
    }

    const finalStiffness = propResolvedConfig.stiffness ?? contextResolvedConfig.stiffness ?? baseOptions.stiffness;
    const finalMass = propResolvedConfig.mass ?? contextResolvedConfig.mass ?? baseOptions.mass;
    const finalDamping = propResolvedConfig.damping ?? contextResolvedConfig.damping ?? baseOptions.damping;

    return {
      ...baseOptions,
      stiffness: finalStiffness,
      damping: finalDamping,
      mass: finalMass,
    };
  }, [defaultSpring, animationConfig]);

  // Initialize the physics interaction hook
  const {
    ref: physicsRef,
    physicsState,
    isInteracting,
    startInteraction,
    endInteraction,
  } = usePhysicsInteraction(finalInteractionConfig);
  // --- End Physics Interaction Setup --- 

  // Use our utility for ref merging
  const combinedRef = mergePhysicsRef(ref, physicsRef as MutableRefObject<HTMLDivElement | null>);

  // Combine styles
  const combinedStyle = useMemo(() => ({ ...style }), [style]);

  return (
    <DimensionalContainer
      ref={combinedRef}
      className={className}
      $elevation={typeof elevation === 'string' ? (elevation === 'level1' ? 0 : elevation === 'level2' ? 1 : elevation === 'level3' ? 2 : elevation === 'level4' ? 3 : 4) : elevation}
      $blurStrength={blurStrength}
      $opacity={opacity}
      $borderOpacity={borderOpacity}
      $borderWidth={borderWidth}
      $fullWidth={fullWidth}
      $fullHeight={fullHeight}
      $borderRadius={borderRadius}
      $interactive={interactive}
      $padding={padding}
      $depth={depth}
      $parallax={false}
      $dynamicShadow={dynamicShadow}
      $animate={animate}
      $zIndex={zIndex}
      $backgroundColor={backgroundColor}
      $isHovered={false}
      $reducedMotion={prefersReducedMotion}
      {...rest}
    >
      <DimensionalContent style={combinedStyle}>
        {children}
      </DimensionalContent>
    </DimensionalContainer>
  );
};

// Wrap the component function with forwardRef
const DimensionalGlass = forwardRef(DimensionalGlassComponent);
DimensionalGlass.displayName = 'DimensionalGlass';

export default DimensionalGlass;
