### GlassCommandList

Scrollable list container for command items.

```tsx
<GlassCommandList maxHeight="300px">
  {filteredItems.map(item => (
    <CommandItem key={item.id} item={item} />
  ))}
</GlassCommandList>
```

**Props:**
- `children: ReactNode` - Command list items
- `maxHeight?: string` - Maximum container height
- `className?: string` - Additional CSS classes
