import type { Meta, StoryObj } from '@storybook/react';
import { GlassBottomNav } from './GlassBottomNav';

const meta: Meta<typeof GlassBottomNav> = {
  title: 'Components/Navigation/GlassBottomNav',
  component: GlassBottomNav,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glassbottomnav component.',
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
type Story = StoryObj<typeof GlassBottomNav>;

export const Default: Story = {
  args: {
    
  },
};

export const Variants: Story = {
  render: (args: any) => (
    <div className="flex flex-wrap gap-4">
      <GlassBottomNav {...args}>
        Default
      </GlassBottomNav>
    </div>
  ),
  args: {
    
  },
};
