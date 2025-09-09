import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GlassNavigation } from './GlassNavigation';

const meta: Meta<typeof GlassNavigation> = {
  title: 'Components/Navigation/GlassNavigation',
  component: GlassNavigation,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glassnavigation component.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Navigation position',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'minimal', 'prominent', 'standard'],
      description: 'Navigation variant',
    },
    compact: {
      control: 'boolean',
      description: 'Compact mode',
    },
    showLabels: {
      control: 'boolean',
      description: 'Show item labels',
    },
  },
  args: {
    className: '',
    position: 'top',
    variant: 'default',
    compact: false,
    showLabels: true,
  },
};

export default meta;
type Story = StoryObj<typeof GlassNavigation>;

export const Default: Story = {
  args: {
    items: [
      {
        key: 'home',
        label: 'Home',
        icon: '🏠',
        path: '/',
      },
      {
        key: 'dashboard',
        label: 'Dashboard',
        icon: '📊',
        path: '/dashboard',
      },
      {
        key: 'settings',
        label: 'Settings',
        icon: '⚙️',
        path: '/settings',
      },
    ],
  },
};

export const WithSubmenu: Story = {
  args: {
    items: [
      {
        key: 'home',
        label: 'Home',
        icon: '🏠',
        path: '/',
      },
      {
        key: 'projects',
        label: 'Projects',
        icon: '📁',
        children: [
          {
            key: 'project1',
            label: 'Project Alpha',
            path: '/projects/alpha',
          },
          {
            key: 'project2',
            label: 'Project Beta',
            path: '/projects/beta',
          },
        ],
      },
      {
        key: 'settings',
        label: 'Settings',
        icon: '⚙️',
        path: '/settings',
      },
    ],
  },
};

export const VerticalNavigation: Story = {
  args: {
    position: 'left',
    items: [
      {
        key: 'home',
        label: 'Home',
        icon: '🏠',
        path: '/',
      },
      {
        key: 'analytics',
        label: 'Analytics',
        icon: '📈',
        path: '/analytics',
      },
      {
        key: 'users',
        label: 'Users',
        icon: '👥',
        path: '/users',
      },
      {
        key: 'settings',
        label: 'Settings',
        icon: '⚙️',
        path: '/settings',
      },
    ],
  },
};
