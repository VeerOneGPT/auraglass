import type { Meta, StoryObj } from '@storybook/react';
import { GlassFab } from './GlassFab';

const meta: Meta<typeof GlassFab> = {
  title: 'Components/Button/GlassFab',
  component: GlassFab,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glassfab component.',
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
type Story = StoryObj<typeof GlassFab>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold mb-2">GlassFab</h3>
        <p className="text-sm opacity-80">This is the default glassfab component.</p>
      </div>
    ),
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      <GlassFab {...args}>
        Default
      </GlassFab>
    </div>
  ),
  args: {
    children: null,
  },
};
