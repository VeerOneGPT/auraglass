### GlassThemeSwitcher

Theme switching component.

```tsx
<GlassThemeSwitcher
  themes={['light', 'dark', 'auto']}
  value={currentTheme}
  onChange={setTheme}
/>
```

**Props:**
- `themes?: string[]` - Available themes
- `value?: string` - Current theme
- `onChange?: (theme: string) => void` - Theme change handler
