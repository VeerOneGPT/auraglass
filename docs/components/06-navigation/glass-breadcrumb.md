### GlassBreadcrumb

Navigation breadcrumb component with glassmorphism styling and collapsible items.

```tsx
// Simple usage
<GlassBreadcrumb>
  <GlassBreadcrumbItem>
    <GlassBreadcrumbLink href="/home">Home</GlassBreadcrumbLink>
  </GlassBreadcrumbItem>
  <GlassBreadcrumbItem>
    <GlassBreadcrumbLink href="/products">Products</GlassBreadcrumbLink>
  </GlassBreadcrumbItem>
  <GlassBreadcrumbItem isCurrentPage>
    Current Page
  </GlassBreadcrumbItem>
</GlassBreadcrumb>

// Compound usage with automatic structure
<GlassBreadcrumbCompound
  items={[
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Details', isCurrentPage: true }
  ]}
  separator=">"
  maxItems={3}
/>
```

**Props:**
- `separator?: ReactNode` - Separator between items (default: '/')
- `children: ReactNode` - Breadcrumb items
- `maxItems?: number` - Maximum items to show (shows ellipsis for overflow)
- `showEllipsis?: boolean` - Show ellipsis for collapsed items
- `ellipsisComponent?: ReactNode` - Custom ellipsis component
- `elevation?: 1 | 2 | 3` - Glass elevation level
- `size?: 'sm' | 'md' | 'lg'` - Size variant
- `className?: string` - Additional CSS classes

**GlassBreadcrumbItem Props:**
- `isCurrentPage?: boolean` - Whether this is the current page
- `children: ReactNode` - Item content

**GlassBreadcrumbLink Props:**
- `children: ReactNode` - Link content
- `href?: string` - Link destination
- `isCurrentPage?: boolean` - Whether this is the current page

**GlassBreadcrumbSeparator Props:**
- `children?: ReactNode` - Custom separator content
- `className?: string` - Additional CSS classes
