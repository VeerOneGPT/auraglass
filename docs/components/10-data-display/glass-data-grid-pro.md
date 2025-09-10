### GlassDataGridPro

Advanced data grid component with enhanced features and performance optimizations.

```tsx
const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', filterable: true },
  { key: 'role', header: 'Role', width: 150 }
];

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' }
];

<GlassDataGridPro
  columns={columns}
  rows={data}
  grouping={['role']}
  density="normal"
/>
```

**Props:**
- `columns: any[]` - Column definitions
- `rows: T[]` - Data rows
- `grouping?: string[]` - Grouping configuration
- `density?: 'compact' | 'normal' | 'spacious'` - Row density
