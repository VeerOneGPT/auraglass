import type { Meta, StoryObj } from '@storybook/react';
import { GlassBottomSheet } from './GlassBottomSheet';

const meta: Meta<typeof GlassBottomSheet> = {
  title: 'Components/Modal/GlassBottomSheet',
  component: GlassBottomSheet,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glassbottomsheet component.',
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
type Story = StoryObj<typeof GlassBottomSheet>;

export const Default: Story = {
  args: {
    
  },
};

export const Variants: Story = {
  render: (args: any) => (
    <div className="flex flex-wrap gap-4">
      <GlassBottomSheet {...args}>
        Default
      </GlassBottomSheet>
    </div>
  ),
  args: {
    
  },
};
