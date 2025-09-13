import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { createGlassStyle } from '../core/mixins/glassMixins';

const ComponentsGallery: React.FC = () => {
  return (
    <div style={{ 
      padding: '2rem',
      background: 'radial-gradient(circle at 20% 50%, #120E43 0%, #0A0A0A 50%, #1A1A2E 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Components Components</h1>
      <div style={{ 
        display: 'grid', 
        gap: '1.5rem', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' 
      }}>
        
          <div style={createGlassStyle({ intent: "neutral", elevation: "level2" })}>
            <h3 style={{ margin: '0 0 1rem 0' }}>AtmosphericEffects</h3>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', opacity: 0.8 }}>
              Components/Components/AtmosphericEffects
            </p>
            <div style={{ 
              fontFamily: 'monospace', 
              fontSize: '0.75rem', 
              opacity: 0.6,
              background: '/* Use createGlassStyle({ intent: "primary", elevation: "level2" }) */',
              padding: '0.5rem',
              borderRadius: '4px'
            }}>
              src/components/charts/components/AtmosphericEffects.stories.tsx
            </div>
          </div>
        
          <div style={createGlassStyle({ intent: "neutral", elevation: "level2" })}>
            <h3 style={{ margin: '0 0 1rem 0' }}>ChartFilters</h3>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', opacity: 0.8 }}>
              Components/Components/ChartFilters
            </p>
            <div style={{ 
              fontFamily: 'monospace', 
              fontSize: '0.75rem', 
              opacity: 0.6,
              background: '/* Use createGlassStyle({ intent: "primary", elevation: "level2" }) */',
              padding: '0.5rem',
              borderRadius: '4px'
            }}>
              src/components/charts/components/ChartFilters.stories.tsx
            </div>
          </div>
        
          <div style={createGlassStyle({ intent: "neutral", elevation: "level2" })}>
            <h3 style={{ margin: '0 0 1rem 0' }}>ChartLegend</h3>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', opacity: 0.8 }}>
              Components/Components/ChartLegend
            </p>
            <div style={{ 
              fontFamily: 'monospace', 
              fontSize: '0.75rem', 
              opacity: 0.6,
              background: '/* Use createGlassStyle({ intent: "primary", elevation: "level2" }) */',
              padding: '0.5rem',
              borderRadius: '4px'
            }}>
              src/components/charts/components/ChartLegend.stories.tsx
            </div>
          </div>
        
          <div style={createGlassStyle({ intent: "neutral", elevation: "level2" })}>
            <h3 style={{ margin: '0 0 1rem 0' }}>ChartRenderer</h3>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', opacity: 0.8 }}>
              Components/Components/ChartRenderer
            </p>
            <div style={{ 
              fontFamily: 'monospace', 
              fontSize: '0.75rem', 
              opacity: 0.6,
              background: '/* Use createGlassStyle({ intent: "primary", elevation: "level2" }) */',
              padding: '0.5rem',
              borderRadius: '4px'
            }}>
              src/components/charts/components/ChartRenderer.stories.tsx
            </div>
          </div>
        
          <div style={createGlassStyle({ intent: "neutral", elevation: "level2" })}>
            <h3 style={{ margin: '0 0 1rem 0' }}>ChartTooltip</h3>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', opacity: 0.8 }}>
              Components/Components/ChartTooltip
            </p>
            <div style={{ 
              fontFamily: 'monospace', 
              fontSize: '0.75rem', 
              opacity: 0.6,
              background: '/* Use createGlassStyle({ intent: "primary", elevation: "level2" }) */',
              padding: '0.5rem',
              borderRadius: '4px'
            }}>
              src/components/charts/components/ChartTooltip.stories.tsx
            </div>
          </div>
        
          <div style={createGlassStyle({ intent: "neutral", elevation: "level2" })}>
            <h3 style={{ margin: '0 0 1rem 0' }}>KpiChart</h3>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', opacity: 0.8 }}>
              Components/Components/KpiChart
            </p>
            <div style={{ 
              fontFamily: 'monospace', 
              fontSize: '0.75rem', 
              opacity: 0.6,
              background: '/* Use createGlassStyle({ intent: "primary", elevation: "level2" }) */',
              padding: '0.5rem',
              borderRadius: '4px'
            }}>
              src/components/charts/components/KpiChart.stories.tsx
            </div>
          </div>
        
          <div style={createGlassStyle({ intent: "neutral", elevation: "level2" })}>
            <h3 style={{ margin: '0 0 1rem 0' }}>CollapsedMenu</h3>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', opacity: 0.8 }}>
              Components/Components/CollapsedMenu
            </p>
            <div style={{ 
              fontFamily: 'monospace', 
              fontSize: '0.75rem', 
              opacity: 0.6,
              background: '/* Use createGlassStyle({ intent: "primary", elevation: "level2" }) */',
              padding: '0.5rem',
              borderRadius: '4px'
            }}>
              src/components/navigation/components/CollapsedMenu.stories.tsx
            </div>
          </div>
        
          <div style={createGlassStyle({ intent: "neutral", elevation: "level2" })}>
            <h3 style={{ margin: '0 0 1rem 0' }}>ScrollButtons</h3>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', opacity: 0.8 }}>
              Components/Components/ScrollButtons
            </p>
            <div style={{ 
              fontFamily: 'monospace', 
              fontSize: '0.75rem', 
              opacity: 0.6,
              background: '/* Use createGlassStyle({ intent: "primary", elevation: "level2" }) */',
              padding: '0.5rem',
              borderRadius: '4px'
            }}>
              src/components/navigation/components/ScrollButtons.stories.tsx
            </div>
          </div>
        
          <div style={createGlassStyle({ intent: "neutral", elevation: "level2" })}>
            <h3 style={{ margin: '0 0 1rem 0' }}>TabItem</h3>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', opacity: 0.8 }}>
              Components/Components/TabItem
            </p>
            <div style={{ 
              fontFamily: 'monospace', 
              fontSize: '0.75rem', 
              opacity: 0.6,
              background: '/* Use createGlassStyle({ intent: "primary", elevation: "level2" }) */',
              padding: '0.5rem',
              borderRadius: '4px'
            }}>
              src/components/navigation/components/TabItem.stories.tsx
            </div>
          </div>
        
      </div>
    </div>
  );
};

const meta: Meta<typeof ComponentsGallery> = {
  title: 'Categories/Components',
  component: ComponentsGallery,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Gallery: Story = {};
