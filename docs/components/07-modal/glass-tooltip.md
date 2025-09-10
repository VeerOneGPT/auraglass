### GlassTooltip

Glassmorphism styled tooltip component with positioning and animation.

```tsx
<GlassTooltip
  content="This is a tooltip with glassmorphism styling"
  position="top"
  showDelay={300}
>
  <GlassButton>Hover me</GlassButton>
</GlassTooltip>
```

**Props:**
- `content: ReactNode` - Tooltip content
- `children: ReactNode` - Trigger element
- `position?: TooltipPosition` - Tooltip position ('top' | 'bottom' | 'left' | 'right' | 'auto')
- `showDelay?: number` - Delay before showing (ms)
- `hideDelay?: number` - Delay before hiding (ms)
- `disabled?: boolean` - Whether tooltip is disabled
- `maxWidth?: string` - Maximum tooltip width
- `showArrow?: boolean` - Whether to show arrow pointer
- `variant?: 'fade' | 'scale' | 'slide'` - Animation variant
