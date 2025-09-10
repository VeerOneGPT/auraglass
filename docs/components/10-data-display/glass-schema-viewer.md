### GlassSchemaViewer

Database schema viewer with JSON formatting.

```tsx
const schema = {
  type: 'object',
  properties: {
    id: { type: 'integer', primaryKey: true },
    name: { type: 'string', maxLength: 100 },
    email: { type: 'string', format: 'email' }
  },
  required: ['id', 'name']
};

<GlassSchemaViewer schema={schema} />
```

**Props:**
- `schema: any` - Schema object to display
- `className?: string` - Additional CSS classes
