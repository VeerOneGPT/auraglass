import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GlassHoverCard } from './GlassHoverCard';
import { cn } from '@/lib/utils';
import { Info, User, Settings } from 'lucide-react';

const meta: Meta<typeof GlassHoverCard> = {
  title: 'Components/Modal/GlassHoverCard',
  component: GlassHoverCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glassmorphism hover card that appears on hover with smooth animations and glass effects.',
      },
    },
  },
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left', 'top-start', 'top-end', 'right-start', 'right-end', 'bottom-start', 'bottom-end', 'left-start', 'left-end'],
      description: 'Position of the hover card relative to trigger',
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end'],
      description: 'Alignment of the hover card',
    },
    offset: {
      control: 'number',
      description: 'Offset from trigger element in pixels',
    },
    showDelay: {
      control: 'number',
      description: 'Delay before showing the card (ms)',
    },
    hideDelay: {
      control: 'number',
      description: 'Delay before hiding the card (ms)',
    },
    maxWidth: {
      control: 'text',
      description: 'Maximum width of the hover card',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the card',
    },
    triggerClassName: {
      control: 'text',
      description: 'Additional CSS classes for the trigger',
    },
  },
  args: {
    placement: 'top',
    align: 'center',
    offset: 8,
    showDelay: 300,
    hideDelay: 100,
    maxWidth: '300px',
  },
};

export default meta;
type Story = StoryObj<typeof GlassHoverCard>;

export const Default: Story = {
  args: {
    children: (
      <button className="glass-px-4 glass-py-2 bg-blue-500/20 backdrop-blur-md border border-white/20 glass-radius-lg hover:bg-blue-500/30 transition-colors">
        Hover me
      </button>
    ),
    content: (
      <div className="glass-p-4">
        <h3 className="font-semibold glass-mb-2">Default Hover Card</h3>
        <p className="glass-text-sm opacity-80">
          This is a basic hover card with glassmorphism effects.
        </p>
      </div>
    ),
  },
};

export const Placements: Story = {
  render: (args) => (
    <div className="grid grid-cols-3 gap-8 p-8">
      <GlassHoverCard
        {...args}
        placement="top"
        content={<div className="glass-p-3"><Info className="w-4 h-4 inline glass-mr-2" />Top placement</div>}
      >
        <button className="glass-px-3 glass-py-2 bg-white/10 backdrop-blur-md border border-white/20 glass-radius-md hover:bg-white/20 transition-colors">
          Top
        </button>
      </GlassHoverCard>

      <GlassHoverCard
        {...args}
        placement="right"
        content={<div className="glass-p-3"><Info className="w-4 h-4 inline glass-mr-2" />Right placement</div>}
      >
        <button className="glass-px-3 glass-py-2 bg-white/10 backdrop-blur-md border border-white/20 glass-radius-md hover:bg-white/20 transition-colors">
          Right
        </button>
      </GlassHoverCard>

      <GlassHoverCard
        {...args}
        placement="bottom"
        content={<div className="glass-p-3"><Info className="w-4 h-4 inline glass-mr-2" />Bottom placement</div>}
      >
        <button className="glass-px-3 glass-py-2 bg-white/10 backdrop-blur-md border border-white/20 glass-radius-md hover:bg-white/20 transition-colors">
          Bottom
        </button>
      </GlassHoverCard>

      <GlassHoverCard
        {...args}
        placement="left"
        content={<div className="glass-p-3"><Info className="w-4 h-4 inline glass-mr-2" />Left placement</div>}
      >
        <button className="glass-px-3 glass-py-2 bg-white/10 backdrop-blur-md border border-white/20 glass-radius-md hover:bg-white/20 transition-colors">
          Left
        </button>
      </GlassHoverCard>

      <GlassHoverCard
        {...args}
        placement="top-start"
        content={<div className="glass-p-3"><Info className="w-4 h-4 inline glass-mr-2" />Top start</div>}
      >
        <button className="glass-px-3 glass-py-2 bg-white/10 backdrop-blur-md border border-white/20 glass-radius-md hover:bg-white/20 transition-colors">
          Top-Start
        </button>
      </GlassHoverCard>

      <GlassHoverCard
        {...args}
        placement="bottom-end"
        content={<div className="glass-p-3"><Info className="w-4 h-4 inline glass-mr-2" />Bottom end</div>}
      >
        <button className="glass-px-3 glass-py-2 bg-white/10 backdrop-blur-md border border-white/20 glass-radius-md hover:bg-white/20 transition-colors">
          Bottom-End
        </button>
      </GlassHoverCard>
    </div>
  ),
};

export const WithRichContent: Story = {
  args: {
    children: (
      <div className="flex items-center glass-gap-3 glass-p-3 bg-gradient-to-r from-sky-200/20 to-blue-200/20 dark:from-slate-700/20 dark:to-slate-600/20 backdrop-blur-md border border-white/20 glass-radius-lg cursor-pointer hover:from-sky-200/30 hover:to-blue-200/30 dark:hover:from-slate-700/30 dark:hover:to-slate-600/30 transition-all">
        <User className="w-5 h-5" />
        <div>
          <div className="font-medium">John Doe</div>
          <div className="glass-text-sm opacity-70">Software Engineer</div>
        </div>
      </div>
    ),
    content: (
      <div className="glass-p-4 max-w-xs">
        <div className="flex items-center glass-gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-sky-300 to-blue-400 dark:from-slate-600 dark:to-slate-500 glass-radius-full flex items-center justify-center">
            <User className="w-5 h-5 glass-text-primary" />
          </div>
          <div>
            <h4 className="font-semibold">John Doe</h4>
            <p className="glass-text-sm opacity-80">Software Engineer</p>
          </div>
        </div>
        <div className="glass-gap-2">
          <div className="flex items-center glass-gap-2 glass-text-sm">
            <Settings className="w-4 h-4" />
            <span>5 years experience</span>
          </div>
          <div className="flex items-center glass-gap-2 glass-text-sm">
            <Info className="w-4 h-4" />
            <span>React, TypeScript, Node.js</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-white/20">
          <button className="w-full glass-px-3 glass-py-1 bg-white/20 hover:bg-white/30 glass-radius-md glass-text-sm transition-colors">
            View Profile
          </button>
        </div>
      </div>
    ),
    placement: 'right',
    offset: 12,
  },
};

export const WithDelay: Story = {
  args: {
    children: (
      <button className="glass-px-4 glass-py-2 bg-green-500/20 backdrop-blur-md border border-white/20 glass-radius-lg hover:bg-green-500/30 transition-colors">
        Hover with delay
      </button>
    ),
    content: (
      <div className="glass-p-3">
        <p className="glass-text-sm">This card appears after a 500ms delay and stays for 300ms after hover ends.</p>
      </div>
    ),
    showDelay: 500,
    hideDelay: 300,
  },
};
