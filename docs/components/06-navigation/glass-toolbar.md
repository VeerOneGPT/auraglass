### GlassToolbar

Action toolbar with left, center, and right content slots.

```tsx
<GlassToolbar sticky>
  <GlassToolbar.Left>
    <BackButton />
  </GlassToolbar.Left>
  <GlassToolbar.Center>
    <Title />
  </GlassToolbar.Center>
  <GlassToolbar.Right>
    <ActionButtons />
  </GlassToolbar.Right>
</GlassToolbar>
```

**Props:**
- `left?: ReactNode` - Left slot content
- `center?: ReactNode` - Center slot content
- `right?: ReactNode` - Right slot content
- `sticky?: boolean` - Make toolbar sticky
- `floating?: boolean` - Enable floating appearance
