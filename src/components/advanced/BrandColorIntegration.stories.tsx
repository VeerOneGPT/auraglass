import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import BrandColorIntegration, { BrandGlassButton, useBrandColors } from './BrandColorIntegration';
import { IntelligentColorProvider } from './IntelligentColorSystem';

const meta: Meta<typeof BrandColorIntegration> = {
  title: 'Advanced/BrandColorIntegration',
  component: BrandColorIntegration,
  parameters: {
    docs: {
      description: {
        component: 'Dynamic brand color integration system that seamlessly adapts brand colors into the glassmorphism ecosystem with smooth transitions and accessibility compliance.',
      },
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BrandColorIntegration>;

const BrandShowcaseContent = () => {
  const [currentBrand, setCurrentBrand] = useState('apple');
  const brandColors = useBrandColors(currentBrand);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Brand Color Integration</h2>
        <p className="text-white/80">
          Seamlessly integrate brand colors with glassmorphism effects
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {['apple', 'google', 'microsoft'].map((brand) => (
          <button
            key={brand}
            onClick={() => setCurrentBrand(brand)}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              currentBrand === brand
                ? 'bg-white/20 text-white shadow-lg'
                : 'bg-white/10 text-white/80 hover:bg-white/15'
            }`}
          >
            {brand.charAt(0).toUpperCase() + brand.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-full mb-4"
               style={{ backgroundColor: brandColors?.primaryColor || '#007AFF' }}>
            <span className="text-white font-bold text-lg">
              {brandColors?.primaryColor ? '✓' : '?'}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Primary Color</h3>
          <p className="text-white/70 text-sm mb-3">
            {brandColors?.primaryColor || 'Loading...'}
          </p>
          <div className="w-full h-3 rounded-full bg-white/20">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                backgroundColor: brandColors?.primaryColor || '#007AFF',
                width: brandColors?.primaryColor ? '100%' : '0%'
              }}
            />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-full mb-4"
               style={{ backgroundColor: brandColors?.secondaryColor || '#5856D6' }}>
            <span className="text-white font-bold text-lg">
              {brandColors?.secondaryColor ? '✓' : '?'}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Secondary Color</h3>
          <p className="text-white/70 text-sm mb-3">
            {brandColors?.secondaryColor || 'Loading...'}
          </p>
          <div className="w-full h-3 rounded-full bg-white/20">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                backgroundColor: brandColors?.secondaryColor || '#5856D6',
                width: brandColors?.secondaryColor ? '100%' : '0%'
              }}
            />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-full mb-4 bg-white/20">
            <span className="text-white font-bold text-lg">
              {brandColors?.colorHistory?.length || 0}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Color History</h3>
          <p className="text-white/70 text-sm mb-3">
            {brandColors?.colorHistory?.length || 0} color variations tracked
          </p>
          <div className="flex gap-1">
            {(brandColors?.colorHistory?.slice(0, 5) || []).map((entry, index) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full border border-white/20"
                style={{ backgroundColor: entry.color }}
                title={`Confidence: ${(entry.confidence * 100).toFixed(0)}%`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Brand Glass Button</h3>
          <div className="space-y-3">
            <BrandGlassButton variant="primary" className="w-full">
              Primary Brand Button
            </BrandGlassButton>
            <BrandGlassButton variant="secondary" className="w-full">
              Secondary Brand Button
            </BrandGlassButton>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Brand Integration Features</h3>
          <div className="space-y-3 text-white/80">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span>Dynamic color adaptation</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span>Smooth transitions</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span>Accessibility compliance</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span>Color history tracking</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span>Entity-based branding</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BasicIntegration: Story = {
  args: {
    entityId: 'apple',
    children: <BrandShowcaseContent />
  },
  render: (args) => (
    <IntelligentColorProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="max-w-6xl mx-auto">
          <BrandColorIntegration {...args} />
        </div>
      </div>
    </IntelligentColorProvider>
  ),
};

export const CustomBrandColors: Story = {
  args: {
    brandColors: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
    children: <BrandShowcaseContent />
  },
  render: (args) => (
    <IntelligentColorProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="max-w-6xl mx-auto">
          <BrandColorIntegration {...args} />
        </div>
      </div>
    </IntelligentColorProvider>
  ),
};

export const EntityShowcase: Story = {
  args: {},
  render: () => (
    <IntelligentColorProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              🏢 Entity-Based Branding
            </h1>
            <p className="text-xl text-white/80">
              Pre-configured brand integrations for major entities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <BrandColorIntegration entityId="apple">
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">🍎</div>
                <h3 className="text-2xl font-bold text-white mb-2">Apple</h3>
                <p className="text-white/80">Clean, minimal design with blue accents</p>
                <div className="mt-6 space-y-3">
                  <BrandGlassButton variant="primary">Get Started</BrandGlassButton>
                  <BrandGlassButton variant="secondary">Learn More</BrandGlassButton>
                </div>
              </div>
            </BrandColorIntegration>

            <BrandColorIntegration entityId="google">
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-white mb-2">Google</h3>
                <p className="text-white/80">Colorful and accessible design system</p>
                <div className="mt-6 space-y-3">
                  <BrandGlassButton variant="primary">Search</BrandGlassButton>
                  <BrandGlassButton variant="secondary">Explore</BrandGlassButton>
                </div>
              </div>
            </BrandColorIntegration>

            <BrandColorIntegration entityId="microsoft">
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">🪟</div>
                <h3 className="text-2xl font-bold text-white mb-2">Microsoft</h3>
                <p className="text-white/80">Professional and enterprise-focused</p>
                <div className="mt-6 space-y-3">
                  <BrandGlassButton variant="primary">Productivity</BrandGlassButton>
                  <BrandGlassButton variant="secondary">Cloud</BrandGlassButton>
                </div>
              </div>
            </BrandColorIntegration>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Brand Integration Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🎨</div>
                <h4 className="font-semibold text-white mb-2">Consistent Branding</h4>
                <p className="text-white/70 text-sm">Maintain brand identity across all components</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">⚡</div>
                <h4 className="font-semibold text-white mb-2">Real-time Adaptation</h4>
                <p className="text-white/70 text-sm">Smooth transitions between brand themes</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">♿</div>
                <h4 className="font-semibold text-white mb-2">Accessibility First</h4>
                <p className="text-white/70 text-sm">WCAG compliant color combinations</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">📊</div>
                <h4 className="font-semibold text-white mb-2">Analytics Ready</h4>
                <p className="text-white/70 text-sm">Color usage tracking and optimization</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </IntelligentColorProvider>
  ),
};

export const BrandComparison: Story = {
  args: {},
  render: () => {
    const [activeBrand, setActiveBrand] = useState('apple');

    return (
      <IntelligentColorProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">
                🔄 Brand Comparison
              </h1>
              <p className="text-xl text-white/80">
                Compare how different brands adapt to glassmorphism
              </p>
            </div>

            <div className="flex justify-center gap-4 mb-8">
              {['apple', 'google', 'microsoft'].map((brand) => (
                <button
                  key={brand}
                  onClick={() => setActiveBrand(brand)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeBrand === brand
                      ? 'bg-white/30 text-white shadow-lg scale-105'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  {brand.charAt(0).toUpperCase() + brand.slice(1)}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <BrandColorIntegration entityId={activeBrand}>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    {activeBrand.charAt(0).toUpperCase() + activeBrand.slice(1)} Brand Integration
                  </h3>

                  <div className="space-y-6">
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                      <h4 className="font-semibold text-white mb-3">Color Palette</h4>
                      <div className="flex gap-3">
                        <div className="w-12 h-12 rounded-lg border border-white/20"
                             style={{ backgroundColor: 'var(--brand-primary)' }} />
                        <div className="w-12 h-12 rounded-lg border border-white/20"
                             style={{ backgroundColor: 'var(--brand-secondary)' }} />
                        <div className="w-12 h-12 rounded-lg bg-white/20" />
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                      <h4 className="font-semibold text-white mb-3">Glass Effects</h4>
                      <div className="space-y-3">
                        <BrandGlassButton variant="primary" className="w-full">
                          Primary Action
                        </BrandGlassButton>
                        <BrandGlassButton variant="secondary" className="w-full">
                          Secondary Action
                        </BrandGlassButton>
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                      <h4 className="font-semibold text-white mb-3">Brand Features</h4>
                      <div className="space-y-2 text-white/80">
                        <div>• Dynamic color adaptation</div>
                        <div>• Smooth brand transitions</div>
                        <div>• Accessibility compliance</div>
                        <div>• Performance optimized</div>
                      </div>
                    </div>
                  </div>
                </div>
              </BrandColorIntegration>

              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Integration Metrics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Color Harmony</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-white/20 rounded-full">
                          <div className="w-16 h-2 bg-green-400 rounded-full" />
                        </div>
                        <span className="text-white text-sm">80%</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Accessibility</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-white/20 rounded-full">
                          <div className="w-18 h-2 bg-green-400 rounded-full" />
                        </div>
                        <span className="text-white text-sm">90%</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Performance</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-white/20 rounded-full">
                          <div className="w-19 h-2 bg-green-400 rounded-full" />
                        </div>
                        <span className="text-white text-sm">95%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Usage Examples</h3>
                  <div className="space-y-3 text-white/80">
                    <div className="p-3 bg-white/5 rounded-lg">
                      <code className="text-sm">
                        {`<BrandColorIntegration entityId="${activeBrand}">`}
                      </code>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg">
                      <code className="text-sm">
                        {`<BrandGlassButton variant="primary">Action</BrandGlassButton>`}
                      </code>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg">
                      <code className="text-sm">
                        const brandColors = useBrandColors('{activeBrand}')
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </IntelligentColorProvider>
    );
  },
};
