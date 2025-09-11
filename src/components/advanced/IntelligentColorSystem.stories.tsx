import type { Meta, StoryObj } from "@storybook/react";
import {
  ColorAdaptationDemo,
  IntelligentColorProvider,
} from "./IntelligentColorSystem";
const meta: Meta<typeof IntelligentColorProvider> = {
  title: "Advanced/IntelligentColorSystem",
  component: IntelligentColorProvider,
  parameters: {
    docs: {
      description: {
        component:
          "AI-powered color adaptation system that analyzes content, adapts to time, season, and brand colors with intelligent color schemes and accessibility compliance.",
      },
    },
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof IntelligentColorProvider>;

export const InteractiveDemo: Story = {
  args: {},
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-8">
          🎨 Intelligent Color System Demo
        </h1>
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">
            Interactive Color Adaptation
          </h3>
          <p className="text-white/70 mb-8">
            This demo showcases the intelligent color system's ability to adapt
            to different contexts.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-500 h-20 rounded-lg"></div>
            <div className="bg-purple-500 h-20 rounded-lg"></div>
            <div className="bg-cyan-500 h-20 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const TimeBasedAdaptation: Story = {
  args: {},
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-8">
          Time-Based Color Adaptation
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-amber-500 rounded-2xl p-6 text-white">
            <div className="text-4xl mb-2">🌅</div>
            <div className="font-semibold">Dawn</div>
          </div>
          <div className="bg-blue-500 rounded-2xl p-6 text-white">
            <div className="text-4xl mb-2">☀️</div>
            <div className="font-semibold">Day</div>
          </div>
          <div className="bg-orange-500 rounded-2xl p-6 text-white">
            <div className="text-4xl mb-2">🌆</div>
            <div className="font-semibold">Evening</div>
          </div>
          <div className="bg-indigo-500 rounded-2xl p-6 text-white">
            <div className="text-4xl mb-2">🌙</div>
            <div className="font-semibold">Night</div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const SeasonalThemes: Story = {
  args: {},
  render: () => (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            Seasonal Color Themes
          </h2>

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
    </div>
  ),
};

export const BrandIntegration: Story = {
  args: {},
  render: () => (
    <IntelligentColorProvider>
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Brand Color Integration
          </h2>

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
            <h3 className="text-xl font-semibold text-white mb-4">
              Brand Integration Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
              <div>
                <h4 className="font-medium text-white mb-2">
                  🎯 Smart Blending
                </h4>
                <p>Intelligently blends brand colors with existing palettes</p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">
                  📊 Color History
                </h4>
                <p>Tracks brand color evolution over time</p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">
                  ♿ Accessibility
                </h4>
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
