import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import {
    BatteryAwareGlass,
    EfficientGlassRendering,
    GlassPerformanceMonitor,
    GlassPerformanceProvider,
    LazyGlassLoading,
    ProgressiveGlassEnhancement,
    useGlassPerformance
} from './GlassPerformanceOptimization';
import { createGlassStyle } from '../../core/mixins/glassMixins';

const meta: Meta<typeof GlassPerformanceProvider> = {
  title: 'Advanced/GlassPerformanceOptimization',
  component: GlassPerformanceProvider,
  parameters: {
    docs: {
      description: {
        component: 'Comprehensive performance optimization system for glassmorphism components with battery monitoring, CPU load tracking, and adaptive quality tiers.',
      },
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GlassPerformanceProvider>;

const PerformanceDashboardComponent = () => {
  const { performanceMode, batteryLevel, cpuLoad, gpuAcceleration } = useGlassPerformance();
  const [simulatedLoad, setSimulatedLoad] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedLoad(prev => {
        const change = (Math.random() - 0.5) * 10;
        return Math.max(0, Math.min(100, prev + change));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-glass-glass-grid glass-glass-glass-glass-glass-grid-cols-1 md:glass-glass-glass-glass-glass-grid-cols-2 lg:glass-glass-glass-glass-glass-grid-cols-4 glass-glass-glass-gap-6">
      <div className="glass-surface-subtle/10 backdrop-blur-lg glass-radius-2xl glass-glass-glass-p-6">
        <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-between glass-glass-glass-mb-4">
          <h3 className="glass-glass-glass-text-xl glass-glass-glass-font-semibold glass-glass-glass-text-primary">Performance Mode</h3>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            performanceMode === 'high' ? 'bg-green-500/20 text-green-400' :
            performanceMode === 'balanced' ? 'bg-blue-500/20 text-blue-400' :
            'bg-yellow-500/20 text-yellow-400'
          }`}>
            {performanceMode}
          </div>
        </div>
        <div className="glass-glass-glass-space-y-3">
          <div className="glass-glass-glass-flex glass-glass-glass-justify-between glass-glass-glass-text-primary/80">
            <span>Current Mode</span>
            <span className="glass-glass-glass-font-medium glass-glass-glass-capitalize">{performanceMode}</span>
          </div>
          <div className="glass-glass-glass-w-full glass-surface-subtle/20 glass-radius-full glass-glass-glass-h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                performanceMode === 'high' ? 'bg-green-400' :
                performanceMode === 'balanced' ? 'bg-blue-400' :
                'bg-yellow-400'
              }`}
              style={{ width: performanceMode === 'high' ? '100%' : performanceMode === 'balanced' ? '60%' : '30%' }}
            />
          </div>
        </div>
      </div>

      <div className="glass-surface-subtle/10 backdrop-blur-lg glass-radius-2xl glass-glass-glass-p-6">
        <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-between glass-glass-glass-mb-4">
          <h3 className="glass-glass-glass-text-xl glass-glass-glass-font-semibold glass-glass-glass-text-primary">Battery Level</h3>
          <div className="glass-glass-glass-text-2xl">🔋</div>
        </div>
        <div className="glass-glass-glass-space-y-3">
          <div className="glass-glass-glass-flex glass-glass-glass-justify-between glass-glass-glass-text-primary/80">
            <span>Charge</span>
            <span className="glass-glass-glass-font-medium">{batteryLevel || 85}%</span>
          </div>
          <div className="glass-glass-glass-w-full glass-surface-subtle/20 glass-radius-full glass-glass-glass-h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                (batteryLevel || 85) > 50 ? 'bg-green-400' :
                (batteryLevel || 85) > 20 ? 'bg-yellow-400' :
                'bg-red-400'
              }`}
              style={{ width: `${batteryLevel || 85}%` }}
            />
          </div>
        </div>
      </div>

      <div className="glass-surface-subtle/10 backdrop-blur-lg glass-radius-2xl glass-glass-glass-p-6">
        <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-between glass-glass-glass-mb-4">
          <h3 className="glass-glass-glass-text-xl glass-glass-glass-font-semibold glass-glass-glass-text-primary">CPU Load</h3>
          <div className="glass-glass-glass-text-2xl">⚡</div>
        </div>
        <div className="glass-glass-glass-space-y-3">
          <div className="glass-glass-glass-flex glass-glass-glass-justify-between glass-glass-glass-text-primary/80">
            <span>Usage</span>
            <span className="glass-glass-glass-font-medium">{cpuLoad.toFixed(1)}%</span>
          </div>
          <div className="glass-glass-glass-w-full glass-surface-subtle/20 glass-radius-full glass-glass-glass-h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                cpuLoad < 30 ? 'bg-green-400' :
                cpuLoad < 70 ? 'bg-yellow-400' :
                'bg-red-400'
              }`}
              style={{ width: `${cpuLoad}%` }}
            />
          </div>
        </div>
      </div>

      <div className="glass-surface-subtle/10 backdrop-blur-lg glass-radius-2xl glass-glass-glass-p-6">
        <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-between glass-glass-glass-mb-4">
          <h3 className="glass-glass-glass-text-xl glass-glass-glass-font-semibold glass-glass-glass-text-primary">GPU Acceleration</h3>
          <div className="glass-glass-glass-text-2xl">{gpuAcceleration ? '🚀' : '🐌'}</div>
        </div>
        <div className="glass-glass-glass-space-y-3">
          <div className="glass-glass-glass-flex glass-glass-glass-justify-between glass-glass-glass-text-primary/80">
            <span>Status</span>
            <span className={`font-medium ${gpuAcceleration ? 'text-green-400' : 'text-yellow-400'}`}>
              {gpuAcceleration ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          <div className="glass-glass-glass-w-full glass-surface-subtle/20 glass-radius-full glass-glass-glass-h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                gpuAcceleration ? 'bg-green-400' : 'bg-yellow-400'
              }`}
              style={{ width: gpuAcceleration ? '100%' : '50%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const PerformanceDashboard: Story = {
  args: {},
  render: () => (
    <GlassPerformanceProvider adaptivePerformance={true}>
      <div className="glass-min-glass-glass-h-screen glass-gradient-primary glass-gradient-primary via-purple-900 glass-gradient-primary glass-glass-glass-p-8">
        <div className="max-w-6xl glass-glass-glass-mx-auto">
          <div className="glass-glass-glass-text-center mb-12">
            <h1 className="glass-glass-glass-text-4xl glass-glass-glass-font-bold glass-glass-glass-text-primary glass-glass-glass-mb-4">
              ⚡ Glass Performance Optimization
            </h1>
            <p className="glass-glass-glass-text-xl glass-glass-glass-text-primary/80">
              Real-time performance monitoring and adaptive quality optimization
            </p>
          </div>

          <PerformanceDashboardComponent />

          <div className="mt-12 glass-glass-glass-grid glass-glass-glass-glass-glass-grid-cols-1 md:glass-glass-glass-glass-glass-grid-cols-2 glass-glass-glass-gap-8">
            <div className="glass-surface-subtle/10 backdrop-blur-lg glass-radius-2xl glass-glass-glass-p-6">
              <h3 className="glass-glass-glass-text-xl glass-glass-glass-font-semibold glass-glass-glass-text-primary glass-glass-glass-mb-4">Performance Modes</h3>
              <div className="glass-glass-glass-space-y-4">
                <div className="glass-glass-glass-p-4 glass-surface-green/10 glass-radius-lg glass-glass-glass-border glass-glass-glass-border-green/20">
                  <h4 className="glass-glass-glass-font-medium glass-glass-glass-text-primary glass-glass-glass-mb-2">High Performance</h4>
                  <p className="glass-glass-glass-text-primary/70 glass-glass-glass-text-sm">Full GPU acceleration, maximum effects, best user experience</p>
                </div>

                <div className="glass-glass-glass-p-4 glass-surface-blue/10 glass-radius-lg glass-glass-glass-border glass-glass-glass-border-blue/20">
                  <h4 className="glass-glass-glass-font-medium glass-glass-glass-text-primary glass-glass-glass-mb-2">Balanced</h4>
                  <p className="glass-glass-glass-text-primary/70 glass-glass-glass-text-sm">Moderate effects, good performance balance</p>
                </div>

                <div className="glass-glass-glass-p-4 glass-surface-yellow/10 glass-radius-lg glass-glass-glass-border glass-glass-glass-border-yellow/20">
                  <h4 className="glass-glass-glass-font-medium glass-glass-glass-text-primary glass-glass-glass-mb-2">Battery Saver</h4>
                  <p className="glass-glass-glass-text-primary/70 glass-glass-glass-text-sm">Minimal effects, maximum battery life</p>
                </div>
              </div>
            </div>

            <div className="glass-surface-subtle/10 backdrop-blur-lg glass-radius-2xl glass-glass-glass-p-6">
              <h3 className="glass-glass-glass-text-xl glass-glass-glass-font-semibold glass-glass-glass-text-primary glass-glass-glass-mb-4">Adaptive Features</h3>
              <div className="glass-glass-glass-space-y-3 glass-glass-glass-text-primary/80">
                <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-3">
                  <div className="glass-glass-glass-w-2 glass-glass-glass-h-2 glass-radius-full glass-surface-green" />
                  <span>Real-time battery monitoring</span>
                </div>
                <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-3">
                  <div className="glass-glass-glass-w-2 glass-glass-glass-h-2 glass-radius-full glass-surface-green" />
                  <span>CPU load estimation</span>
                </div>
                <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-3">
                  <div className="glass-glass-glass-w-2 glass-glass-glass-h-2 glass-radius-full glass-surface-green" />
                  <span>GPU capability detection</span>
                </div>
                <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-3">
                  <div className="glass-glass-glass-w-2 glass-glass-glass-h-2 glass-radius-full glass-surface-green" />
                  <span>Lazy loading system</span>
                </div>
                <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-3">
                  <div className="glass-glass-glass-w-2 glass-glass-glass-h-2 glass-radius-full glass-surface-green" />
                  <span>Progressive enhancement</span>
                </div>
                <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-3">
                  <div className="glass-glass-glass-w-2 glass-glass-glass-h-2 glass-radius-full glass-surface-green" />
                  <span>Reduced motion support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassPerformanceProvider>
  ),
};

export const EfficientRendering: Story = {
  args: {},
  render: () => (
    <GlassPerformanceProvider adaptivePerformance={true}>
      <div className="glass-min-glass-glass-h-screen glass-gradient-primary glass-gradient-primary via-purple-900 glass-gradient-primary glass-glass-glass-p-8">
        <div className="max-w-6xl glass-glass-glass-mx-auto">
          <div className="glass-glass-glass-text-center mb-12">
            <h1 className="glass-glass-glass-text-3xl glass-glass-glass-font-bold glass-glass-glass-text-primary glass-glass-glass-mb-4">
              🚀 Efficient Glass Rendering
            </h1>
            <p className="glass-glass-glass-text-xl glass-glass-glass-text-primary/80">
              GPU-accelerated glass effects with performance optimization
            </p>
          </div>

          <div className="glass-glass-glass-grid glass-glass-glass-glass-glass-grid-cols-1 md:glass-glass-glass-glass-glass-grid-cols-2 lg:glass-glass-glass-glass-glass-grid-cols-3 glass-glass-glass-gap-6 mb-12">
            <EfficientGlassRendering enableGPU={true}>
              <div className="glass-glass-glass-p-6">
                <h3 className="glass-glass-glass-text-xl glass-glass-glass-font-semibold glass-glass-glass-text-primary glass-glass-glass-mb-3">GPU Accelerated</h3>
                <p className="glass-glass-glass-text-primary/70 glass-glass-glass-text-sm glass-glass-glass-mb-4">
                  Hardware-accelerated glass effects for smooth 60fps performance
                </p>
                <div className="glass-glass-glass-space-y-2 glass-glass-glass-text-primary/60 glass-glass-glass-text-xs">
                  <div>• WebGL shaders</div>
                  <div>• Hardware acceleration</div>
                  <div>• 60fps animations</div>
                  <div>• Optimized blur effects</div>
                </div>
              </div>
            </EfficientGlassRendering>

            <EfficientGlassRendering virtualizeContent={true}>
              <div className="glass-glass-glass-p-6">
                <h3 className="glass-glass-glass-text-xl glass-glass-glass-font-semibold glass-glass-glass-text-primary glass-glass-glass-mb-3">Virtualized Content</h3>
                <p className="glass-glass-glass-text-primary/70 glass-glass-glass-text-sm glass-glass-glass-mb-4">
                  Efficient rendering for large datasets and complex content
                </p>
                <div className="glass-glass-glass-space-y-2 glass-glass-glass-text-primary/60 glass-glass-glass-text-xs">
                  <div>• Lazy loading</div>
                  <div>• Viewport culling</div>
                  <div>• Memory optimization</div>
                  <div>• Smooth scrolling</div>
                </div>
              </div>
            </EfficientGlassRendering>

            <EfficientGlassRendering deferRender={true}>
              <div className="glass-glass-glass-p-6">
                <h3 className="glass-glass-glass-text-xl glass-glass-glass-font-semibold glass-glass-glass-text-primary glass-glass-glass-mb-3">Deferred Rendering</h3>
                <p className="glass-glass-glass-text-primary/70 glass-glass-glass-text-sm glass-glass-glass-mb-4">
                  Renders only when visible in viewport for optimal performance
                </p>
                <div className="glass-glass-glass-space-y-2 glass-glass-glass-text-primary/60 glass-glass-glass-text-xs">
                  <div>• Intersection observer</div>
                  <div>• On-demand rendering</div>
                  <div>• Reduced initial load</div>
                  <div>• Progressive enhancement</div>
                </div>
              </div>
            </EfficientGlassRendering>
          </div>

          <GlassPerformanceMonitor />
        </div>
      </div>
    </GlassPerformanceProvider>
  ),
};

export const LazyLoading: Story = {
  args: {},
  render: () => {
    const [loadedComponents, setLoadedComponents] = useState<string[]>([]);

    const handleLoad = (component: string) => {
      setLoadedComponents(prev => [...prev, component]);
    };

    return (
      <GlassPerformanceProvider adaptivePerformance={true}>
        <div className="glass-min-glass-glass-h-screen glass-gradient-primary glass-gradient-primary via-purple-900 glass-gradient-primary glass-glass-glass-p-8">
          <div className="max-w-6xl glass-glass-glass-mx-auto">
            <div className="glass-glass-glass-text-center mb-12">
              <h1 className="glass-glass-glass-text-3xl glass-glass-glass-font-bold glass-glass-glass-text-primary glass-glass-glass-mb-4">
                ⏳ Lazy Loading System
              </h1>
              <p className="glass-glass-glass-text-xl glass-glass-glass-text-primary/80">
                Progressive loading of glass effects based on viewport visibility
              </p>
            </div>

            <div className="mb-8 glass-glass-glass-p-6 glass-surface-subtle/10 backdrop-blur-lg glass-radius-2xl">
              <h3 className="glass-glass-glass-text-xl glass-glass-glass-font-semibold glass-glass-glass-text-primary glass-glass-glass-mb-4">Loading Status</h3>
              <div className="glass-glass-glass-flex glass-glass-glass-flex-wrap glass-glass-glass-gap-2">
                {['Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5', 'Card 6'].map(card => (
                  <div
                    key={card}
                    className={`px-3 py-2 rounded-lg text-sm font-medium ${
                      loadedComponents.includes(card)
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-white/10 text-white/60'
                    }`}
                  >
                    {loadedComponents.includes(card) ? '✅' : '⏳'} {card}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-glass-glass-grid glass-glass-glass-glass-glass-grid-cols-1 md:glass-glass-glass-glass-glass-grid-cols-2 lg:glass-glass-glass-glass-glass-grid-cols-3 glass-glass-glass-gap-8">
              {[1, 2, 3, 4, 5, 6].map(index => (
                <LazyGlassLoading
                  key={index}
                  placeholder={
                    <div className="glass-glass-glass-h-48 glass-surface-subtle/5 glass-radius-2xl glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center">
                      <div className="glass-glass-glass-text-primary/60">Loading Card {index}...</div>
                    </div>
                  }
                  threshold={0.1}
                  rootMargin="50px"
                  onLoad={() => handleLoad(`Card ${index}`)}
                >
                  <div className="glass-glass-glass-p-6 glass-glass-glass-h-48">
                    <h3 className="glass-glass-glass-text-xl glass-glass-glass-font-semibold glass-glass-glass-text-primary glass-glass-glass-mb-3">Lazy Loaded Card {index}</h3>
                    <p className="glass-glass-glass-text-primary/70 glass-glass-glass-text-sm glass-glass-glass-mb-4">
                      This card was loaded when it came into view. Loaded: {loadedComponents.includes(`Card ${index}`) ? 'Yes' : 'No'}
                    </p>
                    <div className="glass-glass-glass-space-y-2 glass-glass-glass-text-primary/60 glass-glass-glass-text-xs">
                      <div>• Progressive enhancement</div>
                      <div>• Viewport-based loading</div>
                      <div>• Performance optimized</div>
                      <div>• Smooth transitions</div>
                    </div>
                  </div>
                </LazyGlassLoading>
              ))}
            </div>

            <div className="mt-12 glass-glass-glass-p-6 glass-surface-subtle/10 backdrop-blur-lg glass-radius-2xl">
              <h3 className="glass-glass-glass-text-xl glass-glass-glass-font-semibold glass-glass-glass-text-primary glass-glass-glass-mb-4">Lazy Loading Benefits</h3>
              <div className="glass-glass-glass-grid glass-glass-glass-glass-glass-grid-cols-1 md:glass-glass-glass-glass-glass-grid-cols-2 lg:glass-glass-glass-glass-glass-grid-cols-4 glass-glass-glass-gap-6">
                <div className="glass-glass-glass-text-center">
                  <div className="glass-glass-glass-text-3xl glass-glass-glass-mb-3">⚡</div>
                  <h4 className="glass-glass-glass-font-semibold glass-glass-glass-text-primary glass-glass-glass-mb-2">Faster Initial Load</h4>
                  <p className="glass-glass-glass-text-primary/70 glass-glass-glass-text-sm">Only load visible content</p>
                </div>
                <div className="glass-glass-glass-text-center">
                  <div className="glass-glass-glass-text-3xl glass-glass-glass-mb-3">📱</div>
                  <h4 className="glass-glass-glass-font-semibold glass-glass-glass-text-primary glass-glass-glass-mb-2">Better Mobile Performance</h4>
                  <p className="glass-glass-glass-text-primary/70 glass-glass-glass-text-sm">Reduced data usage</p>
                </div>
                <div className="glass-glass-glass-text-center">
                  <div className="glass-glass-glass-text-3xl glass-glass-glass-mb-3">🔋</div>
                  <h4 className="glass-glass-glass-font-semibold glass-glass-glass-text-primary glass-glass-glass-mb-2">Battery Efficient</h4>
                  <p className="glass-glass-glass-text-primary/70 glass-glass-glass-text-sm">Conserve device battery</p>
                </div>
                <div className="glass-glass-glass-text-center">
                  <div className="glass-glass-glass-text-3xl glass-glass-glass-mb-3">🌊</div>
                  <h4 className="glass-glass-glass-font-semibold glass-glass-glass-text-primary glass-glass-glass-mb-2">Smooth Experience</h4>
                  <p className="glass-glass-glass-text-primary/70 glass-glass-glass-text-sm">Progressive enhancement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlassPerformanceProvider>
    );
  },
};

export const BatteryOptimization: Story = {
  args: {},
  render: () => (
    <GlassPerformanceProvider adaptivePerformance={true}>
      <div className="glass-min-glass-glass-h-screen glass-gradient-primary glass-gradient-primary via-purple-900 glass-gradient-primary glass-glass-glass-p-8">
        <div className="max-w-6xl glass-glass-glass-mx-auto">
          <div className="glass-glass-glass-text-center mb-12">
            <h1 className="glass-glass-glass-text-3xl glass-glass-glass-font-bold glass-glass-glass-text-primary glass-glass-glass-mb-4">
              🔋 Battery-Aware Glass Effects
            </h1>
            <p className="glass-glass-glass-text-xl glass-glass-glass-text-primary/80">
              Intelligent power management with adaptive quality based on battery level
            </p>
          </div>

          <PerformanceDashboardComponent />

          <div className="mt-12 glass-glass-glass-grid glass-glass-glass-glass-glass-grid-cols-1 md:glass-glass-glass-glass-glass-grid-cols-3 glass-glass-glass-gap-8">
            <BatteryAwareGlass energyThresholds={{ high: 80, medium: 50, low: 20 }}>
              <div className="glass-glass-glass-p-6">
                <h3 className="glass-glass-glass-text-xl glass-glass-glass-font-semibold glass-glass-glass-text-primary glass-glass-glass-mb-3">High Battery Mode</h3>
                <p className="glass-glass-glass-text-primary/70 glass-glass-glass-text-sm glass-glass-glass-mb-4">
                  Full glass effects with maximum visual quality when battery is above 80%
                </p>
                <div className="glass-glass-glass-space-y-2 glass-glass-glass-text-primary/60 glass-glass-glass-text-xs">
                  <div>• Heavy blur effects</div>
                  <div>• Complex animations</div>
                  <div>• Maximum transparency</div>
                  <div>• Full GPU acceleration</div>
                </div>
              </div>
            </BatteryAwareGlass>

            <BatteryAwareGlass energyThresholds={{ high: 80, medium: 50, low: 20 }}>
              <div className="glass-glass-glass-p-6">
                <h3 className="glass-glass-glass-text-xl glass-glass-glass-font-semibold glass-glass-glass-text-primary glass-glass-glass-mb-3">Medium Battery Mode</h3>
                <p className="glass-glass-glass-text-primary/70 glass-glass-glass-text-sm glass-glass-glass-mb-4">
                  Balanced effects for optimal performance when battery is 50-80%
                </p>
                <div className="glass-glass-glass-space-y-2 glass-glass-glass-text-primary/60 glass-glass-glass-text-xs">
                  <div>• Moderate blur</div>
                  <div>• Essential animations</div>
                  <div>• Balanced transparency</div>
                  <div>• Adaptive GPU usage</div>
                </div>
              </div>
            </BatteryAwareGlass>

            <BatteryAwareGlass energyThresholds={{ high: 80, medium: 50, low: 20 }}>
              <div className="glass-glass-glass-p-6">
                <h3 className="glass-glass-glass-text-xl glass-glass-glass-font-semibold glass-glass-glass-text-primary glass-glass-glass-mb-3">Low Battery Mode</h3>
                <p className="glass-glass-glass-text-primary/70 glass-glass-glass-text-sm glass-glass-glass-mb-4">
                  Minimal effects to preserve battery when below 20%
                </p>
                <div className="glass-glass-glass-space-y-2 glass-glass-glass-text-primary/60 glass-glass-glass-text-xs">
                  <div>• Reduced blur</div>
                  <div>• Disabled animations</div>
                  <div>• Minimal transparency</div>
                  <div>• CPU-only rendering</div>
                </div>
              </div>
            </BatteryAwareGlass>
          </div>

          <div className="mt-12 glass-glass-glass-p-6 glass-surface-subtle/10 backdrop-blur-lg glass-radius-2xl">
            <h3 className="glass-glass-glass-text-xl glass-glass-glass-font-semibold glass-glass-glass-text-primary mb-6 glass-glass-glass-text-center">Battery Optimization Features</h3>
            <div className="glass-glass-glass-grid glass-glass-glass-glass-glass-grid-cols-1 md:glass-glass-glass-glass-glass-grid-cols-2 glass-glass-glass-gap-8">
              <div>
                <h4 className="glass-glass-glass-font-medium glass-glass-glass-text-primary glass-glass-glass-mb-3">Smart Adaptation</h4>
                <div className="glass-glass-glass-space-y-2 glass-glass-glass-text-primary/80">
                  <div>• Real-time battery monitoring</div>
                  <div>• Automatic quality adjustment</div>
                  <div>• Performance mode switching</div>
                  <div>• User preference respect</div>
                </div>
              </div>
              <div>
                <h4 className="glass-glass-glass-font-medium glass-glass-glass-text-primary glass-glass-glass-mb-3">Power Efficiency</h4>
                <div className="glass-glass-glass-space-y-2 glass-glass-glass-text-primary/80">
                  <div>• Reduced GPU usage on low battery</div>
                  <div>• Minimal background processing</div>
                  <div>• Optimized animation timing</div>
                  <div>• Smart resource allocation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassPerformanceProvider>
  ),
};

export const ProgressiveEnhancement: Story = {
  args: {},
  render: () => (
    <GlassPerformanceProvider adaptivePerformance={true}>
      <div className="glass-min-glass-glass-h-screen glass-gradient-primary glass-gradient-primary via-purple-900 glass-gradient-primary glass-glass-glass-p-8">
        <div className="max-w-6xl glass-glass-glass-mx-auto">
          <div className="glass-glass-glass-text-center mb-12">
            <h1 className="glass-glass-glass-text-3xl glass-glass-glass-font-bold glass-glass-glass-text-primary glass-glass-glass-mb-4">
              📈 Progressive Glass Enhancement
            </h1>
            <p className="glass-glass-glass-text-xl glass-glass-glass-text-primary/80">
              Tiered glass experiences based on device capabilities and performance
            </p>
          </div>

          <div className="glass-glass-glass-grid glass-glass-glass-glass-glass-grid-cols-1 md:glass-glass-glass-glass-glass-grid-cols-3 glass-glass-glass-gap-8 mb-12">
            <ProgressiveGlassEnhancement
              tiers={{
                basic: {
                  background: '/* Use createGlassStyle({ intent: "neutral", elevation: "level2" }) */',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px'
                },
                enhanced: createGlassStyle({ intent: "neutral", elevation: "level2" }),
                premium: createGlassStyle({ intent: "neutral", elevation: "level2" })
              }}
              autoDetect={true}
            >
              <div className="glass-glass-glass-p-6">
                <h3 className="glass-glass-glass-text-xl glass-glass-glass-font-semibold glass-glass-glass-text-primary glass-glass-glass-mb-3">Auto-Detect Mode</h3>
                <p className="glass-glass-glass-text-primary/70 glass-glass-glass-text-sm glass-glass-glass-mb-4">
                  Automatically selects the best tier based on device performance and capabilities
                </p>
                <div className="glass-glass-glass-space-y-2 glass-glass-glass-text-primary/60 glass-glass-glass-text-xs">
                  <div>• Performance monitoring</div>
                  <div>• Capability detection</div>
                  <div>• Adaptive rendering</div>
                  <div>• Graceful degradation</div>
                </div>
              </div>
            </ProgressiveGlassEnhancement>

            <ProgressiveGlassEnhancement
              tiers={{
                basic: {
                  background: '/* Use createGlassStyle({ intent: "neutral", elevation: "level2" }) */',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px'
                },
                enhanced: createGlassStyle({ intent: "neutral", elevation: "level2" }),
                premium: createGlassStyle({ intent: "neutral", elevation: "level2" })
              }}
              autoDetect={false}
            >
              <div className="glass-glass-glass-p-6">
                <h3 className="glass-glass-glass-text-xl glass-glass-glass-font-semibold glass-glass-glass-text-primary glass-glass-glass-mb-3">Enhanced Mode</h3>
                <p className="glass-glass-glass-text-primary/70 glass-glass-glass-text-sm glass-glass-glass-mb-4">
                  Balanced glass effects for most modern devices and use cases
                </p>
                <div className="glass-glass-glass-space-y-2 glass-glass-glass-text-primary/60 glass-glass-glass-text-xs">
                  <div>• Medium blur effects</div>
                  <div>• Standard animations</div>
                  <div>• Balanced transparency</div>
                  <div>• Good performance</div>
                </div>
              </div>
            </ProgressiveGlassEnhancement>

            <ProgressiveGlassEnhancement
              tiers={{
                basic: {
                  background: '/* Use createGlassStyle({ intent: "neutral", elevation: "level2" }) */',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px'
                },
                enhanced: createGlassStyle({ intent: "neutral", elevation: "level2" }),
                premium: createGlassStyle({ intent: "neutral", elevation: "level2" })
              }}
              autoDetect={false}
            >
              <div className="glass-glass-glass-p-6">
                <h3 className="glass-glass-glass-text-xl glass-glass-glass-font-semibold glass-glass-glass-text-primary glass-glass-glass-mb-3">Basic Mode</h3>
                <p className="glass-glass-glass-text-primary/70 glass-glass-glass-text-sm glass-glass-glass-mb-4">
                  Essential glass effects for low-performance devices and battery saver mode
                </p>
                <div className="glass-glass-glass-space-y-2 glass-glass-glass-text-primary/60 glass-glass-glass-text-xs">
                  <div>• Minimal blur</div>
                  <div>• Reduced animations</div>
                  <div>• High contrast</div>
                  <div>• Maximum compatibility</div>
                </div>
              </div>
            </ProgressiveGlassEnhancement>
          </div>

          <div className="glass-surface-subtle/10 backdrop-blur-lg glass-radius-2xl glass-glass-glass-p-6">
            <h3 className="glass-glass-glass-text-xl glass-glass-glass-font-semibold glass-glass-glass-text-primary mb-6 glass-glass-glass-text-center">Progressive Enhancement Benefits</h3>
            <div className="glass-glass-glass-grid glass-glass-glass-glass-glass-grid-cols-1 md:glass-glass-glass-glass-glass-grid-cols-2 lg:glass-glass-glass-glass-glass-grid-cols-4 glass-glass-glass-gap-6">
              <div className="glass-glass-glass-text-center">
                <div className="glass-glass-glass-text-3xl glass-glass-glass-mb-3">🌍</div>
                <h4 className="glass-glass-glass-font-semibold glass-glass-glass-text-primary glass-glass-glass-mb-2">Universal Support</h4>
                <p className="glass-glass-glass-text-primary/70 glass-glass-glass-text-sm">Works on all devices</p>
              </div>
              <div className="glass-glass-glass-text-center">
                <div className="glass-glass-glass-text-3xl glass-glass-glass-mb-3">⚡</div>
                <h4 className="glass-glass-glass-font-semibold glass-glass-glass-text-primary glass-glass-glass-mb-2">Performance Optimized</h4>
                <p className="glass-glass-glass-text-primary/70 glass-glass-glass-text-sm">Adapts to capabilities</p>
              </div>
              <div className="glass-glass-glass-text-center">
                <div className="glass-glass-glass-text-3xl glass-glass-glass-mb-3">🔋</div>
                <h4 className="glass-glass-glass-font-semibold glass-glass-glass-text-primary glass-glass-glass-mb-2">Battery Aware</h4>
                <p className="glass-glass-glass-text-primary/70 glass-glass-glass-text-sm">Preserves device battery</p>
              </div>
              <div className="glass-glass-glass-text-center">
                <div className="glass-glass-glass-text-3xl glass-glass-glass-mb-3">📱</div>
                <h4 className="glass-glass-glass-font-semibold glass-glass-glass-text-primary glass-glass-glass-mb-2">Mobile First</h4>
                <p className="glass-glass-glass-text-primary/70 glass-glass-glass-text-sm">Optimized for mobile</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassPerformanceProvider>
  ),
};
