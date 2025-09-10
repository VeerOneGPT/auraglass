### GlassGallery

Responsive image gallery with grid, masonry, and list layouts, lightbox viewing, and interactive features.

```tsx
const galleryImages = [
  {
    id: '1',
    src: '/images/nature-1.jpg',
    alt: 'Beautiful landscape',
    title: 'Mountain Vista',
    description: 'A stunning view of the mountains at sunset',
    thumbnail: '/images/nature-1-thumb.jpg',
    width: 1920,
    height: 1080,
    tags: ['nature', 'mountains', 'sunset'],
    likes: 42,
    views: 1250,
    createdAt: new Date('2024-01-15'),
    category: 'nature'
  },
  {
    id: '2',
    src: '/images/city-1.jpg',
    alt: 'Urban skyline',
    title: 'City Lights',
    description: 'Modern cityscape at night',
    thumbnail: '/images/city-1-thumb.jpg',
    width: 1600,
    height: 900,
    tags: ['city', 'urban', 'night'],
    likes: 28,
    views: 890,
    createdAt: new Date('2024-01-14'),
    category: 'urban'
  },
  {
    id: '3',
    src: '/images/portrait-1.jpg',
    alt: 'Portrait photography',
    title: 'Golden Hour Portrait',
    description: 'Beautiful portrait captured during golden hour',
    thumbnail: '/images/portrait-1-thumb.jpg',
    width: 1200,
    height: 1600,
    tags: ['portrait', 'photography', 'golden-hour'],
    likes: 67,
    views: 2100,
    createdAt: new Date('2024-01-13'),
    category: 'portrait'
  }
];

// Grid layout
<GlassGallery
  images={galleryImages}
  layout="grid"
  columns={3}
  aspectRatio="square"
  showInfo={true}
  showActions={true}
  enableLightbox={true}
  showFilters={true}
  onImageClick={(image, index) => {
    console.log('Image clicked:', image.title);
  }}
/>

// Masonry layout
<GlassGallery
  images={galleryImages}
  layout="masonry"
  columns={4}
  aspectRatio="auto"
  showInfo={true}
  enableLightbox={true}
  enableSelection={true}
  onSelectionChange={(selectedImages) => {
    console.log('Selected images:', selectedImages.length);
  }}
/>

// List layout with filters
<GlassGallery
  images={galleryImages}
  layout="list"
  showInfo={true}
  showActions={true}
  showFilters={true}
  enableLightbox={false}
  onImageClick={(image, index) => {
    console.log('Viewing image:', image.title);
  }}
/>
```

**Props:**
- `images: GalleryImage[]` - Array of gallery images
- `layout?: 'grid' | 'masonry' | 'list'` - Gallery layout type
- `columns?: number` - Number of columns (for grid/masonry)
- `aspectRatio?: 'square' | 'portrait' | 'landscape' | 'auto'` - Image aspect ratio
- `showInfo?: boolean` - Show image title and description
- `showActions?: boolean` - Show like, share, and view actions
- `enableLightbox?: boolean` - Enable lightbox/modal viewing
- `showFilters?: boolean` - Show category/tag filters
- `enableSelection?: boolean` - Enable multi-select mode
- `className?: string` - Additional CSS classes
- `onImageClick?: (image: GalleryImage, index: number) => void` - Image click handler
- `onSelectionChange?: (selectedImages: GalleryImage[]) => void` - Selection change handler

**GalleryImage Interface:**
- `id: string` - Unique image identifier
- `src: string` - Full-size image URL
- `alt?: string` - Alt text for accessibility
- `title?: string` - Image title
- `description?: string` - Image description
- `thumbnail?: string` - Thumbnail image URL
- `width?: number` - Image width in pixels
- `height?: number` - Image height in pixels
- `tags?: string[]` - Image tags for filtering
- `likes?: number` - Number of likes
- `views?: number` - Number of views
- `createdAt?: Date` - Image creation date
- `category?: string` - Image category
