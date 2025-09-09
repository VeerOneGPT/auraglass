import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GlassCommand } from './GlassCommand';

const meta: Meta<typeof GlassCommand> = {
  title: 'Components/Interactive/GlassCommand',
  component: GlassCommand,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glasscommand component.',
      },
    },
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for search input',
    },
    emptyMessage: {
      control: 'text',
      description: 'Empty state message',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    maxHeight: {
      control: 'text',
      description: 'Maximum height of the command list',
    },
  },
  args: {
    placeholder: 'Type a command or search...',
    emptyMessage: 'No results found',
    loading: false,
    maxHeight: '300px',
  },
};

export default meta;
type Story = StoryObj<typeof GlassCommand>;

export const Default: Story = {
  args: {
    items: [
      {
        id: '1',
        label: 'Create new file',
        description: 'Create a new file in the current directory',
        action: () => console.log('Create new file'),
        group: 'File',
      },
      {
        id: '2',
        label: 'Open file',
        description: 'Open an existing file',
        action: () => console.log('Open file'),
        group: 'File',
      },
      {
        id: '3',
        label: 'Search',
        description: 'Search for files and content',
        action: () => console.log('Search'),
        group: 'Navigation',
      },
      {
        id: '4',
        label: 'Settings',
        description: 'Open application settings',
        action: () => console.log('Settings'),
        group: 'Application',
      },
    ],
  },
};

export const WithGroups: Story = {
  args: {
    items: [
      {
        id: '1',
        label: 'New Document',
        action: () => console.log('New Document'),
        group: 'File Operations',
      },
      {
        id: '2',
        label: 'Open Recent',
        action: () => console.log('Open Recent'),
        group: 'File Operations',
      },
      {
        id: '3',
        label: 'Save',
        action: () => console.log('Save'),
        group: 'File Operations',
      },
      {
        id: '4',
        label: 'Cut',
        action: () => console.log('Cut'),
        group: 'Edit',
      },
      {
        id: '5',
        label: 'Copy',
        action: () => console.log('Copy'),
        group: 'Edit',
      },
      {
        id: '6',
        label: 'Paste',
        action: () => console.log('Paste'),
        group: 'Edit',
      },
    ],
  },
};
