### GlassButton

Primary action button with multiple variants.

```tsx
<GlassButton
  variant="primary"
  size="md"
  disabled={loading}
  loading={loading}
  onClick={handleClick}
>
  Click me
</GlassButton>
```

**Props:**
- `variant?: 'default' | 'primary' | 'secondary' | 'ghost' | 'link'` - Button variant
- `size?: 'sm' | 'md' | 'lg'` - Button size
- `disabled?: boolean` - Disabled state
- `loading?: boolean` - Loading state
- `onClick?: () => void` - Click handler
