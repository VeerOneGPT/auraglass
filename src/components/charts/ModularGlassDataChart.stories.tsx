import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ModularGlassDataChart } from './ModularGlassDataChart';

const meta: Meta<typeof ModularGlassDataChart> = {
  title: 'Components/Charts/ModularGlassDataChart',
  component: ModularGlassDataChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism modularglassdatachart component.',
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
type Story = StoryObj<typeof ModularGlassDataChart>;

export const Default: Story = {
  args: {},
};

export const Variants: Story = {
  render: (args: any) => (
    <div className="flex flex-wrap gap-4">
      <ModularGlassDataChart {...args}>
        Default
      </ModularGlassDataChart>
    </div>
  ),
  args: {
    
  },
};
