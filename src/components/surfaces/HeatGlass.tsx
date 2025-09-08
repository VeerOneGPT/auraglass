/**
 * HeatGlass Component
 *
 * A glass surface with heat distortion effects.
 */
import React, { forwardRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

import { glassSurfaceFn as glassSurface } from '../../core/mixins/glassSurface';
import { createThemeContext } from '../../core/themeContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useGlassTheme } from '../../hooks/useGlassTheme';

import { HeatGlassProps } from './types';

// Heat distortion animation
const heatDistort = keyframes`
  0% {
    filter: url('#heat-distortion-0');
  }
  25% {
    filter: url('#heat-distortion-25');
  }
  50% {
    filter: url('#heat-distortion-50');
  }
  75% {
    filter: url('#heat-distortion-75');
  }
  100% {
    filter: url('#heat-distortion-0');
  }
`;

// Heat glow pulse animation
const heatGlow = keyframes`
  0% {
    box-shadow: 0 0 10px 0 rgba(255, 100, 50, 0.5);
  }
  50% {
    box-shadow: 0 0 20px 5px rgba(255, 100, 50, 0.7);
  }
  100% {
    box-shadow: 0 0 10px 0 rgba(255, 100, 50, 0.5);
  }
`;

// Styled components
const HeatGlassContainer = styled.div<{
  $elevation: number;
  $blurStrength: 'none' | 'light' | 'standard' | 'heavy';
  $borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  $interactive: boolean;
  $heatColor: string;
  $animate: boolean;
  $backgroundColor: string;
  $isHovered: boolean;
  $reducedMotion: boolean;
}>`
  position: relative;
  display: block;
  width: 100%;
  min-height: 100px;
  border-radius: ${props => {
    switch (props.$borderRadius) {
      case 'none': return '0';
      case 'sm': return '4px';
      case 'md': return '8px';
      case 'lg': return '12px';
      case 'xl': return '16px';
      case 'full': return '9999px';
      default: return '8px';
    }
  }};
  padding: 16px;
  box-sizing: border-box;
  overflow: hidden;

  /* Basic glass styling */
  background-color: ${props => props.$backgroundColor};
  backdrop-filter: blur(${props => {
    switch (props.$blurStrength) {
      case 'none': return '0px';
      case 'light': return '4px';
      case 'standard': return '8px';
      case 'heavy': return '12px';
      default: return '8px';
    }
  }});
  -webkit-backdrop-filter: blur(${props => {
    switch (props.$blurStrength) {
      case 'none': return '0px';
      case 'light': return '4px';
      case 'standard': return '8px';
      case 'heavy': return '12px';
      default: return '8px';
    }
  }});
  border: 1px solid rgba(255, 255, 255, 0.2);

  /* Heat effect glow */
  box-shadow: 0 0 20px 5px ${props => props.$heatColor};

  /* Heat animation */
  ${props =>
    props.$animate &&
    !props.$reducedMotion &&
    css`
      animation: ${heatGlow} 3s infinite;
    `}

  /* Hover interactions */
  ${props =>
    props.$interactive &&
    css`
      cursor: pointer;
      transition: box-shadow 0.3s ease, transform 0.3s ease;

      &:hover {
        box-shadow: 0 0 30px 10px ${(props: any) => props.$heatColor};
        transform: translateY(-2px);
      }

      &:active {
        transform: translateY(0);
      }
    `}

  /* Heat radial gradient background enhancement */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at 50% 50%,
      ${props => props.$heatColor} 0%,
      transparent 70%
    );
    opacity: 0.3;
    pointer-events: none;
    border-radius: inherit;
    z-index: -1;
  }
`;

const HeatContent = styled.div<{
  $animate: boolean;
  $reducedMotion: boolean;
}>`
  position: relative;
  z-index: 1;

  /* Heat distortion effect */
  ${props =>
    props.$animate &&
    !props.$reducedMotion &&
    css`
      animation: ${heatDistort} 3s infinite ease-in-out;
      animation-delay: ${Math.random() * 2}s;
      will-change: filter;
    `}
`;

// SVG filters for heat distortion effect
const HeatDistortionFilters = () => (
  <svg width="0" height="0" style={{ position: 'absolute', visibility: 'hidden' }}>
    <defs>
      <filter id="heat-distortion-0">
        <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" seed="0" />
        <feDisplacementMap in="SourceGraphic" scale="5" />
      </filter>
      <filter id="heat-distortion-25">
        <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" seed="1" />
        <feDisplacementMap in="SourceGraphic" scale="5" />
      </filter>
      <filter id="heat-distortion-50">
        <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" seed="2" />
        <feDisplacementMap in="SourceGraphic" scale="5" />
      </filter>
      <filter id="heat-distortion-75">
        <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" seed="3" />
        <feDisplacementMap in="SourceGraphic" scale="5" />
      </filter>
    </defs>
  </svg>
);

/**
 * HeatGlass Component
 *
 * A glass surface with heat distortion effects.
 */
const HeatGlassComponent = (
  props: HeatGlassProps,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const {
    children,
    className,
    style,
    elevation = 2,
    blurStrength = 'standard',
    borderRadius = 'md',
    interactive = true,
    heatColor = 'rgba(255, 100, 50, 0.7)',
    animate = true,
    backgroundColor = 'rgba(255, 255, 255, 0.1)',
    ...rest
  } = props;

  // Check if reduced motion is preferred
  const prefersReducedMotion = useReducedMotion();

  // State for hover effects
  const [isHovered, setIsHovered] = useState(false);

  // Handle mouse events
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      {/* SVG Filters for heat distortion */}
      {animate && !prefersReducedMotion && <HeatDistortionFilters />}

      <HeatGlassContainer
        ref={ref}
        className={className}
        style={style}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        $elevation={elevation}
        $blurStrength={blurStrength}
        $borderRadius={borderRadius}
        $interactive={interactive}
        $heatColor={heatColor}
        $animate={animate}
        $backgroundColor={backgroundColor}
        $isHovered={isHovered}
        $reducedMotion={prefersReducedMotion}
        {...rest}
      >
        <HeatContent
          $animate={animate}
          $reducedMotion={prefersReducedMotion}
        >
          {children}
        </HeatContent>
      </HeatGlassContainer>
    </>
  );
};

// Wrap the component function with forwardRef
const HeatGlass = forwardRef(HeatGlassComponent);
HeatGlass.displayName = 'HeatGlass';

export default HeatGlass;
