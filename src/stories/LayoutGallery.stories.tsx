import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { createGlassStyle } from '../core/mixins/glassMixins';

const LayoutGallery: React.FC = () => {
  return (
    <div style={{ 
      padding: '2rem',
      background: 'radial-gradient(circle at 20% 50%, #120E43 0%, #0A0A0A 50%, #1A1A2E 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Layout Components</h1>
      <div style={{ 
        display: 'grid', 
        gap: '1.5rem', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' 
      }}>
        
          <div style={createGlassStyle({ intent: "neutral", elevation: "level2" })}>
            <h3 style={{ margin: '0 0 1rem 0' }}>ChartContainer</h3>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', opacity: 0.8 }}>
              Components/Components/ChartContainer
            </p>
            <div style={{ 
              fontFamily: 'monospace', 
              fontSize: '0.75rem', 
              opacity: 0.6,
              background: '/* Use createGlassStyle({ intent: "primary", elevation: "level2" }) */',
              padding: '0.5rem',
              borderRadius: '4px'
            }}>
              src/components/charts/components/ChartContainer.stories.tsx
            </div>
          </div>
        
          <div style={createGlassStyle({ intent: "neutral", elevation: "level2" })}>
            <h3 style={{ margin: '0 0 1rem 0' }}>ChartGrid</h3>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', opacity: 0.8 }}>
              Components/Components/ChartGrid
            </p>
            <div style={{ 
              fontFamily: 'monospace', 
              fontSize: '0.75rem', 
              opacity: 0.6,
              background: '/* Use createGlassStyle({ intent: "primary", elevation: "level2" }) */',
              padding: '0.5rem',
              borderRadius: '4px'
            }}>
              src/components/charts/components/ChartGrid.stories.tsx
            </div>
          </div>
        
          <div style={createGlassStyle({ intent: "neutral", elevation: "level2" })}>
            <h3 style={{ margin: '0 0 1rem 0' }}>Box</h3>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', opacity: 0.8 }}>
              Components/Layout/Box
            </p>
            <div style={{ 
              fontFamily: 'monospace', 
              fontSize: '0.75rem', 
              opacity: 0.6,
              background: '/* Use createGlassStyle({ intent: "primary", elevation: "level2" }) */',
              padding: '0.5rem',
              borderRadius: '4px'
            }}>
              src/components/layout/Box.stories.tsx
            </div>
          </div>
        
          <div style={createGlassStyle({ intent: "neutral", elevation: "level2" })}>
            <h3 style={{ margin: '0 0 1rem 0' }}>HStack</h3>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', opacity: 0.8 }}>
              Components/Layout/HStack
            </p>
            <div style={{ 
              fontFamily: 'monospace', 
              fontSize: '0.75rem', 
              opacity: 0.6,
              background: '/* Use createGlassStyle({ intent: "primary", elevation: "level2" }) */',
              padding: '0.5rem',
              borderRadius: '4px'
            }}>
              src/components/layout/HStack.stories.tsx
            </div>
          </div>
        
          <div style={createGlassStyle({ intent: "neutral", elevation: "level2" })}>
            <h3 style={{ margin: '0 0 1rem 0' }}>VStack</h3>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', opacity: 0.8 }}>
              Components/Layout/VStack
            </p>
            <div style={{ 
              fontFamily: 'monospace', 
              fontSize: '0.75rem', 
              opacity: 0.6,
              background: '/* Use createGlassStyle({ intent: "primary", elevation: "level2" }) */',
              padding: '0.5rem',
              borderRadius: '4px'
            }}>
              src/components/layout/VStack.stories.tsx
            </div>
          </div>
        
      </div>
    </div>
  );
};

const meta: Meta<typeof LayoutGallery> = {
  title: 'Categories/Layout',
  component: LayoutGallery,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Gallery: Story = {};
