import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GlassCommandBar } from './GlassCommandBar';

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
        onSelect: () => console.log('Save clicked'),
      },
      {
        id: 'copy',
        label: 'Copy',
        icon: '📋',
        shortcut: 'Ctrl+C',
        onSelect: () => console.log('Copy clicked'),
      },
      {
        id: 'paste',
        label: 'Paste',
        icon: '📄',
        shortcut: 'Ctrl+V',
        onSelect: () => console.log('Paste clicked'),
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
        onSelect: () => console.log('Bold clicked'),
      },
      {
        id: 'italic',
        label: 'Italic',
        icon: '𝐼',
        shortcut: 'Ctrl+I',
        onSelect: () => console.log('Italic clicked'),
      },
      {
        id: 'underline',
        label: 'Underline',
        icon: 'U̲',
        shortcut: 'Ctrl+U',
        onSelect: () => console.log('Underline clicked'),
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
        onSelect: () => console.log('Undo clicked'),
      },
      {
        id: 'redo',
        label: 'Redo',
        icon: '↷',
        shortcut: 'Ctrl+Y',
        onSelect: () => console.log('Redo clicked'),
      },
    ],
  },
};
