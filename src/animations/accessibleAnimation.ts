// Accessible animation utilities
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const createAccessibleAnimation = (animation: any) => {
  if (prefersReducedMotion()) {
    return { ...animation, duration: 0 };
  }
  return animation;
};
