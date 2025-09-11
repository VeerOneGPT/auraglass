import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GlassPagination } from './GlassPagination';
import { fn } from '@storybook/test';

const meta: Meta<typeof GlassPagination> = {
  title: 'Components/Navigation/GlassPagination',
  component: GlassPagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glasspagination component.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    currentPage: {
      control: 'number',
      description: 'Current page number (1-based)',
    },
    totalPages: {
      control: 'number',
      description: 'Total number of pages',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    showFirstLast: {
      control: 'boolean',
      description: 'Show first/last buttons',
    },
  },
  args: {
    className: '',
    currentPage: 1,
    totalPages: 10,
    size: 'md',
    disabled: false,
    showFirstLast: true,
  },
};

export default meta;
type Story = StoryObj<typeof GlassPagination>;

export const Default: Story = {
  args: {
    onPageChange: fn(),
  },
};

export const LargeDataset: Story = {
  args: {
    currentPage: 5,
    totalPages: 50,
    maxPageButtons: 7,
    onPageChange: fn(),
  },
};

export const SmallSize: Story = {
  args: {
    currentPage: 2,
    totalPages: 8,
    size: 'sm',
    showFirstLast: false,
    onPageChange: fn(),
  },
};
