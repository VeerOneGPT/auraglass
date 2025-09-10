### GlassStatusDot

Status indicator dot with color-coded states and customizable sizing.

```tsx
// Basic status dots
<div className="flex items-center gap-4">
  <div className="flex items-center gap-2">
    <GlassStatusDot status="ok" />
    <span>Online</span>
  </div>
  <div className="flex items-center gap-2">
    <GlassStatusDot status="warn" />
    <span>Warning</span>
  </div>
  <div className="flex items-center gap-2">
    <GlassStatusDot status="error" />
    <span>Error</span>
  </div>
  <div className="flex items-center gap-2">
    <GlassStatusDot status="busy" />
    <span>Busy</span>
  </div>
</div>

// Custom size
<GlassStatusDot status="ok" size={12} />
```

**Props:**
- `status?: 'ok' | 'warn' | 'error' | 'busy' | 'offline'` - Status type (default: 'ok')
- `size?: number` - Dot size in pixels (default: 8)
- `className?: string` - Additional CSS classes
