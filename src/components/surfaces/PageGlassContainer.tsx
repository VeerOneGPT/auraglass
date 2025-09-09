/**
 * PageGlassContainer Component
 *
 * A glass container for full page layouts with enhanced glass effects.
 */
import React, { forwardRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import { createGlassStyle } from '../../core/mixins/glassMixins';
import { AURA_GLASS } from '../../tokens/glass';
import { createThemeContext } from '../../core/themeContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useGlassTheme } from '../../hooks/useGlassTheme';

import { PageGlassContainerProps } from './types';

// Styled components
const Container = styled.div<{
  $blurStrength: 'none' | 'light' | 'standard' | 'heavy';
  $borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  $fullWidth: boolean;
  $fullHeight: boolean;
  $fullPage: boolean;
  $maxWidth: string | number;
  $backgroundColor: string;
}>`
  position: ${props => (props.$fullPage ? 'fixed' : 'relative')};
  top: ${props => (props.$fullPage ? '0' : 'auto')};
  left: ${props => (props.$fullPage ? '0' : 'auto')};
  right: ${props => (props.$fullPage ? '0' : 'auto')};
  bottom: ${props => (props.$fullPage ? '0' : 'auto')};
  width: ${props => (props.$fullWidth ? '100%' : 'auto')};
  max-width: ${props =>
    props.$maxWidth
      ? typeof props.$maxWidth === 'number'
        ? `${props.$maxWidth}px`
        : props.$maxWidth
      : 'none'};
  height: ${props => (props.$fullHeight || props.$fullPage ? '100%' : 'auto')};
  margin: ${props => (props.$fullWidth ? '0' : '0 auto')};
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
  padding: 20px;
  box-sizing: border-box;
  overflow: ${props => (props.$fullPage ? 'auto' : 'hidden')};
  z-index: 0;

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
  border: 1px solid ${AURA_GLASS.surfaces.neutral.level2.border.color};
`;

const ContentWrapper = styled.div<{
  $dimensionalChildren: boolean;
  $scrollPosition: number;
  $reducedMotion: boolean;
}>`
  position: relative;
  z-index: 1;

  /* Parallax effect for dimensional children */
  ${props =>
    props.$dimensionalChildren &&
    !props.$reducedMotion &&
    `
    & > * {
      transition: transform 0.1s ease-out;
      transform: translateZ(${Math.min(20, props.$scrollPosition / 20)}px);
    }
  `}
`;

/**
 * PageGlassContainer Component Implementation
 */
const PageGlassContainerComponent = (
  props: PageGlassContainerProps,
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
    borderRadius = 'none',
    fullWidth = true,
    fullHeight = false,
    fullPage = false,
    maxWidth,
    backgroundColor = '${glassStyles.surface?.base || "rgba(255, 255, 255, 0.05)"}',
    scrollFade = false,
    dimensionalChildren = false,
    ...rest
  } = props;

  // Check if reduced motion is preferred
  const prefersReducedMotion = useReducedMotion();

  // State for scroll position
  const [scrollPosition, setScrollPosition] = useState(0);

  // Handle scroll events for scroll fade effect
  useEffect(() => {
    if (!scrollFade || prefersReducedMotion) return;

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollFade, prefersReducedMotion]);

  return (
    <Container
      ref={ref}
      className={className}
      style={style}
      $blurStrength={blurStrength}
      $borderRadius={borderRadius}
      $fullWidth={fullWidth}
      $fullHeight={fullHeight}
      $fullPage={fullPage}
      $maxWidth={maxWidth || 'none'}
      $backgroundColor={backgroundColor}
      {...rest}
    >
      <ContentWrapper
        $dimensionalChildren={dimensionalChildren}
        $scrollPosition={scrollPosition}
        $reducedMotion={prefersReducedMotion}
      >
        {children}
      </ContentWrapper>
    </Container>
  );
};

/**
 * PageGlassContainer Component
 *
 * A glass container for full page layouts with enhanced glass effects.
 */
const PageGlassContainer = forwardRef(PageGlassContainerComponent);
PageGlassContainer.displayName = 'PageGlassContainer';

export default PageGlassContainer;
