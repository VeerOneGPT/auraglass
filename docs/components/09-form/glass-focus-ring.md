### GlassFocusRing

Animated focus indicator ring with glassmorphism effects for accessible focus management.

```tsx
// Basic usage with any focusable element
<GlassFocusRing>
  <GlassButton>Focusable Button</GlassButton>
</GlassFocusRing>

// Custom styling
<GlassFocusRing
  color="primary"
  variant="rounded"
  offset={4}
  thickness={3}
  borderRadius={8}
>
  <GlassInput placeholder="Type something..." />
</GlassFocusRing>

// Disabled focus ring
<GlassFocusRing disabled={true}>
  <div>Content without focus ring</div>
</GlassFocusRing>

// With form elements
<form>
  <GlassFocusRing variant="primary">
    <GlassInput
      type="email"
      placeholder="Enter your email"
      required
    />
  </GlassFocusRing>

  <GlassFocusRing variant="secondary" offset={2}>
    <GlassButton type="submit">
      Submit Form
    </GlassButton>
  </GlassFocusRing>
</form>
```

**Props:**
- `children: ReactNode` - Focusable element to wrap
- `color?: string` - Focus ring color theme
- `variant?: string` - Visual variant of the focus ring
- `offset?: number` - Distance from element edge (default: 0)
- `thickness?: number` - Ring thickness in pixels (default: 2)
- `borderRadius?: number` - Ring border radius
- `disabled?: boolean` - Disable focus ring (default: false)
