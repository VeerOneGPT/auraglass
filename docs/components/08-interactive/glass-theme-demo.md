### GlassThemeDemo

Interactive theme demonstration component.

```tsx
<GlassThemeDemo
  themes={availableThemes}
  currentTheme={currentTheme}
  onThemeChange={setCurrentTheme}
  showCode={true}
/>
```

**Props:**
- `themes: ThemeConfig[]` - Available themes
- `currentTheme?: string` - Current active theme
- `onThemeChange?: (themeId: string) => void` - Theme change handler
- `showCode?: boolean` - Show theme code
- `components?: ReactNode[]` - Demo components
