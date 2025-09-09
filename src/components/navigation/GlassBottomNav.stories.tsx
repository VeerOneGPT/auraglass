import type { Meta, StoryObj } from '@storybook/react';
import { GlassBottomNav } from './GlassBottomNav';
import React from 'react';

// Sample navigation items for stories
const sampleNavItems = [
  {
    id: 'home',
    label: 'Home',
    icon: <span>🏠</span>,
    activeIcon: <span>🏡</span>,
  },
  {
    id: 'search',
    label: 'Search',
    icon: <span>🔍</span>,
    activeIcon: <span>🔎</span>,
  },
  {
    id: 'favorites',
    label: 'Favorites',
    icon: <span>❤️</span>,
    activeIcon: <span>💖</span>,
    badge: '3',
    badgeVariant: 'error' as const,
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <span>👤</span>,
    activeIcon: <span>🙋‍♂️</span>,
  },
];

const meta: Meta<typeof GlassBottomNav> = {
  title: 'Components/Navigation/GlassBottomNav',
  component: GlassBottomNav,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism bottom navigation component with customizable items, variants, and interactive states.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'floating', 'minimal'],
      description: 'Navigation variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Navigation size',
    },
    showLabels: {
      control: 'boolean',
      description: 'Whether to show navigation labels',
    },
    labelPosition: {
      control: 'select',
      options: ['below', 'beside'],
      description: 'Position of labels relative to icons',
    },
    sticky: {
      control: 'boolean',
      description: 'Whether navigation is sticky',
    },
    safeArea: {
      control: 'boolean',
      description: 'Whether to add safe area padding',
    },
    activeId: {
      control: 'select',
      options: ['home', 'search', 'favorites', 'profile'],
      description: 'Currently active navigation item',
    },
  },
};

export default meta;
type Story = StoryObj<typeof GlassBottomNav>;

export const Default: Story = {
  args: {
    items: sampleNavItems,
    activeId: 'home',
    variant: 'default',
    size: 'md',
    showLabels: true,
    labelPosition: 'below',
    sticky: false,
    safeArea: false,
  },
};

export const Floating: Story = {
  args: {
    items: sampleNavItems,
    activeId: 'search',
    variant: 'floating',
    size: 'md',
    showLabels: true,
    labelPosition: 'below',
    sticky: false,
    safeArea: false,
  },
};

export const Minimal: Story = {
  args: {
    items: sampleNavItems,
    activeId: 'favorites',
    variant: 'minimal',
    size: 'md',
    showLabels: true,
    labelPosition: 'below',
    sticky: false,
    safeArea: false,
  },
};

export const WithoutLabels: Story = {
  args: {
    items: sampleNavItems,
    activeId: 'profile',
    variant: 'default',
    size: 'md',
    showLabels: false,
    sticky: false,
    safeArea: false,
  },
};

export const LargeSize: Story = {
  args: {
    items: sampleNavItems,
    activeId: 'home',
    variant: 'default',
    size: 'lg',
    showLabels: true,
    labelPosition: 'below',
    sticky: false,
    safeArea: false,
  },
};
