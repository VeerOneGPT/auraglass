### GlassInfiniteScroll

Infinite scrolling container.

```tsx
<GlassInfiniteScroll
  loadMore={loadMoreItems}
  hasMore={hasMoreItems}
  loader={<GlassLoadingSkeleton />}
>
  {items.map(item => <ItemComponent key={item.id} item={item} />)}
</GlassInfiniteScroll>
```

**Props:**
- `loadMore?: () => void` - Load more function
- `hasMore?: boolean` - Whether more items exist
- `loader?: ReactNode` - Loading indicator
