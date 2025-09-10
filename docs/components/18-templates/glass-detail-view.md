### GlassDetailView

Detail view template for displaying item information.

```tsx
<GlassDetailView
  title="Item Details"
  data={itemData}
  actions={<ActionButtons />}
>
  <GlassDetailView.Header>
    <GlassAvatar src={itemData.avatar} />
    <h1>{itemData.title}</h1>
  </GlassDetailView.Header>
  <GlassDetailView.Content>
    <DetailContent />
  </GlassDetailView.Content>
</GlassDetailView>
```

**Props:**
- `title?: string` - View title
- `data?: any` - Item data
- `actions?: ReactNode` - Action buttons
