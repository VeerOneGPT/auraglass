### GlassSkeletonLoader

Advanced loading component with multiple animation variants and customizable content.

```tsx
<GlassSkeletonLoader
  loading={isLoading}
  text="Loading amazing content..."
  size="md"
  variant="pulse"
/>
```

**Props:**
- `loading?: boolean` - Whether to show loading state
- `text?: string` - Loading text
- `size?: 'sm' | 'md' | 'lg' | 'xl'` - Loader size
- `variant?: 'pulse' | 'wave' | 'shimmer'` - Animation variant
- `children?: ReactNode` - Content to show when not loading
