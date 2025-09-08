import type { Meta, StoryObj } from '@storybook/react';
import { GlassChartsDemo } from './GlassChartsDemo';

const meta: Meta<typeof GlassChartsDemo> = {
  title: 'Components/Website-components/GlassChartsDemo',
  component: GlassChartsDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glasschartsdemo component.',
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
type Story = StoryObj<typeof GlassChartsDemo>;

export const Default: Story = {
  args: {
    
  },
};

export const Variants: Story = {
  render: (args: any) => (
    <div className="flex flex-wrap gap-4">
      <GlassChartsDemo {...args}>
        Default
      </GlassChartsDemo>
    </div>
  ),
  args: {
    
  },
};
