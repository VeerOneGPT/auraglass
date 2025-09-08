import React from 'react';

export interface ClearIconProps extends React.SVGAttributes<SVGElement> {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  animated?: boolean;
  animationType?: 'spin' | 'pulse' | 'bounce' | 'shake';
  glassEffect?: boolean;
}
