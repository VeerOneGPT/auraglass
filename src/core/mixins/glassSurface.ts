// Basic glass surface mixin
export const glassSurface = {
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
};

export const glassSurfaceHover = {
  ...glassSurface,
  background: 'rgba(255, 255, 255, 0.15)',
};

export const glassSurfaceActive = {
  ...glassSurface,
  background: 'rgba(255, 255, 255, 0.05)',
};

// Function version for dynamic glass surface generation
export const glassSurfaceFn = (options: {
  elevation?: string | number;
  backgroundOpacity?: number;
  blurStrength?: string;
  borderOpacity?: number;
  themeContext?: any;
} = {}) => {
  const {
    elevation = 'medium',
    backgroundOpacity = 0.1,
    blurStrength = '10px',
    borderOpacity = 0.2,
    themeContext,
  } = options;

  return {
    background: `rgba(255, 255, 255, ${backgroundOpacity})`,
    backdropFilter: `blur(${blurStrength})`,
    border: `1px solid rgba(255, 255, 255, ${borderOpacity})`,
    ...(elevation && typeof elevation === 'number' && {
      boxShadow: `0 ${elevation * 2}px ${elevation * 4}px rgba(0, 0, 0, 0.1)`,
    }),
  };
};

// Alias for backward compatibility
export const glassSurfaceFunction = glassSurfaceFn;
