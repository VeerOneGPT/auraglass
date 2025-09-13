import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BarChart3, LineChart } from 'lucide-react';
import { cn } from '../../lib/utils';
import { GlassChartWidget } from './GlassChartWidget';

const meta: Meta<typeof GlassChartWidget> = {
  title: 'Components/Dashboard/GlassChartWidget',
  component: GlassChartWidget,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glasschartwidget component.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Widget title',
    },
    subtitle: {
      control: 'text',
      description: 'Widget subtitle',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Widget size',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    showActions: {
      control: 'boolean',
      description: 'Show actions menu',
    },
  },
  args: {
    title: 'Chart Widget',
    subtitle: 'Sample chart data',
    size: 'md',
    loading: false,
    showActions: true,
  },
};

export default meta;
type Story = StoryObj<typeof GlassChartWidget>;

export const Default: Story = {
  args: {
    children: (
      <div className="glass-glass-p-4">
        <div className="glass-glass-text-center glass-glass-text-primary/80">
          <BarChart3 className="glass-glass-w-12 glass-glass-h-12 mx-auto glass-glass-mb-4" />
          <p>Sample chart content would go here</p>
        </div>
      </div>
    ),
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="glass-glass-flex glass-glass-flex-col glass-glass-gap-4">
      <GlassChartWidget {...args} size="sm" />
      <GlassChartWidget {...args} size="lg" />
    </div>
  ),
  args: {
    children: (
      <div className="glass-glass-p-2">
        <div className="glass-glass-text-center glass-glass-text-primary/60 glass-glass-text-sm">
          <LineChart className="glass-glass-w-8 glass-glass-h-8 mx-auto glass-glass-mb-2" />
          <p>Chart variants</p>
        </div>
      </div>
    ),
  },
};
