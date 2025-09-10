### VisualFeedback

General purpose visual feedback component.

```tsx
<VisualFeedback
  effect="glow"
  active={isActive}
  color="success"
  duration={1000}
  glass
  intensity={0.7}
>
  <div>Interactive element</div>
</VisualFeedback>
```

**Props:**
- `children: ReactNode` - Wrapped content
- `effect?: 'ripple' | 'glow' | 'highlight' | 'pulse' | 'none'` - Feedback effect type
- `active?: boolean` - Enable feedback
- `color?: string` - Effect color
- `duration?: number` - Animation duration in ms
- `glass?: boolean` - Enable glassmorphism effects
- `intensity?: number` - Effect intensity (0-1)
