### GlassSplitPane

Resizable split panel layout with horizontal/vertical orientation.

```tsx
<GlassSplitPane direction="horizontal" initial={60} min={20} max={80}>
  <GlassSplitPane.Left>
    <Sidebar />
  </GlassSplitPane.Left>
  <GlassSplitPane.Right>
    <MainContent />
  </GlassSplitPane.Right>
</GlassSplitPane>
```

**Props:**
- `direction?: 'horizontal' | 'vertical'` - Split direction
- `initial?: number` - Initial split percentage
- `min?: number` - Minimum split percentage
- `max?: number` - Maximum split percentage
