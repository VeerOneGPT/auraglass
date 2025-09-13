import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { createGlassStyle } from '../core/mixins/glassMixins';

const NavigationGallery: React.FC = () => {
  return (
    <div style={{ 
      padding: '2rem',
      background: 'radial-gradient(circle at 20% 50%, #120E43 0%, #0A0A0A 50%, #1A1A2E 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Navigation Components</h1>
      <div style={{ 
        display: 'grid', 
        gap: '1.5rem', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' 
      }}>
        
          <div style={createGlassStyle({ intent: "neutral", elevation: "level2" })}>
            <h3 style={{ margin: '0 0 1rem 0' }}>HeaderUserMenu</h3>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', opacity: 0.8 }}>
              Components/Navigation/HeaderUserMenu
            </p>
            <div style={{ 
              fontFamily: 'monospace', 
              fontSize: '0.75rem', 
              opacity: 0.6,
              background: '/* Use createGlassStyle({ intent: "primary", elevation: "level2" }) */',
              padding: '0.5rem',
              borderRadius: '4px'
            }}>
              src/components/navigation/HeaderUserMenu.stories.tsx
            </div>
          </div>
        
      </div>
    </div>
  );
};

const meta: Meta<typeof NavigationGallery> = {
  title: 'Categories/Navigation',
  component: NavigationGallery,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Gallery: Story = {};
