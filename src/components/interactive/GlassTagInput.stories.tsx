import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GlassTagInput } from './GlassTagInput';
import { fn } from '@storybook/test';

const meta: Meta<typeof GlassTagInput> = {
  title: 'Components/Interactive/GlassTagInput',
  component: GlassTagInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glasstaginput component.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
  args: {
    className: '',
    placeholder: 'Add tag…',
  },
};

export default meta;
type Story = StoryObj<typeof GlassTagInput>;

export const Default: Story = {
  args: {
    value: ['react', 'typescript'],
    onChange: fn(),
    suggestions: ['javascript', 'python', 'css', 'html', 'node.js', 'express'],
  },
};

export const WithManyTags: Story = {
  args: {
    value: ['urgent', 'frontend', 'bug', 'high-priority', 'ui', 'mobile'],
    onChange: fn(),
    placeholder: 'Add more tags...',
  },
};
