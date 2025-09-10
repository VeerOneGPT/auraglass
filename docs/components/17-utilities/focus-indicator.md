### FocusIndicator

Accessible focus indicator with physics-based animations.

```tsx
<FocusIndicator
  visible={isFocused}
  color="primary"
  thickness={3}
  style="glow"
  glass
  highContrast
>
  <button>Focus me!</button>
</FocusIndicator>
```

**Props:**
- `children: ReactNode` - Wrapped content
- `visible?: boolean` - Show/hide indicator
- `color?: string` - Indicator color ('primary', 'secondary', etc.)
- `thickness?: number` - Border thickness
- `style?: 'solid' | 'dashed' | 'dotted' | 'outline' | 'glow'` - Focus style
- `glass?: boolean` - Enable glassmorphism effects
- `highContrast?: boolean` - High contrast mode
- `disableAnimation?: boolean` - Disable animations
- `animationConfig?: object` - Custom animation configuration
