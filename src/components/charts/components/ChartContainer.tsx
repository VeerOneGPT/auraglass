import React from 'react';
import { cn } from '@/lib/utils';

export interface ChartContainerProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  glassVariant?: 'frosted' | 'dynamic' | 'clear' | 'tinted' | 'luminous';
  blurStrength?: 'none' | 'light' | 'standard' | 'heavy';
  color?: string;
  borderRadius?: number | string;
  borderColor?: string;
  elevation?: 'level1' | 'level2' | 'level3' | 'level4' | 'level4';
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  children,
  style,
  className,
  glassVariant = 'frosted',
  blurStrength = 'standard',
  color = 'primary',
  borderRadius = 12,
  borderColor,
  elevation = 'level3',
}) => {
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    padding: '16px',
    borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
    background: glassVariant === 'clear' ? 'transparent' : '${glassStyles.surface?.base || "rgba(255, 255, 255, 0.1)"}',
    backdropFilter: blurStrength !== 'none' ? `blur(${blurStrength === 'light' ? 4 : blurStrength === 'standard' ? 8 : 16}px)` : 'none',
    border: `1px solid ${borderColor || '${glassStyles.borderColor || "rgba(255, 255, 255, 0.2)"}'}`,
    boxShadow: (() => {
      const elevationMap: Record<string, number> = {
        'level1': 1,
        'level2': 2,
        'level3': 3,
        'level4': 4
      };
      const elevationValue = elevationMap[elevation || 'level1'] || 1;
      return elevationValue > 0 ? `0 ${elevationValue * 2}px ${elevationValue * 6}px rgba(0, 0, 0, 0.${elevationValue * 3})` : 'none';
    })(),
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    ...style,
  };

  return (
    <div className={cn('glass-chart-container', className)} style={containerStyle}>
      {children}
    </div>
  );
};

export default ChartContainer;
