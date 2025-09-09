/**
 * ImageListItem Component
 *
 * An item component for the ImageList with glass morphism styling.
 */
import React, { forwardRef, useContext, useState, useMemo } from 'react';
import styled from 'styled-components';

import { createGlassStyle } from '../../core/mixins/glassMixins';
import { createThemeContext } from '../../core/themeContext';
import { glassTokenUtils } from '../../tokens/glass';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ImageListItemProps } from './types';

// Styled components
const ImageListItemRoot = styled.li<{
  $cols: number;
  $rows: number;
  $variant: 'standard' | 'quilted' | 'masonry' | 'woven';
  $glass: boolean;
  $index?: number;
  $hoverOverlay: boolean;
  $elevation: number;
  $rounded: boolean;
  $reducedMotion: boolean;
}>`
  position: relative;
  display: block;
  overflow: hidden;
  z-index: 1;
  /* Ensure it's focusable */
  outline: none; 

  /* Handle different variants */
  ${props =>
    props.$variant === 'standard' &&
    `
    grid-column-end: span ${props.$cols};
    grid-row-end: span ${props.$rows};
  `}

  ${props =>
    props.$variant === 'quilted' &&
    `
    grid-column-end: span ${props.$cols};
    grid-row-end: span ${props.$rows};
  `}
  
  ${props =>
    props.$variant === 'woven' &&
    `
    grid-column-end: span ${props.$cols};
    grid-row-end: span ${props.$rows};
  `}
  
  /* Masonry doesn't use grid-column/grid-row */
  
  /* Glass styling */
  ${props =>
    props.$glass &&
    `
    background: ${glassTokenUtils.getSurface('neutral', 'level1').surface.base};
    backdrop-filter: blur(10px);
    border: 1px solid ${glassTokenUtils.getSurface('neutral', 'level1').border.color};
    `}
  
  /* Box shadow based on elevation */
  ${props =>
    props.$elevation > 0 &&
    !props.$glass &&
    `
    box-shadow: ${
      props.$elevation === 1
        ? '0 2px 4px rgba(0, 0, 0, 0.1)'
        : props.$elevation === 2
        ? '0 3px 6px rgba(0, 0, 0, 0.15)'
        : props.$elevation === 3
        ? '0 5px 10px rgba(0, 0, 0, 0.2)'
        : props.$elevation === 4
        ? '0 8px 16px rgba(0, 0, 0, 0.25)'
        : '0 12px 24px rgba(0, 0, 0, 0.3)'
    };
  `}
  
  /* Rounded corners */
  ${props =>
    props.$rounded &&
    `
    border-radius: 8px;
    overflow: hidden;
  `}
  
  /* REMOVE Hover effects - These will be handled by useMultiSpring */
  /* transition: ${props => (!props.$reducedMotion ? 'transform 0.3s, box-shadow 0.3s' : 'none')}; */

  /* &:hover { ... remove entire block ... } */
`;

const ImageContainer = styled.div<{
  $glass: boolean;
}>`
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  /* Image height should fill the container */
  & > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const HoverOverlay = styled.div<{
  $visible: boolean;
  $reducedMotion: boolean;
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.$visible ? 1 : 0)};
  transition: ${props => (!props.$reducedMotion ? 'opacity 0.3s ease' : 'none')};
  pointer-events: none;
`;

/**
 * ImageListItem Component Implementation
 */
function ImageListItemComponent(props: ImageListItemProps, ref: React.ForwardedRef<HTMLLIElement>) {
  // Unified glass styles
  const glassStyles = createGlassStyle({ intent: 'neutral', elevation: 'level2', tier: 'high' });

  const {
    children,
    className,
    style,
    cols: propCols,
    rows: propRows,
    glass: propGlass,
    hoverOverlay = false,
    elevation = 0,
    rounded: propRounded,
    alt,
    src,
    srcSet,
    ...rest
  } = props;

  // Check if reduced motion is preferred
  const prefersReducedMotion = useReducedMotion();

  // Simplified context (removed for now)
  const variant = 'standard';
  const contextCols = 2;
  const contextGlass = false;
  const variableSize = false;
  const contextRounded = false;

  // Calculate cols and rows based on variableSize
  const cols =
    propCols !== undefined
      ? propCols
      : // If variable size is enabled, allow items to span multiple columns/rows
      // Otherwise, enforce single-cell items
      variableSize
      ? 1
      : 1;
  const rows = propRows !== undefined ? propRows : variableSize ? 1 : 1;

  // Merge props with context
  const glass = propGlass !== undefined ? propGlass : contextGlass;
  const rounded = propRounded !== undefined ? propRounded : contextRounded;

  // Simplified animation settings
  const finalDisableAnimation = prefersReducedMotion;

  // State for hover and focus
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  // Simplified animation (removed complex spring logic)

  // Convert string elevation to number
  const getElevationNumber = (elev?: 0 | 'level1' | 'level2' | 'level3' | 'level4'): number => {
    if (elev === 0) return 0;
    if (elev === 'level1') return 1;
    if (elev === 'level2') return 2;
    if (elev === 'level3') return 3;
    if (elev === 'level4') return 4;
    return 0; // default
  };

  // Prepare image element if src is provided
  const image = src ? (
    <img src={src} srcSet={srcSet} alt={alt || ''} loading="lazy" {...rest} />
  ) : null;

  return (
    <ImageListItemRoot
      ref={ref}
      className={`${className || ''} galileo-image-list-item`.trim()}
      style={{ ...style, transform: (isHovered || isFocused) && !finalDisableAnimation ? 'scale(1.03)' : 'scale(1)' }}
      $cols={cols}
      $rows={rows}
      $variant={variant}
      $glass={glass}
      $hoverOverlay={hoverOverlay}
      $elevation={getElevationNumber(elevation)}
      $rounded={rounded}
      $reducedMotion={prefersReducedMotion}
      tabIndex={0}
      onMouseEnter={() => { setIsHovered(true); }}
      onMouseLeave={() => { setIsHovered(false); }}
      onFocus={() => { setIsFocused(true); }}
      onBlur={() => { setIsFocused(false); }}
    >
      <ImageContainer $glass={glass}>
        {image}
        {children}

        {hoverOverlay && (
          <HoverOverlay $visible={isHovered || isFocused} $reducedMotion={prefersReducedMotion} />
        )}
      </ImageContainer>
    </ImageListItemRoot>
  );
}

/**
 * ImageListItem Component
 *
 * An item component for the ImageList.
 */
const ImageListItem = forwardRef<HTMLLIElement, ImageListItemProps>(ImageListItemComponent);

/**
 * GlassImageListItem Component
 *
 * Glass variant of the ImageListItem component.
 */
const GlassImageListItem = forwardRef<HTMLLIElement, ImageListItemProps>((props, ref) => (
  <ImageListItem {...props} glass={true} ref={ref} />
));

GlassImageListItem.displayName = 'GlassImageListItem';

export default ImageListItem;
export { ImageListItem, GlassImageListItem };
