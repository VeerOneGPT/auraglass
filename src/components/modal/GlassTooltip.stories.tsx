import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GlassTooltip, GlassTooltipTrigger, GlassTooltipContent } from './GlassTooltip';
import { cn } from '../../lib/utils';

const meta: Meta<typeof GlassTooltip> = {
  title: 'Components/Modal/GlassTooltip',
  component: GlassTooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A sophisticated tooltip component with glass morphism styling and advanced positioning.',
      },
    },
  },
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left', 'auto'],
      description: 'Tooltip position relative to trigger',
    },
    showDelay: {
      control: { type: 'number', min: 0, max: 2000, step: 100 },
      description: 'Delay before showing tooltip (ms)',
    },
    hideDelay: {
      control: { type: 'number', min: 0, max: 2000, step: 100 },
      description: 'Delay before hiding tooltip (ms)',
    },
  },
  args: {
    position: 'top',
    showDelay: 300,
    hideDelay: 100,
  },
};

export default meta;
type Story = StoryObj<typeof GlassTooltip>;

export const Default: Story = {
  render: (args) => (
    <GlassTooltip {...args}>
      <button className="glass-glass-px-4 glass-glass-py-2 glass-surface-primary glass-radius-lg hover:glass-surface-blue/30 transition-colors">
        Hover me
      </button>
    </GlassTooltip>
  ),
  args: {
    content: <p>This is a glass morphism tooltip!</p>
  }
};

export const Positions: Story = {
  render: (args) => (
    <div className="glass-glass-grid glass-glass-glass-grid-cols-2 glass-glass-gap-8 max-w-2xl">
      <GlassTooltip position="top" content="Tooltip on top" showDelay={args.showDelay} hideDelay={args.hideDelay}>
        <button className="glass-glass-px-4 glass-glass-py-2 glass-surface-danger glass-radius-lg">Top</button>
      </GlassTooltip>

      <GlassTooltip position="right" content="Tooltip on right" showDelay={args.showDelay} hideDelay={args.hideDelay}>
        <button className="glass-glass-px-4 glass-glass-py-2 glass-surface-success glass-radius-lg">Right</button>
      </GlassTooltip>

      <GlassTooltip position="bottom" content="Tooltip on bottom" showDelay={args.showDelay} hideDelay={args.hideDelay}>
        <button className="glass-glass-px-4 glass-glass-py-2 glass-surface-primary glass-radius-lg">Bottom</button>
      </GlassTooltip>

      <GlassTooltip position="left" content="Tooltip on left" showDelay={args.showDelay} hideDelay={args.hideDelay}>
        <button className="glass-glass-px-4 glass-glass-py-2 glass-surface-info glass-radius-lg">Left</button>
      </GlassTooltip>
    </div>
  ),
};

export const RichContent: Story = {
  render: (args) => (
    <GlassTooltip {...args}>
      <button className="glass-glass-px-6 glass-glass-py-3 glass-gradient-primary from-sky-200/20 to-blue-200/20 dark:from-slate-700/20 dark:to-slate-600/20 glass-radius-lg glass-glass-font-medium">
        Rich Tooltip
      </button>
    </GlassTooltip>
  ),
  args: {
    content: (
      <div className="glass-glass-gap-2 max-w-xs">
        <div className="glass-glass-font-semibold">Advanced Tooltip</div>
        <p className="glass-glass-text-sm glass-glass-opacity-90">
          This tooltip supports rich content including multiple paragraphs,
          formatting, and even interactive elements.
        </p>
        <div className="glass-glass-flex glass-glass-gap-2 pt-2">
          <span className="glass-glass-px-2 glass-glass-py-1 glass-surface-subtle/20 glass-radius-md glass-glass-text-xs">Feature</span>
          <span className="glass-glass-px-2 glass-glass-py-1 glass-surface-subtle/20 glass-radius-md glass-glass-text-xs">Interactive</span>
        </div>
      </div>
    )
  }
};

// Explicit stories for GlassTooltipTrigger and GlassTooltipContent
export const TooltipComponents: Story = {
  render: (args) => (
    <div className="space-y-6">
      <div className="glass-glass-text-center">
        <h3 className="glass-glass-text-lg glass-glass-font-semibold glass-glass-mb-2">Tooltip Component Examples</h3>
        <p className="glass-glass-text-sm opacity-80">Using GlassTooltipTrigger and GlassTooltipContent explicitly</p>
      </div>

      <div className="glass-glass-flex glass-glass-justify-center glass-glass-gap-4">
        <GlassTooltip content={<p>This tooltip uses explicit GlassTooltipTrigger and GlassTooltipContent components</p>} showDelay={args.showDelay} hideDelay={args.hideDelay}>
          <GlassTooltipTrigger asChild>
            <button className="glass-glass-px-4 glass-glass-py-2 glass-surface-primary glass-radius-lg hover:glass-surface-blue/30 transition-colors">
              Trigger Button
            </button>
          </GlassTooltipTrigger>
          <GlassTooltipContent>
            <p>This tooltip uses explicit GlassTooltipTrigger and GlassTooltipContent components</p>
          </GlassTooltipContent>
        </GlassTooltip>

        <GlassTooltip content={<p>Tooltip positioned to the right</p>} position="right" showDelay={args.showDelay} hideDelay={args.hideDelay}>
          <GlassTooltipTrigger asChild>
            <button className="glass-glass-px-4 glass-glass-py-2 glass-surface-success glass-radius-lg hover:glass-surface-green/30 transition-colors">
              Right Side
            </button>
          </GlassTooltipTrigger>
          <GlassTooltipContent>
            <p>Tooltip positioned to the right</p>
          </GlassTooltipContent>
        </GlassTooltip>
      </div>
    </div>
  ),
  args: {
    children: null,
  },
};

export const CustomTriggerContent: Story = {
  render: (args) => (
    <div className="glass-glass-gap-4">
      <GlassTooltip content={
        <div className="glass-glass-gap-2">
          <div className="glass-glass-font-semibold">Custom Trigger</div>
          <p className="glass-glass-text-sm glass-glass-opacity-90">
            This tooltip uses a custom div element as the trigger instead of a button.
          </p>
        </div>
      } showDelay={args.showDelay} hideDelay={args.hideDelay}>
        <GlassTooltipTrigger asChild>
          <div className="glass-glass-p-3 glass-surface-info glass-radius-lg glass-glass-cursor-pointer hover:bg-purple-500/30 transition-colors">
            <span className="glass-glass-text-sm glass-glass-font-medium">Custom Trigger Element</span>
          </div>
        </GlassTooltipTrigger>
        <GlassTooltipContent>
          <div className="glass-glass-gap-2">
            <div className="glass-glass-font-semibold">Custom Trigger</div>
            <p className="glass-glass-text-sm glass-glass-opacity-90">
              This tooltip uses a custom div element as the trigger instead of a button.
            </p>
          </div>
        </GlassTooltipContent>
      </GlassTooltip>

      <GlassTooltip content={<p>Inline span element as tooltip trigger</p>} position="bottom" showDelay={args.showDelay} hideDelay={args.hideDelay}>
        <GlassTooltipTrigger asChild>
          <span className="inline-glass-glass-block glass-glass-px-2 glass-glass-py-1 bg-orange-500/20 glass-radius-md glass-glass-cursor-pointer hover:bg-orange-500/30 transition-colors glass-glass-text-sm">
            Hover me
          </span>
        </GlassTooltipTrigger>
        <GlassTooltipContent>
          <p>Inline span element as tooltip trigger</p>
        </GlassTooltipContent>
      </GlassTooltip>
    </div>
  ),
  args: {
    children: null,
  },
};