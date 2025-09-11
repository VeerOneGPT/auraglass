import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GlassSwitch } from './GlassSwitch';

const meta: Meta<typeof GlassSwitch> = {
  title: 'Components/Input/GlassSwitch',
  component: GlassSwitch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glassswitch component.',
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
type Story = StoryObj<typeof GlassSwitch>;

export const Default: Story = {
  args: {
    children: (
      <div className="glass-p-4 text-center">
        <h3 className="glass-text-lg font-semibold glass-mb-2">GlassSwitch</h3>
        <p className="glass-text-sm opacity-80">This is the default glassswitch component.</p>
      </div>
    ),
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap glass-gap-4">
      <GlassSwitch {...args}>
        Default
      </GlassSwitch>
    </div>
  ),
  args: {
    children: null,
  },
};
