### GlassInput

Text input field with validation states.

```tsx
<GlassInput
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={setEmail}
  disabled={loading}
  error={hasError}
/>
```

**Props:**
- `type?: string` - Input type
- `placeholder?: string` - Placeholder text
- `value?: string` - Input value
- `onChange?: (value: string) => void` - Change handler
- `disabled?: boolean` - Disabled state
- `error?: boolean` - Error state
