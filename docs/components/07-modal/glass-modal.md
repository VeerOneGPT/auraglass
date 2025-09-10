### GlassModal

Full-screen modal overlay.

```tsx
<GlassModal open={isOpen} onOpenChange={setIsOpen}>
  <div className="p-8">
    <ModalContent />
  </div>
</GlassModal>
```

**Props:**
- `open?: boolean` - Modal visibility
- `onOpenChange?: (open: boolean) => void` - Visibility change handler
