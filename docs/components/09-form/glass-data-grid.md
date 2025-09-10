### GlassDataGrid

Advanced data grid component with sorting, filtering, pagination, and physics-based interactions.

```tsx
const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'status', header: 'Status', filterable: true }
];

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' }
];

<GlassDataGrid
  columns={columns}
  data={data}
  sortable
  filterable
  pagination={{ pageSize: 10 }}
  onRowClick={(row) => console.log('Row clicked:', row)}
/>
```

**Props:**
- `columns: ColumnDefinition[]` - Column definitions with keys, headers, and options
- `data: any[]` - Array of row data
- `sortable?: boolean` - Enable column sorting
- `filterable?: boolean` - Enable column filtering
- `pagination?: { pageSize: number; currentPage?: number }` - Pagination configuration
- `onRowClick?: (row: any) => void` - Row click handler
- `onSort?: (sortState: SortState) => void` - Sort change handler
- `loading?: boolean` - Loading state
- `emptyMessage?: string` - Empty state message
- `height?: string | number` - Grid height
- `width?: string | number` - Grid width
- `glass?: boolean` - Enable glassmorphism effects
- `elevation?: number` - Glass elevation level
- `interactive?: boolean` - Enable hover and click effects

**ColumnDefinition Interface:**
- `key: string` - Data key for the column
- `header: string` - Column header text
- `sortable?: boolean` - Whether column is sortable
- `filterable?: boolean` - Whether column is filterable
- `width?: string | number` - Column width
- `align?: 'left' | 'center' | 'right'` - Text alignment
- `render?: (value: any, row: any) => ReactNode` - Custom cell renderer
