### GlassPopover

Floating content popover with trigger element.

```tsx
<GlassPopover>
  <GlassPopover.Trigger>
    <GlassButton>Open Menu</GlassButton>
  </GlassPopover.Trigger>
  <GlassPopover.Content>
    <MenuItems />
  </GlassPopover.Content>
</GlassPopover>
```

**Props:**
- `open?: boolean` - Popover visibility
- `onOpenChange?: (open: boolean) => void` - Visibility change handler
- `trigger?: ReactNode` - Trigger element
