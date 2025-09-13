import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { createGlassStyle } from '../core/mixins/glassMixins';

const BackgroundsGallery: React.FC = () => {
  return (
    <div style={{ 
      padding: '2rem',
      background: 'radial-gradient(circle at 20% 50%, #120E43 0%, #0A0A0A 50%, #1A1A2E 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Backgrounds Components</h1>
      <div style={{ 
        display: 'grid', 
        gap: '1.5rem', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' 
      }}>
        
          <div style={createGlassStyle({ intent: "neutral", elevation: "level2" })}>
            <h3 style={{ margin: '0 0 1rem 0' }}>AtmosphericBackground</h3>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', opacity: 0.8 }}>
              Components/Backgrounds/AtmosphericBackground
            </p>
            <div style={{ 
              fontFamily: 'monospace', 
              fontSize: '0.75rem', 
              opacity: 0.6,
              background: '/* Use createGlassStyle({ intent: "primary", elevation: "level2" }) */',
              padding: '0.5rem',
              borderRadius: '4px'
            }}>
              src/components/backgrounds/AtmosphericBackground.stories.tsx
            </div>
          </div>
        
          <div style={createGlassStyle({ intent: "neutral", elevation: "level2" })}>
            <h3 style={{ margin: '0 0 1rem 0' }}>DynamicAtmosphere</h3>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', opacity: 0.8 }}>
              Components/Backgrounds/DynamicAtmosphere
            </p>
            <div style={{ 
              fontFamily: 'monospace', 
              fontSize: '0.75rem', 
              opacity: 0.6,
              background: '/* Use createGlassStyle({ intent: "primary", elevation: "level2" }) */',
              padding: '0.5rem',
              borderRadius: '4px'
            }}>
              src/components/backgrounds/GlassDynamicAtmosphere.stories.tsx
            </div>
          </div>
        
          <div style={createGlassStyle({ intent: "neutral", elevation: "level2" })}>
            <h3 style={{ margin: '0 0 1rem 0' }}>ParticleBackground</h3>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', opacity: 0.8 }}>
              Components/Backgrounds/ParticleBackground
            </p>
            <div style={{ 
              fontFamily: 'monospace', 
              fontSize: '0.75rem', 
              opacity: 0.6,
              background: '/* Use createGlassStyle({ intent: "primary", elevation: "level2" }) */',
              padding: '0.5rem',
              borderRadius: '4px'
            }}>
              src/components/backgrounds/ParticleBackground.stories.tsx
            </div>
          </div>
        
      </div>
    </div>
  );
};

const meta: Meta<typeof BackgroundsGallery> = {
  title: 'Categories/Backgrounds',
  component: BackgroundsGallery,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Gallery: Story = {};
