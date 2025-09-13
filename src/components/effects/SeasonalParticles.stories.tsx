import type { Meta, StoryObj } from '@storybook/react';
import { SeasonalParticles } from './SeasonalParticles';

import { cn } from '../../lib/utils';
const meta: Meta<typeof SeasonalParticles> = {
  title: 'Effects/SeasonalParticles',
  component: SeasonalParticles,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Beautiful seasonal particle effects that dynamically adapt to different seasons with realistic weather and environmental animations.'
      }
    }
  },
  argTypes: {
    season: {
      control: { type: 'select', options: ['winter', 'spring', 'summer', 'autumn', 'auto'] },
      description: 'Season for particle effects'
    },
    particleCount: {
      control: { type: 'number', min: 10, max: 100, step: 10 },
      description: 'Number of particles'
    },
    windStrength: {
      control: { type: 'number', min: 0, max: 2, step: 0.1 },
      description: 'Wind strength affecting particles'
    },
    animationSpeed: {
      control: { type: 'number', min: 0.1, max: 2, step: 0.1 },
      description: 'Animation speed multiplier'
    },
    autoSeason: {
      control: 'boolean',
      description: 'Automatically cycle through seasons'
    },
    seasonDuration: {
      control: { type: 'number', min: 5000, max: 30000, step: 1000 },
      description: 'Duration of each season in auto mode'
    },
    showControls: {
      control: 'boolean',
      description: 'Show season controls'
    }
  }
};

export default meta;
type Story = StoryObj<typeof SeasonalParticles>;

export const Winter: Story = {
  args: {
    season: 'winter',
    particleCount: 50,
    windStrength: 0.5,
    animationSpeed: 1,
    autoSeason: false,
    showControls: true
  },
  render: (args) => (
    <div className="glass-glass-relative">
      <SeasonalParticles {...args}>
        <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-p-8">
          <div className="glass-glass-text-center glass-glass-text-primary">
            <div className="glass-glass-text-6xl glass-glass-mb-4">❄️</div>
            <h1 className="glass-glass-text-4xl font-bold glass-glass-mb-4">Winter Wonderland</h1>
            <p className="glass-glass-text-xl text-blue-200 max-w-2xl">
              Experience the magic of falling snow with realistic physics and beautiful winter ambiance.
              Watch the snowflakes gently drift down with natural wind effects.
            </p>
            <div className="mt-8 glass-glass-p-4 glass-surface-subtle/10 backdrop-blur-lg glass-radius-xl glass-glass-border glass-glass-border-white/20">
              <p className="glass-glass-text-sm text-blue-200">
                ❄️ Snow particles with realistic falling animation<br/>
                🌬️ Wind effects that influence particle movement<br/>
                🎨 Dynamic lighting and atmospheric effects
              </p>
            </div>
          </div>
        </div>
      </SeasonalParticles>
    </div>
  )
};

export const Spring: Story = {
  args: {
    season: 'spring',
    particleCount: 40,
    windStrength: 0.8,
    animationSpeed: 1.2,
    autoSeason: false,
    showControls: true
  },
  render: (args) => (
    <div className="glass-glass-relative">
      <SeasonalParticles {...args}>
        <div className="min-h-screen bg-gradient-to-b from-pink-400 via-pink-300 to-green-300 glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-p-8">
          <div className="glass-glass-text-center glass-text-secondary">
            <div className="glass-glass-text-6xl glass-glass-mb-4">🌸</div>
            <h1 className="glass-glass-text-4xl font-bold glass-glass-mb-4">Spring Blossoms</h1>
            <p className="glass-glass-text-xl glass-text-secondary max-w-2xl">
              Celebrate the arrival of spring with floating petals and gentle breezes.
              Experience the rebirth of nature through delicate particle animations.
            </p>
            <div className="mt-8 glass-glass-p-4 glass-surface-subtle/80 backdrop-blur-lg glass-radius-xl glass-glass-border glass-glass-border-white/50">
              <p className="glass-glass-text-sm glass-text-secondary">
                🌸 Floating flower petals with organic movement<br/>
                🌬️ Gentle spring breezes affecting particles<br/>
                🎨 Vibrant colors celebrating new life
              </p>
            </div>
          </div>
        </div>
      </SeasonalParticles>
    </div>
  )
};

export const Summer: Story = {
  args: {
    season: 'summer',
    particleCount: 30,
    windStrength: 1.2,
    animationSpeed: 1.5,
    autoSeason: false,
    showControls: true
  },
  render: (args) => (
    <div className="glass-glass-relative">
      <SeasonalParticles {...args}>
        <div className="min-h-screen bg-gradient-to-b from-yellow-400 via-orange-400 to-red-400 glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-p-8">
          <div className="glass-glass-text-center glass-glass-text-primary">
            <div className="glass-glass-text-6xl glass-glass-mb-4">☀️</div>
            <h1 className="glass-glass-text-4xl font-bold glass-glass-mb-4">Summer Rays</h1>
            <p className="glass-glass-text-xl text-orange-100 max-w-2xl">
              Feel the warmth of summer with radiant sun rays and golden particles.
              Experience the energy and brightness of the summer season.
            </p>
            <div className="mt-8 glass-glass-p-4 glass-surface-dark/20 backdrop-blur-lg glass-radius-xl glass-glass-border glass-glass-border-white/30">
              <p className="glass-glass-text-sm text-orange-100">
                ☀️ Radiant sun rays with pulsing light effects<br/>
                🌟 Golden particles dancing in the summer breeze<br/>
                🎨 Warm, vibrant colors evoking summer energy
              </p>
            </div>
          </div>
        </div>
      </SeasonalParticles>
    </div>
  )
};

export const Autumn: Story = {
  args: {
    season: 'autumn',
    particleCount: 45,
    windStrength: 1.0,
    animationSpeed: 0.8,
    autoSeason: false,
    showControls: true
  },
  render: (args) => (
    <div className="glass-glass-relative">
      <SeasonalParticles {...args}>
        <div className="min-h-screen bg-gradient-to-b from-orange-600 via-red-600 to-yellow-600 glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-p-8">
          <div className="glass-glass-text-center glass-glass-text-primary">
            <div className="glass-glass-text-6xl glass-glass-mb-4">🍂</div>
            <h1 className="glass-glass-text-4xl font-bold glass-glass-mb-4">Autumn Leaves</h1>
            <p className="glass-glass-text-xl text-orange-100 max-w-2xl">
              Witness the beauty of fall with gently falling leaves and crisp autumn winds.
              Experience the changing colors and peaceful descent of autumn foliage.
            </p>
            <div className="mt-8 glass-glass-p-4 glass-surface-dark/20 backdrop-blur-lg glass-radius-xl glass-glass-border glass-glass-border-white/30">
              <p className="glass-glass-text-sm text-orange-100">
                🍂 Falling autumn leaves with realistic physics<br/>
                🌬️ Crisp winds carrying particles naturally<br/>
                🎨 Rich, earthy colors of fall foliage
              </p>
            </div>
          </div>
        </div>
      </SeasonalParticles>
    </div>
  )
};

export const AutoSeason: Story = {
  args: {
    season: 'auto',
    particleCount: 35,
    windStrength: 0.7,
    animationSpeed: 1,
    autoSeason: true,
    seasonDuration: 8000,
    showControls: true
  },
  render: (args) => (
    <div className="glass-glass-relative">
      <SeasonalParticles {...args}>
        <div className="min-h-screen glass-gradient-primary from-purple-900 via-blue-900 to-green-900 glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-p-8">
          <div className="glass-glass-text-center glass-glass-text-primary">
            <div className="glass-glass-text-6xl glass-glass-mb-4">🌈</div>
            <h1 className="glass-glass-text-4xl font-bold glass-glass-mb-4">Seasonal Journey</h1>
            <p className="glass-glass-text-xl text-purple-200 max-w-2xl">
              Embark on a journey through all four seasons automatically.
              Watch as the environment transforms with each seasonal change.
            </p>
            <div className="mt-8 glass-glass-p-4 glass-surface-subtle/10 backdrop-blur-lg glass-radius-xl glass-glass-border glass-glass-border-white/20">
              <p className="glass-glass-text-sm text-purple-200">
                🌈 Automatic seasonal progression every 8 seconds<br/>
                🔄 Smooth transitions between different environments<br/>
                🎭 Dynamic particle systems adapting to each season
              </p>
            </div>
            <div className="mt-4 glass-glass-text-sm text-purple-300">
              Seasons cycle: Winter → Spring → Summer → Autumn → Repeat
            </div>
          </div>
        </div>
      </SeasonalParticles>
    </div>
  )
};

export const MinimalWinter: Story = {
  args: {
    season: 'winter',
    particleCount: 20,
    windStrength: 0.3,
    animationSpeed: 0.6,
    autoSeason: false,
    showControls: false
  },
  render: (args) => (
    <div className="glass-glass-relative">
      <SeasonalParticles {...args}>
        <div className="min-h-screen glass-surface-subtle glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-p-8">
          <div className="glass-glass-text-center">
            <div className="glass-glass-text-4xl glass-glass-mb-4">❄️</div>
            <h1 className="glass-glass-text-2xl font-bold glass-text-secondary glass-glass-mb-4">Minimal Winter</h1>
            <p className="glass-text-secondary max-w-xl">
              A subtle winter scene with gentle snowfall.
              Perfect for applications needing understated seasonal effects.
            </p>
          </div>
        </div>
      </SeasonalParticles>
    </div>
  )
};

export const IntenseSummer: Story = {
  args: {
    season: 'summer',
    particleCount: 80,
    windStrength: 1.5,
    animationSpeed: 2,
    autoSeason: false,
    showControls: true
  },
  render: (args) => (
    <div className="glass-glass-relative">
      <SeasonalParticles {...args}>
        <div className="min-h-screen bg-gradient-to-b from-yellow-300 via-orange-400 to-red-500 glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-p-8">
          <div className="glass-glass-text-center glass-glass-text-primary">
            <div className="glass-glass-text-5xl glass-glass-mb-4">☀️</div>
            <h1 className="glass-glass-text-3xl font-bold glass-glass-mb-4">Intense Summer</h1>
            <p className="glass-glass-text-xl text-yellow-100 max-w-2xl">
              Experience summer in full intensity with abundant sun rays and strong winds.
              Feel the heat and energy of the brightest season!
            </p>
          </div>
        </div>
      </SeasonalParticles>
    </div>
  )
};

export const SeasonalGallery: Story = {
  args: {
    season: 'auto',
    particleCount: 25,
    windStrength: 0.6,
    animationSpeed: 0.8,
    autoSeason: true,
    seasonDuration: 12000,
    showControls: true
  },
  render: (args) => (
    <div className="glass-glass-relative">
      <SeasonalParticles {...args}>
        <div className="min-h-screen glass-glass-p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="glass-glass-text-4xl font-bold glass-glass-text-primary glass-glass-text-center mb-12">
              Seasonal Gallery
            </h1>

            <div className="glass-glass-grid glass-glass-glass-grid-cols-1 md:glass-glass-glass-grid-cols-2 glass-glass-gap-8">
              <div className="glass-glass-p-6 glass-surface-subtle/10 backdrop-blur-lg glass-radius-xl glass-glass-border glass-glass-border-white/20">
                <h3 className="glass-glass-text-xl glass-glass-font-semibold glass-glass-text-primary glass-glass-mb-4">Winter ❄️</h3>
                <p className="glass-glass-text-primary/80 glass-glass-text-sm glass-glass-mb-4">
                  Gentle snowfall with crystalline beauty and peaceful ambiance.
                  Perfect for creating a serene, magical atmosphere.
                </p>
                <div className="glass-glass-text-xs text-blue-300">
                  • Realistic snow physics<br/>
                  • Wind-affected drift<br/>
                  • Icy blue aesthetics
                </div>
              </div>

              <div className="glass-glass-p-6 glass-surface-subtle/10 backdrop-blur-lg glass-radius-xl glass-glass-border glass-glass-border-white/20">
                <h3 className="glass-glass-text-xl glass-glass-font-semibold glass-glass-text-primary glass-glass-mb-4">Spring 🌸</h3>
                <p className="glass-glass-text-primary/80 glass-glass-text-sm glass-glass-mb-4">
                  Delicate flower petals dancing in the spring breeze.
                  Symbolizing renewal and the beauty of new beginnings.
                </p>
                <div className="glass-glass-text-xs text-pink-300">
                  • Organic petal movement<br/>
                  • Vibrant spring colors<br/>
                  • Gentle floating animation
                </div>
              </div>

              <div className="glass-glass-p-6 glass-surface-subtle/10 backdrop-blur-lg glass-radius-xl glass-glass-border glass-glass-border-white/20">
                <h3 className="glass-glass-text-xl glass-glass-font-semibold glass-glass-text-primary glass-glass-mb-4">Summer ☀️</h3>
                <p className="glass-glass-text-primary/80 glass-glass-text-sm glass-glass-mb-4">
                  Radiant sun rays and golden particles filling the air.
                  Capturing the warmth and energy of bright summer days.
                </p>
                <div className="glass-glass-text-xs text-yellow-300">
                  • Pulsing light effects<br/>
                  • Golden particle systems<br/>
                  • Warm, vibrant energy
                </div>
              </div>

              <div className="glass-glass-p-6 glass-surface-subtle/10 backdrop-blur-lg glass-radius-xl glass-glass-border glass-glass-border-white/20">
                <h3 className="glass-glass-text-xl glass-glass-font-semibold glass-glass-text-primary glass-glass-mb-4">Autumn 🍂</h3>
                <p className="glass-glass-text-primary/80 glass-glass-text-sm glass-glass-mb-4">
                  Falling leaves in rich autumn colors with realistic physics.
                  Celebrating the beauty of change and transition.
                </p>
                <div className="glass-glass-text-xs text-orange-300">
                  • Realistic leaf physics<br/>
                  • Earthy autumn palette<br/>
                  • Swirling wind effects
                </div>
              </div>
            </div>
          </div>
        </div>
      </SeasonalParticles>
    </div>
  )
};

