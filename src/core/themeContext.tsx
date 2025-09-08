import React, { createContext, useContext } from 'react';

export interface ThemeContextType {
  theme: 'light' | 'dark' | 'glass';
  isDarkMode: boolean;
  setTheme: (theme: 'light' | 'dark' | 'glass') => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'glass',
  isDarkMode: false,
  setTheme: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const createThemeContext = (theme?: 'light' | 'dark' | 'glass') => {
  return createContext<ThemeContextType>({
    theme: theme || 'glass',
    isDarkMode: theme === 'dark',
    setTheme: () => {},
  });
};
