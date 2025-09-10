### GlassLazyImage

Lazy loading image component with blur placeholder.

```tsx
<GlassLazyImage
  src={imageUrl}
  alt="Lazy loaded image"
  width={400}
  height={300}
  blurDataURL={blurPlaceholder}
  priority={false}
/>
```

**Props:**
- `src: string` - Image source URL
- `alt?: string` - Alt text for accessibility
- `width?: number` - Image width
- `height?: number` - Image height
- `blurDataURL?: string` - Blur placeholder data URL
- `priority?: boolean` - Load immediately (for above-the-fold images)
