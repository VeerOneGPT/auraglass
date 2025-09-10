### GlassCommandDialog

Modal version of the command palette with backdrop and focus management.

```tsx
<GlassCommandDialog
  items={commandItems}
  open={isOpen}
  onOpenChange={setIsOpen}
  title="Command Palette"
  description="Search for commands..."
/>
```

**Props:**
- Inherits all GlassCommand props
- `open: boolean` - Whether dialog is open
- `onOpenChange: (open: boolean) => void` - Open state change handler
- `title?: string` - Dialog title
- `description?: string` - Dialog description
