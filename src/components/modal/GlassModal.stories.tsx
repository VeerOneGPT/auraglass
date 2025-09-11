import type { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';
import { GlassModal } from './GlassModal';
import { cn } from '@/lib/utils';
import { useGlassParallax } from '../../hooks/useGlassParallax';

const meta: Meta<typeof GlassModal> = {
  title: 'Components/Modal/GlassModal',
  component: GlassModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glassmorphism modal component with consciousness interface features including predictive content, eye tracking focus management, biometric adaptation, and spatial audio positioning.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'className prop',
    },
    open: {
      control: 'boolean',
      description: 'open prop',
    },
    title: {
      control: 'text',
      description: 'title prop',
    },
    size: {
      control: { type: 'select' },
      options: ["sm","md","lg"],
      description: 'size prop',
    },
  },
  args: {
    className: '',
    open: false,
    title: 'Modal Title',
    size: 'sm',
  },
};

export default meta;

// Modal consciousness features overview
export const ConsciousnessOverview: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center glass-gap-2">
        <h2 className="glass-text-xl font-semibold text-glass-text">Modal Consciousness Features</h2>
        <p className="glass-text-sm text-glass-text-secondary">Intelligent modal interactions</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 glass-gap-4">
        <div className="bg-glass-surface/10 backdrop-blur-sm glass-radius-lg glass-p-4">
          <h3 className="font-medium text-glass-text glass-mb-2">Predictive Content</h3>
          <p className="glass-text-sm text-glass-text-secondary">Adapts modal content based on user context and behavior patterns.</p>
        </div>
        <div className="bg-glass-surface/10 backdrop-blur-sm glass-radius-lg glass-p-4">
          <h3 className="font-medium text-glass-text glass-mb-2">Eye Tracking Focus</h3>
          <p className="glass-text-sm text-glass-text-secondary">Manages focus states based on user gaze and attention patterns.</p>
        </div>
        <div className="bg-glass-surface/10 backdrop-blur-sm glass-radius-lg glass-p-4">
          <h3 className="font-medium text-glass-text glass-mb-2">Biometric Adaptation</h3>
          <p className="glass-text-sm text-glass-text-secondary">Adjusts modal complexity and timing based on stress levels.</p>
        </div>
        <div className="bg-glass-surface/10 backdrop-blur-sm glass-radius-lg glass-p-4">
          <h3 className="font-medium text-glass-text glass-mb-2">Spatial Audio</h3>
          <p className="glass-text-sm text-glass-text-secondary">Provides positional audio cues for modal interactions.</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
type Story = StoryObj<typeof GlassModal>;

export const Default: Story = {
  args: {
    
  },
};

export const Variants: Story = {
  render: (args: any) => (
    <div className="flex flex-wrap glass-gap-4">
      <GlassModal {...args}>
        Default
      </GlassModal>
    </div>
  ),
  args: {
    
  },
};

export const SpecularOpen: Story = {
  args: {
    open: true,
    title: 'Specular Modal',
  },
  render: (args: any) => (
    (() => {
      const ref = useRef<HTMLDivElement>(null);
      useGlassParallax(ref, { strength: 14 });
      return (
        <GlassModal ref={ref as any} {...args}>
          <div className="glass-p-6 glass-typography-reset">
            <p className="glass-mb-2">This modal uses noise, edge frost and a specular sheen.</p>
            <p className="opacity-80">Move the cursor to see subtle parallax on the sheen.</p>
          </div>
        </GlassModal>
      );
    })()
  ),
};

// Consciousness Interface Features
export const ConsciousModal: Story = {
  args: {
    open: true,
    title: 'Consciousness-Enhanced Modal',
    consciousness: true,
    predictive: true,
    eyeTracking: true,
    adaptive: true,
    spatialAudio: true,
    trackAchievements: true,
    achievementId: 'modal-interaction',
  },
  render: (args: any) => (
    <GlassModal {...args}>
      <div className="glass-p-6">
        <div className="flex items-center glass-gap-2 glass-mb-4">
          <div className="w-3 h-3 bg-blue-400 glass-radius-full animate-pulse"></div>
          <span className="glass-text-sm font-medium">Consciousness Features Active</span>
        </div>
        <p className="glass-mb-4">This modal demonstrates consciousness interface integration:</p>
        <ul className="glass-text-sm glass-gap-2 mb-6">
          <li>• Predictive content adaptation</li>
          <li>• Eye tracking focus management</li>
          <li>• Biometric stress responsiveness</li>
          <li>• Spatial audio positioning</li>
          <li>• Achievement tracking</li>
        </ul>
        <div className="flex glass-gap-2">
          <button className="glass-px-4 glass-py-2 bg-blue-500/20 glass-radius-lg glass-text-sm">Primary Action</button>
          <button className="glass-px-4 glass-py-2 bg-gray-500/20 glass-radius-lg glass-text-sm">Secondary</button>
        </div>
      </div>
    </GlassModal>
  ),
};
