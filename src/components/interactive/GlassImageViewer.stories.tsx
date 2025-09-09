import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GlassImageViewer } from './GlassImageViewer';
import { fn } from '@storybook/test';

const meta: Meta<typeof GlassImageViewer> = {
  title: 'Components/Interactive/GlassImageViewer',
  component: GlassImageViewer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glassimageviewer component.',
      },
    },
  },
  argTypes: {
    images: {
      control: 'object',
      description: 'Array of images to display',
    },
    initialIndex: {
      control: 'number',
      description: 'Initial image index to display',
    },
    enableZoom: {
      control: 'boolean',
      description: 'Whether to enable zoom functionality',
    },
    enablePan: {
      control: 'boolean',
      description: 'Whether to enable pan functionality',
    },
    enableRotation: {
      control: 'boolean',
      description: 'Whether to enable rotation',
    },
    enableFullscreen: {
      control: 'boolean',
      description: 'Whether to enable fullscreen mode',
    },
    enableNavigation: {
      control: 'boolean',
      description: 'Whether to enable image navigation',
    },
    showZoomControls: {
      control: 'boolean',
      description: 'Whether to show zoom controls',
    },
    showRotationControls: {
      control: 'boolean',
      description: 'Whether to show rotation controls',
    },
    showDownloadButton: {
      control: 'boolean',
      description: 'Whether to show download button',
    },
    showImageInfo: {
      control: 'boolean',
      description: 'Whether to show image information',
    },
    autoPlay: {
      control: 'boolean',
      description: 'Whether to auto-play slideshow',
    },
    autoPlayInterval: {
      control: 'number',
      description: 'Auto-play interval in milliseconds',
    },
  },
  args: {
    images: [
      {
        src: 'https://picsum.photos/800/600?random=1',
        alt: 'Sample Image 1',
        title: 'Beautiful Landscape',
        description: 'A stunning landscape view',
        width: 800,
        height: 600,
      },
      {
        src: 'https://picsum.photos/800/600?random=2',
        alt: 'Sample Image 2',
        title: 'Urban Architecture',
        description: 'Modern city architecture',
        width: 800,
        height: 600,
      },
      {
        src: 'https://picsum.photos/800/600?random=3',
        alt: 'Sample Image 3',
        title: 'Nature Close-up',
        description: 'Detailed nature photography',
        width: 800,
        height: 600,
      },
    ],
    initialIndex: 0,
    enableZoom: true,
    enablePan: true,
    enableRotation: true,
    enableFullscreen: true,
    enableNavigation: true,
    showZoomControls: true,
    showRotationControls: true,
    showDownloadButton: true,
    showImageInfo: true,
    autoPlay: false,
    autoPlayInterval: 3000,
    onImageChange: fn(),
    onZoomChange: fn(),
    onFullscreenChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof GlassImageViewer>;

export const Default: Story = {
  args: {
    images: [
      {
        src: 'https://picsum.photos/600/400?random=1',
        alt: 'Default Image',
        title: 'Sample Image',
        description: 'A sample image for the image viewer',
      },
    ],
    onImageChange: fn(),
    onZoomChange: fn(),
    onFullscreenChange: fn(),
  },
};

export const Variants: Story = {
  args: {
    images: [
      {
        src: 'https://picsum.photos/600/400?random=2',
        alt: 'Gallery Image 1',
        title: 'Gallery Image 1',
        description: 'First image in gallery',
      },
      {
        src: 'https://picsum.photos/600/400?random=3',
        alt: 'Gallery Image 2',
        title: 'Gallery Image 2',
        description: 'Second image in gallery',
      },
    ],
    enableZoom: true,
    enablePan: true,
    enableRotation: true,
    enableFullscreen: true,
    enableNavigation: true,
    showZoomControls: true,
    showRotationControls: true,
    showDownloadButton: true,
    showImageInfo: true,
    autoPlay: true,
    autoPlayInterval: 5000,
    onImageChange: fn(),
    onZoomChange: fn(),
    onFullscreenChange: fn(),
  },
};
