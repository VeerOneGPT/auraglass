import type { Meta, StoryObj } from '@storybook/react';
import { GlassLazyImage } from './GlassLazyImage';
import { fn } from '@storybook/test';

const meta: Meta<typeof GlassLazyImage> = {
  title: 'Components/Interactive/GlassLazyImage',
  component: GlassLazyImage,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glasslazyimage component.',
      },
    },
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    placeholder: {
      control: 'text',
      description: 'Low quality placeholder image URL',
    },
    alt: {
      control: 'text',
      description: 'Alt text for the image',
    },
    title: {
      control: 'text',
      description: 'Image title',
    },
    width: {
      control: 'number',
      description: 'Image width',
    },
    height: {
      control: 'number',
      description: 'Image height',
    },
    objectFit: {
      control: 'select',
      options: ['contain', 'cover', 'fill', 'none', 'scale-down'],
      description: 'CSS object-fit property',
    },
    blur: {
      control: 'boolean',
      description: 'Enable blur placeholder',
    },
  },
  args: {
    src: 'https://picsum.photos/400/300?random=1',
    placeholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjwvc3ZnPgo=',
    alt: 'Sample image',
    title: 'Beautiful landscape',
    width: 400,
    height: 300,
    objectFit: 'cover',
    blur: true,
    onLoad: fn(),
    onError: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof GlassLazyImage>;

export const Default: Story = {
  args: {
    src: 'https://picsum.photos/300/200?random=2',
    alt: 'Default lazy image',
    title: 'Sample lazy loaded image',
    onLoad: fn(),
    onError: fn(),
  },
};

export const Variants: Story = {
  args: {
    src: 'https://picsum.photos/500/400?random=3',
    alt: 'Variant lazy image',
    title: 'High quality lazy image',
    width: 500,
    height: 400,
    objectFit: 'contain',
    blur: false,
    onLoad: fn(),
    onError: fn(),
  },
};
