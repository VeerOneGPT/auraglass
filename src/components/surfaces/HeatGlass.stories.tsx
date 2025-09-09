import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import HeatGlass from './HeatGlass';

const meta: Meta<typeof HeatGlass> = {
  title: 'Components/Surfaces/HeatGlass',
  component: HeatGlass,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism heatglass component.',
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
    className: ''
  },
};

export default meta;
type Story = StoryObj<typeof HeatGlass>;

export const Default: Story = {
  args: {
    
  },
};

export const Variants: Story = {
  render: (args: any) => (
    <div className="flex flex-wrap gap-4">
      <HeatGlass {...args}>
        Default
      </HeatGlass>
    </div>
  ),
  args: {
    
  },
};
