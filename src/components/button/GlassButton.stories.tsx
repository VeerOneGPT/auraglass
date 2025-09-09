import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GlassButton } from './GlassButton';
import { GlassButtonVariantType } from './types';

const meta: Meta<typeof GlassButton> = {
  title: 'Components/Button/GlassButton',
  component: GlassButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A sophisticated glass morphism button component with multiple variants and interactive effects.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'outline', 'link', 'destructive', 'success', 'warning'] as GlassButtonVariantType[],
      description: 'Button variant that determines color and style',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Button size',
    },
    glassVariant: {
      control: { type: 'select' },
      options: ['frosted', 'dynamic', 'clear', 'tinted', 'luminous'],
      description: 'Glass morphism variant',
    },
    intensity: {
      control: { type: 'select' },
      options: ['subtle', 'medium', 'strong', 'intense', 'ultra', 'extreme'],
      description: 'Glass intensity level',
    },
    elevation: {
      control: { type: 'select' },
      options: ['none', 'low', 'medium', 'high', 'ultra'],
      description: 'Glass elevation level',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button interaction',
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    glassVariant: 'frosted',
    intensity: 'medium',
    elevation: 'level2',
    loading: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof GlassButton>;

export const Default: Story = {
  args: {
    children: 'Click Me',
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      {(['primary', 'secondary', 'ghost', 'outline', 'link', 'destructive', 'success', 'warning'] as GlassButtonVariantType[]).map((variant) => (
        <GlassButton key={variant} {...args} variant={variant}>
          {variant}
        </GlassButton>
      ))}
    </div>
  ),
  args: {
    children: null, // Will be overridden in render
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <GlassButton key={size} {...args} size={size}>
          Size {size.toUpperCase()}
        </GlassButton>
      ))}
    </div>
  ),
  args: {
    children: null, // Will be overridden in render
  },
};

export const GlassVariants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      {(['frosted', 'dynamic', 'clear', 'tinted', 'luminous'] as const).map((glassVariant) => (
        <GlassButton key={glassVariant} {...args} glassVariant={glassVariant}>
          {glassVariant}
        </GlassButton>
      ))}
    </div>
  ),
  args: {
    children: null, // Will be overridden in render
  },
};

export const WithIcons: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      <GlassButton {...args}>
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add Item
      </GlassButton>
      <GlassButton {...args} variant="secondary">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        View Details
      </GlassButton>
      <GlassButton {...args} variant="destructive">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Delete
      </GlassButton>
    </div>
  ),
  args: {
    children: null, // Will be overridden in render
  },
};

export const LoadingStates: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      <GlassButton {...args} loading>
        Loading...
      </GlassButton>
      <GlassButton {...args} loading variant="secondary">
        Processing
      </GlassButton>
      <GlassButton {...args} loading variant="ghost" size="sm">
        Saving
      </GlassButton>
    </div>
  ),
  args: {
    children: null, // Will be overridden in render
  },
};

export const DisabledStates: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      <GlassButton {...args} disabled>
        Disabled
      </GlassButton>
      <GlassButton {...args} disabled variant="secondary">
        Can't Click
      </GlassButton>
      <GlassButton {...args} disabled variant="destructive">
        Inactive
      </GlassButton>
    </div>
  ),
  args: {
    children: null, // Will be overridden in render
  },
};

export const IconOnly: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      <GlassButton {...args} iconOnly>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </GlassButton>
      <GlassButton {...args} iconOnly variant="secondary">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </GlassButton>
      <GlassButton {...args} iconOnly variant="destructive" size="sm">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </GlassButton>
    </div>
  ),
  args: {
    children: null, // Will be overridden in render
  },
};

export const Showcase: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    glassVariant: 'luminous',
    intensity: 'ultra',
    elevation: 'level4',
    children: (
      <div className="flex items-center">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Premium Action
      </div>
    ),
  },
};

export const CallToAction: Story = {
  args: {
    variant: 'primary',
    size: 'xl',
    glassVariant: 'dynamic',
    intensity: 'extreme',
    elevation: 'level4',
    className: 'px-8 py-4 text-lg font-semibold',
    children: 'Get Started Today',
  },
};
