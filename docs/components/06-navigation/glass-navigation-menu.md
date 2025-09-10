### GlassNavigationMenu

Hierarchical navigation menu with collapsible sections and glass styling.

```tsx
const menuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: <DashboardIcon />
  },
  {
    id: 'analytics',
    label: 'Analytics',
    children: [
      { id: 'reports', label: 'Reports', href: '/analytics/reports' },
      { id: 'metrics', label: 'Metrics', href: '/analytics/metrics' }
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
    featured: true
  }
];

<GlassNavigationMenu
  items={menuItems}
  orientation="vertical"
  variant="sidebar"
  activeItem="dashboard"
  size="md"
  onItemClick={(item) => console.log('Menu item:', item.label)}
/>
```

**Props:**
- `items: NavigationItem[]` - Menu items with optional hierarchy
- `orientation?: 'horizontal' | 'vertical'` - Menu orientation
- `variant?: 'default' | 'sidebar' | 'header'` - Menu variant
- `size?: 'sm' | 'md' | 'lg'` - Menu size
- `activeItem?: string` - Active item ID
- `className?: string` - Additional CSS classes
- `collapsed?: boolean` - Collapsed state (sidebar variant)
- `onItemClick?: (item: NavigationItem) => void` - Item click handler
