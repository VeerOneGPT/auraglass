import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CursorGlow } from './CursorGlow';

const meta: Meta<typeof CursorGlow> = {
  title: 'Components/Interactive/CursorGlow',
  component: CursorGlow,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Pointer-following glow overlay. Pointer-events: none. Respects reduced motion.',
      },
    },
  },
  argTypes: {
    size: { control: { type: 'range', min: 120, max: 600, step: 10 } },
    intensity: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
    opacity: { control: { type: 'range', min: 0, max: 1, step: 0.02 } },
    color: { control: 'color' },
  },
  args: {
    size: 320,
    intensity: 0.6,
    opacity: 0.18,
    color: '#ffffff',
  },
};

export default meta;
type Story = StoryObj<typeof CursorGlow>;

export const Default: Story = {
  render: (args) => (
    <div style={{ position: 'relative', minHeight: '70vh', background: 'linear-gradient(120deg,#0f172a,#1e293b)', overflow: 'hidden' }}>
      <CursorGlow {...args} />
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
        <div style={{
          width: 360, padding: 24, borderRadius: 16,
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.15)'
        }}>
          <h3 style={{ margin: 0, fontWeight: 600 }}>Cursor Glow</h3>
          <p style={{ opacity: 0.75 }}>Move your cursor around to see the glow.</p>
        </div>
      </div>
    </div>
  ),
};

