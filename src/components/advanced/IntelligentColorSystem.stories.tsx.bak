import type { Meta, StoryObj } from '@storybook/react';
import { ColorAdaptationDemo, IntelligentColorProvider } from './IntelligentColorSystem';

const meta: Meta<typeof IntelligentColorProvider> = {
  title: 'Advanced/IntelligentColorSystem',
  component: IntelligentColorProvider,
  parameters: {
    docs: {
      description: {
        component: 'AI-powered color adaptation system that analyzes content, adapts to time, season, and brand colors with intelligent color schemes and accessibility compliance.',
      },
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof IntelligentColorProvider>;

export const InteractiveDemo: Story = {
  args: {},
  render: () => (
    <IntelligentColorProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              🎨 Intelligent Color System Demo
            </h1>
            <p className="text-xl text-white/80">
              AI-powered color adaptation with real-time analysis
            </p>
          </div>

          <ColorAdaptationDemo />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">🧠 Content Analysis</h3>
              <p className="text-white/70 mb-4">
                Automatically analyzes images, text, and DOM elements to extract dominant colors and mood.
              </p>
              <div className="space-y-2 text-sm text-white/60">
                <div>• Dominant color extraction</div>
                <div>• Brightness and contrast analysis</div>
                <div>• Temperature and saturation detection</div>
                <div>• Mood classification</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">⏰ Time-Based Adaptation</h3>
              <p className="text-white/70 mb-4">
                Adapts color schemes throughout the day for optimal user experience.
              </p>
              <div className="space-y-2 text-sm text-white/60">
                <div>• Dawn: Warm amber tones</div>
                <div>• Day: Bright blue accents</div>
                <div>• Evening: Orange transitions</div>
                <div>• Night: Indigo and purple</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">🍂 Seasonal Themes</h3>
              <p className="text-white/70 mb-4">
                Automatically switches color palettes based on seasons.
              </p>
              <div className="space-y-2 text-sm text-white/60">
                <div>• Spring: Green and pink</div>
                <div>• Summer: Cyan and coral</div>
                <div>• Autumn: Orange and yellow</div>
                <div>• Winter: Indigo and purple</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">🏢 Brand Integration</h3>
              <p className="text-white/70 mb-4">
                Seamlessly integrates brand colors while maintaining harmony.
              </p>
              <div className="space-y-2 text-sm text-white/60">
                <div>• Entity-based branding</div>
                <div>• Color history tracking</div>
                <div>• Intelligent blending</div>
                <div>• Accessibility compliance</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">♿ Accessibility First</h3>
              <p className="text-white/70 mb-4">
                Ensures WCAG AA/AAA compliance with automatic contrast adjustment.
              </p>
              <div className="space-y-2 text-sm text-white/60">
                <div>• Automatic contrast ratios</div>
                <div>• Color blindness support</div>
                <div>• High contrast mode</div>
                <div>• Reduced motion respect</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">⚡ Performance Optimized</h3>
              <p className="text-white/70 mb-4">
                Real-time adaptation with smooth transitions and battery awareness.
              </p>
              <div className="space-y-2 text-sm text-white/60">
                <div>• 60fps smooth transitions</div>
                <div>• Battery-aware processing</div>
                <div>• Lazy evaluation</div>
                <div>• CSS custom properties</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </IntelligentColorProvider>
  ),
};

export const TimeBasedAdaptation: Story = {
  args: {},
  render: () => (
    <IntelligentColorProvider>
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Time-Based Color Adaptation</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-6 mb-4">
                <div className="text-4xl mb-2">🌅</div>
                <div className="text-white font-semibold">Dawn</div>
                <div className="text-white/80 text-sm">5-9 AM</div>
              </div>
              <button className="w-full bg-amber-500 text-white py-2 px-4 rounded-lg hover:bg-amber-600 transition-colors">
                Apply Dawn
              </button>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl p-6 mb-4">
                <div className="text-4xl mb-2">☀️</div>
                <div className="text-white font-semibold">Day</div>
                <div className="text-white/80 text-sm">9-5 PM</div>
              </div>
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                Apply Day
              </button>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-6 mb-4">
                <div className="text-4xl mb-2">🌆</div>
                <div className="text-white font-semibold">Evening</div>
                <div className="text-white/80 text-sm">5-8 PM</div>
              </div>
              <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors">
                Apply Evening
              </button>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl p-6 mb-4">
                <div className="text-4xl mb-2">🌙</div>
                <div className="text-white font-semibold">Night</div>
                <div className="text-white/80 text-sm">8-5 AM</div>
              </div>
              <button className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors">
                Apply Night
              </button>
            </div>
          </div>
        </div>
      </div>
    </IntelligentColorProvider>
  ),
};

export const SeasonalThemes: Story = {
  args: {},
  render: () => (
    <IntelligentColorProvider>
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Seasonal Color Themes</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-400 to-pink-400 rounded-2xl p-6 mb-4">
                <div className="text-4xl mb-2">🌸</div>
                <div className="text-white font-semibold">Spring</div>
                <div className="text-white/80 text-sm">Mar-May</div>
              </div>
              <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
                Apply Spring
              </button>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-cyan-400 to-orange-400 rounded-2xl p-6 mb-4">
                <div className="text-4xl mb-2">🏖️</div>
                <div className="text-white font-semibold">Summer</div>
                <div className="text-white/80 text-sm">Jun-Aug</div>
              </div>
              <button className="w-full bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-600 transition-colors">
                Apply Summer
              </button>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-400 to-yellow-400 rounded-2xl p-6 mb-4">
                <div className="text-4xl mb-2">🍂</div>
                <div className="text-white font-semibold">Autumn</div>
                <div className="text-white/80 text-sm">Sep-Nov</div>
              </div>
              <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors">
                Apply Autumn
              </button>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-indigo-400 to-cyan-400 rounded-2xl p-6 mb-4">
                <div className="text-4xl mb-2">❄️</div>
                <div className="text-white font-semibold">Winter</div>
                <div className="text-white/80 text-sm">Dec-Feb</div>
              </div>
              <button className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors">
                Apply Winter
              </button>
            </div>
          </div>
        </div>
      </div>
    </IntelligentColorProvider>
  ),
};

export const BrandIntegration: Story = {
  args: {},
  render: () => (
    <IntelligentColorProvider>
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Brand Color Integration</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 mb-4">
                <div className="text-4xl mb-2">🍎</div>
                <div className="text-white font-semibold">Apple</div>
                <div className="text-white/80 text-sm">#007AFF</div>
              </div>
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                Apply Apple
              </button>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-600 to-green-500 rounded-2xl p-6 mb-4">
                <div className="text-4xl mb-2">🔍</div>
                <div className="text-white font-semibold">Google</div>
                <div className="text-white/80 text-sm">#4285F4</div>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Apply Google
              </button>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-700 to-blue-800 rounded-2xl p-6 mb-4">
                <div className="text-4xl mb-2">🪟</div>
                <div className="text-white font-semibold">Microsoft</div>
                <div className="text-white/80 text-sm">#0078D4</div>
              </div>
              <button className="w-full bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors">
                Apply Microsoft
              </button>
            </div>
          </div>

          <div className="mt-8 p-6 bg-white/10 backdrop-blur-lg rounded-2xl">
            <h3 className="text-xl font-semibold text-white mb-4">Brand Integration Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
              <div>
                <h4 className="font-medium text-white mb-2">🎯 Smart Blending</h4>
                <p>Intelligently blends brand colors with existing palettes</p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">📊 Color History</h4>
                <p>Tracks brand color evolution over time</p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">♿ Accessibility</h4>
                <p>Maintains contrast ratios and accessibility standards</p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">⚡ Real-time</h4>
                <p>Smooth transitions between different brand themes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </IntelligentColorProvider>
  ),
};
