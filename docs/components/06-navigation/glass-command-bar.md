### GlassCommandBar

Keyboard shortcut action bar with glassmorphism styling.

```tsx
<GlassCommandBar>
  <GlassCommandBar.Item
    icon={<SaveIcon />}
    label="Save"
    shortcut="Ctrl+S"
    onClick={() => handleSave()}
  />
  <GlassCommandBar.Item
    icon={<PrintIcon />}
    label="Print"
    shortcut="Ctrl+P"
    onClick={() => handlePrint()}
  />
  <GlassCommandBar.Item
    icon={<ShareIcon />}
    label="Share"
    shortcut="Ctrl+Shift+S"
    onClick={() => handleShare()}
  />
</GlassCommandBar>
```

**Props:**
- `children?: ReactNode` - Command bar items
- `position?: 'top' | 'bottom'` - Bar position
- `size?: 'sm' | 'md' | 'lg'` - Bar size
- `variant?: 'default' | 'compact'` - Visual variant
- `className?: string` - Additional CSS classes

**GlassCommandBar.Item Props:**
- `icon?: ReactNode` - Item icon
- `label: string` - Item label
- `shortcut?: string` - Keyboard shortcut
- `onClick?: () => void` - Click handler
- `disabled?: boolean` - Disabled state
