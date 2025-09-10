### ImageList

Grid layout for images with optional bars.

```tsx
<ImageList cols={3} gap={8}>
  <ImageListItem>
    <img src="image1.jpg" alt="Image 1" />
    <ImageListItemBar title="Image 1" />
  </ImageListItem>
  <ImageListItem>
    <img src="image2.jpg" alt="Image 2" />
  </ImageListItem>
</ImageList>
```

**Props:**
- `cols?: number` - Number of columns
- `gap?: number` - Gap between items
