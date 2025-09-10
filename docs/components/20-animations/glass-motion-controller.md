### GlassMotionController

Animation orchestration system for complex motion sequences and interactions.

```tsx
<GlassMotionController enabled={true} speed={1} reduceMotion={false}>
  <GlassAnimated
    animation={{
      type: 'fadeIn',
      direction: 'up',
      duration: 600,
      easing: 'easeOut'
    }}
  >
    <GlassCard>Animated Content</GlassCard>
  </GlassAnimated>
</GlassMotionController>
```

**Props:**
- `enabled?: boolean` - Whether animations are globally enabled
- `speed?: number` - Global animation speed multiplier
- `reduceMotion?: boolean` - Whether to reduce motion for accessibility
- `children: ReactNode` - Animated content
