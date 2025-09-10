### GlassListView

List view template with search and filtering.

```tsx
<GlassListView
  items={listItems}
  onItemClick={handleItemClick}
  searchPlaceholder="Search items..."
>
  <GlassListView.Header>
    <h2>Items List</h2>
  </GlassListView.Header>
  <GlassListView.Filters>
    <FilterControls />
  </GlassListView.Filters>
</GlassListView>
```

**Props:**
- `items?: any[]` - List items
- `onItemClick?: (item: any) => void` - Item click handler
- `searchPlaceholder?: string` - Search input placeholder
