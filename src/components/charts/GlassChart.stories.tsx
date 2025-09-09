import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GlassChart } from './GlassChart';

const meta: Meta<typeof GlassChart> = {
  title: 'Components/Charts/GlassChart',
  component: GlassChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glasschart component.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'className prop',
    },
  },
  args: {
    className: '',
  },
};

export default meta;
type Story = StoryObj<typeof GlassChart>;

export const Default: Story = {
  args: {},
};

export const Variants: Story = {
  render: (args: any) => (
    <div className="flex flex-wrap gap-4">
      <GlassChart {...args}>
        Default
      </GlassChart>
    </div>
  ),
  args: {
    
  },
};
