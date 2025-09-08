import React, { createContext, useContext } from 'react';

export interface ThemeContextType {
  theme: 'light' | 'dark' | 'glass';
  setTheme: (theme: 'light' | 'dark' | 'glass') => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'glass',
  setTheme: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const createThemeContext = () => ThemeContext;
