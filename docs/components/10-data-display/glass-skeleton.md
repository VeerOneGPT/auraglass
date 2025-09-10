### GlassSkeleton

Content placeholder component with various shapes and animations.

```tsx
<GlassSkeleton
  variant="rectangular"
  width="200px"
  height="100px"
  animation="wave"
/>
```

**Props:**
- `variant?: SkeletonVariant` - Shape variant ('text' | 'rectangular' | 'circular' | 'rounded')
- `width?: string | number` - Skeleton width
- `height?: string | number` - Skeleton height
- `animation?: 'pulse' | 'wave' | 'none'` - Animation type
- `lines?: number` - Number of text lines (for text variant)
