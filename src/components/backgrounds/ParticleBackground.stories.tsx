import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ParticleBackground from './ParticleBackground';
import { cn } from '../../lib/utils';

const meta: Meta<typeof ParticleBackground> = {
  title: 'Components/Backgrounds/ParticleBackground',
  component: ParticleBackground,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism particlebackground component.',
      },
    },
  },
  argTypes: {
    // Component-specific argTypes will be added here
  },
  args: {
    // Default args will be added here
  },
};

export default meta;
type Story = StoryObj<typeof ParticleBackground>;

export const Default: Story = {
  args: {
    children: (
      <div className="glass-glass-p-4 glass-glass-text-center">
        <h3 className="glass-glass-text-lg glass-glass-font-semibold glass-glass-mb-2">ParticleBackground</h3>
        <p className="glass-glass-text-sm opacity-80">This is the default particlebackground component.</p>
      </div>
    ),
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="glass-glass-flex glass-glass-flex-wrap glass-glass-gap-4">
      <ParticleBackground {...args}>
        Default
      </ParticleBackground>
    </div>
  ),
  args: {
    children: null,
  },
};
