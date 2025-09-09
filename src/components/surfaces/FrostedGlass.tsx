/**
 * FrostedGlass Component
 *
 * A glass surface with frosted ice effects.
 */
import React, { forwardRef, useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { glassCSS } from '../../core/mixins/glassMixins';

import { createGlassStyle } from '../../core/mixins/glassMixins';
import { createThemeContext } from '../../core/themeContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { AURA_GLASS, glassTokenUtils } from '../../tokens/glass';

import { FrostedGlassProps } from './types';
import { useGlassParallax } from '../../hooks/useGlassParallax';

// Frost animation keyframes
const frostGrow = keyframes`
  0% { background-size: 100% 100%; }
  50% { background-size: 105% 105%; }
  100% { background-size: 100% 100%; }
`;

// Frost sparkle animation
const frostSparkle = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 0.7; }
  100% { opacity: 0.3; }
`;

// Styled components
const FrostContainer = styled.div<{
  $elevation: number;
  $blurStrength: 'none' | 'light' | 'standard' | 'heavy';
  $opacity: 'low' | 'medium' | 'high';
  $borderOpacity: 'none' | 'subtle' | 'light' | 'medium' | 'strong';
  $borderWidth: number;
  $fullWidth: boolean;
  $fullHeight: boolean;
  $borderRadius: number | string;
  $interactive: boolean;
  $padding: string | number;
  $intensity: number;
  $frostColor: string;
  $animate: boolean;
  $pattern: 'noise' | 'lines' | 'crystals';
  $backgroundColor: string;
  $isHovered: boolean;
  $reducedMotion: boolean;
  $specular: boolean;
  $glow: false | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  $lightAngle: number;
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
  isolation: isolate;

  /* Apply glass surface effect */
  ${glassCSS({ intent: 'neutral', elevation: 'level2' })}

  ${props => props.$blurStrength && `
    backdrop-filter: blur(${props.$blurStrength === 'light' ? '4px' : props.$blurStrength === 'standard' ? '8px' : props.$blurStrength === 'heavy' ? '16px' : '2px'});
  `}

  ${props => props.$elevation && `
    box-shadow: 0 ${props.$elevation * 2}px ${props.$elevation * 4}px rgba(0, 0, 0, 0.1);
  `}

  ${props => props.$borderOpacity && props.$borderOpacity !== 'none' && `
    border: 1px solid rgba(255, 255, 255, ${props.$borderOpacity === 'subtle' ? 0.05 : props.$borderOpacity === 'light' ? 0.1 : props.$borderOpacity === 'medium' ? 0.2 : 0.3});
  `}

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
        return glassTokenUtils.getSurface('neutral', 'level2').border.color;
      case 'light':
        return 'rgba(255, 255, 255, 0.25)';
      case 'medium':
        return 'rgba(255, 255, 255, 0.35)';
      case 'strong':
        return 'rgba(255, 255, 255, 0.45)';
    }
  }};

  /* Frost overlay pattern */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    mix-blend-mode: overlay;
    opacity: ${props => 0.3 + props.$intensity * 0.5};

    ${props => {
      switch (props.$pattern) {
        case 'lines':
          return `
            background-image: 
              linear-gradient(90deg, ${props.$frostColor} 1px, transparent 1px),
              linear-gradient(${props.$frostColor} 1px, transparent 1px);
            background-size: 20px 20px;
          `;
        case 'crystals':
          return `
            background-image: radial-gradient(${props.$frostColor} 5%, transparent 5%), 
                            radial-gradient(${props.$frostColor} 5%, transparent 5%);
            background-size: 30px 30px;
            background-position: 0 0, 15px 15px;
          `;
        case 'noise':
        default:
          return `
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            background-size: 100px 100px;
          `;
      }
    }}

    /* Animation for frost pattern */
    ${props =>
      props.$animate &&
      !props.$reducedMotion &&
      css`
        animation: ${css`${frostGrow} 8s ease-in-out infinite`};
      `}
  }

  /* Specular + edge overlay */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    border-radius: inherit;
    /* Edge frost */
    box-shadow: inset 0 0 ${props => 5 + props.$intensity * 15}px ${props => props.$frostColor};
    opacity: ${props => 0.2 + props.$intensity * 0.3};

    ${props => props.$specular && css`
      mix-blend-mode: screen;
      background:
        radial-gradient(${props.$intensity * 80 + 40}% ${props.$intensity * 40 + 40}% at 50% -10%, rgba(255,255,255, ${Math.min(0.35, 0.12 + props.$intensity * 0.35)}) 0%, rgba(255,255,255,0.0) 60%),
        linear-gradient(${props.$lightAngle}deg, rgba(255,255,255,0.18), rgba(255,255,255,0.00) 35%);
      transform: translate(var(--glass-parallax-x, 0), var(--glass-parallax-y, 0));
      transition: transform 150ms ease-out;
    `}
  }

  /* Interactive effects */
  ${props =>
    props.$interactive &&
    css`
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px ${glassTokenUtils.getSurface('neutral', 'level2').surface.base};

        &::after {
          opacity: ${0.3 + props.$intensity * 0.4};
        }
      }
      
      &:active {
        transform: translateY(0);
      }
    `}

  /* Optional additive glow via drop-shadow */
  ${props => props.$glow && css`
    filter: ${props.$glow === 'primary' ? 'drop-shadow(0 0 18px rgba(59,130,246,0.28))' :
      props.$glow === 'success' ? 'drop-shadow(0 0 18px rgba(16,185,129,0.28))' :
      props.$glow === 'warning' ? 'drop-shadow(0 0 18px rgba(245,158,11,0.28))' :
      props.$glow === 'danger' ? 'drop-shadow(0 0 18px rgba(239,68,68,0.28))' :
      props.$glow === 'info' ? 'drop-shadow(0 0 18px rgba(14,165,233,0.28))' :
      'drop-shadow(0 0 18px rgba(59,130,246,0.24))'};
  `}
`;

const FrostContent = styled.div`
  position: relative;
  z-index: 1;
`;

const FrostSparkles = styled.div<{
  $animate: boolean;
  $frostColor: string;
  $intensity: number;
  $reducedMotion: boolean;
}>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  background-image: radial-gradient(${props => props.$frostColor} 1px, transparent 1px);
  background-size: 30px 30px;
  opacity: ${props => props.$intensity * 0.4};

  /* Sparkle animation */
  ${props =>
    props.$animate &&
    !props.$reducedMotion &&
    css`
      animation: ${css`${frostSparkle} 4s ease-in-out infinite`};
    `}
`;

/**
 * FrostedGlass Component Implementation
 */
const FrostedGlassComponent = (
  props: FrostedGlassProps,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  // Unified glass styles
  const glassStyles = createGlassStyle({ intent: 'neutral', elevation: 'level2', tier: 'high' });

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
    borderRadius = 'md',
    interactive = true,
    padding = 16,
    intensity = 0.5,
    frostColor = 'rgba(255, 255, 255, 0.8)',
    animate = true,
    pattern = 'noise',
    backgroundColor = glassTokenUtils.getSurface('neutral', 'level2').surface.base,
    specular = true,
    glow = false,
    lightAngle = 135,
    parallax = false,
    parallaxStrength = 10,
    ...rest
  } = props;

  // Convert elevation string to number for styled component
  const elevationNumber = typeof elevation === 'string'
    ? elevation === 'level1' ? 1 : elevation === 'level2' ? 2 : elevation === 'level3' ? 3 : elevation === 'level4' ? 4 : 2
    : elevation;

  // Check if reduced motion is preferred
  const prefersReducedMotion = useReducedMotion();

  // State for hover effects
  const [isHovered, setIsHovered] = useState(false);

  // Normalize opacity value for styled component
  const normalizedOpacity: 'low' | 'medium' | 'high' = typeof opacity === 'number'
    ? (opacity < 0.3 ? 'low' : opacity < 0.7 ? 'medium' : 'high')
    : (opacity as 'low' | 'medium' | 'high');

  // Normalize pattern value for styled component
  const normalizedPattern: 'noise' | 'lines' | 'crystals' = typeof pattern === 'string' && ['noise', 'lines', 'crystals'].includes(pattern)
    ? (pattern as 'noise' | 'lines' | 'crystals')
    : 'noise';

  // Handle mouse events
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  // Drive pointer parallax when enabled
  useGlassParallax(containerRef, { strength: parallaxStrength, enabled: parallax && !prefersReducedMotion });

  // Support forwarding refs by merging with internal ref
  const setRefs = (node: HTMLDivElement | null) => {
    (containerRef as any).current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
  };

  return (
    <FrostContainer
      ref={setRefs}
      className={className}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      $elevation={elevationNumber}
      $blurStrength={blurStrength}
      $opacity={normalizedOpacity}
      $borderOpacity={borderOpacity}
      $borderWidth={borderWidth}
      $fullWidth={fullWidth}
      $fullHeight={fullHeight}
      $borderRadius={borderRadius}
      $interactive={interactive}
      $padding={padding}
      $intensity={intensity}
      $frostColor={frostColor}
      $animate={animate}
      $pattern={normalizedPattern}
      $backgroundColor={backgroundColor}
      $isHovered={isHovered}
      $reducedMotion={prefersReducedMotion}
      $specular={specular}
      $glow={glow === true ? 'primary' : (glow || false)}
      $lightAngle={lightAngle}
      {...rest}
    >
      <FrostSparkles
        $animate={animate}
        $frostColor={frostColor}
        $intensity={intensity}
        $reducedMotion={prefersReducedMotion}
      />
      <FrostContent>{children}</FrostContent>
    </FrostContainer>
  );
};

/**
 * FrostedGlass Component
 *
 * A glass surface with frosted ice effects.
 */
const FrostedGlass = forwardRef(FrostedGlassComponent);
FrostedGlass.displayName = 'FrostedGlass';

export default FrostedGlass;
