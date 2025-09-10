### GlassPanel

A glassmorphism panel component with variant styles and elevation control.

```tsx
<GlassPanel
  variant="primary"
  elevation={2}
  padding="md"
  interactive
>
  <h3>Panel Title</h3>
  <p>Panel content goes here...</p>
</GlassPanel>
```

**Props:**
- `variant?: 'default' | 'primary' | 'success' | 'warning' | 'error'` - Panel color variant
- `elevation?: 0 | 1 | 2 | 3 | 4` - Shadow depth
- `interactive?: boolean` - Enable hover/interaction states
- `padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'` - Internal padding
- `children: ReactNode` - Panel content
