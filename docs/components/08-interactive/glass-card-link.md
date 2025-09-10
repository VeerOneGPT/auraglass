### GlassCardLink

Enhanced card component with 3D glass effects, animated hover states, and link functionality.

```tsx
<GlassCardLink href="/projects/advanced-dashboard">
  <CardHeader>
    <GlassIconContainer>
      <DashboardIcon />
    </GlassIconContainer>
    <CardTitle>Advanced Dashboard</CardTitle>
    <CardDescription>
      Comprehensive analytics and reporting dashboard with real-time data visualization.
    </CardDescription>
  </CardHeader>

  <CardContent>
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-400">1,247</div>
        <div className="text-sm text-white/70">Active Users</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-green-400">98.5%</div>
        <div className="text-sm text-white/70">Uptime</div>
      </div>
    </div>

    <FloatingArrow>
      <span>Explore Dashboard</span>
      <ArrowRightIcon />
    </FloatingArrow>
  </CardContent>
</GlassCardLink>
```

**Props:**
- `href?: string` - Link destination URL
- `target?: '_blank' | '_self' | '_parent' | '_top'` - Link target
- `rel?: string` - Link relationship attribute
- `children: ReactNode` - Card content
- `className?: string` - Additional CSS classes
- `disabled?: boolean` - Disabled state
- `onClick?: (event: React.MouseEvent) => void` - Click handler
