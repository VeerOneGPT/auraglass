import type { Meta, StoryObj } from '@storybook/react';
import { GlassLineChart } from './GlassLineChart';

const meta: Meta<typeof GlassLineChart> = {
  title: 'Components/Charts/GlassLineChart',
  component: GlassLineChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glasslinechart component.',
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
type Story = StoryObj<typeof GlassLineChart>;

export const Default: Story = {
  args: {},
};

export const Variants: Story = {
  render: (args: any) => (
    <div className="flex flex-wrap gap-4">
      <GlassLineChart {...args}>
        Default
      </GlassLineChart>
    </div>
  ),
  args: {
    
  },
};
