### GlassVirtualTable

Virtualized table component for handling large datasets efficiently.

```tsx
const columns = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' }
];

const largeDataset = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`
}));

<GlassVirtualTable
  columns={columns}
  rows={largeDataset}
  height="400px"
/>
```

**Props:**
- `columns: any[]` - Column definitions
- `rows: T[]` - Data rows
- Additional props passed to GlassDataTable
