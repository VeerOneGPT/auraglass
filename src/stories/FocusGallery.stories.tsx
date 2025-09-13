import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { createGlassStyle } from '../core/mixins/glassMixins';

const FocusGallery: React.FC = () => {
  return (
    <div style={{ 
      padding: '2rem',
      background: 'radial-gradient(circle at 20% 50%, #120E43 0%, #0A0A0A 50%, #1A1A2E 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Focus Components</h1>
      <div style={{ 
        display: 'grid', 
        gap: '1.5rem', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' 
      }}>
        
          <div style={createGlassStyle({ intent: "neutral", elevation: "level2" })}>
            <h3 style={{ margin: '0 0 1rem 0' }}>FocusTrap</h3>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', opacity: 0.8 }}>
              Components/Focus/FocusTrap
            </p>
            <div style={{ 
              fontFamily: 'monospace', 
              fontSize: '0.75rem', 
              opacity: 0.6,
              background: '/* Use createGlassStyle({ intent: "primary", elevation: "level2" }) */',
              padding: '0.5rem',
              borderRadius: '4px'
            }}>
              src/primitives/focus/FocusTrap.stories.tsx
            </div>
          </div>
        
          <div style={createGlassStyle({ intent: "neutral", elevation: "level2" })}>
            <h3 style={{ margin: '0 0 1rem 0' }}>ScreenReader</h3>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', opacity: 0.8 }}>
              Components/Focus/ScreenReader
            </p>
            <div style={{ 
              fontFamily: 'monospace', 
              fontSize: '0.75rem', 
              opacity: 0.6,
              background: '/* Use createGlassStyle({ intent: "primary", elevation: "level2" }) */',
              padding: '0.5rem',
              borderRadius: '4px'
            }}>
              src/primitives/focus/ScreenReader.stories.tsx
            </div>
          </div>
        
          <div style={createGlassStyle({ intent: "neutral", elevation: "level2" })}>
            <h3 style={{ margin: '0 0 1rem 0' }}>SkipLinks</h3>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', opacity: 0.8 }}>
              Components/Focus/SkipLinks
            </p>
            <div style={{ 
              fontFamily: 'monospace', 
              fontSize: '0.75rem', 
              opacity: 0.6,
              background: '/* Use createGlassStyle({ intent: "primary", elevation: "level2" }) */',
              padding: '0.5rem',
              borderRadius: '4px'
            }}>
              src/primitives/focus/SkipLinks.stories.tsx
            </div>
          </div>
        
      </div>
    </div>
  );
};

const meta: Meta<typeof FocusGallery> = {
  title: 'Categories/Focus',
  component: FocusGallery,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Gallery: Story = {};
