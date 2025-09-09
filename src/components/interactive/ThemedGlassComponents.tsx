import React, { forwardRef, createContext, useContext, useState, useEffect } from 'react';
import styled from 'styled-components';

import { createGlassStyle } from '../../core/mixins/glassMixins';
import { createThemeContext } from '../../core/themeContext';
import { useGlassTheme } from '../../hooks/useGlassTheme';

// Create a context to pass down theme information to children
interface ThemedGlassContextType {
  glassIntensity: number;
  applyGlassEffect: boolean;
  contextData?: Record<string, any>;
}

const ThemedGlassContext = createContext<ThemedGlassContextType>({
  glassIntensity: 0.7,
  applyGlassEffect: true,
});

// Hook to use the themed glass context
export const useThemedGlass = () => useContext(ThemedGlassContext);

// Styled container with glass effect
const GlassContainer = styled.div<{
  $glassIntensity: number;
  $applyGlassEffect: boolean;
}>`
  ${({ $glassIntensity }) => `
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  `}
`;

/**
 * A component that applies themed glass styling to its children
 */
interface ThemedGlassComponentsProps {
  children: React.ReactNode;
  variant?: string;
  colorMode?: string;
  glassIntensity?: number;
  animated?: boolean;
  className?: string;
  style?: React.CSSProperties;
  applyGlassEffect?: boolean;
  preserveOriginalStyle?: boolean;
  contextData?: Record<string, any>;
  transitionDuration?: number;
}

export const ThemedGlassComponents = forwardRef<HTMLDivElement, ThemedGlassComponentsProps>(
  (
    {
      children,
      variant,
      colorMode,
      glassIntensity = 0.7,
      animated = true,
      className,
      style,
      applyGlassEffect = true,
      preserveOriginalStyle = true,
      contextData,
      transitionDuration = 300,
      ...rest
    },
    ref
  ) => {
    // Simplified theme usage
    const { theme } = useGlassTheme();
    const isDarkMode = theme === 'dark';

    // Track transitions for animation
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Use provided values or fallback to current context
    const effectiveColorMode = colorMode || (isDarkMode ? 'dark' : 'light');
    const effectiveVariant = variant || 'default';

    // Create context value
    const contextValue: ThemedGlassContextType = {
      glassIntensity,
      applyGlassEffect,
      contextData,
    };

    // Handle transition state
    useEffect(() => {
      if (animated) {
        setIsTransitioning(true);
        const timer = setTimeout(() => {
          setIsTransitioning(false);
        }, transitionDuration);

        return () => clearTimeout(timer);
      }
    }, [effectiveColorMode, effectiveVariant, animated, transitionDuration]);

    // If we're not changing theme or variant, just render with context
    if (!effectiveVariant && !effectiveColorMode) {
      return (
        <ThemedGlassContext.Provider value={contextValue}>
          <GlassContainer
            ref={ref}
            className={className}
            style={style}
            $glassIntensity={glassIntensity}
            $applyGlassEffect={applyGlassEffect}
            {...rest}
          >
            {children}
          </GlassContainer>
        </ThemedGlassContext.Provider>
      );
    }

    // Simplified rendering
    return (
      <ThemedGlassContext.Provider value={contextValue}>
        <GlassContainer
          ref={ref}
          className={className}
          style={style}
          $glassIntensity={glassIntensity}
          $applyGlassEffect={applyGlassEffect}
          {...rest}
        >
          {children}
        </GlassContainer>
      </ThemedGlassContext.Provider>
    );
  }
);

ThemedGlassComponents.displayName = 'ThemedGlassComponents';
