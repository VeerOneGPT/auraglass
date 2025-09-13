import React from 'react';
import { CSSProperties } from 'react';
import styled from 'styled-components';

export interface ChartContainerStyles {
  container: CSSProperties;
  title: CSSProperties;
  subtitle: CSSProperties;
  legend: CSSProperties;
  grid: CSSProperties;
  tooltip: CSSProperties;
}

// Styled components for chart layout
export const ChartContainer = styled.div<{
  $glassVariant?: 'frosted' | 'dynamic' | 'clear' | 'tinted' | 'luminous';
  $blurStrength?: 'none' | 'light' | 'standard' | 'heavy';
  $color?: string;
  $borderRadius?: string | number;
  $borderColor?: string;
  $elevation?: number;
}>`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 16px;
  border-radius: ${props => typeof props.$borderRadius === 'number' ? `${props.$borderRadius}px` : (props.$borderRadius || '12px')};
  background: ${props => {
    const variant = props.$glassVariant || 'frosted';
    const color = props.$color || 'primary';

    switch (variant) {
      case 'clear':
        return 'transparent';
      case 'frosted':
        return 'rgba(255, 255, 255, 0.1)';
      case 'dynamic':
        return 'rgba(255, 255, 255, 0.15)';
      case 'tinted':
        return 'rgba(255, 255, 255, 0.08)';
      case 'luminous':
        return 'rgba(255, 255, 255, 0.2)';
      default:
        return 'rgba(255, 255, 255, 0.1)';
    }
  }};
  backdrop-filter: ${props => {
    const strength = props.$blurStrength || 'standard';
    switch (strength) {
      case 'none':
        return 'none';
      case 'light':
        return 'blur(4px)';
      case 'standard':
        return 'blur(8px)';
      case 'heavy':
        return 'blur(16px)';
      default:
        return 'blur(8px)';
    }
  }};
  border: 1px solid ${props => props.$borderColor || 'rgba(255, 255, 255, 0.2)'};
  box-shadow: ${props => {
    const elevation = props.$elevation || 3;
    switch (elevation) {
      case 0:
        return 'none';
      case 1:
        return '0 2px 8px rgba(0, 0, 0, 0.1)';
      case 2:
        return '0 4px 16px rgba(0, 0, 0, 0.12)';
      case 3:
        return '0 8px 32px rgba(0, 0, 0, 0.15)';
      case 4:
        return '0 16px 48px rgba(0, 0, 0, 0.18)';
      default:
        return '0 8px 32px rgba(0, 0, 0, 0.15)';
    }
  }};
  overflow: hidden;
  transition: all 0.3s ease;
`;

export const ChartHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

export const ChartTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: inherit;
  line-height: 1.2;
`;

export const ChartSubtitle = styled.p`
  margin: 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.4;
`;

export const createChartContainerStyles = (
  theme: 'light' | 'dark' | 'glass' = 'glass',
  variant: 'default' | 'minimal' | 'detailed' = 'default'
): ChartContainerStyles => {
  const baseStyles: ChartContainerStyles = {
    container: {
      position: 'relative',
      width: '100%',
      height: '100%',
      padding: '16px',
      borderRadius: '12px',
      background: theme === 'glass'
        ? 'rgba(255, 255, 255, 0.1)'
        : theme === 'dark'
          ? '#1a1a1a'
          : '#ffffff',
      // Use createGlassStyle() instead,
      border: theme === 'glass' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid #e0e0e0',
      boxShadow: theme === 'glass'
        ? '0 8px 32px rgba(0, 0, 0, 0.1)'
        : '0 2px 8px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
    },
    title: {
      fontSize: '18px',
      fontWeight: 600,
      color: theme === 'dark' ? '#ffffff' : '#1a1a1a',
      marginBottom: '8px',
      textAlign: 'center' as const,
    },
    subtitle: {
      fontSize: '14px',
      color: theme === 'dark' ? '#cccccc' : '#666666',
      marginBottom: '16px',
      textAlign: 'center' as const,
    },
    legend: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      justifyContent: 'center',
      gap: '12px',
      marginTop: '16px',
      padding: '8px',
    },
    grid: {
      stroke: theme === 'dark' ? '#333333' : '#e0e0e0',
      strokeWidth: 1,
      opacity: 0.3,
    },
    tooltip: {
      background: theme === 'glass'
        ? 'rgba(0, 0, 0, 0.8)'
        : theme === 'dark'
          ? '#333333'
          : '#ffffff',
      color: theme === 'dark' ? '#ffffff' : '#1a1a1a',
      borderRadius: '8px',
      padding: '8px 12px',
      fontSize: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      border: theme === 'glass' ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
    },
  };

  // Apply variant-specific modifications
  if (variant === 'minimal') {
    baseStyles.container.padding = '8px';
    baseStyles.title.fontSize = '16px';
    baseStyles.legend.marginTop = '8px';
  } else if (variant === 'detailed') {
    baseStyles.container.padding = '24px';
    baseStyles.title.fontSize = '20px';
    baseStyles.legend.marginTop = '24px';
  }

  return baseStyles;
};
