import type { Meta, StoryObj } from '@storybook/react';
import { ChartWidget } from './ChartWidget';

const meta: Meta<typeof ChartWidget> = {
  title: 'Components/Widgets/ChartWidget',
  component: ChartWidget,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism chartwidget component.',
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
type Story = StoryObj<typeof ChartWidget>;

export const Default: Story = {
  args: {
    
  },
};

export const Variants: Story = {
  render: (args: any) => (
    <div className="flex flex-wrap gap-4">
      <ChartWidget {...args}>
        Default
      </ChartWidget>
    </div>
  ),
  args: {
    
  },
};
