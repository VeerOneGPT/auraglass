import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GlassSpotlight } from './GlassSpotlight';

const meta: Meta<typeof GlassSpotlight> = {
  title: 'Components/Interactive/GlassSpotlight',
  component: GlassSpotlight,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glassspotlight component.',
      },
    },
  },
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof GlassSpotlight>;

export const Default: Story = {
  args: {
    targetRect: new DOMRect(100, 100, 200, 100),
    onClose: () => console.log('Spotlight closed'),
  },
};

export const LargeTarget: Story = {
  args: {
    targetRect: new DOMRect(50, 50, 300, 200),
    onClose: () => console.log('Large spotlight closed'),
  },
};
