### GlassCommandPalette

Quick action command palette.

```tsx
<GlassCommandPalette
  commands={commands}
  onCommandSelect={handleCommand}
/>
```

**Props:**
- `commands?: Command[]` - Available commands
- `onCommandSelect?: (command: Command) => void` - Command selection handler
