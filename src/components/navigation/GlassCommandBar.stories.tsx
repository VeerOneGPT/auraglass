import type { Meta, StoryObj } from '@storybook/react';
import { GlassCommandBar } from './GlassCommandBar';

const meta: Meta<typeof GlassCommandBar> = {
  title: 'Components/Navigation/GlassCommandBar',
  component: GlassCommandBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glasscommandbar component.',
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
type Story = StoryObj<typeof GlassCommandBar>;

export const Default: Story = {
  args: {
    
  },
};

export const Variants: Story = {
  render: (args: any) => (
    <div className="flex flex-wrap gap-4">
      <GlassCommandBar {...args}>
        Default
      </GlassCommandBar>
    </div>
  ),
  args: {
    
  },
};
