import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TabItem from './TabItem';

const meta: Meta<typeof TabItem> = {
  title: 'Components/Components/TabItem',
  component: TabItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism tabitem component.',
      },
    },
  },
  argTypes: {
  },
  args: {
  },
};

export default meta;
type Story = StoryObj<typeof TabItem>;

export const Default: Story = {
  args: {
    
  },
};

export const Variants: Story = {
  render: (args: any) => (
    <div className="flex flex-wrap gap-4">
      <TabItem {...args}>
        Default
      </TabItem>
    </div>
  ),
  args: {
    
  },
};
