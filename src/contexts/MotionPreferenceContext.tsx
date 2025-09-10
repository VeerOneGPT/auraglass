import React, { createContext, useContext, useState, useEffect } from 'react';

interface MotionPreferenceContextType {
  prefersReducedMotion: boolean;
  isMotionSafe: boolean;
}

const MotionPreferenceContext = createContext<MotionPreferenceContextType>({
  prefersReducedMotion: false,
  isMotionSafe: true,
});

export const useMotionPreferenceContext = () => {
  const context = useContext(MotionPreferenceContext);
  if (!context) {
    console.warn('useMotionPreferenceContext must be used within a MotionPreferenceProvider. Using default values.');
    return {
      prefersReducedMotion: false,
      isMotionSafe: true,
    };
  }
  return context;
};

interface MotionPreferenceProviderProps {
  children: React.ReactNode;
}

export const MotionPreferenceProvider: React.FC<MotionPreferenceProviderProps> = ({ children }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const value = {
    prefersReducedMotion,
    isMotionSafe: !prefersReducedMotion,
  };

  return (
    <MotionPreferenceContext.Provider value={value}>
      {children}
    </MotionPreferenceContext.Provider>
  );
};
