import type { Meta, StoryObj } from '@storybook/react';
import { GlassParallaxLayers, parallaxPresets } from './GlassParallaxLayers';

import { cn } from '../../lib/utils';
const meta = {
  title: 'Advanced/GlassParallaxLayers',
  component: GlassParallaxLayers,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof GlassParallaxLayers>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HeroSection: Story = {
  args: {
    layers: [
      {
        depth: 0,
        blur: 'none',
        content: (
          <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-h-full">
            <h1 className="glass-glass-text-6xl glass-font-bold">Foreground</h1>
          </div>
        ),
      },
      {
        depth: 3,
        blur: 'sm',
        content: (
          <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-h-full">
            <h2 className="glass-glass-text-4xl glass-glass-font-semibold glass-text-secondary">Midground</h2>
          </div>
        ),
      },
      {
        depth: 6,
        blur: 'md',
        content: (
          <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-h-full">
            <div className="glass-glass-grid glass-glass-glass-grid-cols-3 glass-glass-gap-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="w-32 h-32 glass-surface-primary glass-radius-lg" />
              ))}
            </div>
          </div>
        ),
      },
      {
        depth: 10,
        blur: 'lg',
        content: (
          <div className="glass-glass-absolute glass-glass-inset-0 glass-gradient-primary from-slate-100 via-sky-100 to-blue-200 dark:from-slate-800 dark:via-slate-700 dark:to-blue-800" />
        ),
      },
    ],
    className: "h-screen",
    mouseIntensity: 0.8,
    scrollIntensity: 0.5,
  },
};

export const CardStack: Story = {
  args: {
    layers: [
      {
        depth: 0,
        blur: 'none',
        scale: 1.05,
        content: (
          <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-h-full glass-glass-p-8">
            <div className="glass-card glass-glass-p-6 max-w-md">
              <h3 className="glass-glass-text-2xl glass-font-bold glass-glass-mb-2">Premium Feature</h3>
              <p className="glass-text-secondary">This card floats above the others</p>
            </div>
          </div>
        ),
      },
      {
        depth: 5,
        blur: 'sm',
        scale: 1,
        content: (
          <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-h-full glass-glass-p-8">
            <div className="glass-card glass-glass-p-6 max-w-md translate-x-12 translate-y-12">
              <h3 className="glass-glass-text-xl glass-glass-font-semibold glass-glass-mb-2">Standard Feature</h3>
              <p className="glass-text-secondary">Middle layer with subtle blur</p>
            </div>
          </div>
        ),
      },
      {
        depth: 10,
        blur: 'md',
        scale: 0.95,
        content: (
          <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-h-full glass-glass-p-8">
            <div className="glass-card glass-glass-p-6 max-w-md translate-x-24 translate-y-24">
              <h3 className="glass-glass-text-lg glass-glass-mb-2">Background Feature</h3>
              <p className="glass-text-secondary opacity-75">Deepest layer with most blur</p>
            </div>
          </div>
        ),
      },
    ],
    className: "h-96",
    mouseIntensity: 1,
    perspective: 1500,
  },
};

export const AutoRotating: Story = {
  args: {
    layers: Array.from({ length: 6 }, (_, i) => ({
      depth: i * 2,
      blur: i === 0 ? 'none' : i < 3 ? 'sm' : 'md',
      content: (
        <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-h-full">
          <div 
            className="w-64 h-64 glass-surface-primary glass-radius-xl"
            style={{
              transform: `rotate(${i * 60}deg)`,
              opacity: 1 - i * 0.15,
            }}
          />
        </div>
      ),
    })),
    className: "h-screen",
    autoRotate: true,
    rotateSpeed: 0.2,
    interactive: false,
  },
};

export const DataVisualization: Story = {
  args: {
    layers: [
      {
        depth: 0,
        blur: 'none',
        content: (
          <div className="glass-glass-p-8">
            <h3 className="glass-glass-text-xl glass-font-bold glass-glass-mb-4">Real-time Analytics</h3>
            <div className="glass-glass-grid glass-glass-glass-grid-cols-4 glass-glass-gap-4">
              {[85, 62, 91, 45].map((value, i) => (
                <div key={i} className="glass-glass-text-center">
                  <div className="glass-glass-text-3xl glass-font-bold">{value}%</div>
                  <div className="glass-glass-text-sm glass-text-secondary">Metric {i + 1}</div>
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        depth: 4,
        blur: 'sm',
        content: (
          <div className="glass-glass-absolute glass-glass-inset-0 glass-glass-p-8 pt-24">
            <div className="glass-glass-h-full glass-glass-flex glass-glass-items-end justify-around">
              {[65, 45, 80, 35, 60, 75, 40].map((height, i) => (
                <div
                  key={i}
                  className="glass-surface-info glass-glass-w-12"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
        ),
      },
      {
        depth: 8,
        blur: 'md',
        content: (
          <div className="glass-glass-absolute glass-glass-inset-0 glass-glass-flex glass-glass-items-center glass-glass-justify-center opacity-30">
            <svg viewBox="0 0 400 400" className="glass-glass-w-full glass-glass-h-full max-w-lg">
              <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="200" cy="200" r="100" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>
        ),
      },
    ],
    className: "h-96",
    mouseIntensity: 0.6,
    scrollIntensity: 0.3,
  },
};

export const InteractiveDebug: Story = {
  args: {
    layers: Array.from({ length: 5 }, (_, i) => ({
      depth: i * 2.5,
      content: (
        <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-h-full">
          <div className="glass-surface-primary glass-glass-p-4 glass-radius-lg">
            Layer {i + 1}
          </div>
        </div>
      ),
    })),
    className: "h-96",
    debug: true,
    mouseIntensity: 1,
    scrollIntensity: 0.5,
  },
};