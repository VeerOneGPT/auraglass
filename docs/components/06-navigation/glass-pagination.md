### GlassPagination

Advanced pagination component with glassmorphism styling and customizable controls.

```tsx
<GlassPagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  maxPageButtons={7}
  showFirstLast={true}
  showPrevNext={true}
  size="md"
/>

// With custom styling
<GlassPagination
  currentPage={2}
  totalPages={25}
  onPageChange={(page) => console.log('Navigate to page:', page)}
  maxPageButtons={5}
  size="lg"
  className="my-4"
/>
```

**Props:**
- `currentPage: number` - Current page number (1-based)
- `totalPages: number` - Total number of pages
- `onPageChange: (page: number) => void` - Page change handler
- `maxPageButtons?: number` - Maximum page buttons to show (default: 7)
- `showFirstLast?: boolean` - Show first/last page buttons (default: true)
- `showPrevNext?: boolean` - Show previous/next buttons (default: true)
- `size?: 'sm' | 'md' | 'lg'` - Component size
- `className?: string` - Additional CSS classes
- `disabled?: boolean` - Disabled state
- `loading?: boolean` - Loading state
