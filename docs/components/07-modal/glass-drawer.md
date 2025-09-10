### GlassDrawer

Slide-out drawer panel from any side.

```tsx
<GlassDrawer open={isOpen} onOpenChange={setIsOpen} side="right">
  <DrawerContent />
</GlassDrawer>
```

**Props:**
- `open?: boolean` - Drawer visibility
- `onOpen-Change?: (open: boolean) => void` - Visibility change handler
- `side?: 'left' | 'right' | 'top' | 'bottom'` - Drawer slide direction
