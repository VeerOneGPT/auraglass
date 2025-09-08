import type { Meta, StoryObj } from '@storybook/react';
import { GlassSelect } from './GlassSelect';

const meta: Meta<typeof GlassSelect> = {
  title: 'Components/Input/GlassSelect',
  component: GlassSelect,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glassselect component.',
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
    placeholder: {
      control: 'text',
      description: 'placeholder prop',
    },
    value: {
      control: 'text',
      description: 'value prop',
    },
    size: {
      control: { type: 'select' },
      options: ["sm","md","lg"],
      description: 'size prop',
    },
  },
  args: {
    className: '',
    children: '',
    disabled: false,
    placeholder: 'Enter text...',
    value: '',
    size: 'sm',
  },
};

export default meta;
type Story = StoryObj<typeof GlassSelect>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold mb-2">GlassSelect</h3>
        <p className="text-sm opacity-80">This is the default glassselect component.</p>
      </div>
    ),
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      <GlassSelect {...args}>
        Default
      </GlassSelect>
    </div>
  ),
  args: {
    children: null,
  },
};
