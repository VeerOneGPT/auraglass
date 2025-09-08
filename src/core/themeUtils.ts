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
