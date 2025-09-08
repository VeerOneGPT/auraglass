import type { Meta, StoryObj } from '@storybook/react';
import { TreeItem } from './TreeItem';

const meta: Meta<typeof TreeItem> = {
  title: 'Components/Tree-view/TreeItem',
  component: TreeItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism treeitem component.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'className prop',
    },
    children: {
      control: 'text',
      description: 'children prop',
    },
    disabled: {
      control: 'boolean',
      description: 'disabled prop',
    },
  },
  args: {
    className: '',
    children: '',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof TreeItem>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold mb-2">TreeItem</h3>
        <p className="text-sm opacity-80">This is the default treeitem component.</p>
      </div>
    ),
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      <TreeItem {...args}>
        Default
      </TreeItem>
    </div>
  ),
  args: {
    children: null,
  },
};
