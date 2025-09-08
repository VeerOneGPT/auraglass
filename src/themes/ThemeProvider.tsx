'use client';

import { GlassButton } from '@/design-system';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { defaultTheme, Theme, ThemeName, themes, themeUtils } from './index';

interface ThemeContextValue {
  theme: Theme;
  themeName: ThemeName;
  setTheme: (name: ThemeName) => void;
  toggleTheme: () => void;
  systemTheme: 'dark' | 'light';
  isHighContrast: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeName;
  storageKey?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

/**
 * Theme Provider Component
 * Manages theme state and provides theme context to children
 */
export function ThemeProvider({
  children,
  defaultTheme: initialTheme = defaultTheme,
  storageKey = 'aura-theme',
  enableSystem = true,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [themeName, setThemeName] = useState<ThemeName>(initialTheme);
  const [systemTheme, setSystemTheme] = useState<'dark' | 'light'>('dark');
  const [isHighContrast, setIsHighContrast] = useState(false);

  // Get theme object
  const theme = themes[themeName];

  // Set theme function
  const setTheme = useCallback((name: ThemeName) => {
    setThemeName(name);

    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, name);
    }

    // Disable transitions temporarily if requested
    if (disableTransitionOnChange) {
      const root = document.documentElement;
      root.classList.add('theme-transitioning');

      setTimeout(() => {
        root.classList.remove('theme-transitioning');
      }, 0);
    }
  }, [storageKey, disableTransitionOnChange]);

  // Toggle theme function
  const toggleTheme = useCallback(() => {
    const themeOrder: ThemeName[] = isHighContrast
      ? ['high-contrast', 'dark', 'light']
      : ['dark', 'light'];

    const currentIndex = themeOrder.indexOf(themeName);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    setTheme(themeOrder[nextIndex]);
  }, [themeName, isHighContrast, setTheme]);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // Check localStorage
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme && savedTheme in themes) {
      setThemeName(savedTheme as ThemeName);
      return;
    }

    // Check system preference
    if (enableSystem) {
      const systemPref = themeUtils.getSystemTheme();
      const highContrast = themeUtils.prefersHighContrast();

      if (highContrast) {
        setThemeName('high-contrast');
      } else {
        setThemeName(systemPref);
      }
    }
  }, [storageKey, enableSystem]);

  // Apply theme to DOM
  useEffect(() => {
    themeUtils.applyTheme(theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (!enableSystem) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');

    const handleChange = () => {
      const newSystemTheme = mediaQuery.matches ? 'dark' : 'light';
      const newHighContrast = contrastQuery.matches;

      setSystemTheme(newSystemTheme);
      setIsHighContrast(newHighContrast);

      // Auto-switch if no saved preference
      const savedTheme = localStorage.getItem(storageKey);
      if (!savedTheme) {
        if (newHighContrast) {
          setThemeName('high-contrast');
        } else {
          setThemeName(newSystemTheme);
        }
      }
    };

    // Set initial values
    handleChange();

    // Add listeners
    mediaQuery.addEventListener('change', handleChange);
    contrastQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      contrastQuery.removeEventListener('change', handleChange);
    };
  }, [enableSystem, storageKey]);

  // Keyboard shortcut for theme toggle
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Shift + T to toggle theme
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        toggleTheme();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [toggleTheme]);

  const value: ThemeContextValue = {
    theme,
    themeName,
    setTheme,
    toggleTheme,
    systemTheme,
    isHighContrast,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to use theme context
 */
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

/**
 * Theme toggle button component
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { themeName, toggleTheme } = useTheme();

  const getIcon = () => {
    switch (themeName) {
      case 'light':
        return '☀️';
      case 'dark':
        return '🌙';
      case 'high-contrast':
        return '🔲';
      default:
        return '🌙';
    }
  };

  const getLabel = () => {
    switch (themeName) {
      case 'light':
        return 'Switch to dark theme';
      case 'dark':
        return 'Switch to light theme';
      case 'high-contrast':
        return 'Switch to dark theme';
      default:
        return 'Toggle theme';
    }
  };

  return (
    <GlassButton
      onClick={toggleTheme}
      className={className}
      aria-label={getLabel()}
      title={getLabel()}
    >
      <span aria-hidden="true">{getIcon()}</span>
    </GlassButton>
  );
}

/**
 * Theme script to prevent flash of unstyled content
 * This should be injected into the <head> of your document
 */
export function ThemeScript({
  storageKey = 'aura-theme',
  defaultTheme = 'dark'
}: {
  storageKey?: string;
  defaultTheme?: ThemeName;
}) {
  const script = `
    (function() {
      try {
        const savedTheme = localStorage.getItem('${storageKey}');
        const theme = savedTheme || '${defaultTheme}';
        document.documentElement.setAttribute('data-theme', theme);
        
        // Apply critical theme variables immediately
        if (theme === 'light') {
          document.documentElement.style.setProperty('--background', 'hsl(0, 0%, 100%)');
          document.documentElement.style.setProperty('--foreground', 'hsl(220, 14%, 10%)');
        } else if (theme === 'high-contrast') {
          document.documentElement.style.setProperty('--background', 'hsl(0, 0%, 0%)');
          document.documentElement.style.setProperty('--foreground', 'hsl(0, 0%, 100%)');
        } else {
          document.documentElement.style.setProperty('--background', 'hsl(217, 33%, 17%)');
          document.documentElement.style.setProperty('--foreground', 'hsl(213, 31%, 91%)');
        }
      } catch (e) {}
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}