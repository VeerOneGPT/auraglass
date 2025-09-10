### GlassDashboard

Pre-built dashboard template with widgets.

```tsx
<GlassDashboard>
  <GlassDashboard.Header>
    <h1>Dashboard</h1>
  </GlassDashboard.Header>
  <GlassDashboard.Content>
    <GlassKPICard title="Revenue" value="$125,000" />
    <GlassChartWidget>
      <GlassAreaChart data={chartData} />
    </GlassChartWidget>
  </GlassDashboard.Content>
</GlassDashboard>
```

**Props:**
- `header?: ReactNode` - Dashboard header
- `content?: ReactNode` - Dashboard content
