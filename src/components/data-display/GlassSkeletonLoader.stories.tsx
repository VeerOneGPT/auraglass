import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GlassSkeletonLoader, GlassSkeletonText } from './GlassSkeletonLoader';
import { cn } from '../../lib/utils';

const meta: Meta<typeof GlassSkeletonLoader> = {
  title: 'Components/Data-display/GlassSkeletonLoader',
  component: GlassSkeletonLoader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glassskeletonloader component.',
      },
    },
  },
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Whether the loader is active',
    },
    text: {
      control: 'text',
      description: 'Custom loading text',
    },
    size: {
      control: { type: 'select', options: ['sm', 'md', 'lg', 'xl'] },
      description: 'Size of the loader',
    },
    variant: {
      control: { type: 'select', options: ['pulse', 'wave', 'shimmer'] },
      description: 'Animation variant',
    },
  },
  args: {
    loading: true,
    text: 'Loading...',
    size: 'md',
    variant: 'pulse',
  },
};

export default meta;
type Story = StoryObj<typeof GlassSkeletonLoader>;

export const Default: Story = {
  args: {
    loading: true,
    text: 'Loading content...',
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="glass-glass-grid glass-glass-glass-grid-cols-1 md:glass-glass-glass-grid-cols-3 glass-glass-gap-6 max-w-4xl">
      <div className="glass-glass-text-center">
        <h3 className="glass-glass-text-sm glass-glass-font-semibold glass-glass-mb-4">Pulse</h3>
        <GlassSkeletonLoader {...args} variant="pulse" />
      </div>
      <div className="glass-glass-text-center">
        <h3 className="glass-glass-text-sm glass-glass-font-semibold glass-glass-mb-4">Wave</h3>
        <GlassSkeletonLoader {...args} variant="wave" />
      </div>
      <div className="glass-glass-text-center">
        <h3 className="glass-glass-text-sm glass-glass-font-semibold glass-glass-mb-4">Shimmer</h3>
        <GlassSkeletonLoader {...args} variant="shimmer" />
      </div>
    </div>
  ),
  args: {
    loading: true,
    text: 'Loading...',
  },
};

export const DifferentSizes: Story = {
  render: (args) => (
    <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-gap-8">
      <div className="glass-glass-text-center">
        <h3 className="glass-glass-text-sm glass-glass-font-semibold glass-glass-mb-2">Small</h3>
        <GlassSkeletonLoader {...args} size="sm" />
      </div>
      <div className="glass-glass-text-center">
        <h3 className="glass-glass-text-sm glass-glass-font-semibold glass-glass-mb-2">Medium</h3>
        <GlassSkeletonLoader {...args} size="md" />
      </div>
      <div className="glass-glass-text-center">
        <h3 className="glass-glass-text-sm glass-glass-font-semibold glass-glass-mb-2">Large</h3>
        <GlassSkeletonLoader {...args} size="lg" />
      </div>
      <div className="glass-glass-text-center">
        <h3 className="glass-glass-text-sm glass-glass-font-semibold glass-glass-mb-2">Extra Large</h3>
        <GlassSkeletonLoader {...args} size="xl" />
      </div>
    </div>
  ),
  args: {
    loading: true,
    text: 'Loading...',
  },
};

export const WithChildren: Story = {
  render: (args) => (
    <GlassSkeletonLoader {...args}>
      <div className="glass-glass-p-6 glass-surface-subtle/10 glass-radius-lg glass-glass-text-center">
        <h3 className="glass-glass-text-lg glass-glass-font-semibold glass-glass-mb-2">Content Loaded!</h3>
        <p className="glass-glass-text-sm opacity-80">This content appears when loading is complete.</p>
      </div>
    </GlassSkeletonLoader>
  ),
  args: {
    loading: false,
    text: 'Loading...',
  },
};

// Stories for GlassSkeletonText
export const SkeletonText: Story = {
  render: (args) => (
    <div className="glass-glass-gap-4 max-w-md">
      <div>
        <h4 className="glass-glass-text-sm glass-glass-font-medium glass-glass-mb-2">Single Line</h4>
        <GlassSkeletonText lines={1} />
      </div>

      <div>
        <h4 className="glass-glass-text-sm glass-glass-font-medium glass-glass-mb-2">Multiple Lines</h4>
        <GlassSkeletonText lines={3} />
      </div>

      <div>
        <h4 className="glass-glass-text-sm glass-glass-font-medium glass-glass-mb-2">Long Content Block</h4>
        <GlassSkeletonText lines={5} />
      </div>

      <div>
        <h4 className="glass-glass-text-sm glass-glass-font-medium glass-glass-mb-2">With Custom Width</h4>
        <GlassSkeletonText lines={2} width={['100%', '80%']} />
      </div>
    </div>
  ),
  args: {
    loading: true,
  },
};

export const SkeletonTextVariants: Story = {
  render: (args) => (
    <div className="glass-glass-grid glass-glass-glass-grid-cols-1 md:glass-glass-glass-grid-cols-2 glass-glass-gap-6 max-w-4xl">
      <div>
        <h4 className="glass-glass-text-sm glass-glass-font-medium glass-glass-mb-3">Title Skeleton</h4>
        <GlassSkeletonText lines={1} />
        <div className="glass-mt-2">
          <GlassSkeletonText lines={3} width={['100%', '90%', '60%']} />
        </div>
      </div>

      <div>
        <h4 className="glass-glass-text-sm glass-glass-font-medium glass-glass-mb-3">List Item Skeleton</h4>
        <div className="glass-glass-gap-3">
          <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-3">
            <GlassSkeletonText lines={1} width="40px" />
            <div className="glass-glass-flex-1">
              <GlassSkeletonText lines={2} width={['100%', '70%']} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="glass-glass-text-sm glass-glass-font-medium glass-glass-mb-3">Card Content</h4>
        <GlassSkeletonText lines={1} />
        <div className="glass-mt-2">
          <GlassSkeletonText lines={2} width={['100%', '80%']} />
        </div>
      </div>

      <div>
        <h4 className="glass-glass-text-sm glass-glass-font-medium glass-glass-mb-3">Comment Skeleton</h4>
        <div className="glass-glass-flex glass-glass-items-start glass-glass-gap-3">
          <GlassSkeletonText lines={1} width="32px" />
          <div className="glass-glass-flex-1">
            <GlassSkeletonText lines={3} width={['100%', '90%', '40%']} />
          </div>
        </div>
      </div>
    </div>
  ),
  args: {
    loading: true,
  },
};
