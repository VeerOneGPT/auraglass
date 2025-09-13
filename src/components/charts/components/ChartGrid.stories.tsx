import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChartGrid } from './ChartGrid';
import { cn } from '../../../lib/utils';

const meta: Meta<typeof ChartGrid> = {
  title: 'Components/Components/ChartGrid',
  component: ChartGrid,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism chartgrid component.',
      },
    },
  },
  argTypes: {
    show: {
      control: 'boolean',
      description: 'Show grid lines',
    },
    style: {
      control: { type: 'select' },
      options: ['solid', 'dashed', 'dotted'],
      description: 'Grid line style',
    },
    horizontal: {
      control: 'boolean',
      description: 'Show horizontal lines',
    },
    vertical: {
      control: 'boolean',
      description: 'Show vertical lines',
    },
  },
  args: {
    show: true,
    style: 'solid',
    horizontal: true,
    vertical: true,
  },
};

export default meta;
type Story = StoryObj<typeof ChartGrid>;

export const Default: Story = {
  args: {
    show: true,
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="glass-glass-flex glass-glass-flex-col glass-glass-gap-4">
      <div className="glass-glass-relative w-80 h-40 bg-gray-900/20 glass-radius-md glass-glass-border">
        <ChartGrid {...args} />
        <div className="glass-glass-absolute glass-glass-inset-0 glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-text-primary/50">
          Grid Example
        </div>
      </div>
    </div>
  ),
};
