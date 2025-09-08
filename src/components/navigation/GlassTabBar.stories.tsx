import type { Meta, StoryObj } from '@storybook/react';
import { GlassTabBar } from './GlassTabBar';

const meta: Meta<typeof GlassTabBar> = {
  title: 'Components/Navigation/GlassTabBar',
  component: GlassTabBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glasstabbar component.',
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
    className: '',
  },
};

export default meta;
type Story = StoryObj<typeof GlassTabBar>;

export const Default: Story = {
  args: {
    tabs: [
      { id: 'tab1', label: 'Home', icon: '🏠' },
      { id: 'tab2', label: 'Dashboard', icon: '📊' },
      { id: 'tab3', label: 'Settings', icon: '⚙️' },
    ],
    onChange: (event, index) => console.log('Tab changed:', index),
    activeTab: 0,
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      <GlassTabBar {...args} />
    </div>
  ),
  args: {
    tabs: [
      { id: 'tab1', label: 'Home', icon: '🏠' },
      { id: 'tab2', label: 'Dashboard', icon: '📊' },
    ],
    onChange: (event, index) => console.log('Tab changed:', index),
    activeTab: 0,
  },
};
