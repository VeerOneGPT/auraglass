import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import BrandColorIntegration, { BrandGlassButton, useBrandColors } from './BrandColorIntegration';
import { IntelligentColorProvider } from './IntelligentColorSystem';
import { cn } from '../../lib/utils';

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
      <div className="glass-glass-text-center">
        <h2 className="glass-glass-text-3xl font-bold glass-glass-text-primary glass-glass-mb-4">Brand Color Integration</h2>
        <p className="glass-text-secondary">
          Seamlessly integrate brand colors with glassmorphism effects
        </p>
      </div>

      <div className="glass-glass-flex glass-glass-flex-wrap glass-glass-justify-center glass-glass-gap-4 mb-8">
        {['apple', 'google', 'microsoft'].map((brand) => (
          <button
            key={brand}
            onClick={() => setCurrentBrand(brand)}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              currentBrand === brand
                ? 'glass-surface-primary glass-text-primary shadow-lg'
                : 'glass-surface-secondary glass-text-secondary hover:glass-surface-hover'
            }`}
          >
            {brand.charAt(0).toUpperCase() + brand.slice(1)}
          </button>
        ))}
      </div>

      <div className="glass-glass-grid glass-glass-glass-grid-cols-1 md:glass-glass-glass-grid-cols-2 lg:glass-glass-glass-grid-cols-3 glass-glass-gap-6">
        <div className="glass-surface-secondary backdrop-blur-lg glass-radius-2xl glass-glass-p-6">
          <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-w-12 glass-glass-h-12 glass-radius-full glass-glass-mb-4"
               style={{ backgroundColor: brandColors?.primaryColor || '#007AFF' }}>
            <span className="glass-glass-text-primary font-bold glass-glass-text-lg">
              {brandColors?.primaryColor ? '✓' : '?'}
            </span>
          </div>
          <h3 className="glass-glass-text-xl glass-glass-font-semibold glass-glass-text-primary glass-glass-mb-2">Primary Color</h3>
          <p className="glass-text-secondary glass-glass-text-sm glass-glass-mb-3">
            {brandColors?.primaryColor || 'Loading...'}
          </p>
          <div className="glass-glass-w-full h-3 glass-radius-full glass-surface-accent">
            <div
              className="glass-glass-h-full glass-radius-full transition-all duration-500"
              style={{
                backgroundColor: brandColors?.primaryColor || '#007AFF',
                width: brandColors?.primaryColor ? '100%' : '0%'
              }}
            />
          </div>
        </div>

        <div className="glass-surface-secondary backdrop-blur-lg glass-radius-2xl glass-glass-p-6">
          <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-w-12 glass-glass-h-12 glass-radius-full glass-glass-mb-4"
               style={{ backgroundColor: brandColors?.secondaryColor || '#5856D6' }}>
            <span className="glass-glass-text-primary font-bold glass-glass-text-lg">
              {brandColors?.secondaryColor ? '✓' : '?'}
            </span>
          </div>
          <h3 className="glass-glass-text-xl glass-glass-font-semibold glass-glass-text-primary glass-glass-mb-2">Secondary Color</h3>
          <p className="glass-text-secondary glass-glass-text-sm glass-glass-mb-3">
            {brandColors?.secondaryColor || 'Loading...'}
          </p>
          <div className="glass-glass-w-full h-3 glass-radius-full glass-surface-accent">
            <div
              className="glass-glass-h-full glass-radius-full transition-all duration-500"
              style={{
                backgroundColor: brandColors?.secondaryColor || '#5856D6',
                width: brandColors?.secondaryColor ? '100%' : '0%'
              }}
            />
          </div>
        </div>

        <div className="glass-surface-secondary backdrop-blur-lg glass-radius-2xl glass-glass-p-6">
          <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-w-12 glass-glass-h-12 glass-radius-full glass-glass-mb-4 glass-surface-accent">
            <span className="glass-glass-text-primary font-bold glass-glass-text-lg">
              {brandColors?.colorHistory?.length || 0}
            </span>
          </div>
          <h3 className="glass-glass-text-xl glass-glass-font-semibold glass-glass-text-primary glass-glass-mb-2">Color History</h3>
          <p className="glass-text-secondary glass-glass-text-sm glass-glass-mb-3">
            {brandColors?.colorHistory?.length || 0} color variations tracked
          </p>
          <div className="glass-glass-flex glass-glass-gap-1">
            {(brandColors?.colorHistory?.slice(0, 5) || []).map((entry, index) => (
              <div
                key={index}
                className="glass-glass-w-6 glass-glass-h-6 glass-radius-full glass-glass-border glass-glass-border-white/20"
                style={{ backgroundColor: entry.color }}
                title={`Confidence: ${(entry.confidence * 100).toFixed(0)}%`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="glass-glass-grid glass-glass-glass-grid-cols-1 md:glass-glass-glass-grid-cols-2 glass-glass-gap-6">
        <div className="glass-surface-secondary backdrop-blur-lg glass-radius-2xl glass-glass-p-6">
          <h3 className="glass-glass-text-xl glass-glass-font-semibold glass-glass-text-primary glass-glass-mb-4">Brand Glass Button</h3>
          <div className="glass-glass-space-y-3">
            <BrandGlassButton variant="primary" className="glass-glass-w-full">
              Primary Brand Button
            </BrandGlassButton>
            <BrandGlassButton variant="secondary" className="glass-glass-w-full">
              Secondary Brand Button
            </BrandGlassButton>
          </div>
        </div>

        <div className="glass-surface-secondary backdrop-blur-lg glass-radius-2xl glass-glass-p-6">
          <h3 className="glass-glass-text-xl glass-glass-font-semibold glass-glass-text-primary glass-glass-mb-4">Brand Integration Features</h3>
          <div className="glass-glass-space-y-3 glass-glass-text-primary/80">
            <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-3">
              <div className="w-2 h-2 glass-radius-full glass-surface-green" />
              <span>Dynamic color adaptation</span>
            </div>
            <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-3">
              <div className="w-2 h-2 glass-radius-full glass-surface-green" />
              <span>Smooth transitions</span>
            </div>
            <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-3">
              <div className="w-2 h-2 glass-radius-full glass-surface-green" />
              <span>Accessibility compliance</span>
            </div>
            <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-3">
              <div className="w-2 h-2 glass-radius-full glass-surface-green" />
              <span>Color history tracking</span>
            </div>
            <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-3">
              <div className="w-2 h-2 glass-radius-full glass-surface-green" />
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
      <div className="min-h-screen glass-gradient-primary from-slate-900 via-purple-900 to-slate-900 glass-glass-p-8 dark">
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
      <div className="min-h-screen glass-gradient-primary from-slate-900 via-purple-900 to-slate-900 glass-glass-p-8 dark">
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
      <div className="min-h-screen glass-gradient-primary from-slate-900 via-purple-900 to-slate-900 glass-glass-p-8 dark">
        <div className="max-w-6xl mx-auto">
          <div className="glass-glass-text-center mb-12">
            <h1 className="glass-glass-text-4xl font-bold glass-glass-text-primary glass-glass-mb-4">
              🏢 Entity-Based Branding
            </h1>
            <p className="glass-glass-text-xl glass-glass-text-primary/80">
              Pre-configured brand integrations for major entities
            </p>
          </div>

          <div className="glass-glass-grid glass-glass-glass-grid-cols-1 md:glass-glass-glass-grid-cols-3 glass-glass-gap-8 mb-12">
            <BrandColorIntegration entityId="apple">
              <div className="glass-glass-p-8 glass-glass-text-center">
                <div className="glass-glass-text-6xl glass-glass-mb-4">🍎</div>
                <h3 className="glass-glass-text-2xl font-bold glass-glass-text-primary glass-glass-mb-2">Apple</h3>
                <p className="glass-glass-text-primary/80">Clean, minimal design with blue accents</p>
                <div className="mt-6 glass-glass-space-y-3">
                  <BrandGlassButton variant="primary">Get Started</BrandGlassButton>
                  <BrandGlassButton variant="secondary">Learn More</BrandGlassButton>
                </div>
              </div>
            </BrandColorIntegration>

            <BrandColorIntegration entityId="google">
              <div className="glass-glass-p-8 glass-glass-text-center">
                <div className="glass-glass-text-6xl glass-glass-mb-4">🔍</div>
                <h3 className="glass-glass-text-2xl font-bold glass-glass-text-primary glass-glass-mb-2">Google</h3>
                <p className="glass-glass-text-primary/80">Colorful and accessible design system</p>
                <div className="mt-6 glass-glass-space-y-3">
                  <BrandGlassButton variant="primary">Search</BrandGlassButton>
                  <BrandGlassButton variant="secondary">Explore</BrandGlassButton>
                </div>
              </div>
            </BrandColorIntegration>

            <BrandColorIntegration entityId="microsoft">
              <div className="glass-glass-p-8 glass-glass-text-center">
                <div className="glass-glass-text-6xl glass-glass-mb-4">🪟</div>
                <h3 className="glass-glass-text-2xl font-bold glass-glass-text-primary glass-glass-mb-2">Microsoft</h3>
                <p className="glass-glass-text-primary/80">Professional and enterprise-focused</p>
                <div className="mt-6 glass-glass-space-y-3">
                  <BrandGlassButton variant="primary">Productivity</BrandGlassButton>
                  <BrandGlassButton variant="secondary">Cloud</BrandGlassButton>
                </div>
              </div>
            </BrandColorIntegration>
          </div>

          <div className="glass-surface-secondary backdrop-blur-lg glass-radius-2xl glass-glass-p-8">
            <h3 className="glass-glass-text-2xl font-bold glass-glass-text-primary mb-6 glass-glass-text-center">Brand Integration Benefits</h3>
            <div className="glass-glass-grid glass-glass-glass-grid-cols-1 md:glass-glass-glass-grid-cols-2 lg:glass-glass-glass-grid-cols-4 glass-glass-gap-6">
              <div className="glass-glass-text-center">
                <div className="glass-glass-text-4xl glass-glass-mb-3">🎨</div>
                <h4 className="glass-glass-font-semibold glass-glass-text-primary glass-glass-mb-2">Consistent Branding</h4>
                <p className="glass-text-secondary glass-glass-text-sm">Maintain brand identity across all components</p>
              </div>
              <div className="glass-glass-text-center">
                <div className="glass-glass-text-4xl glass-glass-mb-3">⚡</div>
                <h4 className="glass-glass-font-semibold glass-glass-text-primary glass-glass-mb-2">Real-time Adaptation</h4>
                <p className="glass-text-secondary glass-glass-text-sm">Smooth transitions between brand themes</p>
              </div>
              <div className="glass-glass-text-center">
                <div className="glass-glass-text-4xl glass-glass-mb-3">♿</div>
                <h4 className="glass-glass-font-semibold glass-glass-text-primary glass-glass-mb-2">Accessibility First</h4>
                <p className="glass-text-secondary glass-glass-text-sm">WCAG compliant color combinations</p>
              </div>
              <div className="glass-glass-text-center">
                <div className="glass-glass-text-4xl glass-glass-mb-3">📊</div>
                <h4 className="glass-glass-font-semibold glass-glass-text-primary glass-glass-mb-2">Analytics Ready</h4>
                <p className="glass-text-secondary glass-glass-text-sm">Color usage tracking and optimization</p>
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
        <div className="min-h-screen glass-gradient-primary from-slate-900 via-purple-900 to-slate-900 glass-glass-p-8 dark">
          <div className="max-w-6xl mx-auto">
            <div className="glass-glass-text-center mb-12">
              <h1 className="glass-glass-text-4xl font-bold glass-glass-text-primary glass-glass-mb-4">
                🔄 Brand Comparison
              </h1>
              <p className="glass-glass-text-xl glass-glass-text-primary/80">
                Compare how different brands adapt to glassmorphism
              </p>
            </div>

            <div className="glass-glass-flex glass-glass-justify-center glass-glass-gap-4 mb-8">
              {['apple', 'google', 'microsoft'].map((brand) => (
                <button
                  key={brand}
                  onClick={() => setActiveBrand(brand)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeBrand === brand
                      ? 'glass-surface-primary glass-text-primary shadow-lg scale-105'
                      : 'glass-surface-secondary glass-text-primary/80 hover:glass-surface-accent'
                  }`}
                >
                  {brand.charAt(0).toUpperCase() + brand.slice(1)}
                </button>
              ))}
            </div>

            <div className="glass-glass-grid glass-glass-glass-grid-cols-1 lg:glass-glass-glass-grid-cols-2 glass-glass-gap-8">
              <BrandColorIntegration entityId={activeBrand}>
                <div className="glass-glass-p-8">
                  <h3 className="glass-glass-text-2xl font-bold glass-glass-text-primary mb-6">
                    {activeBrand.charAt(0).toUpperCase() + activeBrand.slice(1)} Brand Integration
                  </h3>

                  <div className="space-y-6">
                    <div className="glass-surface-secondary backdrop-blur-lg glass-radius-xl glass-glass-p-4">
                      <h4 className="glass-glass-font-semibold glass-glass-text-primary glass-glass-mb-3">Color Palette</h4>
                      <div className="glass-glass-flex glass-glass-gap-3">
                        <div className="glass-glass-w-12 glass-glass-h-12 glass-radius-lg glass-glass-border glass-glass-border-white/20"
                             style={{ backgroundColor: 'var(--brand-primary)' }} />
                        <div className="glass-glass-w-12 glass-glass-h-12 glass-radius-lg glass-glass-border glass-glass-border-white/20"
                             style={{ backgroundColor: 'var(--brand-secondary)' }} />
                        <div className="glass-glass-w-12 glass-glass-h-12 glass-radius-lg glass-surface-accent" />
                      </div>
                    </div>

                    <div className="glass-surface-secondary backdrop-blur-lg glass-radius-xl glass-glass-p-4">
                      <h4 className="glass-glass-font-semibold glass-glass-text-primary glass-glass-mb-3">Glass Effects</h4>
                      <div className="glass-glass-space-y-3">
                        <BrandGlassButton variant="primary" className="glass-glass-w-full">
                          Primary Action
                        </BrandGlassButton>
                        <BrandGlassButton variant="secondary" className="glass-glass-w-full">
                          Secondary Action
                        </BrandGlassButton>
                      </div>
                    </div>

                    <div className="glass-surface-secondary backdrop-blur-lg glass-radius-xl glass-glass-p-4">
                      <h4 className="glass-glass-font-semibold glass-glass-text-primary glass-glass-mb-3">Brand Features</h4>
                      <div className="glass-glass-space-y-2 glass-glass-text-primary/80">
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
                <div className="glass-surface-secondary backdrop-blur-lg glass-radius-2xl glass-glass-p-6">
                  <h3 className="glass-glass-text-xl glass-glass-font-semibold glass-glass-text-primary glass-glass-mb-4">Integration Metrics</h3>
                  <div className="glass-glass-space-y-4">
                    <div className="glass-glass-flex glass-glass-justify-between glass-glass-items-center">
                      <span className="glass-glass-text-primary/80">Color Harmony</span>
                      <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2">
                        <div className="w-20 h-2 glass-surface-accent glass-radius-full">
                          <div className="glass-glass-w-16 h-2 glass-surface-green glass-radius-full" />
                        </div>
                        <span className="glass-glass-text-primary glass-glass-text-sm">80%</span>
                      </div>
                    </div>

                    <div className="glass-glass-flex glass-glass-justify-between glass-glass-items-center">
                      <span className="glass-glass-text-primary/80">Accessibility</span>
                      <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2">
                        <div className="w-20 h-2 glass-surface-accent glass-radius-full">
                          <div className="w-18 h-2 glass-surface-green glass-radius-full" />
                        </div>
                        <span className="glass-glass-text-primary glass-glass-text-sm">90%</span>
                      </div>
                    </div>

                    <div className="glass-glass-flex glass-glass-justify-between glass-glass-items-center">
                      <span className="glass-glass-text-primary/80">Performance</span>
                      <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2">
                        <div className="w-20 h-2 glass-surface-accent glass-radius-full">
                          <div className="w-19 h-2 glass-surface-green glass-radius-full" />
                        </div>
                        <span className="glass-glass-text-primary glass-glass-text-sm">95%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-surface-secondary backdrop-blur-lg glass-radius-2xl glass-glass-p-6">
                  <h3 className="glass-glass-text-xl glass-glass-font-semibold glass-glass-text-primary glass-glass-mb-4">Usage Examples</h3>
                  <div className="glass-glass-space-y-3 glass-glass-text-primary/80">
                    <div className="glass-glass-p-3 glass-surface-muted glass-radius-lg">
                      <code className="glass-glass-text-sm">
                        {`<BrandColorIntegration entityId="${activeBrand}">`}
                      </code>
                    </div>
                    <div className="glass-glass-p-3 glass-surface-muted glass-radius-lg">
                      <code className="glass-glass-text-sm">
                        {`<BrandGlassButton variant="primary">Action</BrandGlassButton>`}
                      </code>
                    </div>
                    <div className="glass-glass-p-3 glass-surface-muted glass-radius-lg">
                      <code className="glass-glass-text-sm">
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
