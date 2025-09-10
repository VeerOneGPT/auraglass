### GlassChart

Unified chart component with glassmorphism effects, physics-based interactions, and Z-Space layering.

```tsx
const chartData = [
  {
    id: 'series1',
    name: 'Revenue',
    color: '#6366F1',
    data: [
      { label: 'Jan', value: 1000 },
      { label: 'Feb', value: 1200 },
      { label: 'Mar', value: 900 }
    ]
  }
];

<GlassChart
  type="bar"
  data={chartData}
  title="Monthly Revenue"
  description="Revenue trends over time"
  width="100%"
  height={400}
  glass={true}
  zElevation={2}
  magneticEffect={true}
/>
```

**Props:**
- `type: 'bar' | 'line' | 'area' | 'pie' | 'scatter'` - Chart type
- `data: any` - Chart data (supports Chart.js format and custom format)
- `width?: string | number` - Chart width
- `height?: string | number` - Chart height
- `title?: string` - Chart title
- `description?: string` - Chart description
- `forcedSimplified?: boolean` - Force simplified rendering
- `zElevation?: 0 | 1 | 2 | 3 | 4` - Z-Space elevation level
- `magneticEffect?: boolean` - Enable magnetic hover effects
- `magneticStrength?: number` - Magnetic effect strength
- `depthAnimation?: boolean` - Enable depth animations
- `tabs?: Array<{id: string, label: string, icon?: ReactNode}>` - Chart navigation tabs
- `activeTab?: string` - Active tab ID
- `onTabChange?: (tabId: string) => void` - Tab change callback
- `chartProps?: Record<string, any>` - Additional chart-specific props
- `toolbarItems?: ReactNode` - Custom toolbar items
- `allowTypeSwitch?: boolean` - Allow chart type switching
- `availableTypes?: Array<'bar' | 'line' | 'area' | 'pie' | 'scatter'>` - Available chart types
- `focusMode?: boolean` - Enable focus mode with zoom
- `allowDownload?: boolean` - Show download button
- `onDownload?: () => void` - Custom download handler
- `theme?: DefaultTheme` - Custom theme object
