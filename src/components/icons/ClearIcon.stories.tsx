import type { Meta, StoryObj } from '@storybook/react';
import ClearIcon from './ClearIcon';
import { fn } from '@storybook/test';

const meta: Meta<typeof ClearIcon> = {
  title: 'Components/Icons/ClearIcon',
  component: ClearIcon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism clearicon component.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'CSS class name',
    },
    size: {
      control: { type: 'number', min: 8, max: 48 },
      description: 'Icon size in pixels',
    },
    color: {
      control: 'color',
      description: 'Icon color',
    },
  },
  args: {
    className: '',
    size: 24,
    color: '#ffffff',
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof ClearIcon>;

export const Default: Story = {
  args: {},
};

export const Variants: Story = {
  render: (args: any) => (
    <div className="flex items-center glass-gap-4">
      <ClearIcon {...args} size={16} />
      <ClearIcon {...args} size={24} />
      <ClearIcon {...args} size={32} />
      <ClearIcon {...args} color="#ff6b6b" />
    </div>
  ),
};
