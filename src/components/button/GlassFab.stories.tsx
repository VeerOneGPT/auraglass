import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { GlassFab } from './GlassFab';
import { cn } from '../../lib/utils';
import { createGlassStyle } from '../../core/mixins/glassMixins';
import { useParallax } from '../../hooks/useParallax';

const meta: Meta<typeof GlassFab> = {
  title: 'Components/Button/GlassFab',
  component: GlassFab,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glassfab component.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'className prop',
    },
    children: {
      control: 'text',
      description: 'children prop',
    },
    disabled: {
      control: 'boolean',
      description: 'disabled prop',
    },
  },
  args: {
    className: '',
    children: '',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof GlassFab>;

export const Default: Story = {
  args: {
    children: (
      <div className="glass-glass-p-4 glass-glass-text-center">
        <h3 className="glass-glass-text-lg glass-glass-font-semibold glass-glass-mb-2">GlassFab</h3>
        <p className="glass-glass-text-sm opacity-80">This is the default glassfab component.</p>
      </div>
    ),
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="glass-glass-flex glass-glass-flex-wrap glass-glass-gap-4">
      <GlassFab {...args}>
        Default
      </GlassFab>
    </div>
  ),
  args: {
    children: null,
  },
};

export const ParallaxFab: Story = {
  render: (args) => {
    const { ref, onMouseMove, onMouseLeave } = useParallax<HTMLDivElement>(8);
    return (
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={createGlassStyle({ intent: "neutral", elevation: "level2" })}
      >
        <GlassFab {...args}>Parallax</GlassFab>
      </div>
    );
  },
  args: {
    children: null,
  },
};
