### RippleButton

Button component with ripple effect feedback.

```tsx
<RippleButton
  variant="contained"
  color="primary"
  rippleColor="white"
  rippleSpeed="medium"
  centerRipple
  onClick={handleClick}
>
  Click me!
</RippleButton>
```

**Props:**
- `children: ReactNode` - Button content
- `disabled?: boolean` - Disable interaction
- `rippleColor?: string` - Ripple effect color
- `rippleSize?: 'small' | 'medium' | 'large'` - Ripple size
- `rippleSpeed?: 'slow' | 'medium' | 'fast'` - Animation speed
- `centerRipple?: boolean` - Center ripple from button center
- `variant?: 'contained' | 'outlined' | 'text'` - Button variant
- `color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'` - Button color
- `size?: 'small' | 'medium' | 'large'` - Button size
