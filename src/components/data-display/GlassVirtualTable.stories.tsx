import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GlassVirtualTable } from './GlassVirtualTable';
import { cn } from '../../lib/utils';

const meta: Meta<typeof GlassVirtualTable> = {
  title: 'Components/Data-display/GlassVirtualTable',
  component: GlassVirtualTable,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glassvirtualtable component.',
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
type Story = StoryObj<typeof GlassVirtualTable>;

export const Default: Story = {
  args: {
    children: (
      <div className="glass-glass-glass-p-4 glass-glass-glass-text-center">
        <h3 className="glass-glass-glass-text-lg glass-glass-glass-font-semibold glass-glass-glass-mb-2">GlassVirtualTable</h3>
        <p className="glass-glass-glass-text-sm opacity-80">This is the default glassvirtualtable component.</p>
      </div>
    ),
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="glass-glass-glass-flex glass-glass-glass-flex-wrap glass-glass-glass-gap-4">
      <GlassVirtualTable {...args}>
        Default
      </GlassVirtualTable>
    </div>
  ),
  args: {
    children: null,
  },
};
