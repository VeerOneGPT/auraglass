import React from 'react';

export interface AtmosphericBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'clear' | 'cloudy' | 'rainy' | 'stormy' | 'foggy' | 'sunny';
  intensity?: number;
  animated?: boolean;
  animate?: boolean;
  particleCount?: number;
  colorScheme?: 'day' | 'night' | 'dusk' | 'dawn';
  weather?: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'foggy';
  baseColor?: string;
  gradientColors?: string[];
  animationDuration?: number;
  interactive?: boolean;
  blur?: boolean;
  blurAmount?: number;
}

export interface GlassDynamicAtmosphereProps extends React.HTMLAttributes<HTMLDivElement> {
  layers?: number;
  depth?: number;
  parallax?: boolean;
  interactive?: boolean;
  colorPalette?: string[];
  animationSpeed?: number;
}

export interface ParticleBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  particleType?: 'dots' | 'lines' | 'shapes' | 'stars' | 'bubbles';
  count?: number;
  size?: number;
  speed?: number;
  color?: string;
  interactive?: boolean;
  mouseInfluence?: number;
  baseColor?: string;
  particleColor?: string;
  particleCount?: number;
  particleSize?: number;
  particleSpeed?: number;
  connectParticles?: boolean;
  blur?: boolean;
  blurAmount?: number;
}
