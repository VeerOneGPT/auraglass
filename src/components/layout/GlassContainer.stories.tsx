import type { Meta, StoryObj } from '@storybook/react';
import { GlassContainer } from './GlassContainer';

const meta: Meta<typeof GlassContainer> = {
  title: 'Components/Layout/GlassContainer',
  component: GlassContainer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glasscontainer component.',
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
type Story = StoryObj<typeof GlassContainer>;

export const Default: Story = {
  args: {
    
  },
};

export const Variants: Story = {
  render: (args: any) => (
    <div className="flex flex-wrap gap-4">
      <GlassContainer {...args}>
        Default
      </GlassContainer>
    </div>
  ),
  args: {
    
  },
};
