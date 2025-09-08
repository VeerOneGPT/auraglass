import React, { createContext, useContext } from 'react';

export interface AnimationContextType {
  reducedMotion: boolean;
  setReducedMotion: (reduced: boolean) => void;
}

export const AnimationContext = createContext<AnimationContextType>({
  reducedMotion: false,
  setReducedMotion: () => {},
});

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};

export const useAnimationContext = useAnimation;
