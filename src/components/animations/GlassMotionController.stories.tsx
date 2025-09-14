import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GlassMotionController, GlassAnimated, GlassAnimationSequence, GlassAnimationTimeline } from './GlassMotionController';
import { cn } from '../../lib/utils';

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
      <div className="glass-foundation-complete glass-glass-glass-bg-transparent glass-glass-glass-border-white/40 glass-glass-glass-shadow-2xl glass-radius-2xl glass-glass-glass-p-8 glass-glass-glass-text-center">
        <GlassAnimated animation={{ type: 'fadeIn', duration: 650 }}>
          <h3 className="glass-heading glass-glass-glass-text-2xl glass-glass-glass-font-bold glass-glass-glass-mb-4">GlassMotionController</h3>
        </GlassAnimated>
        <GlassAnimated animation={{ type: 'slideIn', direction: 'up', duration: 800, delay: 120 }}>
          <p className="glass-body glass-glass-glass-text-base leading-relaxed">
            Experience the ultimate glassmorphism component with stunning visual effects and premium typography.
          </p>
        </GlassAnimated>
        <div className="mt-6 glass-inline-glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-3 glass-glass-glass-justify-center">
          <GlassAnimated animation={{ type: 'scaleIn', duration: 600, delay: 220 }}>
            <button className="glass-foundation-complete glass-hover bg-glass-frosted glass-glass-glass-border-white/40 glass-glass-glass-shadow-2xl glass-radius-xl glass-glass-glass-px-4 glass-glass-glass-py-2 transition-all">
              Try It
            </button>
          </GlassAnimated>
          <GlassAnimated animation={{ type: 'fadeIn', duration: 600, delay: 300 }}>
            <span className="glass-caption glass-glass-glass-text-xs opacity-80">Animated on mount</span>
          </GlassAnimated>
        </div>
      </div>
    ),
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="glass-glass-glass-flex glass-glass-glass-flex-wrap glass-glass-glass-gap-6">
      <GlassMotionController {...args}>
        <div className="glass-foundation-complete backdrop-blur-md glass-glass-glass-bg-transparent glass-glass-glass-border-white/40 glass-glass-glass-shadow-2xl glass-radius-2xl glass-glass-glass-p-6 glass-glass-glass-text-center min-w-40">
          <span className="glass-heading glass-glass-glass-text-lg glass-glass-glass-font-semibold">Primary</span>
          <p className="glass-caption glass-glass-glass-text-sm glass-mt-1 opacity-80">Premium variant</p>
        </div>
      </GlassMotionController>
      <GlassMotionController {...args}>
        <div className="glass-foundation-complete backdrop-blur-md glass-glass-glass-bg-transparent glass-glass-glass-border-white/40 glass-glass-glass-shadow-2xl glass-radius-2xl glass-glass-glass-p-6 glass-glass-glass-text-center min-w-40">
          <span className="glass-heading glass-glass-glass-text-lg glass-glass-glass-font-semibold">Secondary</span>
          <p className="glass-caption glass-glass-glass-text-sm glass-mt-1 opacity-80">Elegant variant</p>
        </div>
      </GlassMotionController>
      <GlassMotionController {...args}>
        <div className="glass-foundation-complete backdrop-blur-md bg-glass-frosted glass-glass-glass-border-white/40 glass-glass-glass-shadow-2xl glass-radius-2xl glass-glass-glass-p-6 glass-glass-glass-text-center min-w-40">
          <span className="glass-heading glass-glass-glass-text-lg glass-glass-glass-font-semibold">Frosted</span>
          <p className="glass-caption glass-glass-glass-text-sm glass-mt-1 opacity-80">Crystal clear</p>
        </div>
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
    <GlassMotionController enabled={true}>
      <GlassAnimationSequence staggerDelay={200}>
        <div className="glass-glass-glass-grid glass-glass-glass-glass-glass-grid-cols-3 glass-glass-glass-gap-4">
          <GlassAnimated className="glass-foundation-complete backdrop-blur-md glass-glass-glass-bg-transparent glass-glass-glass-border-white/40 glass-glass-glass-shadow-2xl glass-radius-xl glass-glass-glass-p-6 glass-glass-glass-text-center hover:glass-glass-glass-shadow-2xl transition-all">
            <div className="glass-heading glass-glass-glass-text-xl glass-glass-glass-font-bold glass-glass-glass-mb-2">Step 1</div>
            <div className="glass-body glass-glass-glass-text-sm glass-glass-glass-opacity-90">Initialize</div>
          </GlassAnimated>
          <GlassAnimated className="glass-foundation-complete backdrop-blur-md glass-glass-glass-bg-transparent glass-glass-glass-border-white/40 glass-glass-glass-shadow-2xl glass-radius-xl glass-glass-glass-p-6 glass-glass-glass-text-center hover:glass-glass-glass-shadow-2xl transition-all">
            <div className="glass-heading glass-glass-glass-text-xl glass-glass-glass-font-bold glass-glass-glass-mb-2">Step 2</div>
            <div className="glass-body glass-glass-glass-text-sm glass-glass-glass-opacity-90">Process</div>
          </GlassAnimated>
          <GlassAnimated className="glass-foundation-complete backdrop-blur-md glass-glass-glass-bg-transparent glass-glass-glass-border-white/40 glass-glass-glass-shadow-2xl glass-radius-xl glass-glass-glass-p-6 glass-glass-glass-text-center hover:glass-glass-glass-shadow-2xl transition-all">
            <div className="glass-heading glass-glass-glass-text-xl glass-glass-glass-font-bold glass-glass-glass-mb-2">Step 3</div>
            <div className="glass-body glass-glass-glass-text-sm glass-glass-glass-opacity-90">Complete</div>
          </GlassAnimated>
        </div>
      </GlassAnimationSequence>
    </GlassMotionController>
  ),
};

// Stories for GlassAnimationTimeline
export const AnimationTimeline: Story = {
  render: (args) => (
    <GlassMotionController enabled={true}>
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
        <div className="timeline-element glass-foundation-complete backdrop-blur-md glass-glass-glass-bg-transparent glass-glass-glass-border-white/40 glass-glass-glass-shadow-2xl glass-radius-2xl glass-glass-glass-p-12 glass-glass-glass-text-center">
          <h3 className="glass-heading glass-glass-glass-text-3xl glass-glass-glass-font-bold glass-glass-glass-mb-4">Timeline Animation</h3>
          <p className="glass-body glass-glass-glass-text-lg leading-relaxed max-w-md glass-glass-glass-mx-auto">Watch this element transform through a complex animation sequence with breathtaking glassmorphism effects.</p>
          <div className="mt-6 glass-inline-glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2 glass-code glass-glass-glass-px-4 glass-glass-glass-py-2 glass-radius-lg">
            <span className="glass-glass-glass-w-2 glass-glass-glass-h-2 glass-surface-green glass-radius-full animate-pulse"></span>
            <span className="glass-glass-glass-text-xs font-mono">Animation Active</span>
          </div>
        </div>
      </GlassAnimationTimeline>
    </GlassMotionController>
  ),
};

// Interactive sequence demo
export const InteractiveSequence: Story = {
  render: (args) => {
    const [isPlaying, setIsPlaying] = React.useState(false);

    return (
      <GlassMotionController enabled={true}>
        <div className="glass-auto-gap glass-auto-gap-2xl">
          <div className="glass-glass-glass-flex glass-glass-glass-justify-center">
            <button
              onClick={(e) => setIsPlaying(!isPlaying)}
              className="glass-foundation-complete glass-hover backdrop-blur-md glass-glass-glass-bg-transparent glass-glass-glass-border-white/40 glass-glass-glass-shadow-2xl glass-glass-glass-px-8 glass-glass-glass-py-4 glass-radius-xl transition-all glass-button hover:glass-glass-glass-shadow-2xl hover:scale-110 hover:rotate-1"
            >
              <span className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-3">
                <div className={`w-3 h-3 glass-radius-full ${isPlaying ? 'bg-red-400' : 'bg-green-400'} animate-pulse`}></div>
                <span className="glass-heading glass-glass-glass-text-lg glass-glass-glass-font-semibold">
                  {isPlaying ? 'Pause' : 'Play'} Sequence
                </span>
              </span>
            </button>
          </div>

          <GlassAnimationSequence staggerDelay={isPlaying ? 200 : 0}>
            <div className="glass-glass-glass-grid glass-glass-glass-glass-glass-grid-cols-4 glass-glass-glass-gap-4">
              {['🔵', '🟢', '🟡', '🔴'].map((emoji, index) => (
                <GlassAnimated
                  key={index}
                  className="glass-foundation-complete backdrop-blur-md glass-glass-glass-bg-transparent glass-glass-glass-border-white/40 glass-glass-glass-shadow-2xl glass-glass-glass-p-8 glass-radius-2xl glass-glass-glass-text-center hover:glass-glass-glass-shadow-2xl hover:scale-105 hover:-rotate-2 transition-all duration-300"
                >
                  <div className="glass-glass-glass-text-4xl glass-glass-glass-mb-3 filter drop-glass-glass-glass-shadow-lg">{emoji}</div>
                  <div className="glass-caption glass-glass-glass-text-xs glass-glass-glass-font-medium opacity-80 glass-glass-glass-uppercase tracking-wider">Item {index + 1}</div>
                </GlassAnimated>
              ))}
            </div>
          </GlassAnimationSequence>
        </div>
      </GlassMotionController>
    );
  },
};
