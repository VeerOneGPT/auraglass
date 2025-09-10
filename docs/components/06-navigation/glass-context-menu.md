### GlassContextMenu

Right-click context menu.

```tsx
<GlassContextMenu>
  <GlassContextMenu.Trigger>
    <div>Right-click me</div>
  </GlassContextMenu.Trigger>
  <GlassContextMenu.Content>
    <GlassContextMenu.Item>Copy</GlassContextMenu.Item>
    <GlassContextMenu.Item>Paste</GlassContextMenu.Item>
  </GlassContextMenu.Content>
</GlassContextMenu>
```

**Props:**
- `trigger?: ReactNode` - Trigger element
- `children?: ReactNode` - Menu content
