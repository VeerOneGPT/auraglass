import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GlassMotionController, GlassAnimated, GlassAnimationSequence, GlassAnimationTimeline } from './GlassMotionController';

const meta: Meta<typeof GlassMotionController> = {
  title: 'Components/Animations/GlassMotionController',
  component: GlassMotionController,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glassmotioncontroller component.',
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
type Story = StoryObj<typeof GlassMotionController>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold mb-2">GlassMotionController</h3>
        <p className="text-sm opacity-80">This is the default glassmotioncontroller component.</p>
      </div>
    ),
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      <GlassMotionController {...args}>
        Default
      </GlassMotionController>
    </div>
  ),
  args: {
    children: null,
  },
};

// Stories for GlassAnimationSequence
export const AnimationSequence: Story = {
  render: (args) => (
    <GlassAnimationSequence staggerDelay={200}>
      <div className="grid grid-cols-3 gap-4">
        <GlassAnimated className="p-4 bg-blue-500/20 rounded-lg text-center">
          Step 1
        </GlassAnimated>
        <GlassAnimated className="p-4 bg-green-500/20 rounded-lg text-center">
          Step 2
        </GlassAnimated>
        <GlassAnimated className="p-4 bg-purple-500/20 rounded-lg text-center">
          Step 3
        </GlassAnimated>
      </div>
    </GlassAnimationSequence>
  ),
};

// Stories for GlassAnimationTimeline
export const AnimationTimeline: Story = {
  render: (args) => (
    <GlassAnimationTimeline
      timeline={[
        {
          selector: '.timeline-element',
          animation: { type: 'fadeIn', duration: 600 },
          startTime: 0
        },
        {
          selector: '.timeline-element',
          animation: { type: 'slideIn', direction: 'left', duration: 800 },
          startTime: 1000
        },
        {
          selector: '.timeline-element',
          animation: { type: 'scaleIn', duration: 600 },
          startTime: 2000
        }
      ]}
    >
      <div className="timeline-element p-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg text-center">
        <h3 className="text-xl font-bold mb-2">Timeline Animation</h3>
        <p className="text-sm opacity-80">This element follows a complex animation timeline</p>
      </div>
    </GlassAnimationTimeline>
  ),
};

// Interactive sequence demo
export const InteractiveSequence: Story = {
  render: (args) => {
    const [isPlaying, setIsPlaying] = React.useState(false);

    return (
      <div className="space-y-4">
        <div className="flex justify-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-6 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors"
          >
            {isPlaying ? 'Pause' : 'Play'} Sequence
          </button>
        </div>

        <GlassAnimationSequence staggerDelay={isPlaying ? 200 : 0}>
          <div className="grid grid-cols-4 gap-4">
            {['🔵', '🟢', '🟡', '🔴'].map((emoji, index) => (
              <GlassAnimated
                key={index}
                className="p-6 bg-white/10 rounded-lg text-center text-2xl"
              >
                {emoji}
              </GlassAnimated>
            ))}
          </div>
        </GlassAnimationSequence>
      </div>
    );
  },
};
