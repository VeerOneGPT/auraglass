### GlassStepIcon

Icon component for step indicators with animated states.

```tsx
// Basic step icon
<GlassStepIcon
  index={1}
  active={false}
  completed={true}
/>

// Custom icon
<GlassStepIcon
  index={2}
  active={true}
  completed={false}
  icon={<StarIcon />}
/>
```

**Props:**
- `index: number` - Step number/index
- `active: boolean` - Whether step is currently active
- `completed: boolean` - Whether step is completed
- `icon?: ReactNode | string` - Custom icon (defaults to step number)
