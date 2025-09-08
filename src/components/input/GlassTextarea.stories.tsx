import type { Meta, StoryObj } from '@storybook/react';
import { GlassTextarea } from './GlassTextarea';

const meta: Meta<typeof GlassTextarea> = {
  title: 'Components/Input/GlassTextarea',
  component: GlassTextarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glasstextarea component.',
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
type Story = StoryObj<typeof GlassTextarea>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold mb-2">GlassTextarea</h3>
        <p className="text-sm opacity-80">This is the default glasstextarea component.</p>
      </div>
    ),
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      <GlassTextarea {...args}>
        Default
      </GlassTextarea>
    </div>
  ),
  args: {
    children: null,
  },
};
