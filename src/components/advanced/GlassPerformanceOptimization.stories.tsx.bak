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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Performance Mode</h3>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            performanceMode === 'high' ? 'bg-green-500/20 text-green-400' :
            performanceMode === 'balanced' ? 'bg-blue-500/20 text-blue-400' :
            'bg-yellow-500/20 text-yellow-400'
          }`}>
            {performanceMode}
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-white/80">
            <span>Current Mode</span>
            <span className="font-medium capitalize">{performanceMode}</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
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

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Battery Level</h3>
          <div className="text-2xl">🔋</div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-white/80">
            <span>Charge</span>
            <span className="font-medium">{batteryLevel || 85}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
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

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">CPU Load</h3>
          <div className="text-2xl">⚡</div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-white/80">
            <span>Usage</span>
            <span className="font-medium">{cpuLoad.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
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

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">GPU Acceleration</h3>
          <div className="text-2xl">{gpuAcceleration ? '🚀' : '🐌'}</div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-white/80">
            <span>Status</span>
            <span className={`font-medium ${gpuAcceleration ? 'text-green-400' : 'text-yellow-400'}`}>
              {gpuAcceleration ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              ⚡ Glass Performance Optimization
            </h1>
            <p className="text-xl text-white/80">
              Real-time performance monitoring and adaptive quality optimization
            </p>
          </div>

          <PerformanceDashboardComponent />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Performance Modes</h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <h4 className="font-medium text-green-400 mb-2">High Performance</h4>
                  <p className="text-white/70 text-sm">Full GPU acceleration, maximum effects, best user experience</p>
                </div>

                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <h4 className="font-medium text-blue-400 mb-2">Balanced</h4>
                  <p className="text-white/70 text-sm">Moderate effects, good performance balance</p>
                </div>

                <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <h4 className="font-medium text-yellow-400 mb-2">Battery Saver</h4>
                  <p className="text-white/70 text-sm">Minimal effects, maximum battery life</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Adaptive Features</h3>
              <div className="space-y-3 text-white/80">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span>Real-time battery monitoring</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span>CPU load estimation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span>GPU capability detection</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span>Lazy loading system</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span>Progressive enhancement</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-white mb-4">
              🚀 Efficient Glass Rendering
            </h1>
            <p className="text-xl text-white/80">
              GPU-accelerated glass effects with performance optimization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <EfficientGlassRendering enableGPU={true}>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">GPU Accelerated</h3>
                <p className="text-white/70 text-sm mb-4">
                  Hardware-accelerated glass effects for smooth 60fps performance
                </p>
                <div className="space-y-2 text-white/60 text-xs">
                  <div>• WebGL shaders</div>
                  <div>• Hardware acceleration</div>
                  <div>• 60fps animations</div>
                  <div>• Optimized blur effects</div>
                </div>
              </div>
            </EfficientGlassRendering>

            <EfficientGlassRendering virtualizeContent={true}>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Virtualized Content</h3>
                <p className="text-white/70 text-sm mb-4">
                  Efficient rendering for large datasets and complex content
                </p>
                <div className="space-y-2 text-white/60 text-xs">
                  <div>• Lazy loading</div>
                  <div>• Viewport culling</div>
                  <div>• Memory optimization</div>
                  <div>• Smooth scrolling</div>
                </div>
              </div>
            </EfficientGlassRendering>

            <EfficientGlassRendering deferRender={true}>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Deferred Rendering</h3>
                <p className="text-white/70 text-sm mb-4">
                  Renders only when visible in viewport for optimal performance
                </p>
                <div className="space-y-2 text-white/60 text-xs">
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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-white mb-4">
                ⏳ Lazy Loading System
              </h1>
              <p className="text-xl text-white/80">
                Progressive loading of glass effects based on viewport visibility
              </p>
            </div>

            <div className="mb-8 p-6 bg-white/10 backdrop-blur-lg rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-4">Loading Status</h3>
              <div className="flex flex-wrap gap-2">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(index => (
                <LazyGlassLoading
                  key={index}
                  placeholder={
                    <div className="h-48 bg-white/5 rounded-2xl flex items-center justify-center">
                      <div className="text-white/60">Loading Card {index}...</div>
                    </div>
                  }
                  threshold={0.1}
                  rootMargin="50px"
                  onLoad={() => handleLoad(`Card ${index}`)}
                >
                  <div className="p-6 h-48">
                    <h3 className="text-xl font-semibold text-white mb-3">Lazy Loaded Card {index}</h3>
                    <p className="text-white/70 text-sm mb-4">
                      This card was loaded when it came into view. Loaded: {loadedComponents.includes(`Card ${index}`) ? 'Yes' : 'No'}
                    </p>
                    <div className="space-y-2 text-white/60 text-xs">
                      <div>• Progressive enhancement</div>
                      <div>• Viewport-based loading</div>
                      <div>• Performance optimized</div>
                      <div>• Smooth transitions</div>
                    </div>
                  </div>
                </LazyGlassLoading>
              ))}
            </div>

            <div className="mt-12 p-6 bg-white/10 backdrop-blur-lg rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-4">Lazy Loading Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-3">⚡</div>
                  <h4 className="font-semibold text-white mb-2">Faster Initial Load</h4>
                  <p className="text-white/70 text-sm">Only load visible content</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">📱</div>
                  <h4 className="font-semibold text-white mb-2">Better Mobile Performance</h4>
                  <p className="text-white/70 text-sm">Reduced data usage</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">🔋</div>
                  <h4 className="font-semibold text-white mb-2">Battery Efficient</h4>
                  <p className="text-white/70 text-sm">Conserve device battery</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">🌊</div>
                  <h4 className="font-semibold text-white mb-2">Smooth Experience</h4>
                  <p className="text-white/70 text-sm">Progressive enhancement</p>
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-white mb-4">
              🔋 Battery-Aware Glass Effects
            </h1>
            <p className="text-xl text-white/80">
              Intelligent power management with adaptive quality based on battery level
            </p>
          </div>

          <PerformanceDashboardComponent />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <BatteryAwareGlass energyThresholds={{ high: 80, medium: 50, low: 20 }}>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">High Battery Mode</h3>
                <p className="text-white/70 text-sm mb-4">
                  Full glass effects with maximum visual quality when battery is above 80%
                </p>
                <div className="space-y-2 text-white/60 text-xs">
                  <div>• Heavy blur effects</div>
                  <div>• Complex animations</div>
                  <div>• Maximum transparency</div>
                  <div>• Full GPU acceleration</div>
                </div>
              </div>
            </BatteryAwareGlass>

            <BatteryAwareGlass energyThresholds={{ high: 80, medium: 50, low: 20 }}>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Medium Battery Mode</h3>
                <p className="text-white/70 text-sm mb-4">
                  Balanced effects for optimal performance when battery is 50-80%
                </p>
                <div className="space-y-2 text-white/60 text-xs">
                  <div>• Moderate blur</div>
                  <div>• Essential animations</div>
                  <div>• Balanced transparency</div>
                  <div>• Adaptive GPU usage</div>
                </div>
              </div>
            </BatteryAwareGlass>

            <BatteryAwareGlass energyThresholds={{ high: 80, medium: 50, low: 20 }}>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Low Battery Mode</h3>
                <p className="text-white/70 text-sm mb-4">
                  Minimal effects to preserve battery when below 20%
                </p>
                <div className="space-y-2 text-white/60 text-xs">
                  <div>• Reduced blur</div>
                  <div>• Disabled animations</div>
                  <div>• Minimal transparency</div>
                  <div>• CPU-only rendering</div>
                </div>
              </div>
            </BatteryAwareGlass>
          </div>

          <div className="mt-12 p-6 bg-white/10 backdrop-blur-lg rounded-2xl">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">Battery Optimization Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-white mb-3">Smart Adaptation</h4>
                <div className="space-y-2 text-white/80">
                  <div>• Real-time battery monitoring</div>
                  <div>• Automatic quality adjustment</div>
                  <div>• Performance mode switching</div>
                  <div>• User preference respect</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-white mb-3">Power Efficiency</h4>
                <div className="space-y-2 text-white/80">
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-white mb-4">
              📈 Progressive Glass Enhancement
            </h1>
            <p className="text-xl text-white/80">
              Tiered glass experiences based on device capabilities and performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <ProgressiveGlassEnhancement
              tiers={{
                basic: {
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px'
                },
                enhanced: {
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  borderRadius: '12px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                },
                premium: {
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '16px',
                  boxShadow: '0 16px 64px rgba(0, 0, 0, 0.15)'
                }
              }}
              autoDetect={true}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Auto-Detect Mode</h3>
                <p className="text-white/70 text-sm mb-4">
                  Automatically selects the best tier based on device performance and capabilities
                </p>
                <div className="space-y-2 text-white/60 text-xs">
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
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px'
                },
                enhanced: {
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  borderRadius: '12px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                },
                premium: {
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '16px',
                  boxShadow: '0 16px 64px rgba(0, 0, 0, 0.15)'
                }
              }}
              autoDetect={false}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Enhanced Mode</h3>
                <p className="text-white/70 text-sm mb-4">
                  Balanced glass effects for most modern devices and use cases
                </p>
                <div className="space-y-2 text-white/60 text-xs">
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
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px'
                },
                enhanced: {
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  borderRadius: '12px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                },
                premium: {
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '16px',
                  boxShadow: '0 16px 64px rgba(0, 0, 0, 0.15)'
                }
              }}
              autoDetect={false}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Basic Mode</h3>
                <p className="text-white/70 text-sm mb-4">
                  Essential glass effects for low-performance devices and battery saver mode
                </p>
                <div className="space-y-2 text-white/60 text-xs">
                  <div>• Minimal blur</div>
                  <div>• Reduced animations</div>
                  <div>• High contrast</div>
                  <div>• Maximum compatibility</div>
                </div>
              </div>
            </ProgressiveGlassEnhancement>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">Progressive Enhancement Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-3">🌍</div>
                <h4 className="font-semibold text-white mb-2">Universal Support</h4>
                <p className="text-white/70 text-sm">Works on all devices</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">⚡</div>
                <h4 className="font-semibold text-white mb-2">Performance Optimized</h4>
                <p className="text-white/70 text-sm">Adapts to capabilities</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🔋</div>
                <h4 className="font-semibold text-white mb-2">Battery Aware</h4>
                <p className="text-white/70 text-sm">Preserves device battery</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">📱</div>
                <h4 className="font-semibold text-white mb-2">Mobile First</h4>
                <p className="text-white/70 text-sm">Optimized for mobile</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassPerformanceProvider>
  ),
};
