### GlassAnimatedNumber

Smooth number transitions with customizable animations.

```tsx
<GlassAnimatedNumber
  value={count}
  from={0}
  duration={1000}
  decimals={0}
  separator={true}
  prefix="$"
/>
```

**Props:**
- `value: number` - Target number to animate to
- `from?: number` - Starting value
- `duration?: number` - Animation duration (ms)
- `easing?: EasingType` - Animation easing function
- `decimals?: number` - Decimal places to show
- `separator?: boolean` - Whether to use comma separators
- `prefix?: string` - Text to show before number
- `suffix?: string` - Text to show after number
- `variant?: 'count' | 'scale' | 'glow'` - Animation variant
