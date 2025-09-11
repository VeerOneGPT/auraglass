import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GlassWipeSlider } from './GlassWipeSlider';
import { cn } from '@/lib/utils';

const meta: Meta<typeof GlassWipeSlider> = {
  title: 'Components/Website-components/GlassWipeSlider',
  component: GlassWipeSlider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glasswipeslider component.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'className prop',
    },
    initialPosition: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'initial position prop',
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'orientation prop',
    },
  },
  args: {
    className: '',
    initialPosition: 50,
    orientation: 'horizontal',
  },
};

export default meta;
type Story = StoryObj<typeof GlassWipeSlider>;

export const Default: Story = {
  args: {
    beforeContent: (
      <div className="p-8 text-center bg-gradient-to-br from-sky-200/30 to-blue-200/30 dark:from-slate-700/30 dark:to-slate-600/30 glass-radius-lg">
        <h3 className="glass-text-xl font-semibold glass-mb-2">Before</h3>
        <p className="glass-text-sm opacity-80">Initial state content</p>
      </div>
    ),
    afterContent: (
      <div className="p-8 text-center bg-gradient-to-br from-green-500/20 to-blue-500/20 glass-radius-lg">
        <h3 className="glass-text-xl font-semibold glass-mb-2">After</h3>
        <p className="glass-text-sm opacity-80">Final state content</p>
      </div>
    ),
    initialPosition: 50,
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap glass-gap-4">
      <GlassWipeSlider {...args} />
    </div>
  ),
  args: {
    beforeContent: (
      <div className="glass-p-4 text-center bg-red-500/20 glass-radius-md">
        <span className="glass-text-sm">Before</span>
      </div>
    ),
    afterContent: (
      <div className="glass-p-4 text-center bg-green-500/20 glass-radius-md">
        <span className="glass-text-sm">After</span>
      </div>
    ),
    initialPosition: 30,
  },
};
