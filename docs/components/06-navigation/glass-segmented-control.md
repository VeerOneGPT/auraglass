### GlassSegmentedControl

Tab-like segmented control for switching between modes or views.

```tsx
<GlassSegmentedControl
  items={[
    { id: 'grid', label: 'Grid', icon: GridIcon },
    { id: 'list', label: 'List', icon: ListIcon },
    { id: 'table', label: 'Table', icon: TableIcon }
  ]}
  value={viewMode}
  onChange={setViewMode}
  size="md"
/>
```

**Props:**
- `items: SegmentedItem[]` - Array of segment items
- `value?: string` - Currently selected value
- `onChange?: (value: string) => void` - Change handler
- `size?: 'sm' | 'md' | 'lg'` - Control size
- `condensed?: boolean` - Compact appearance
