import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { GlassTabBar } from './GlassTabBar';
import { useParallax } from '../../hooks/useParallax';
import { fn } from '@storybook/test';

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
    onChange: fn(),
    activeTab: 0,
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap glass-gap-4">
      <GlassTabBar {...args} />
    </div>
  ),
  args: {
    tabs: [
      { id: 'tab1', label: 'Home', icon: '🏠' },
      { id: 'tab2', label: 'Dashboard', icon: '📊' },
    ],
    onChange: fn(),
    activeTab: 0,
  },
};

export const ParallaxContainer: Story = {
  render: (args) => {
    const { ref, onMouseMove, onMouseLeave } = useParallax<HTMLDivElement>(6);
    return (
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          perspective: 800,
          padding: 24,
          borderRadius: 16,
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.15)'
        }}
      >
        <GlassTabBar {...args} />
      </div>
    );
  },
  args: {
    tabs: [
      { id: 'tab1', label: 'Overview', icon: '✨' },
      { id: 'tab2', label: 'Stats', icon: '📈' },
      { id: 'tab3', label: 'Settings', icon: '⚙️' },
    ],
    onChange: fn(),
    activeTab: 0,
  },
};
