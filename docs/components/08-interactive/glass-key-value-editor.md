### GlassKeyValueEditor

Key-value pair editor with validation.

```tsx
<GlassKeyValueEditor
  pairs={keyValuePairs}
  onChange={setKeyValuePairs}
  keyPlaceholder="Enter key..."
  valuePlaceholder="Enter value..."
  allowEmptyValues={false}
/>
```

**Props:**
- `pairs: KeyValuePair[]` - Current key-value pairs
- `onChange?: (pairs: KeyValuePair[]) => void` - Change handler
- `keyPlaceholder?: string` - Key input placeholder
- `valuePlaceholder?: string` - Value input placeholder
- `allowEmptyValues?: boolean` - Allow empty values
- `validateKey?: (key: string) => boolean` - Key validation function
