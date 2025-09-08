import type { Meta, StoryObj } from '@storybook/react';
import { GlassDashboard } from './GlassDashboard';

const meta: Meta<typeof GlassDashboard> = {
  title: 'Components/Dashboard/GlassDashboard',
  component: GlassDashboard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glassdashboard component.',
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
type Story = StoryObj<typeof GlassDashboard>;

export const Default: Story = {
  args: {
    
  },
};

export const Variants: Story = {
  render: (args: any) => (
    <div className="flex flex-wrap gap-4">
      <GlassDashboard {...args}>
        Default
      </GlassDashboard>
    </div>
  ),
  args: {
    
  },
};
