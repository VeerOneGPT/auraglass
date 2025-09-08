import type { Meta, StoryObj } from '@storybook/react';
import { OptimizedGlassCore } from './OptimizedGlassCore';
import { GlassVariant, BlurIntensity } from '../core/mixins/glassMixins';

const meta: Meta<typeof OptimizedGlassCore> = {
  title: 'Primitives/OptimizedGlassCore',
  component: OptimizedGlassCore,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The optimized glass morphism component with performance enhancements and advanced features.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['frosted', 'crystal', 'tinted', 'metallic', 'neon'] as GlassVariant[],
      description: 'Glass morphism variant',
    },
    blur: {
      control: { type: 'select' },
      options: ['none', 'light', 'medium', 'heavy', 'ultra'] as BlurIntensity[],
      description: 'Blur intensity',
    },
    intensity: {
      control: { type: 'select' },
      options: ['subtle', 'medium', 'strong', 'intense', 'ultra', 'extreme'],
      description: 'Glass intensity level',
    },
    depth: {
      control: { type: 'select' },
      options: ['shallow', 'medium', 'deep', 'extreme'],
      description: 'Glass depth effect',
    },
    elevation: {
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4, 'float'],
      description: 'Elevation level',
    },
    border: {
      control: { type: 'select' },
      options: ['none', 'subtle', 'medium', 'strong', 'glow', 'gradient', 'neon', 'dynamic', 'particle'],
      description: 'Border style',
    },
    optimization: {
      control: { type: 'select' },
      options: ['auto', 'high', 'medium', 'low'],
      description: 'Performance optimization level',
    },
    glow: {
      control: 'boolean',
      description: 'Enable glow effect',
    },
    hover: {
      control: 'boolean',
      description: 'Enable hover effects',
    },
  },
  args: {
    variant: 'crystal',
    blur: 'medium',
    intensity: 'medium',
    depth: 'medium',
    elevation: 2,
    border: 'subtle',
    optimization: 'auto',
    glow: false,
    hover: true,
  },
};

export default meta;
type Story = StoryObj<typeof OptimizedGlassCore>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">Optimized Glass</h3>
        <p className="text-sm opacity-80">Performance-optimized glass morphism surface.</p>
      </div>
    ),
  },
};

export const IntensityLevels: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl">
      {(['subtle', 'medium', 'strong', 'intense', 'ultra', 'extreme'] as const).map((intensity) => (
        <OptimizedGlassCore key={intensity} {...args} intensity={intensity}>
          <div className="p-4 text-center">
            <h4 className="text-sm font-medium capitalize mb-1">{intensity}</h4>
            <p className="text-xs opacity-70">Intensity</p>
          </div>
        </OptimizedGlassCore>
      ))}
    </div>
  ),
  args: {
    children: null,
  },
};

export const DepthEffects: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 gap-4 max-w-2xl">
      {(['shallow', 'medium', 'deep', 'extreme'] as const).map((depth) => (
        <OptimizedGlassCore key={depth} {...args} depth={depth}>
          <div className="p-4 text-center">
            <h4 className="text-sm font-medium capitalize mb-1">{depth}</h4>
            <p className="text-xs opacity-70">Depth</p>
          </div>
        </OptimizedGlassCore>
      ))}
    </div>
  ),
  args: {
    children: null,
  },
};

export const BorderStyles: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl">
      {(['subtle', 'medium', 'strong', 'glow', 'gradient', 'neon'] as const).map((border) => (
        <OptimizedGlassCore key={border} {...args} border={border}>
          <div className="p-4 text-center">
            <h4 className="text-sm font-medium capitalize mb-1">{border}</h4>
            <p className="text-xs opacity-70">Border</p>
          </div>
        </OptimizedGlassCore>
      ))}
    </div>
  ),
  args: {
    children: null,
  },
};

export const ElevationLevels: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl">
      {([0, 1, 2, 3, 4, 'float'] as const).map((elevation) => (
        <OptimizedGlassCore key={elevation} {...args} elevation={elevation}>
          <div className="p-4 text-center">
            <h4 className="text-sm font-medium capitalize mb-1">{elevation}</h4>
            <p className="text-xs opacity-70">Elevation</p>
          </div>
        </OptimizedGlassCore>
      ))}
    </div>
  ),
  args: {
    children: null,
  },
};

export const PerformanceOptimized: Story = {
  args: {
    optimization: 'high',
    hardwareAcceleration: true,
    children: (
      <div className="p-6 text-center">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">High Performance</h3>
        <p className="text-sm opacity-80">
          Optimized for maximum performance with hardware acceleration enabled.
        </p>
      </div>
    ),
  },
};

export const Showcase: Story = {
  args: {
    variant: 'metallic',
    intensity: 'ultra',
    depth: 'extreme',
    elevation: 4,
    border: 'neon',
    glow: true,
    glowColor: 'rgba(139, 92, 246, 0.6)',
    glowIntensity: 0.8,
    tint: 'rgba(139, 92, 246, 0.1)',
    hover: true,
    children: (
      <div className="p-8 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center shadow-2xl">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Ultra Glass Effect
        </h3>
        <p className="text-sm opacity-80 mb-6 leading-relaxed">
          Experience the pinnacle of glass morphism technology with extreme depth,
          metallic variant, neon borders, and dynamic glow effects.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <span className="px-3 py-1 bg-purple-500/20 rounded-full text-xs font-medium">Ultra Performance</span>
          <span className="px-3 py-1 bg-pink-500/20 rounded-full text-xs font-medium">Extreme Depth</span>
          <span className="px-3 py-1 bg-blue-500/20 rounded-full text-xs font-medium">Neon Glow</span>
        </div>
      </div>
    ),
  },
};
