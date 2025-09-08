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
