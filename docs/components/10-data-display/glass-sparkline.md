### GlassSparkline

Miniature line chart for displaying trends and patterns.

```tsx
const data = [10, 15, 12, 18, 25, 22, 28, 30, 27, 32];

// Default sparkline
<GlassSparkline
  data={data}
  width={120}
  height={32}
  stroke="currentColor"
/>

// Custom styled sparkline
<GlassSparkline
  data={data}
  width={150}
  height={40}
  stroke="#3B82F6"
  fill="rgba(59, 130, 246, 0.1)"
  className="text-blue-400"
/>
```

**Props:**
- `data: number[]` - Array of numeric values
- `width?: number` - Chart width (default: 120)
- `height?: number` - Chart height (default: 32)
- `stroke?: string` - Line color (default: 'currentColor')
- `fill?: string` - Fill color (default: 'none')
- `className?: string` - Additional CSS classes
