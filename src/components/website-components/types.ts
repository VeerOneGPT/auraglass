import React from 'react';

export interface GlassWipeSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  slides?: Array<{
    id: string;
    content: React.ReactNode;
    background?: string;
  }>;
  currentSlide?: number;
  onSlideChange?: (index: number) => void;
  autoPlay?: boolean;
  autoPlayDelay?: number;
  showDots?: boolean;
  showArrows?: boolean;
  glassVariant?: 'frosted' | 'dynamic' | 'clear' | 'tinted' | 'luminous';
  blurStrength?: 'none' | 'light' | 'standard' | 'heavy';
}

export interface MotionAwareGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  sensitivity?: number;
  maxTilt?: number;
  glassVariant?: 'frosted' | 'dynamic' | 'clear' | 'tinted' | 'luminous';
  blurStrength?: 'none' | 'light' | 'standard' | 'heavy';
}
