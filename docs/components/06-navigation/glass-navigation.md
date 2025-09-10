### GlassNavigation

Advanced navigation component with glassmorphism effects, physics-based interactions, and multiple layout options.

```tsx
const navigationItems = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: <HomeIcon />,
    badge: 'New'
  },
  {
    id: 'projects',
    label: 'Projects',
    href: '/projects',
    icon: <FolderIcon />,
    children: [
      { id: 'active', label: 'Active', href: '/projects/active' },
      { id: 'completed', label: 'Completed', href: '/projects/completed' }
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
    icon: <SettingsIcon />,
    featured: true
  }
];

<GlassNavigation
  items={navigationItems}
  position="left"
  variant="sidebar"
  activeItem="home"
  glassIntensity={0.8}
  onItemClick={(item) => console.log('Navigation:', item)}
/>
```

**Props:**
- `items: NavigationItem[]` - Navigation items with hierarchy support
- `position?: 'top' | 'bottom' | 'left' | 'right'` - Navigation position
- `variant?: 'default' | 'minimal' | 'prominent' | 'sidebar'` - Visual variant
- `activeItem?: string` - Currently active item ID
- `glassIntensity?: number` - Glass effect intensity (0-1)
- `sticky?: boolean` - Make navigation sticky
- `compact?: boolean` - Compact layout
- `centered?: boolean` - Center navigation items
- `zIndex?: number` - Z-index for layering
- `width?: string | number` - Navigation width (for sidebars)
- `onItemClick?: (item: NavigationItem) => void` - Item click handler

**NavigationItem Interface:**
- `id: string` - Unique identifier
- `label: string` - Display label
- `href?: string` - Navigation link
- `icon?: ReactNode` - Item icon
- `description?: string` - Item description
- `badge?: string | number` - Badge/count indicator
- `disabled?: boolean` - Disabled state
- `external?: boolean` - External link indicator
- `children?: NavigationItem[]` - Nested navigation items
- `action?: () => void` - Custom action handler
- `separator?: boolean` - Render as separator
- `featured?: boolean` - Featured/highlighted item
