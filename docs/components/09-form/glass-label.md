### GlassLabel

Accessible form label component with multiple variants and states.

```tsx
<GlassLabel
  size="md"
  variant="default"
  required={true}
  disabled={false}
>
  Email Address
</GlassLabel>

<GlassLabel
  variant="success"
  icon={<CheckIcon />}
>
  Verified
</GlassLabel>
```

**Props:**
- `size?: 'xs' | 'sm' | 'md' | 'lg'` - Label size
- `variant?: 'default' | 'muted' | 'accent' | 'success' | 'warning' | 'error'` - Visual variant
- `required?: boolean` - Show required indicator (*)
- `disabled?: boolean` - Disabled state
- `icon?: ReactNode` - Optional icon
- `children: ReactNode` - Label content
