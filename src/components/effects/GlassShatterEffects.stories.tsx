import type { Meta, StoryObj } from '@storybook/react';
import { GlassShatterEffects } from './GlassShatterEffects';

import { cn } from '../../lib/utils';
const meta: Meta<typeof GlassShatterEffects> = {
  title: 'Effects/GlassShatterEffects',
  component: GlassShatterEffects,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Dynamic glass shatter effects with physics-based animations and interactive shattering experiences.'
      }
    }
  },
  argTypes: {
    trigger: {
      control: { type: 'select', options: ['click', 'hover', 'manual', 'auto'] },
      description: 'How the shatter effect is triggered'
    },
    duration: {
      control: { type: 'number', min: 0.5, max: 5, step: 0.1 },
      description: 'Duration of the shatter animation'
    },
    intensity: {
      control: { type: 'number', min: 0.1, max: 2, step: 0.1 },
      description: 'Intensity of the shatter effect'
    },
    shardCount: {
      control: { type: 'number', min: 5, max: 50, step: 5 },
      description: 'Number of glass shards'
    },
    autoReform: {
      control: 'boolean',
      description: 'Automatically reform after shattering'
    },
    reformDelay: {
      control: { type: 'number', min: 1000, max: 10000, step: 500 },
      description: 'Delay before auto-reform'
    },
    showControls: {
      control: 'boolean',
      description: 'Show shatter controls'
    }
  }
};

export default meta;
type Story = StoryObj<typeof GlassShatterEffects>;

export const Default: Story = {
  args: {
    trigger: 'click',
    duration: 2,
    intensity: 1,
    shardCount: 12,
    autoReform: true,
    reformDelay: 3000,
    showControls: true
  },
  render: (args) => (
    <div className="min-h-screen glass-gradient-primary from-slate-900 via-purple-900 to-slate-900 glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-p-8">
      <GlassShatterEffects {...args}>
        <div className="glass-glass-p-8 glass-surface-subtle/10 backdrop-blur-lg glass-radius-xl glass-glass-border glass-glass-border-white/20 max-w-md">
          <h2 className="glass-glass-text-2xl font-bold glass-glass-text-primary glass-glass-mb-4">Glass Shatter Effect</h2>
          <p className="glass-glass-text-primary/80 mb-6">
            Click anywhere on this card to trigger the glass shatter effect.
            Watch as the glass breaks apart with realistic physics!
          </p>
          <div className="glass-glass-text-center">
            <div className="glass-glass-text-4xl glass-glass-mb-2">💎</div>
            <p className="glass-glass-text-sm glass-glass-text-primary/60">Click to shatter</p>
          </div>
        </div>
      </GlassShatterEffects>
    </div>
  )
};

export const Dramatic: Story = {
  args: {
    trigger: 'click',
    duration: 3,
    intensity: 1.5,
    shardCount: 24,
    autoReform: true,
    reformDelay: 5000,
    showControls: true
  },
  render: (args) => (
    <div className="min-h-screen glass-gradient-primary from-red-900 via-orange-900 to-yellow-900 glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-p-8">
      <GlassShatterEffects {...args}>
        <div className="glass-glass-p-8 glass-surface-subtle/10 backdrop-blur-lg glass-radius-xl glass-glass-border glass-glass-border-white/20 max-w-md">
          <h2 className="glass-glass-text-2xl font-bold glass-glass-text-primary glass-glass-mb-4">Dramatic Shatter</h2>
          <p className="glass-glass-text-primary/80 mb-6">
            Experience a more intense shatter effect with more shards and slower animation.
            Perfect for dramatic reveals!
          </p>
          <div className="glass-glass-text-center">
            <div className="glass-glass-text-4xl glass-glass-mb-2">🔥</div>
            <p className="glass-glass-text-sm glass-glass-text-primary/60">Click for dramatic effect</p>
          </div>
        </div>
      </GlassShatterEffects>
    </div>
  )
};

export const HoverTrigger: Story = {
  args: {
    trigger: 'hover',
    duration: 1.5,
    intensity: 0.8,
    shardCount: 16,
    autoReform: true,
    reformDelay: 2000,
    showControls: true
  },
  render: (args) => (
    <div className="min-h-screen glass-gradient-primary from-green-900 via-teal-900 to-blue-900 glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-p-8">
      <GlassShatterEffects {...args}>
        <div className="glass-glass-p-8 glass-surface-subtle/10 backdrop-blur-lg glass-radius-xl glass-glass-border glass-glass-border-white/20 max-w-md">
          <h2 className="glass-glass-text-2xl font-bold glass-glass-text-primary glass-glass-mb-4">Hover Shatter</h2>
          <p className="glass-glass-text-primary/80 mb-6">
            Move your mouse over this card to trigger the shatter effect.
            It will automatically reform after a short delay.
          </p>
          <div className="glass-glass-text-center">
            <div className="glass-glass-text-4xl glass-glass-mb-2">🎯</div>
            <p className="glass-glass-text-sm glass-glass-text-primary/60">Hover to shatter</p>
          </div>
        </div>
      </GlassShatterEffects>
    </div>
  )
};

export const AutoShatter: Story = {
  args: {
    trigger: 'auto',
    duration: 2.5,
    intensity: 1.2,
    shardCount: 20,
    autoReform: true,
    reformDelay: 4000,
    showControls: true
  },
  render: (args) => (
    <div className="min-h-screen glass-gradient-primary from-purple-900 via-pink-900 to-red-900 glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-p-8">
      <GlassShatterEffects {...args}>
        <div className="glass-glass-p-8 glass-surface-subtle/10 backdrop-blur-lg glass-radius-xl glass-glass-border glass-glass-border-white/20 max-w-md">
          <h2 className="glass-glass-text-2xl font-bold glass-glass-text-primary glass-glass-mb-4">Auto Shatter</h2>
          <p className="glass-glass-text-primary/80 mb-6">
            This card will automatically shatter every few seconds,
            demonstrating the continuous animation capability.
          </p>
          <div className="glass-glass-text-center">
            <div className="glass-glass-text-4xl glass-glass-mb-2">⚡</div>
            <p className="glass-glass-text-sm glass-glass-text-primary/60">Watch the auto-shatter</p>
          </div>
        </div>
      </GlassShatterEffects>
    </div>
  )
};

export const Minimal: Story = {
  args: {
    trigger: 'click',
    duration: 1,
    intensity: 0.5,
    shardCount: 8,
    autoReform: true,
    reformDelay: 1500,
    showControls: false
  },
  render: (args) => (
    <div className="min-h-screen glass-surface-subtle glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-p-8">
      <GlassShatterEffects {...args}>
        <div className="glass-glass-p-8 glass-surface-subtle glass-radius-xl glass-glass-border glass-glass-border-subtle glass-glass-shadow-lg max-w-md">
          <h2 className="glass-glass-text-xl font-bold glass-text-secondary glass-glass-mb-4">Minimal Shatter</h2>
          <p className="glass-text-secondary mb-6">
            A subtle shatter effect with fewer shards and faster animation.
            Perfect for clean, minimal designs.
          </p>
          <div className="glass-glass-text-center">
            <div className="glass-glass-text-3xl glass-glass-mb-2">💎</div>
            <p className="glass-glass-text-sm glass-text-secondary">Click for subtle effect</p>
          </div>
        </div>
      </GlassShatterEffects>
    </div>
  )
};

export const NoReform: Story = {
  args: {
    trigger: 'click',
    duration: 2,
    intensity: 1,
    shardCount: 15,
    autoReform: false,
    showControls: true
  },
  render: (args) => (
    <div className="min-h-screen glass-gradient-primary from-gray-900 via-slate-900 to-black glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-p-8">
      <GlassShatterEffects {...args}>
        <div className="glass-glass-p-8 glass-surface-subtle/10 backdrop-blur-lg glass-radius-xl glass-glass-border glass-glass-border-white/20 max-w-md">
          <h2 className="glass-glass-text-2xl font-bold glass-glass-text-primary glass-glass-mb-4">Permanent Shatter</h2>
          <p className="glass-glass-text-primary/80 mb-6">
            This card will shatter but won't automatically reform.
            Use the controls to manually reform it.
          </p>
          <div className="glass-glass-text-center">
            <div className="glass-glass-text-4xl glass-glass-mb-2">💥</div>
            <p className="glass-glass-text-sm glass-glass-text-primary/60">Click to shatter permanently</p>
          </div>
        </div>
      </GlassShatterEffects>
    </div>
  )
};

export const InteractiveGallery: Story = {
  args: {
    trigger: 'click',
    duration: 2,
    intensity: 1,
    shardCount: 12,
    autoReform: true,
    reformDelay: 3000,
    showControls: false
  },
  render: (args) => (
    <div className="min-h-screen glass-gradient-primary from-indigo-900 via-purple-900 to-pink-900 glass-glass-p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="glass-glass-text-4xl font-bold glass-glass-text-primary glass-glass-text-center mb-12">
          Interactive Shatter Gallery
        </h1>

        <div className="glass-glass-grid glass-glass-glass-grid-cols-1 md:glass-glass-glass-grid-cols-2 lg:glass-glass-glass-grid-cols-3 glass-glass-gap-8">
          <GlassShatterEffects {...args}>
            <div className="glass-glass-p-6 glass-surface-subtle/10 backdrop-blur-lg glass-radius-xl glass-glass-border glass-glass-border-white/20">
              <div className="glass-glass-text-4xl glass-glass-mb-4">🎨</div>
              <h3 className="glass-glass-text-xl glass-glass-font-semibold glass-glass-text-primary glass-glass-mb-2">Creative</h3>
              <p className="glass-glass-text-primary/80 glass-glass-text-sm">
                Unleash your creativity with glass shatter effects
              </p>
            </div>
          </GlassShatterEffects>

          <GlassShatterEffects {...args}>
            <div className="glass-glass-p-6 glass-surface-subtle/10 backdrop-blur-lg glass-radius-xl glass-glass-border glass-glass-border-white/20">
              <div className="glass-glass-text-4xl glass-glass-mb-4">🚀</div>
              <h3 className="glass-glass-text-xl glass-glass-font-semibold glass-glass-text-primary glass-glass-mb-2">Dynamic</h3>
              <p className="glass-glass-text-primary/80 glass-glass-text-sm">
                Experience dynamic visual effects and animations
              </p>
            </div>
          </GlassShatterEffects>

          <GlassShatterEffects {...args}>
            <div className="glass-glass-p-6 glass-surface-subtle/10 backdrop-blur-lg glass-radius-xl glass-glass-border glass-glass-border-white/20">
              <div className="glass-glass-text-4xl glass-glass-mb-4">💎</div>
              <h3 className="glass-glass-text-xl glass-glass-font-semibold glass-glass-text-primary glass-glass-mb-2">Elegant</h3>
              <p className="glass-glass-text-primary/80 glass-glass-text-sm">
                Beautiful glass effects with elegant animations
              </p>
            </div>
          </GlassShatterEffects>

          <GlassShatterEffects {...args}>
            <div className="glass-glass-p-6 glass-surface-subtle/10 backdrop-blur-lg glass-radius-xl glass-glass-border glass-glass-border-white/20">
              <div className="glass-glass-text-4xl glass-glass-mb-4">⚡</div>
              <h3 className="glass-glass-text-xl glass-glass-font-semibold glass-glass-text-primary glass-glass-mb-2">Powerful</h3>
              <p className="glass-glass-text-primary/80 glass-glass-text-sm">
                Powerful visual effects that capture attention
              </p>
            </div>
          </GlassShatterEffects>

          <GlassShatterEffects {...args}>
            <div className="glass-glass-p-6 glass-surface-subtle/10 backdrop-blur-lg glass-radius-xl glass-glass-border glass-glass-border-white/20">
              <div className="glass-glass-text-4xl glass-glass-mb-4">🎭</div>
              <h3 className="glass-glass-text-xl glass-glass-font-semibold glass-glass-text-primary glass-glass-mb-2">Interactive</h3>
              <p className="glass-glass-text-primary/80 glass-glass-text-sm">
                Interactive experiences with user engagement
              </p>
            </div>
          </GlassShatterEffects>

          <GlassShatterEffects {...args}>
            <div className="glass-glass-p-6 glass-surface-subtle/10 backdrop-blur-lg glass-radius-xl glass-glass-border glass-glass-border-white/20">
              <div className="glass-glass-text-4xl glass-glass-mb-4">✨</div>
              <h3 className="glass-glass-text-xl glass-glass-font-semibold glass-glass-text-primary glass-glass-mb-2">Magical</h3>
              <p className="glass-glass-text-primary/80 glass-glass-text-sm">
                Magical effects that create memorable experiences
              </p>
            </div>
          </GlassShatterEffects>
        </div>
      </div>
    </div>
  )
};

