### GlassDialog

Modal dialog with backdrop and focus management.

```tsx
<GlassDialog open={isOpen} onOpenChange={setIsOpen}>
  <GlassCard className="p-6">
    <h3>Dialog Title</h3>
    <p>Dialog content...</p>
    <div className="flex justify-end space-x-3">
      <GlassButton variant="ghost" onClick={() => setIsOpen(false)}>
        Cancel
      </GlassButton>
      <GlassButton onClick={handleConfirm}>
        Confirm
      </GlassButton>
    </div>
  </GlassCard>
</GlassDialog>
```

**Props:**
- `open?: boolean` - Dialog visibility
- `onOpenChange?: (open: boolean) => void` - Visibility change handler
- `title?: string` - Dialog title
- `description?: string` - Dialog description
