import React from 'react';

export interface ChartContainerProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  glassVariant?: 'frosted' | 'dynamic' | 'clear' | 'tinted' | 'luminous';
  blurStrength?: 'none' | 'light' | 'standard' | 'heavy';
  color?: string;
  borderRadius?: number | string;
  borderColor?: string;
  elevation?: number;
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
  elevation = 3,
}) => {
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    padding: '16px',
    borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
    background: glassVariant === 'clear' ? 'transparent' : 'rgba(255, 255, 255, 0.1)',
    backdropFilter: blurStrength !== 'none' ? `blur(${blurStrength === 'light' ? 4 : blurStrength === 'standard' ? 8 : 16}px)` : 'none',
    border: `1px solid ${borderColor || 'rgba(255, 255, 255, 0.2)'}`,
    boxShadow: elevation > 0 ? `0 ${elevation * 2}px ${elevation * 6}px rgba(0, 0, 0, 0.${elevation * 3})` : 'none',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    ...style,
  };

  return (
    <div className={className} style={containerStyle}>
      {children}
    </div>
  );
};

export default ChartContainer;
