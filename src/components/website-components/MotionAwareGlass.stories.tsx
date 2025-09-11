import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MotionAwareGlass } from './MotionAwareGlass';
import { cn } from '@/lib/utils';

const meta: Meta<typeof MotionAwareGlass> = {
  title: 'Components/Website-components/MotionAwareGlass',
  component: MotionAwareGlass,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism motionawareglass component.',
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
type Story = StoryObj<typeof MotionAwareGlass>;

export const Default: Story = {
  args: {
    children: (
      <div className="glass-p-4 text-center">
        <h3 className="glass-text-lg font-semibold glass-mb-2">MotionAwareGlass</h3>
        <p className="glass-text-sm opacity-80">This is the default motionawareglass component.</p>
      </div>
    ),
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap glass-gap-4">
      <MotionAwareGlass {...args}>
        Default
      </MotionAwareGlass>
    </div>
  ),
  args: {
    children: null,
  },
};
