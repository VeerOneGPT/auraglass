import type { Meta, StoryObj } from '@storybook/react';
import { GlassModal } from './GlassModal';

const meta: Meta<typeof GlassModal> = {
  title: 'Components/Modal/GlassModal',
  component: GlassModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glassmodal component.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'className prop',
    },
    open: {
      control: 'boolean',
      description: 'open prop',
    },
    title: {
      control: 'text',
      description: 'title prop',
    },
    size: {
      control: { type: 'select' },
      options: ["sm","md","lg"],
      description: 'size prop',
    },
  },
  args: {
    className: '',
    open: false,
    title: 'Modal Title',
    size: 'sm',
  },
};

export default meta;
type Story = StoryObj<typeof GlassModal>;

export const Default: Story = {
  args: {
    
  },
};

export const Variants: Story = {
  render: (args: any) => (
    <div className="flex flex-wrap gap-4">
      <GlassModal {...args}>
        Default
      </GlassModal>
    </div>
  ),
  args: {
    
  },
};
