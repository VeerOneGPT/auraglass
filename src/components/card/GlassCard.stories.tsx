import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GlassCard } from './GlassCard';
import { GlassButton } from '../button/GlassButton';

const meta: Meta<typeof GlassCard> = {
  title: 'Components/Card/GlassCard',
  component: GlassCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A sophisticated glass morphism card component with multiple variants and interactive states.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'outlined', 'elevated', 'interactive', 'feature', 'minimal', 'primary', 'outline'],
      description: 'Card variant style',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Card size',
    },
    intensity: {
      control: { type: 'select' },
      options: ['subtle', 'medium', 'strong', 'intense', 'ultra', 'extreme'],
      description: 'Glass intensity level',
    },
    elevation: {
      control: { type: 'select' },
      options: ['none', 'low', 'medium', 'high', 'ultra'],
      description: 'Card elevation level',
    },
    hoverable: {
      control: 'boolean',
      description: 'Enable hover effects',
    },
    clickable: {
      control: 'boolean',
      description: 'Make card clickable',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable card interaction',
    },
  },
  args: {
    variant: 'default',
    size: 'md',
    intensity: 'medium',
    elevation: 'level2',
    hoverable: false,
    clickable: false,
    loading: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof GlassCard>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">Default Card</h3>
        <p className="text-sm opacity-80">This is a standard glass morphism card.</p>
      </div>
    ),
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      {(['default', 'outlined', 'elevated', 'interactive', 'feature', 'minimal', 'primary', 'outline'] as const).map((variant) => (
        <GlassCard key={variant} {...args} variant={variant}>
          <div className="p-6">
            <h4 className="text-sm font-medium capitalize mb-2">{variant} Card</h4>
            <p className="text-xs opacity-70">This is a {variant} variant card.</p>
          </div>
        </GlassCard>
      ))}
    </div>
  ),
  args: {
    children: null, // Will be overridden in render
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <GlassCard key={size} {...args} size={size}>
          <div className="p-4 md:p-6">
            <h4 className="text-sm font-medium capitalize mb-2">Size {size.toUpperCase()}</h4>
            <p className="text-xs opacity-70">This is a {size} sized card.</p>
          </div>
        </GlassCard>
      ))}
    </div>
  ),
  args: {
    children: null, // Will be overridden in render
  },
};

export const InteractiveCards: Story = {
  render: (args) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
      <GlassCard {...args} hoverable>
        <div className="p-6 text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-500/20 flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Hover Effect</h3>
          <p className="text-sm opacity-80">Hover over this card to see the glass effect in action.</p>
        </div>
      </GlassCard>

      <GlassCard {...args} clickable>
        <div className="p-6 text-center cursor-pointer">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Clickable</h3>
          <p className="text-sm opacity-80">This card is clickable and shows pointer cursor.</p>
        </div>
      </GlassCard>

      <GlassCard {...args} variant="interactive">
        <div className="p-6 text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-500/20 flex items-center justify-center">
            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Interactive</h3>
          <p className="text-sm opacity-80">Special interactive variant with enhanced effects.</p>
        </div>
      </GlassCard>
    </div>
  ),
  args: {
    children: null, // Will be overridden in render
  },
};

export const ContentShowcase: Story = {
  args: {
    variant: 'feature',
    size: 'lg',
    intensity: 'ultra',
    elevation: 'level4',
    hoverable: true,
    children: (
      <div className="p-8">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center flex-shrink-0">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Premium Feature Card</h3>
            <p className="text-sm opacity-80 mb-4">
              This showcase demonstrates the full capabilities of our glass morphism card system
              with ultra intensity, extreme elevation, and interactive hover effects.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-500/20 rounded-full text-xs font-medium">Ultra Glass</span>
              <span className="px-3 py-1 bg-purple-500/20 rounded-full text-xs font-medium">Interactive</span>
              <span className="px-3 py-1 bg-green-500/20 rounded-full text-xs font-medium">Responsive</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
};

export const LoadingStates: Story = {
  render: (args) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      <GlassCard {...args} loading>
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-white/10 rounded w-1/2 mb-4"></div>
            <div className="h-3 bg-white/10 rounded w-full mb-2"></div>
            <div className="h-3 bg-white/10 rounded w-2/3"></div>
          </div>
        </div>
      </GlassCard>
      <GlassCard {...args} loading variant="outlined">
        <div className="p-6">
          <div className="animate-pulse">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-full"></div>
              <div className="flex-1">
                <div className="h-3 bg-white/10 rounded w-1/2 mb-1"></div>
                <div className="h-2 bg-white/10 rounded w-1/3"></div>
              </div>
            </div>
            <div className="h-3 bg-white/10 rounded w-full mb-2"></div>
            <div className="h-3 bg-white/10 rounded w-3/4"></div>
          </div>
        </div>
      </GlassCard>
    </div>
  ),
  args: {
    children: null, // Will be overridden in render
  },
};

export const ProductCard: Story = {
  args: {
    variant: 'elevated',
    size: 'lg',
    intensity: 'strong',
    elevation: 'level3',
    hoverable: true,
    children: (
      <div className="p-6">
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Analytics Dashboard</h3>
          <p className="text-sm opacity-80">Complete business intelligence solution with real-time data visualization.</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">$299</div>
          <GlassButton size="sm" variant="primary">Get Started</GlassButton>
        </div>
      </div>
    ),
  },
};
