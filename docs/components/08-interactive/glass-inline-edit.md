### GlassInlineEdit

Inline editing component for text content.

```tsx
<GlassInlineEdit
  value={textValue}
  onSave={handleSave}
  placeholder="Click to edit..."
  multiline={false}
  maxLength={100}
/>
```

**Props:**
- `value: string` - Current text value
- `onSave?: (value: string) => void` - Save handler
- `placeholder?: string` - Placeholder text
- `multiline?: boolean` - Allow multiline editing
- `maxLength?: number` - Maximum character length
- `autoFocus?: boolean` - Auto-focus on edit
