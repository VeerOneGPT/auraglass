### GlassHeatmap

Matrix data visualization component that displays values as colored cells.

```tsx
const heatmapData = [
  [
    { value: 10, label: 'Low' },
    { value: 25, label: 'Medium' },
    { value: 80, label: 'High' }
  ],
  [
    { value: 5, label: 'Very Low' },
    { value: 45, label: 'Medium-High' },
    { value: 95, label: 'Very High' }
  ]
];

<GlassHeatmap
  data={heatmapData}
  className="w-64 h-32"
/>
```

**Props:**
- `data: HeatmapCell[][]` - 2D array of heatmap cells
- `className?: string` - Additional CSS classes

**HeatmapCell Interface:**
- `value: number` - Cell value (used for color intensity)
- `label?: string` - Optional tooltip/label
