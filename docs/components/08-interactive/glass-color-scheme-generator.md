### GlassColorSchemeGenerator

Interactive color scheme generation tool with glassmorphism interface.

```tsx
<GlassColorSchemeGenerator
  initialScheme={currentScheme}
  advanced={true}
  generateCSS={true}
  onSchemeChange={handleSchemeChange}
/>
```

**Props:**
- `initialScheme?: Partial<ColorScheme>` - Initial color scheme
- `advanced?: boolean` - Whether to show advanced options
- `generateCSS?: boolean` - Whether to generate CSS variables
- `generateTailwind?: boolean` - Whether to generate Tailwind config
- `onSchemeChange?: (scheme: ColorScheme) => void` - Scheme change handler
