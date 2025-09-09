import React from 'react';
import { createGlassStyle } from '../../../core/mixins/glassMixins';

export interface TooltipData {
  datasetIndex: number;
  dataIndex: number;
  x: number;
  y: number;
  value: {
    dataset?: string;
    label?: string;
    value?: number | string;
    color?: string;
    extra?: Record<string, any>;
  };
}

export interface ChartTooltipProps {
  tooltipData: TooltipData | null;
  datasets?: any[];
  color?: string;
  qualityTier?: 'low' | 'medium' | 'high' | 'ultra';
  tooltipStyle?: 'frosted' | 'minimal' | 'detailed';
  followCursor?: boolean;
  children?: React.ReactNode;
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({
  tooltipData,
  datasets = [],
  color = '#3b82f6',
  qualityTier = 'medium',
  tooltipStyle = 'frosted',
  followCursor = false,
}) => {
  if (!tooltipData) return null;

  const style: React.CSSProperties = {
    position: 'fixed',
    left: tooltipData.x + 10,
    top: tooltipData.y - 10,
    background: tooltipStyle === 'frosted'
      ? 'rgba(0, 0, 0, 0.8)'
      : tooltipStyle === 'minimal'
        ? 'rgba(255, 255, 255, 0.95)'
        : 'rgba(255, 255, 255, 0.9)',
    backdropFilter: tooltipStyle === 'frosted' ? 'blur(8px)' : 'none',
    border: tooltipStyle === 'frosted'
      ? '1px solid rgba(255, 255, 255, 0.2)'
      : '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '8px 12px',
    fontSize: '12px',
    color: tooltipStyle === 'frosted' ? 'white' : 'black',
    pointerEvents: 'none',
    zIndex: 1000,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    maxWidth: '200px',
    whiteSpace: 'nowrap',
  };

  return (
    <div style={style}>
      <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
        {tooltipData.value.dataset || 'Dataset'}
      </div>
      <div>
        <span style={{ color: tooltipData.value.color || color }}>
          ●
        </span>{' '}
        {tooltipData.value.label || 'Value'}: {tooltipData.value.value || 'N/A'}
      </div>
    </div>
  );
};

export default ChartTooltip;
