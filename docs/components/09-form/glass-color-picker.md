### GlassColorPicker

Color selection component.

```tsx
<GlassColorPicker
  value={color}
  onChange={setColor}
  format="hex"
/>
```

**Props:**
- `value?: string` - Selected color
- `onChange?: (color: string) => void` - Color change handler
- `format?: 'hex' | 'rgb' | 'hsl'` - Color format
