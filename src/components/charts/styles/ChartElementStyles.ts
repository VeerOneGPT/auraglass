import React from 'react';
import { createGlassStyle } from '../../../core/mixins/glassMixins';
import { CSSProperties } from 'react';
import styled, { css } from 'styled-components';

import { glassStyleCSS } from '../../../core/mixins/glassMixins';
export interface ChartElementStyles {
  line: CSSProperties;
  area: CSSProperties;
  bar: CSSProperties;
  pie: CSSProperties;
  scatter: CSSProperties;
  axis: {
    line: CSSProperties;
    text: CSSProperties;
    tick: CSSProperties;
  };
  dataPoint: CSSProperties;
  gradient: {
    start: string;
    end: string;
    stops: Array<{ offset: string; color: string }>;
  };
}

export const createChartElementStyles = (
  theme: 'light' | 'dark' | 'glass' = 'glass',
  colorScheme: string[] = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6']
): ChartElementStyles => {
  const baseStyles: ChartElementStyles = {
    line: {
      strokeWidth: 2,
      strokeLinecap: 'round' as const,
      strokeLinejoin: 'round' as const,
      fill: 'none',
    },
    area: {
      strokeWidth: 2,
      fillOpacity: 0.3,
      strokeLinecap: 'round' as const,
      strokeLinejoin: 'round' as const,
    },
    bar: {
      strokeWidth: 0,
      rx: 4,
      ry: 4,
    } as any,
    pie: {
      strokeWidth: 2,
      stroke: theme === 'glass'
        ? 'rgba(255, 255, 255, 0.2)'
        : theme === 'dark'
          ? '#333333'
          : '#ffffff',
    },
    scatter: {
      r: 4,
      strokeWidth: 2,
      fillOpacity: 0.8,
    } as any,
    axis: {
      line: {
        stroke: theme === 'dark' ? '#555555' : '#cccccc',
        strokeWidth: 1,
      },
      text: {
        fontSize: '12px',
        fontWeight: 400,
        fill: theme === 'dark' ? '#cccccc' : '#666666',
      },
      tick: {
        stroke: theme === 'dark' ? '#555555' : '#cccccc',
        strokeWidth: 1,
      },
    },
    dataPoint: {
      r: 3,
      strokeWidth: 2,
      fillOpacity: 0.9,
      cursor: 'pointer',
    } as any,
    gradient: {
      start: 'rgba(59, 130, 246, 0.2)',
      end: 'rgba(59, 130, 246, 0.05)',
      stops: [
        { offset: '0%', color: 'rgba(59, 130, 246, 0.2)' },
        { offset: '100%', color: 'rgba(59, 130, 246, 0.05)' },
      ],
    },
  };

  // Apply theme-specific color adjustments
  if (theme === 'glass') {
    baseStyles.line.stroke = colorScheme[0];
    baseStyles.area.fill = `url(#area-gradient-${theme})`;
    baseStyles.bar.fill = colorScheme[0];
    baseStyles.pie.fill = colorScheme[0];
    baseStyles.scatter.fill = colorScheme[0];
    baseStyles.scatter.stroke = 'rgba(255, 255, 255, 0.5)';
    baseStyles.dataPoint.stroke = 'rgba(255, 255, 255, 0.5)';
  } else if (theme === 'dark') {
    baseStyles.line.stroke = colorScheme[0];
    baseStyles.area.fill = colorScheme[0];
    baseStyles.bar.fill = colorScheme[0];
    baseStyles.pie.fill = colorScheme[0];
    baseStyles.scatter.fill = colorScheme[0];
    baseStyles.scatter.stroke = '#ffffff';
    baseStyles.dataPoint.stroke = '#ffffff';
  } else {
    baseStyles.line.stroke = colorScheme[0];
    baseStyles.area.fill = colorScheme[0];
    baseStyles.bar.fill = colorScheme[0];
    baseStyles.pie.fill = colorScheme[0];
    baseStyles.scatter.fill = colorScheme[0];
    baseStyles.scatter.stroke = '#ffffff';
    baseStyles.dataPoint.stroke = '#ffffff';
  }

  return baseStyles;
};

// Styled components for chart toolbar
export const ChartToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 8px 0;

  ${glassStyleCSS({
    intent: 'neutral',
    elevation: 'level2',
    tier: 'high'
  })}
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const ChartTypeSelector = styled.div`
  display: flex;
  gap: 4px;

  ${glassStyleCSS({
    intent: 'neutral',
    elevation: 'level2',
    tier: 'high'
  })}
  border-radius: 8px;
  padding: 2px;
`;

export const TypeButton = styled.button<{ $active?: boolean }>`
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  background: ${props => props.$active ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
  color: ${props => props.$active ? '#ffffff' : 'rgba(255, 255, 255, 0.7)'};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    /* Migrated from background: rgba(255, 255, 255, 0.1) */ ...createGlassStyle({ elevation: 'level1' });
    color: #ffffff;
  }
`;

export const ToolbarButton = styled.button`
  padding: 8px 12px;
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  ${glassStyleCSS({
    intent: 'neutral',
    elevation: 'level1',
    tier: 'high'
  })}

  &:hover {
    ${glassStyleCSS({
      intent: 'neutral',
      elevation: 'level2',
      tier: 'high'
    })}
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

export const EnhancedExportButton = styled(ToolbarButton)`
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: '📥';
    font-size: 14px;
  }
`;

// Styled components for chart legend
export const ChartLegend = styled.div<{ $position?: 'top' | 'bottom' | 'left' | 'right'; $style?: 'default' | 'compact' | 'minimal'; $glassEffect?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 8px;

  ${props => {
    switch (props.$position) {
      case 'top':
        return 'margin-bottom: 16px;';
      case 'bottom':
        return 'margin-top: 16px;';
      case 'left':
        return 'flex-direction: column; margin-right: 16px;';
      case 'right':
        return 'flex-direction: column; margin-left: 16px;';
      default:
        return 'margin-top: 16px;';
    }
  }}

  ${props => props.$glassEffect ? css`
    ${glassStyleCSS({
      intent: 'neutral',
      elevation: 'level1',
      tier: 'high'
    })}
    border-radius: 8px;
  ` : ''}
`;

export const LegendItem = styled.div<{ $color?: string; $style?: 'default' | 'compact' | 'minimal'; $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  opacity: ${props => props.$active === false ? 0.5 : 1};
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export const LegendColor = styled.div<{ $color?: string; $active?: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background: ${props => props.$color || '#6366f1'};
  opacity: ${props => props.$active === false ? 0.5 : 1};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const LegendLabel = styled.span<{ $active?: boolean }>`
  font-size: 12px;
  color: ${props => props.$active === false ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.8)'};
  font-weight: 500;
  white-space: nowrap;
`;

export const getColorPalette = (theme: 'light' | 'dark' | 'glass' = 'glass'): string[] => {
  if (theme === 'glass') {
    return [
      '#3b82f6', // Blue
      '#ef4444', // Red
      '#10b981', // Green
      '#f59e0b', // Yellow
      '#8b5cf6', // Purple
      '#ec4899', // Pink
      '#06b6d4', // Cyan
      '#84cc16', // Lime
    ];
  } else if (theme === 'dark') {
    return [
      '#60a5fa', // Light blue
      '#f87171', // Light red
      '#34d399', // Light green
      '#fbbf24', // Light yellow
      '#a78bfa', // Light purple
      '#f472b6', // Light pink
      '#22d3ee', // Light cyan
      '#a3e635', // Light lime
    ];
  } else {
    return [
      '#2563eb', // Dark blue
      '#dc2626', // Dark red
      '#059669', // Dark green
      '#d97706', // Dark yellow
      '#7c3aed', // Dark purple
      '#db2777', // Dark pink
      '#0891b2', // Dark cyan
      '#65a30d', // Dark lime
    ];
  }
};
