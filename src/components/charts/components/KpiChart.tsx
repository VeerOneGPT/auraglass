import React from 'react';
import { createGlassStyle } from '../../../core/mixins/glassMixins';

export interface KpiData {
  value: number | string;
  label: string;
  change?: number;
  changeLabel?: string;
  format?: 'number' | 'currency' | 'percentage';
}

export interface KpiChartProps {
  kpi: KpiData;
  animation?: {
    enabled?: boolean;
    stiffness?: number;
    dampingRatio?: number;
    mass?: number;
  };
  qualityTier?: 'low' | 'medium' | 'high' | 'ultra';
  color?: string;
  isReducedMotion?: boolean;
}

export const KpiChart: React.FC<KpiChartProps> = ({
  kpi,
  animation,
  qualityTier = 'medium',
  color = '#3b82f6',
  isReducedMotion = false,
}) => {
  const formatValue = (value: number | string, format?: string): string => {
    if (typeof value === 'string') return value;

    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(value);
      case 'percentage':
        return `${value}%`;
      default:
        return value.toLocaleString();
    }
  };

  const style = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
  };

  return (
    <div style={style}>
      <div style={{ fontSize: '36px', marginBottom: '8px' }}>
        {formatValue(kpi.value, kpi.format)}
      </div>
      <div style={{ fontSize: '14px', opacity: 0.8 }}>
        {kpi.label}
      </div>
      {kpi.change !== undefined && (
        <div style={{
          fontSize: '12px',
          color: kpi.change >= 0 ? '#10b981' : '#ef4444',
          marginTop: '4px'
        }}>
          {kpi.change >= 0 ? '↑' : '↓'} {Math.abs(kpi.change)}% {kpi.changeLabel || ''}
        </div>
      )}
    </div>
  );
};

export default KpiChart;
