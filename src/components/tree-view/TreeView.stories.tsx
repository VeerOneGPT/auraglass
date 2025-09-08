import type { Meta, StoryObj } from '@storybook/react';
import { TreeView } from './TreeView';

const meta: Meta<typeof TreeView> = {
  title: 'Components/Tree-view/TreeView',
  component: TreeView,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism treeview component.',
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
type Story = StoryObj<typeof TreeView>;

export const Default: Story = {
  args: {
    
  },
};

export const Variants: Story = {
  render: (args: any) => (
    <div className="flex flex-wrap gap-4">
      <TreeView {...args}>
        Default
      </TreeView>
    </div>
  ),
  args: {
    
  },
};
