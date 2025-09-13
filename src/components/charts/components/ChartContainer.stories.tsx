import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChartContainer } from './ChartContainer';
import { cn } from '../../../lib/utils';

const meta: Meta<typeof ChartContainer> = {
  title: 'Components/Components/ChartContainer',
  component: ChartContainer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism chartcontainer component.',
      },
    },
  },
  argTypes: {
    // Component-specific argTypes will be added here
  },
  args: {
    // Default args will be added here
  },
};

export default meta;
type Story = StoryObj<typeof ChartContainer>;

export const Default: Story = {
  args: {
    children: (
      <div className="glass-glass-p-4 glass-glass-text-center">
        <h3 className="glass-glass-text-lg glass-glass-font-semibold glass-glass-mb-2">ChartContainer</h3>
        <p className="glass-glass-text-sm opacity-80">This is the default chartcontainer component.</p>
      </div>
    ),
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="glass-glass-flex glass-glass-flex-wrap glass-glass-gap-4">
      <ChartContainer {...args}>
        Default
      </ChartContainer>
    </div>
  ),
  args: {
    children: null,
  },
};
