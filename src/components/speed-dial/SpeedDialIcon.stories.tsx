import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SpeedDialIcon from './SpeedDialIcon';

const meta: Meta<typeof SpeedDialIcon> = {
  title: 'Components/Speed-dial/SpeedDialIcon',
  component: SpeedDialIcon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism speeddialicon component.',
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
type Story = StoryObj<typeof SpeedDialIcon>;

export const Default: Story = {
  args: {
    
  },
};

export const Variants: Story = {
  render: (args: any) => (
    <div className="flex flex-wrap gap-4">
      <SpeedDialIcon {...args}>
        Default
      </SpeedDialIcon>
    </div>
  ),
  args: {
    
  },
};
