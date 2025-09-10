### GlassDataTable

Data table with sorting, filtering, and pagination.

```tsx
<GlassDataTable
  columns={[
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'status', header: 'Status' }
  ]}
  rows={tableData}
/>
```

**Props:**
- `columns?: Column[]` - Table columns
- `rows?: Row[]` - Table data rows
