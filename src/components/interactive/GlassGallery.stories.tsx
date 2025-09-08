import type { Meta, StoryObj } from '@storybook/react';
import { GlassGallery } from './GlassGallery';

const meta: Meta<typeof GlassGallery> = {
  title: 'Components/Interactive/GlassGallery',
  component: GlassGallery,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glassgallery component.',
      },
    },
  },
  argTypes: {
    images: {
      control: 'object',
      description: 'Array of gallery images',
    },
    layout: {
      control: 'select',
      options: ['grid', 'masonry', 'list'],
      description: 'Gallery layout type',
    },
    columns: {
      control: 'number',
      description: 'Number of columns for grid layout',
    },
    aspectRatio: {
      control: 'select',
      options: ['square', 'portrait', 'landscape', 'auto'],
      description: 'Image aspect ratio',
    },
    showInfo: {
      control: 'boolean',
      description: 'Whether to show image information',
    },
    showActions: {
      control: 'boolean',
      description: 'Whether to show image actions',
    },
    enableLightbox: {
      control: 'boolean',
      description: 'Whether to enable lightbox on image click',
    },
  },
  args: {
    images: [
      {
        id: '1',
        src: 'https://picsum.photos/400/300?random=1',
        alt: 'Sample Image 1',
        title: 'Beautiful Landscape',
        description: 'A stunning landscape view',
        tags: ['nature', 'landscape'],
        likes: 42,
        views: 128,
        category: 'Nature',
      },
      {
        id: '2',
        src: 'https://picsum.photos/400/300?random=2',
        alt: 'Sample Image 2',
        title: 'Urban Architecture',
        description: 'Modern city architecture',
        tags: ['urban', 'architecture'],
        likes: 28,
        views: 95,
        category: 'Architecture',
      },
      {
        id: '3',
        src: 'https://picsum.photos/400/300?random=3',
        alt: 'Sample Image 3',
        title: 'Abstract Art',
        description: 'Contemporary abstract art',
        tags: ['art', 'abstract'],
        likes: 67,
        views: 203,
        category: 'Art',
      },
    ],
    layout: 'grid',
    columns: 3,
    aspectRatio: 'square',
    showInfo: true,
    showActions: true,
    enableLightbox: true,
    onImageClick: () => {},
    onSelectionChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof GlassGallery>;

export const Default: Story = {
  args: {
    images: [
      {
        id: '1',
        src: 'https://picsum.photos/300/300?random=1',
        alt: 'Gallery Image 1',
        title: 'Sample Image 1',
        description: 'A beautiful sample image',
        tags: ['sample'],
        likes: 12,
        views: 45,
      },
      {
        id: '2',
        src: 'https://picsum.photos/300/300?random=2',
        alt: 'Gallery Image 2',
        title: 'Sample Image 2',
        description: 'Another beautiful sample image',
        tags: ['sample'],
        likes: 8,
        views: 32,
      },
      {
        id: '3',
        src: 'https://picsum.photos/300/300?random=3',
        alt: 'Gallery Image 3',
        title: 'Sample Image 3',
        description: 'Third sample image',
        tags: ['sample'],
        likes: 15,
        views: 67,
      },
    ],
    onImageClick: () => {},
    onSelectionChange: () => {},
  },
};

export const Variants: Story = {
  args: {
    images: [
      {
        id: '1',
        src: 'https://picsum.photos/400/600?random=4',
        alt: 'Portrait Image',
        title: 'Portrait Layout',
        description: 'Image with portrait aspect ratio',
        tags: ['portrait'],
        likes: 25,
        views: 89,
      },
      {
        id: '2',
        src: 'https://picsum.photos/600/400?random=5',
        alt: 'Landscape Image',
        title: 'Landscape Layout',
        description: 'Image with landscape aspect ratio',
        tags: ['landscape'],
        likes: 18,
        views: 73,
      },
    ],
    layout: 'masonry',
    columns: 2,
    aspectRatio: 'auto',
    onImageClick: () => {},
    onSelectionChange: () => {},
  },
};
