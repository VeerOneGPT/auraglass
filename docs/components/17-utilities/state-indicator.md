### StateIndicator

Visual state indicator for UI elements.

```tsx
<StateIndicator
  state="loading"
  color="primary"
  glass
  blend
  intensity={0.8}
  animationDuration={1500}
>
  <div>Loading content...</div>
</StateIndicator>
```

**Props:**
- `children: ReactNode` - Wrapped content
- `state?: 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'loading' | 'success' | 'error'` - Current state
- `glass?: boolean` - Enable glassmorphism effects
- `blend?: boolean` - Use blend mode for overlay
- `intensity?: number` - Effect intensity (0-1)
- `color?: string` - Indicator color
- `animationDuration?: number` - Animation duration in ms
