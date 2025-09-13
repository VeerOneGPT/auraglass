import type { Meta, StoryObj } from '@storybook/react';
import { ARGlassEffects } from './ARGlassEffects';

import { cn } from '../../lib/utils';
const meta: Meta<typeof ARGlassEffects> = {
  title: 'AR/ARGlassEffects',
  component: ARGlassEffects,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'WebXR-powered augmented reality glass effects with hand tracking, spatial interactions, and immersive 3D experiences.'
      }
    }
  },
  argTypes: {
    mode: {
      control: { type: 'select', options: ['ar', 'preview', 'demo'] },
      description: 'AR display mode'
    },
    enablePhysics: {
      control: 'boolean',
      description: 'Enable physics simulation'
    },
    enableHandTracking: {
      control: 'boolean',
      description: 'Enable hand tracking'
    },
    enableVoiceControl: {
      control: 'boolean',
      description: 'Enable voice control'
    },
    adaptiveScaling: {
      control: 'boolean',
      description: 'Enable adaptive scaling'
    },
    showControls: {
      control: 'boolean',
      description: 'Show AR controls'
    },
    showInfo: {
      control: 'boolean',
      description: 'Show capability info'
    }
  }
};

export default meta;
type Story = StoryObj<typeof ARGlassEffects>;

export const Default: Story = {
  args: {
    mode: 'preview',
    enablePhysics: false,
    enableHandTracking: false,
    enableVoiceControl: false,
    adaptiveScaling: true,
    showControls: true,
    showInfo: true,
    content: {
      title: 'AR Glass Experience',
      text: 'Experience augmented reality with glassmorphism effects',
      data: [0.8, 0.6, 0.9, 0.4, 0.7, 0.5]
    }
  }
};

export const ImmersiveAR: Story = {
  args: {
    mode: 'ar',
    enablePhysics: true,
    enableHandTracking: true,
    enableVoiceControl: true,
    adaptiveScaling: true,
    showControls: true,
    showInfo: false,
    content: {
      title: 'Immersive AR Experience',
      text: 'Full AR experience with physics and hand tracking',
      data: [0.9, 0.7, 0.8, 0.6, 0.9, 0.5, 0.8, 0.7]
    }
  }
};

export const DataVisualization: Story = {
  args: {
    mode: 'preview',
    enablePhysics: false,
    enableHandTracking: false,
    enableVoiceControl: false,
    adaptiveScaling: true,
    showControls: true,
    showInfo: true,
    content: {
      title: 'AR Data Visualization',
      text: 'Interactive 3D data visualization in AR space',
      data: [0.2, 0.8, 0.5, 0.9, 0.3, 0.7, 0.6, 0.4, 0.8, 0.5]
    }
  }
};

export const InteractiveDemo: Story = {
  args: {
    mode: 'demo',
    enablePhysics: true,
    enableHandTracking: false,
    enableVoiceControl: false,
    adaptiveScaling: true,
    showControls: true,
    showInfo: true,
    content: {
      title: 'Interactive AR Demo',
      text: 'Explore AR capabilities with interactive elements',
      media: 'demo-video-url'
    }
  },
  render: (args) => (
    <div className="glass-glass-relative">
      <ARGlassEffects {...args} />

      {/* Demo instructions overlay */}
      <div className="glass-glass-absolute top-4 left-4 glass-surface-dark/80 glass-glass-text-primary glass-glass-p-4 glass-radius-lg max-w-xs">
        <h3 className="glass-glass-font-semibold glass-glass-mb-2">AR Demo Instructions</h3>
        <ul className="glass-glass-text-sm space-y-1">
          <li>• Use mouse to orbit camera</li>
          <li>• Scroll to zoom in/out</li>
          <li>• Click on AR elements to interact</li>
          <li>• Try voice commands if enabled</li>
        </ul>
      </div>
    </div>
  )
};

export const HandTracking: Story = {
  args: {
    mode: 'preview',
    enablePhysics: true,
    enableHandTracking: true,
    enableVoiceControl: false,
    adaptiveScaling: true,
    showControls: true,
    showInfo: true,
    content: {
      title: 'Hand Tracking AR',
      text: 'Experience hand-tracked interactions in AR space',
      data: [0.6, 0.8, 0.4, 0.9, 0.5, 0.7]
    }
  },
  render: (args) => (
    <div className="glass-glass-relative">
      <ARGlassEffects {...args} />

      {/* Hand tracking info */}
      <div className="glass-glass-absolute bottom-4 right-4 glass-surface-dark/80 glass-glass-text-primary glass-glass-p-4 glass-radius-lg">
        <h3 className="glass-glass-font-semibold glass-glass-mb-2">Hand Tracking</h3>
        <div className="glass-glass-text-sm space-y-1">
          <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2">
            <div className="w-2 h-2 glass-surface-green glass-radius-full"></div>
            <span>Left Hand: Active</span>
          </div>
          <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2">
            <div className="w-2 h-2 glass-surface-green glass-radius-full"></div>
            <span>Right Hand: Active</span>
          </div>
        </div>
      </div>
    </div>
  )
};

export const MinimalAR: Story = {
  args: {
    mode: 'preview',
    enablePhysics: false,
    enableHandTracking: false,
    enableVoiceControl: false,
    adaptiveScaling: false,
    showControls: false,
    showInfo: false,
    content: {
      title: 'Minimal AR',
      text: 'Clean, minimal AR experience'
    }
  }
};

export const FullFeatured: Story = {
  args: {
    mode: 'ar',
    enablePhysics: true,
    enableHandTracking: true,
    enableVoiceControl: true,
    adaptiveScaling: true,
    showControls: true,
    showInfo: true,
    content: {
      title: 'Full AR Experience',
      text: 'Complete AR experience with all features enabled',
      data: [0.8, 0.6, 0.9, 0.7, 0.5, 0.8, 0.6, 0.9, 0.4, 0.7, 0.8, 0.5]
    }
  },
  render: (args) => (
    <div className="glass-glass-relative">
      <ARGlassEffects {...args} />

      {/* Feature showcase */}
      <div className="glass-glass-absolute top-4 right-4 glass-surface-dark/80 glass-glass-text-primary glass-glass-p-4 glass-radius-lg max-w-sm">
        <h3 className="glass-glass-font-semibold glass-glass-mb-3">Active Features</h3>
        <div className="glass-glass-grid glass-glass-glass-grid-cols-2 glass-glass-gap-2 glass-glass-text-sm">
          <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2">
            <div className="w-2 h-2 glass-surface-blue glass-radius-full"></div>
            <span>Physics</span>
          </div>
          <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2">
            <div className="w-2 h-2 glass-surface-green glass-radius-full"></div>
            <span>Hand Tracking</span>
          </div>
          <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2">
            <div className="w-2 h-2 bg-purple-400 glass-radius-full"></div>
            <span>Voice Control</span>
          </div>
          <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2">
            <div className="w-2 h-2 glass-surface-yellow glass-radius-full"></div>
            <span>Adaptive UI</span>
          </div>
        </div>
      </div>
    </div>
  )
};

