### GlassFormTable

Dynamic form table for editing tabular data with add/remove functionality.

```tsx
const columns = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' }
];

const [tableData, setTableData] = useState([
  { name: 'John Doe', email: 'john@example.com', role: 'Developer' }
]);

<GlassFormTable
  columns={columns}
  rows={tableData}
  onChange={setTableData}
/>
```

**Props:**
- `columns: ColumnDef<T>[]` - Column definitions with keys and headers
- `rows: T[]` - Array of row data
- `onChange: (rows: T[]) => void` - Data change handler

**ColumnDef Interface:**
- `key: keyof T` - Data key for the column
- `header: string` - Column header text
