// Theme utilities
export const getThemeValue = (theme: any, key: string) => {
  return theme?.[key];
};

export const createThemeVariant = (baseTheme: any, overrides: any) => {
  return { ...baseTheme, ...overrides };
};

export const mergeThemes = (themes: any[]) => {
  return themes.reduce((acc, theme) => ({ ...acc, ...theme }), {});
};

export const createThemeContext = (defaultTheme?: 'light' | 'dark' | 'glass' | undefined) => {
  return {
    theme: defaultTheme || 'glass',
    setTheme: (theme: 'light' | 'dark' | 'glass') => {
      // Theme change handler - implement based on your state management
      if (process.env.NODE_ENV === 'development') {
        console.log('Theme changed to:', theme);
      }
    }
  };
};
