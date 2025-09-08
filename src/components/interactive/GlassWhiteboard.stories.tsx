import type { Meta, StoryObj } from '@storybook/react';
import { GlassWhiteboard } from './GlassWhiteboard';

const meta: Meta<typeof GlassWhiteboard> = {
  title: 'Components/Interactive/GlassWhiteboard',
  component: GlassWhiteboard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glasswhiteboard component.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    width: {
      control: 'number',
      description: 'Canvas width',
    },
    height: {
      control: 'number',
      description: 'Canvas height',
    },
    backgroundPattern: {
      control: { type: 'select' },
      options: ['none', 'grid', 'dots', 'lines'],
      description: 'Background pattern',
    },
    showToolbar: {
      control: 'boolean',
      description: 'Show toolbar',
    },
  },
  args: {
    className: '',
    width: 600,
    height: 400,
    backgroundPattern: 'grid',
    showToolbar: true,
  },
};

export default meta;
type Story = StoryObj<typeof GlassWhiteboard>;

export const Default: Story = {
  args: {
    onDrawingChange: (data) => console.log('Drawing changed:', data.length, 'items'),
    onToolChange: (tool) => console.log('Tool changed to:', tool),
  },
};

export const Collaborative: Story = {
  args: {
    collaborative: true,
    userId: 'user123',
    enabledTools: ['pen', 'eraser', 'rectangle', 'text'],
    showMinimap: true,
    onDrawingChange: (data) => console.log('Collaborative drawing:', data),
  },
};
