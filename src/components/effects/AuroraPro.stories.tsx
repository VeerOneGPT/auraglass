import type { Meta, StoryObj } from '@storybook/react';
import { AuroraPro } from './AuroraPro';

import { cn } from '../../lib/utils';
const meta: Meta<typeof AuroraPro> = {
  title: 'Effects/AuroraPro',
  component: AuroraPro,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Spectacular aurora borealis effects with dynamic color palettes, particle systems, and immersive atmospheric lighting.'
      }
    }
  },
  argTypes: {
    intensity: {
      control: { type: 'number', min: 0.1, max: 2, step: 0.1 },
      description: 'Overall intensity of aurora effects'
    },
    speed: {
      control: { type: 'number', min: 0.1, max: 2, step: 0.1 },
      description: 'Animation speed multiplier'
    },
    colorPalette: {
      control: { type: 'select', options: ['arctic', 'forest', 'sunset', 'ocean', 'cosmic', 'custom'] },
      description: 'Color palette for aurora effects'
    },
    particleCount: {
      control: { type: 'number', min: 10, max: 100, step: 10 },
      description: 'Number of aurora particles'
    },
    showParticles: {
      control: 'boolean',
      description: 'Show particle effects'
    },
    showWaves: {
      control: 'boolean',
      description: 'Show aurora wave effects'
    },
    showCurtain: {
      control: 'boolean',
      description: 'Show aurora curtain effects'
    },
    animationMode: {
      control: { type: 'select', options: ['flow', 'pulse', 'shift', 'mixed'] },
      description: 'Animation mode for aurora effects'
    },
    showControls: {
      control: 'boolean',
      description: 'Show aurora controls'
    }
  }
};

export default meta;
type Story = StoryObj<typeof AuroraPro>;

export const ArcticAurora: Story = {
  args: {
    intensity: 1.0,
    speed: 1.0,
    colorPalette: 'arctic',
    particleCount: 50,
    showParticles: true,
    showWaves: true,
    showCurtain: false,
    animationMode: 'flow',
    showControls: true
  },
  render: (args) => (
    <div className="glass-glass-relative">
      <AuroraPro {...args}>
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-indigo-900 glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-p-8">
          <div className="glass-glass-text-center glass-glass-text-primary max-w-2xl">
            <div className="glass-glass-text-6xl mb-6">🌌</div>
            <h1 className="glass-glass-text-4xl font-bold mb-6">Arctic Aurora</h1>
            <p className="glass-glass-text-xl text-blue-200 mb-8">
              Experience the mesmerizing beauty of the northern lights with ethereal blue and green aurora waves
              dancing across the night sky. This arctic display captures the magic of polar light shows.
            </p>
            <div className="glass-glass-grid glass-glass-glass-grid-cols-1 md:glass-glass-glass-grid-cols-3 glass-glass-gap-4 glass-glass-text-sm">
              <div className="glass-glass-p-4 glass-surface-subtle/10 backdrop-blur-lg glass-radius-lg glass-glass-border glass-glass-border-white/20">
                <div className="glass-glass-text-2xl glass-glass-mb-2">❄️</div>
                <div className="glass-glass-font-semibold">Arctic Colors</div>
                <div className="text-blue-300">Cool blue & green palette</div>
              </div>
              <div className="glass-glass-p-4 glass-surface-subtle/10 backdrop-blur-lg glass-radius-lg glass-glass-border glass-glass-border-white/20">
                <div className="glass-glass-text-2xl glass-glass-mb-2">🌊</div>
                <div className="glass-glass-font-semibold">Flowing Waves</div>
                <div className="text-blue-300">Smooth, organic movement</div>
              </div>
              <div className="glass-glass-p-4 glass-surface-subtle/10 backdrop-blur-lg glass-radius-lg glass-glass-border glass-glass-border-white/20">
                <div className="glass-glass-text-2xl glass-glass-mb-2">✨</div>
                <div className="glass-glass-font-semibold">Particle Effects</div>
                <div className="text-blue-300">Scattered light particles</div>
              </div>
            </div>
          </div>
        </div>
      </AuroraPro>
    </div>
  )
};

export const ForestAurora: Story = {
  args: {
    intensity: 1.2,
    speed: 0.8,
    colorPalette: 'forest',
    particleCount: 40,
    showParticles: true,
    showWaves: true,
    showCurtain: true,
    animationMode: 'pulse',
    showControls: true
  },
  render: (args) => (
    <div className="glass-glass-relative">
      <AuroraPro {...args}>
        <div className="min-h-screen bg-gradient-to-b from-green-900 via-emerald-900 to-teal-900 glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-p-8">
          <div className="glass-glass-text-center glass-glass-text-primary max-w-2xl">
            <div className="glass-glass-text-6xl mb-6">🌲</div>
            <h1 className="glass-glass-text-4xl font-bold mb-6">Forest Aurora</h1>
            <p className="glass-glass-text-xl text-green-200 mb-8">
              Immerse yourself in nature's light show with deep forest greens and earthy aurora effects.
              Experience the tranquility of woodland aurora displays with pulsing light patterns.
            </p>
            <div className="glass-glass-grid glass-glass-glass-grid-cols-1 md:glass-glass-glass-grid-cols-3 glass-glass-gap-4 glass-glass-text-sm">
              <div className="glass-glass-p-4 glass-surface-subtle/10 backdrop-blur-lg glass-radius-lg glass-glass-border glass-glass-border-white/20">
                <div className="glass-glass-text-2xl glass-glass-mb-2">🌿</div>
                <div className="glass-glass-font-semibold">Forest Greens</div>
                <div className="text-green-300">Deep emerald & jade tones</div>
              </div>
              <div className="glass-glass-p-4 glass-surface-subtle/10 backdrop-blur-lg glass-radius-lg glass-glass-border glass-glass-border-white/20">
                <div className="glass-glass-text-2xl glass-glass-mb-2">💚</div>
                <div className="glass-glass-font-semibold">Pulsing Rhythm</div>
                <div className="text-green-300">Organic breathing effect</div>
              </div>
              <div className="glass-glass-p-4 glass-surface-subtle/10 backdrop-blur-lg glass-radius-lg glass-glass-border glass-glass-border-white/20">
                <div className="glass-glass-text-2xl glass-glass-mb-2">🌳</div>
                <div className="glass-glass-font-semibold">Curtain Effect</div>
                <div className="text-green-300">Layered aurora curtains</div>
              </div>
            </div>
          </div>
        </div>
      </AuroraPro>
    </div>
  )
};

export const SunsetAurora: Story = {
  args: {
    intensity: 1.5,
    speed: 1.2,
    colorPalette: 'sunset',
    particleCount: 60,
    showParticles: true,
    showWaves: true,
    showCurtain: false,
    animationMode: 'shift',
    showControls: true
  },
  render: (args) => (
    <div className="glass-glass-relative">
      <AuroraPro {...args}>
        <div className="min-h-screen bg-gradient-to-b from-orange-600 via-pink-600 to-purple-800 glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-p-8">
          <div className="glass-glass-text-center glass-glass-text-primary max-w-2xl">
            <div className="glass-glass-text-6xl mb-6">🌅</div>
            <h1 className="glass-glass-text-4xl font-bold mb-6">Sunset Aurora</h1>
            <p className="glass-glass-text-xl text-orange-200 mb-8">
              Witness the spectacular fusion of sunset colors with aurora effects.
              Experience shifting color palettes that dance like fire in the evening sky.
            </p>
            <div className="glass-glass-grid glass-glass-glass-grid-cols-1 md:glass-glass-glass-grid-cols-3 glass-glass-gap-4 glass-glass-text-sm">
              <div className="glass-glass-p-4 glass-surface-subtle/10 backdrop-blur-lg glass-radius-lg glass-glass-border glass-glass-border-white/20">
                <div className="glass-glass-text-2xl glass-glass-mb-2">🔥</div>
                <div className="glass-glass-font-semibold">Fiery Colors</div>
                <div className="text-orange-300">Orange, pink & purple hues</div>
              </div>
              <div className="glass-glass-p-4 glass-surface-subtle/10 backdrop-blur-lg glass-radius-lg glass-glass-border glass-glass-border-white/20">
                <div className="glass-glass-text-2xl glass-glass-mb-2">🌈</div>
                <div className="glass-glass-font-semibold">Color Shifting</div>
                <div className="text-orange-300">Dynamic color transitions</div>
              </div>
              <div className="glass-glass-p-4 glass-surface-subtle/10 backdrop-blur-lg glass-radius-lg glass-glass-border glass-glass-border-white/20">
                <div className="glass-glass-text-2xl glass-glass-mb-2">⭐</div>
                <div className="glass-glass-font-semibold">Intense Display</div>
                <div className="text-orange-300">High-intensity effects</div>
              </div>
            </div>
          </div>
        </div>
      </AuroraPro>
    </div>
  )
};

export const OceanAurora: Story = {
  args: {
    intensity: 0.8,
    speed: 0.6,
    colorPalette: 'ocean',
    particleCount: 35,
    showParticles: true,
    showWaves: true,
    showCurtain: true,
    animationMode: 'mixed',
    showControls: true
  },
  render: (args) => (
    <div className="glass-glass-relative">
      <AuroraPro {...args}>
        <div className="min-h-screen bg-gradient-to-b from-blue-800 via-cyan-800 to-teal-900 glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-p-8">
          <div className="glass-glass-text-center glass-glass-text-primary max-w-2xl">
            <div className="glass-glass-text-6xl mb-6">🌊</div>
            <h1 className="glass-glass-text-4xl font-bold mb-6">Ocean Aurora</h1>
            <p className="glass-glass-text-xl text-cyan-200 mb-8">
              Dive into the depths of oceanic aurora with calming blue and teal colors.
              Experience the gentle ebb and flow of underwater light patterns.
            </p>
            <div className="glass-glass-grid glass-glass-glass-grid-cols-1 md:glass-glass-glass-grid-cols-3 glass-glass-gap-4 glass-glass-text-sm">
              <div className="glass-glass-p-4 glass-surface-subtle/10 backdrop-blur-lg glass-radius-lg glass-glass-border glass-glass-border-white/20">
                <div className="glass-glass-text-2xl glass-glass-mb-2">🏄‍♂️</div>
                <div className="glass-glass-font-semibold">Ocean Blues</div>
                <div className="text-cyan-300">Deep sea & coastal colors</div>
              </div>
              <div className="glass-glass-p-4 glass-surface-subtle/10 backdrop-blur-lg glass-radius-lg glass-glass-border glass-glass-border-white/20">
                <div className="glass-glass-text-2xl glass-glass-mb-2">🌊</div>
                <div className="glass-glass-font-semibold">Wave Motion</div>
                <div className="text-cyan-300">Fluid, flowing animations</div>
              </div>
              <div className="glass-glass-p-4 glass-surface-subtle/10 backdrop-blur-lg glass-radius-lg glass-glass-border glass-glass-border-white/20">
                <div className="glass-glass-text-2xl glass-glass-mb-2">🐚</div>
                <div className="glass-glass-font-semibold">Serene Effect</div>
                <div className="text-cyan-300">Calming, peaceful display</div>
              </div>
            </div>
          </div>
        </div>
      </AuroraPro>
    </div>
  )
};

export const CosmicAurora: Story = {
  args: {
    intensity: 1.3,
    speed: 1.0,
    colorPalette: 'cosmic',
    particleCount: 70,
    showParticles: true,
    showWaves: true,
    showCurtain: true,
    animationMode: 'mixed',
    showControls: true
  },
  render: (args) => (
    <div className="glass-glass-relative">
      <AuroraPro {...args}>
        <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-black glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-p-8">
          <div className="glass-glass-text-center glass-glass-text-primary max-w-2xl">
            <div className="glass-glass-text-6xl mb-6">🌌</div>
            <h1 className="glass-glass-text-4xl font-bold mb-6">Cosmic Aurora</h1>
            <p className="glass-glass-text-xl text-purple-200 mb-8">
              Journey through the cosmos with deep purple and violet aurora effects.
              Experience the mystery and wonder of universal light displays.
            </p>
            <div className="glass-glass-grid glass-glass-glass-grid-cols-1 md:glass-glass-glass-grid-cols-3 glass-glass-gap-4 glass-glass-text-sm">
              <div className="glass-glass-p-4 glass-surface-subtle/10 backdrop-blur-lg glass-radius-lg glass-glass-border glass-glass-border-white/20">
                <div className="glass-glass-text-2xl glass-glass-mb-2">🪐</div>
                <div className="glass-glass-font-semibold">Cosmic Colors</div>
                <div className="text-purple-300">Deep space color palette</div>
              </div>
              <div className="glass-glass-p-4 glass-surface-subtle/10 backdrop-blur-lg glass-radius-lg glass-glass-border glass-glass-border-white/20">
                <div className="glass-glass-text-2xl glass-glass-mb-2">🌟</div>
                <div className="glass-glass-font-semibold">Mixed Effects</div>
                <div className="text-purple-300">Combined animation modes</div>
              </div>
              <div className="glass-glass-p-4 glass-surface-subtle/10 backdrop-blur-lg glass-radius-lg glass-glass-border glass-glass-border-white/20">
                <div className="glass-glass-text-2xl glass-glass-mb-2">✨</div>
                <div className="glass-glass-font-semibold">Stellar Display</div>
                <div className="text-purple-300">High particle density</div>
              </div>
            </div>
          </div>
        </div>
      </AuroraPro>
    </div>
  )
};

export const MinimalAurora: Story = {
  args: {
    intensity: 0.6,
    speed: 0.4,
    colorPalette: 'arctic',
    particleCount: 20,
    showParticles: true,
    showWaves: true,
    showCurtain: false,
    animationMode: 'flow',
    showControls: false
  },
  render: (args) => (
    <div className="glass-glass-relative">
      <AuroraPro {...args}>
        <div className="min-h-screen glass-surface-subtle glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-p-8">
          <div className="glass-glass-text-center max-w-2xl">
            <div className="glass-glass-text-4xl mb-6">🌟</div>
            <h1 className="glass-glass-text-2xl font-bold glass-text-secondary mb-6">Minimal Aurora</h1>
            <p className="glass-text-secondary">
              A subtle aurora display perfect for clean, minimal designs.
              Gentle effects that enhance without overwhelming the content.
            </p>
          </div>
        </div>
      </AuroraPro>
    </div>
  )
};

export const AuroraShowcase: Story = {
  args: {
    intensity: 1.0,
    speed: 1.0,
    colorPalette: 'cosmic',
    particleCount: 50,
    showParticles: true,
    showWaves: true,
    showCurtain: true,
    animationMode: 'mixed',
    showControls: true
  },
  render: (args) => (
    <div className="glass-glass-relative">
      <AuroraPro {...args}>
        <div className="min-h-screen glass-glass-p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="glass-glass-text-4xl font-bold glass-glass-text-primary glass-glass-text-center mb-12">
              Aurora Pro Showcase
            </h1>

            <div className="glass-glass-grid glass-glass-glass-grid-cols-1 md:glass-glass-glass-grid-cols-2 glass-glass-gap-8 mb-8">
              <div className="glass-glass-p-6 glass-surface-subtle/10 backdrop-blur-lg glass-radius-xl glass-glass-border glass-glass-border-white/20">
                <h3 className="glass-glass-text-xl glass-glass-font-semibold glass-glass-text-primary glass-glass-mb-4">🌌 Dynamic Effects</h3>
                <ul className="glass-glass-text-primary/80 glass-glass-space-y-2 glass-glass-text-sm">
                  <li>• Flowing aurora waves with organic movement</li>
                  <li>• Pulsing intensity for breathing effects</li>
                  <li>• Color shifting through cosmic palettes</li>
                  <li>• Mixed animations combining all modes</li>
                </ul>
              </div>

              <div className="glass-glass-p-6 glass-surface-subtle/10 backdrop-blur-lg glass-radius-xl glass-glass-border glass-glass-border-white/20">
                <h3 className="glass-glass-text-xl glass-glass-font-semibold glass-glass-text-primary glass-glass-mb-4">✨ Visual Features</h3>
                <ul className="glass-glass-text-primary/80 glass-glass-space-y-2 glass-glass-text-sm">
                  <li>• Multiple aurora wave layers</li>
                  <li>• Particle systems with realistic physics</li>
                  <li>• Curtain effects for depth</li>
                  <li>• Atmospheric lighting and fog</li>
                </ul>
              </div>
            </div>

            <div className="glass-glass-grid glass-glass-glass-grid-cols-1 md:glass-glass-glass-grid-cols-4 glass-glass-gap-6">
              <div className="glass-glass-p-4 glass-surface-subtle/10 backdrop-blur-lg glass-radius-lg glass-glass-border glass-glass-border-white/20 glass-glass-text-center">
                <div className="glass-glass-text-3xl glass-glass-mb-2">🎨</div>
                <div className="glass-glass-text-primary glass-glass-font-semibold">Color Palettes</div>
                <div className="glass-glass-text-primary/60 glass-glass-text-sm">6+ themes</div>
              </div>

              <div className="glass-glass-p-4 glass-surface-subtle/10 backdrop-blur-lg glass-radius-lg glass-glass-border glass-glass-border-white/20 glass-glass-text-center">
                <div className="glass-glass-text-3xl glass-glass-mb-2">🎭</div>
                <div className="glass-glass-text-primary glass-glass-font-semibold">Animation Modes</div>
                <div className="glass-glass-text-primary/60 glass-glass-text-sm">4 styles</div>
              </div>

              <div className="glass-glass-p-4 glass-surface-subtle/10 backdrop-blur-lg glass-radius-lg glass-glass-border glass-glass-border-white/20 glass-glass-text-center">
                <div className="glass-glass-text-3xl glass-glass-mb-2">⚡</div>
                <div className="glass-glass-text-primary glass-glass-font-semibold">Performance</div>
                <div className="glass-glass-text-primary/60 glass-glass-text-sm">60fps</div>
              </div>

              <div className="glass-glass-p-4 glass-surface-subtle/10 backdrop-blur-lg glass-radius-lg glass-glass-border glass-glass-border-white/20 glass-glass-text-center">
                <div className="glass-glass-text-3xl glass-glass-mb-2">🎛️</div>
                <div className="glass-glass-text-primary glass-glass-font-semibold">Controls</div>
                <div className="glass-glass-text-primary/60 glass-glass-text-sm">Interactive</div>
              </div>
            </div>
          </div>
        </div>
      </AuroraPro>
    </div>
  )
};

export const CustomAurora: Story = {
  args: {
    intensity: 1.2,
    speed: 1.0,
    colorPalette: 'custom',
    customColors: ['#ff6b6b', '#4ecdc4', '#45b7d1'],
    particleCount: 45,
    showParticles: true,
    showWaves: true,
    showCurtain: false,
    animationMode: 'shift',
    showControls: true
  },
  render: (args) => (
    <div className="glass-glass-relative">
      <AuroraPro {...args}>
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-slate-800 to-gray-900 glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-p-8">
          <div className="glass-glass-text-center glass-glass-text-primary max-w-2xl">
            <div className="glass-glass-text-6xl mb-6">🎨</div>
            <h1 className="glass-glass-text-4xl font-bold mb-6">Custom Aurora</h1>
            <p className="glass-glass-text-xl text-gray-300 mb-8">
              Create your own aurora experience with custom color palettes.
              Mix and match colors to create unique atmospheric effects.
            </p>
            <div className="glass-glass-p-4 glass-surface-subtle/10 backdrop-blur-lg glass-radius-xl glass-glass-border glass-glass-border-white/20">
              <h3 className="glass-glass-text-lg glass-glass-font-semibold glass-glass-text-primary glass-glass-mb-4">Custom Colors</h3>
              <div className="glass-glass-flex glass-glass-justify-center glass-glass-gap-4 glass-glass-mb-4">
                <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2">
                  <div className="glass-glass-w-6 glass-glass-h-6 glass-radius-full glass-surface-red"></div>
                  <span className="glass-glass-text-primary/80 glass-glass-text-sm">Coral Red</span>
                </div>
                <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2">
                  <div className="glass-glass-w-6 glass-glass-h-6 glass-radius-full bg-teal-400"></div>
                  <span className="glass-glass-text-primary/80 glass-glass-text-sm">Teal</span>
                </div>
                <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2">
                  <div className="glass-glass-w-6 glass-glass-h-6 glass-radius-full glass-surface-blue"></div>
                  <span className="glass-glass-text-primary/80 glass-glass-text-sm">Sky Blue</span>
                </div>
              </div>
              <p className="glass-glass-text-primary/60 glass-glass-text-sm">
                Customize the aurora colors to match your brand or create unique visual experiences
              </p>
            </div>
          </div>
        </div>
      </AuroraPro>
    </div>
  )
};

