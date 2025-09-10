### GlassVirtualList

Virtualized list for performance with large datasets.

```tsx
<GlassVirtualList
  items={largeDataset}
  itemHeight={50}
  containerHeight={400}
>
  {(item) => <ListItem item={item} />}
</GlassVirtualList>
```

**Props:**
- `items?: any[]` - Data items
- `itemHeight?: number` - Height of each item
- `containerHeight?: number` - Container height
