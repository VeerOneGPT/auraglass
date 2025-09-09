import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BasicCard as CardPatterns } from './patterns';

const meta: Meta<typeof CardPatterns> = {
  title: 'Glass Components/Card/Patterns',
  component: CardPatterns,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a0a0a' },
        { name: 'glass', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithGlassEffect: Story = {
  args: {
    intent: 'primary',
    elevation: 'level2',
  },
};
