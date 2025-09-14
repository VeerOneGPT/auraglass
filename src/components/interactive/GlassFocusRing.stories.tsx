import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GlassFocusRing } from './GlassFocusRing';
import { cn } from '../../lib/utils';

const meta: Meta<typeof GlassFocusRing> = {
  title: 'Components/Interactive/GlassFocusRing',
  component: GlassFocusRing,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glassfocusring component.',
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
type Story = StoryObj<typeof GlassFocusRing>;

export const Default: Story = {
  args: {
    children: (
      <div className="glass-glass-glass-p-4 glass-glass-glass-text-center">
        <h3 className="glass-glass-glass-text-lg glass-glass-glass-font-semibold glass-glass-glass-mb-2">GlassFocusRing</h3>
        <p className="glass-glass-glass-text-sm opacity-80">This is the default glassfocusring component.</p>
      </div>
    ),
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="glass-glass-glass-flex glass-glass-glass-flex-wrap glass-glass-glass-gap-4">
      <GlassFocusRing {...args}>
        Default
      </GlassFocusRing>
    </div>
  ),
  args: {
    children: null,
  },
};
