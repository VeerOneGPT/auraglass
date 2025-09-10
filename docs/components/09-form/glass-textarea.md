### GlassTextarea

Multi-line text input.

```tsx
<GlassTextarea
  placeholder="Enter your message"
  value={message}
  onChange={setMessage}
  rows={4}
/>
```

**Props:**
- `placeholder?: string` - Placeholder text
- `value?: string` - Text value
- `onChange?: (value: string) => void` - Change handler
- `rows?: number` - Number of rows
