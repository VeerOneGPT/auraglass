### GlassAnimated

Wrapper component for individual animated elements.

```tsx
<GlassAnimated
  animation={{
    type: 'scaleIn',
    duration: 400,
    easing: 'easeOut'
  }}
  trigger="hover"
>
  <GlassButton>Hover to Animate</GlassButton>
</GlassAnimated>
```

**Props:**
- `animation?: AnimationConfig` - Animation configuration
- `trigger?: 'mount' | 'hover' | 'click' | 'manual'` - Animation trigger
- `className?: string` - Additional CSS classes
