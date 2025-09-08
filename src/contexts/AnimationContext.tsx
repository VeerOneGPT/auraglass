import React, { createContext, useContext } from 'react';

export interface AnimationContextType {
  reducedMotion: boolean;
  setReducedMotion: (reduced: boolean) => void;
  defaultSpring: {
    stiffness: number;
    damping: number;
    mass: number;
  };
}

export const AnimationContext = createContext<AnimationContextType>({
  reducedMotion: false,
  setReducedMotion: () => {},
  defaultSpring: {
    stiffness: 100,
    damping: 10,
    mass: 1,
  },
});

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};

export const useAnimationContext = useAnimation;
