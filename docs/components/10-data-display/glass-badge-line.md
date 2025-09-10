### GlassBadgeLine

Inline badge collection component for displaying multiple status indicators.

```tsx
<GlassBadgeLine
  items={[
    { label: 'Active', intent: 'success' },
    { label: 'Beta', intent: 'warning' },
    { label: 'New', intent: 'default' }
  ]}
/>
```

**Props:**
- `items: { label: string; intent?: 'default' | 'success' | 'warning' | 'danger' }[]` - Badge items with label and optional intent
- `className?: string` - Additional CSS classes
