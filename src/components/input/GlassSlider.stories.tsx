import type { Meta, StoryObj } from '@storybook/react';
import { GlassSlider } from './GlassSlider';

const meta: Meta<typeof GlassSlider> = {
  title: 'Components/Input/GlassSlider',
  component: GlassSlider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glassslider component.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'className prop',
    },
    children: {
      control: 'text',
      description: 'children prop',
    },
    disabled: {
      control: 'boolean',
      description: 'disabled prop',
    },
  },
  args: {
    className: '',
    children: '',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof GlassSlider>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold mb-2">GlassSlider</h3>
        <p className="text-sm opacity-80">This is the default glassslider component.</p>
      </div>
    ),
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      <GlassSlider {...args}>
        Default
      </GlassSlider>
    </div>
  ),
  args: {
    children: null,
  },
};
