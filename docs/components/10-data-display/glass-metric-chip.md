### GlassMetricChip

Compact metric display component with label, value, and optional delta information.

```tsx
// Basic metric chip
<GlassMetricChip
  label="Revenue"
  value="$12,345"
  delta="+12.5%"
  intent="success"
/>

// With icon
<GlassMetricChip
  label="Users"
  value="1,247"
  delta="+8.2%"
  intent="success"
  icon={<UsersIcon />}
/>

// Different intents
<div className="flex gap-2">
  <GlassMetricChip label="CPU" value="45%" intent="warning" />
  <GlassMetricChip label="Memory" value="78%" intent="danger" />
  <GlassMetricChip label="Disk" value="23%" intent="default" />
</div>
```

**Props:**
- `label: string` - Metric label
- `value: string | number` - Metric value
- `delta?: string` - Optional delta/change indicator
- `intent?: 'default' | 'success' | 'warning' | 'danger'` - Visual intent/color
- `icon?: ReactNode` - Optional icon
- `className?: string` - Additional CSS classes
