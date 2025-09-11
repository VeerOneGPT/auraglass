import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { GlassCommandBar } from './GlassCommandBar';
import { cn } from '@/lib/utils';

const meta: Meta<typeof GlassCommandBar> = {
  title: 'Components/Navigation/GlassCommandBar',
  component: GlassCommandBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glasscommandbar component.',
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
type Story = StoryObj<typeof GlassCommandBar>;

export const Default: Story = {
  args: {
    items: [
      {
        id: 'save',
        label: 'Save',
        icon: '💾',
        shortcut: 'Ctrl+S',
        onSelect: fn(),
      },
      {
        id: 'copy',
        label: 'Copy',
        icon: '📋',
        shortcut: 'Ctrl+C',
        onSelect: fn(),
      },
      {
        id: 'paste',
        label: 'Paste',
        icon: '📄',
        shortcut: 'Ctrl+V',
        onSelect: fn(),
      },
    ],
  },
};

export const WithDisabledItem: Story = {
  args: {
    items: [
      {
        id: 'bold',
        label: 'Bold',
        icon: '𝐁',
        shortcut: 'Ctrl+B',
        onSelect: fn(),
      },
      {
        id: 'italic',
        label: 'Italic',
        icon: '𝐼',
        shortcut: 'Ctrl+I',
        onSelect: fn(),
      },
      {
        id: 'underline',
        label: 'Underline',
        icon: 'U̲',
        shortcut: 'Ctrl+U',
        onSelect: fn(),
        disabled: true,
      },
    ],
  },
};

export const TopPosition: Story = {
  args: {
    position: 'top',
    items: [
      {
        id: 'undo',
        label: 'Undo',
        icon: '↶',
        shortcut: 'Ctrl+Z',
        onSelect: fn(),
      },
      {
        id: 'redo',
        label: 'Redo',
        icon: '↷',
        shortcut: 'Ctrl+Y',
        onSelect: fn(),
      },
    ],
  },
};
