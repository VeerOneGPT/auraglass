import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GlassCore } from './GlassCore';
import { GlassVariant, BlurIntensity } from '../core/mixins/glassMixins';

const meta: Meta<typeof GlassCore> = {
  title: 'Primitives/GlassCore',
  component: GlassCore,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The core glass morphism component that provides the foundation for all glass effects in the design system.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['frosted', 'crystal', 'tinted', 'metallic', 'neon'] as GlassVariant[],
      description: 'Glass morphism variant that determines the visual style',
    },
    blur: {
      control: { type: 'select' },
      options: ['none', 'light', 'medium', 'heavy', 'ultra'] as BlurIntensity[],
      description: 'Blur intensity for the glass effect',
    },
    opacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Background opacity of the glass surface',
    },
    rounded: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
      description: 'Border radius of the glass surface',
    },
    glow: {
      control: 'boolean',
      description: 'Enable glow effect around the glass surface',
    },
    glowColor: {
      control: 'color',
      description: 'Color of the glow effect',
    },
    glowIntensity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Intensity of the glow effect',
    },
    hover: {
      control: 'boolean',
      description: 'Enable hover effects for interactive feedback',
    },
  },
  args: {
    variant: 'frosted',
    blur: 'medium',
    opacity: 0.1,
    rounded: 'md',
    glow: false,
    glowColor: 'rgba(255, 255, 255, 0.5)',
    glowIntensity: 0.5,
    hover: false,
  },
};

export default meta;
type Story = StoryObj<typeof GlassCore>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">Default Glass Surface</h3>
        <p className="text-sm opacity-80">This is the default glass morphism effect.</p>
      </div>
    ),
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl">
      {(['frosted', 'crystal', 'tinted', 'metallic', 'neon'] as GlassVariant[]).map((variant) => (
        <GlassCore key={variant} {...args} variant={variant}>
          <div className="p-4 text-center">
            <h4 className="text-sm font-medium capitalize mb-1">{variant}</h4>
            <p className="text-xs opacity-70">Variant</p>
          </div>
        </GlassCore>
      ))}
    </div>
  ),
  args: {
    children: null, // Will be overridden in render
  },
};

export const BlurIntensities: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl">
      {(['none', 'light', 'medium', 'heavy', 'ultra'] as BlurIntensity[]).map((blur) => (
        <GlassCore key={blur} {...args} blur={blur}>
          <div className="p-4 text-center">
            <h4 className="text-sm font-medium capitalize mb-1">{blur}</h4>
            <p className="text-xs opacity-70">Blur</p>
          </div>
        </GlassCore>
      ))}
    </div>
  ),
  args: {
    children: null, // Will be overridden in render
  },
};

export const WithGlow: Story = {
  args: {
    glow: true,
    glowColor: 'rgba(59, 130, 246, 0.5)',
    glowIntensity: 0.8,
    children: (
      <div className="p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">Glowing Glass</h3>
        <p className="text-sm opacity-80">Glass surface with blue glow effect.</p>
      </div>
    ),
  },
};

export const InteractiveHover: Story = {
  args: {
    hover: true,
    children: (
      <div className="p-6 text-center cursor-pointer">
        <h3 className="text-lg font-semibold mb-2">Interactive Glass</h3>
        <p className="text-sm opacity-80">Hover over this surface to see the effect.</p>
      </div>
    ),
  },
};

export const DifferentBorderRadii: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl">
      {(['none', 'sm', 'md', 'lg', 'xl', 'full'] as const).map((rounded) => (
        <GlassCore key={rounded} {...args} rounded={rounded}>
          <div className="p-4 text-center">
            <h4 className="text-sm font-medium capitalize mb-1">{rounded}</h4>
            <p className="text-xs opacity-70">Rounded</p>
          </div>
        </GlassCore>
      ))}
    </div>
  ),
  args: {
    children: null, // Will be overridden in render
  },
};

export const ContentShowcase: Story = {
  args: {
    variant: 'luminous',
    blur: 'intense',
    glow: true,
    glowColor: 'rgba(147, 51, 234, 0.3)',
    hover: true,
    children: (
      <div className="p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2">Premium Glass Effect</h3>
        <p className="text-sm opacity-80 mb-4">
          This showcases the full capabilities of our glass morphism system with crystal variant,
          heavy blur, purple glow, and hover effects.
        </p>
        <div className="flex justify-center space-x-2">
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs">Interactive</span>
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs">Responsive</span>
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs">Accessible</span>
        </div>
      </div>
    ),
  },
};
