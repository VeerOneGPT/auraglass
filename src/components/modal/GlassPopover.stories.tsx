import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GlassPopover } from './GlassPopover';
import { cn } from '../../lib/utils';

const meta: Meta<typeof GlassPopover> = {
  title: 'Components/Modal/GlassPopover',
  component: GlassPopover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glasspopover component.',
      },
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the popover is open',
    },
    placement: {
      control: { type: 'select' },
      options: ['top', 'top-start', 'top-end', 'right', 'right-start', 'right-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end'],
      description: 'Popover placement',
    },
    trigger: {
      control: { type: 'select' },
      options: ['click', 'hover', 'focus', 'manual'],
      description: 'Trigger type',
    },
    showArrow: {
      control: 'boolean',
      description: 'Show arrow',
    },
    animation: {
      control: { type: 'select' },
      options: ['fade', 'scale', 'slide'],
      description: 'Animation preset',
    },
  },
  args: {
    open: true,
    placement: 'bottom',
    trigger: 'click',
    showArrow: true,
    animation: 'fade',
  },
};

export default meta;
type Story = StoryObj<typeof GlassPopover>;

export const Default: Story = {
  args: {
    content: (
      <div className="glass-glass-p-4">
        <h3 className="glass-glass-font-semibold glass-glass-mb-2">Popover Content</h3>
        <p className="glass-glass-text-sm">This is the content inside the popover.</p>
        <button className="glass-mt-2 glass-glass-px-3 glass-glass-py-1 glass-surface-blue glass-glass-text-primary glass-radius-md glass-glass-text-sm">
          Action
        </button>
      </div>
    ),
    children: (
      <button className="glass-glass-px-4 glass-glass-py-2 glass-surface-blue glass-glass-text-primary glass-radius-md">
        Click me
      </button>
    ),
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Settings',
    description: 'Configure your preferences',
    content: (
      <div className="glass-glass-p-4 glass-glass-gap-3">
        <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-between">
          <span className="glass-glass-text-sm">Notifications</span>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-between">
          <span className="glass-glass-text-sm">Dark Mode</span>
          <input type="checkbox" />
        </div>
        <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-between">
          <span className="glass-glass-text-sm">Auto-save</span>
          <input type="checkbox" defaultChecked />
        </div>
      </div>
    ),
    children: (
      <button className="glass-glass-px-4 glass-glass-py-2 bg-gray-500 glass-glass-text-primary glass-radius-md">
        Settings
      </button>
    ),
    placement: 'top-start',
  },
};
