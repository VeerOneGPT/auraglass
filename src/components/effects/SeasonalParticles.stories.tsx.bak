import type { Meta, StoryObj } from '@storybook/react';
import { SeasonalParticles } from './SeasonalParticles';

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
    <div className="relative">
      <SeasonalParticles {...args}>
        <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-8">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">❄️</div>
            <h1 className="text-4xl font-bold mb-4">Winter Wonderland</h1>
            <p className="text-xl text-blue-200 max-w-2xl">
              Experience the magic of falling snow with realistic physics and beautiful winter ambiance.
              Watch the snowflakes gently drift down with natural wind effects.
            </p>
            <div className="mt-8 p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
              <p className="text-sm text-blue-200">
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
    <div className="relative">
      <SeasonalParticles {...args}>
        <div className="min-h-screen bg-gradient-to-b from-pink-400 via-pink-300 to-green-300 flex items-center justify-center p-8">
          <div className="text-center text-gray-800">
            <div className="text-6xl mb-4">🌸</div>
            <h1 className="text-4xl font-bold mb-4">Spring Blossoms</h1>
            <p className="text-xl text-gray-700 max-w-2xl">
              Celebrate the arrival of spring with floating petals and gentle breezes.
              Experience the rebirth of nature through delicate particle animations.
            </p>
            <div className="mt-8 p-4 bg-white/80 backdrop-blur-lg rounded-xl border border-white/50">
              <p className="text-sm text-gray-700">
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
    <div className="relative">
      <SeasonalParticles {...args}>
        <div className="min-h-screen bg-gradient-to-b from-yellow-400 via-orange-400 to-red-400 flex items-center justify-center p-8">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">☀️</div>
            <h1 className="text-4xl font-bold mb-4">Summer Rays</h1>
            <p className="text-xl text-orange-100 max-w-2xl">
              Feel the warmth of summer with radiant sun rays and golden particles.
              Experience the energy and brightness of the summer season.
            </p>
            <div className="mt-8 p-4 bg-black/20 backdrop-blur-lg rounded-xl border border-white/30">
              <p className="text-sm text-orange-100">
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
    <div className="relative">
      <SeasonalParticles {...args}>
        <div className="min-h-screen bg-gradient-to-b from-orange-600 via-red-600 to-yellow-600 flex items-center justify-center p-8">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">🍂</div>
            <h1 className="text-4xl font-bold mb-4">Autumn Leaves</h1>
            <p className="text-xl text-orange-100 max-w-2xl">
              Witness the beauty of fall with gently falling leaves and crisp autumn winds.
              Experience the changing colors and peaceful descent of autumn foliage.
            </p>
            <div className="mt-8 p-4 bg-black/20 backdrop-blur-lg rounded-xl border border-white/30">
              <p className="text-sm text-orange-100">
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
    <div className="relative">
      <SeasonalParticles {...args}>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-green-900 flex items-center justify-center p-8">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">🌈</div>
            <h1 className="text-4xl font-bold mb-4">Seasonal Journey</h1>
            <p className="text-xl text-purple-200 max-w-2xl">
              Embark on a journey through all four seasons automatically.
              Watch as the environment transforms with each seasonal change.
            </p>
            <div className="mt-8 p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
              <p className="text-sm text-purple-200">
                🌈 Automatic seasonal progression every 8 seconds<br/>
                🔄 Smooth transitions between different environments<br/>
                🎭 Dynamic particle systems adapting to each season
              </p>
            </div>
            <div className="mt-4 text-sm text-purple-300">
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
    <div className="relative">
      <SeasonalParticles {...args}>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="text-4xl mb-4">❄️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Minimal Winter</h1>
            <p className="text-gray-600 max-w-xl">
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
    <div className="relative">
      <SeasonalParticles {...args}>
        <div className="min-h-screen bg-gradient-to-b from-yellow-300 via-orange-400 to-red-500 flex items-center justify-center p-8">
          <div className="text-center text-white">
            <div className="text-5xl mb-4">☀️</div>
            <h1 className="text-3xl font-bold mb-4">Intense Summer</h1>
            <p className="text-xl text-yellow-100 max-w-2xl">
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
    <div className="relative">
      <SeasonalParticles {...args}>
        <div className="min-h-screen p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-white text-center mb-12">
              Seasonal Gallery
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">Winter ❄️</h3>
                <p className="text-white/80 text-sm mb-4">
                  Gentle snowfall with crystalline beauty and peaceful ambiance.
                  Perfect for creating a serene, magical atmosphere.
                </p>
                <div className="text-xs text-blue-300">
                  • Realistic snow physics<br/>
                  • Wind-affected drift<br/>
                  • Icy blue aesthetics
                </div>
              </div>

              <div className="p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">Spring 🌸</h3>
                <p className="text-white/80 text-sm mb-4">
                  Delicate flower petals dancing in the spring breeze.
                  Symbolizing renewal and the beauty of new beginnings.
                </p>
                <div className="text-xs text-pink-300">
                  • Organic petal movement<br/>
                  • Vibrant spring colors<br/>
                  • Gentle floating animation
                </div>
              </div>

              <div className="p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">Summer ☀️</h3>
                <p className="text-white/80 text-sm mb-4">
                  Radiant sun rays and golden particles filling the air.
                  Capturing the warmth and energy of bright summer days.
                </p>
                <div className="text-xs text-yellow-300">
                  • Pulsing light effects<br/>
                  • Golden particle systems<br/>
                  • Warm, vibrant energy
                </div>
              </div>

              <div className="p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">Autumn 🍂</h3>
                <p className="text-white/80 text-sm mb-4">
                  Falling leaves in rich autumn colors with realistic physics.
                  Celebrating the beauty of change and transition.
                </p>
                <div className="text-xs text-orange-300">
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

