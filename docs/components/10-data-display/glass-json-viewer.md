### GlassJSONViewer

JSON data viewer with syntax highlighting and collapsible structure.

```tsx
const jsonData = {
  users: [
    { id: 1, name: 'John', email: 'john@example.com' },
    { id: 2, name: 'Jane', email: 'jane@example.com' }
  ],
  metadata: {
    total: 2,
    page: 1,
    limit: 10
  }
};

<GlassJSONViewer value={jsonData} />
```

**Props:**
- `value: any` - JSON data to display
- `className?: string` - Additional CSS classes
