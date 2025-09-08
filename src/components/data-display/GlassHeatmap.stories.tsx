import type { Meta, StoryObj } from '@storybook/react';
import { GlassHeatmap } from './GlassHeatmap';

const meta: Meta<typeof GlassHeatmap> = {
  title: 'Components/Data-display/GlassHeatmap',
  component: GlassHeatmap,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glassheatmap component.',
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
type Story = StoryObj<typeof GlassHeatmap>;

export const Default: Story = {
  args: {
    data: [
      [{ value: 1, label: 'A1' }, { value: 2, label: 'A2' }, { value: 3, label: 'A3' }],
      [{ value: 4, label: 'B1' }, { value: 5, label: 'B2' }, { value: 6, label: 'B3' }],
      [{ value: 7, label: 'C1' }, { value: 8, label: 'C2' }, { value: 9, label: 'C3' }]
    ],
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      <GlassHeatmap {...args} />
    </div>
  ),
  args: {
    data: [
      [{ value: 1, label: 'A1' }, { value: 2, label: 'A2' }],
      [{ value: 3, label: 'B1' }, { value: 4, label: 'B2' }]
    ],
  },
};
