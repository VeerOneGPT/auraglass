import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChartRenderer } from './ChartRenderer';
import { cn } from '../../../lib/utils';

const meta: Meta<typeof ChartRenderer> = {
  title: 'Components/Components/ChartRenderer',
  component: ChartRenderer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism chartrenderer component.',
      },
    },
  },
  argTypes: {
    chartType: {
      control: { type: 'select' },
      options: ['line', 'bar', 'area', 'pie', 'scatter', 'heatmap', 'radar'],
      description: 'Type of chart to render',
    },
    qualityTier: {
      control: { type: 'select' },
      options: ['low', 'medium', 'high', 'ultra'],
      description: 'Quality tier for rendering',
    },
    glassVariant: {
      control: { type: 'select' },
      options: ['frosted', 'dynamic', 'clear', 'tinted', 'luminous'],
      description: 'Glass morphism variant',
    },
  },
  args: {
    chartType: 'line',
    qualityTier: 'medium',
    glassVariant: 'frosted',
  },
};

export default meta;
type Story = StoryObj<typeof ChartRenderer>;

export const Default: Story = {
  args: {
    chartType: 'line',
    datasets: [{
      label: 'Sample Data',
      data: [10, 20, 15, 25, 30, 20],
      borderColor: '#3b82f6',
      backgroundColor: '/* Use createGlassStyle({ intent: "primary", elevation: "level2" }) */',
    }],
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="glass-glass-flex glass-glass-flex-col glass-glass-gap-4">
      <div className="glass-glass-relative w-80 h-40 bg-gray-900/20 glass-radius-md glass-glass-border glass-glass-p-4">
        <ChartRenderer
          {...args}
          datasets={[{
            label: 'Sample Chart',
            data: [10, 20, 15, 25, 30, 20],
            borderColor: '#3b82f6',
            backgroundColor: '/* Use createGlassStyle({ intent: "primary", elevation: "level2" }) */',
          }]}
        />
      </div>
    </div>
  ),
};
