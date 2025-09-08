import type { Meta, StoryObj } from '@storybook/react';
import { GlassCheckbox } from './GlassCheckbox';

const meta: Meta<typeof GlassCheckbox> = {
  title: 'Components/Input/GlassCheckbox',
  component: GlassCheckbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glasscheckbox component.',
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
type Story = StoryObj<typeof GlassCheckbox>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold mb-2">GlassCheckbox</h3>
        <p className="text-sm opacity-80">This is the default glasscheckbox component.</p>
      </div>
    ),
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      <GlassCheckbox {...args}>
        Default
      </GlassCheckbox>
    </div>
  ),
  args: {
    children: null,
  },
};
