import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { GlassA11y } from './GlassA11y';
import { cn } from '../../lib/utils';

const meta: Meta<typeof GlassA11y> = {
  title: 'Accessibility/GlassA11y',
  component: GlassA11y,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive accessibility control panel providing WCAG AAA compliance management with real-time testing and adaptive interfaces.'
      }
    }
  },
  argTypes: {
    showDashboard: {
      control: 'boolean',
      description: 'Whether to show the accessibility dashboard'
    },
    enableTesting: {
      control: 'boolean',
      description: 'Enable accessibility testing features'
    },
    position: {
      control: { type: 'select', options: ['fixed', 'relative'] },
      description: 'Positioning mode for the panel'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    },
    onConfigChange: {
      action: 'config changed',
      description: 'Called when accessibility configuration changes'
    }
  }
};

export default meta;
type Story = StoryObj<typeof GlassA11y>;

export const Default: Story = {
  args: {
    showDashboard: true,
    enableTesting: true,
    position: 'fixed',
    onConfigChange: fn()
  },
  render: (args) => (
    <div className="min-h-screen glass-gradient-primary from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 glass-glass-p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="glass-glass-text-3xl font-bold glass-text-secondary dark:glass-glass-text-primary mb-8">
          Accessibility Control Panel Demo
        </h1>

        <div className="glass-glass-grid glass-glass-glass-grid-cols-1 md:glass-glass-glass-grid-cols-2 glass-glass-gap-6 mb-8">
          <div className="glass-glass-p-6 glass-surface-subtle/80 dark:bg-gray-800/80 backdrop-blur-lg glass-radius-xl glass-glass-border glass-glass-border-subtle/50 dark:glass-glass-border-gray-700/50">
            <h3 className="glass-glass-text-xl glass-glass-font-semibold glass-text-secondary dark:glass-glass-text-primary glass-glass-mb-4">
              Interactive Content
            </h3>
            <p className="glass-text-secondary dark:text-gray-300 glass-glass-mb-4">
              This content demonstrates how accessibility settings can adapt the user interface in real-time.
              Try using the accessibility panel to see the changes.
            </p>
            <button className="glass-glass-px-4 glass-glass-py-2 glass-surface-blue hover:glass-surface-blue glass-glass-text-primary glass-radius-lg transition-colors">
              Interactive Button
            </button>
          </div>

          <div className="glass-glass-p-6 glass-surface-subtle/80 dark:bg-gray-800/80 backdrop-blur-lg glass-radius-xl glass-glass-border glass-glass-border-subtle/50 dark:glass-glass-border-gray-700/50">
            <h3 className="glass-glass-text-xl glass-glass-font-semibold glass-text-secondary dark:glass-glass-text-primary glass-glass-mb-4">
              Form Elements
            </h3>
            <div className="glass-glass-space-y-4">
              <input
                type="text"
                placeholder="Enter text here"
                className="glass-glass-w-full glass-glass-p-3 glass-glass-border glass-glass-border-subtle dark:glass-glass-border-gray-600 glass-radius-lg glass-surface-subtle dark:bg-gray-700 glass-text-secondary dark:glass-glass-text-primary"
              />
              <textarea
                placeholder="Enter longer text here"
                rows={3}
                className="glass-glass-w-full glass-glass-p-3 glass-glass-border glass-glass-border-subtle dark:glass-glass-border-gray-600 glass-radius-lg glass-surface-subtle dark:bg-gray-700 glass-text-secondary dark:glass-glass-text-primary"
              />
            </div>
          </div>
        </div>

        <GlassA11y {...args} />
      </div>
    </div>
  )
};

export const TestingMode: Story = {
  args: {
    showDashboard: true,
    enableTesting: true,
    position: 'fixed',
    onConfigChange: fn()
  },
  render: (args) => (
    <div className="min-h-screen glass-gradient-primary from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 glass-glass-p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="glass-glass-text-3xl font-bold glass-text-secondary dark:glass-glass-text-primary mb-8">
          Accessibility Testing Demo
        </h1>

        <div className="glass-glass-grid glass-glass-glass-grid-cols-1 md:glass-glass-glass-grid-cols-3 glass-glass-gap-6 mb-8">
          <div className="glass-glass-p-4 glass-surface-subtle/80 dark:bg-gray-800/80 backdrop-blur-lg glass-radius-xl glass-glass-border glass-glass-border-subtle/50 dark:glass-glass-border-gray-700/50">
            <h4 className="glass-glass-font-semibold glass-text-secondary dark:glass-glass-text-primary glass-glass-mb-2">WCAG AA Compliance</h4>
            <div className="glass-glass-w-full bg-gray-200 dark:bg-gray-700 glass-radius-full h-2 glass-glass-mb-2">
              <div className="glass-surface-green h-2 glass-radius-full" style={{ width: '95%' }}></div>
            </div>
            <p className="glass-glass-text-sm glass-text-secondary dark:text-gray-300">95% compliant</p>
          </div>

          <div className="glass-glass-p-4 glass-surface-subtle/80 dark:bg-gray-800/80 backdrop-blur-lg glass-radius-xl glass-glass-border glass-glass-border-subtle/50 dark:glass-glass-border-gray-700/50">
            <h4 className="glass-glass-font-semibold glass-text-secondary dark:glass-glass-text-primary glass-glass-mb-2">Keyboard Navigation</h4>
            <div className="glass-glass-w-full bg-gray-200 dark:bg-gray-700 glass-radius-full h-2 glass-glass-mb-2">
              <div className="glass-surface-blue h-2 glass-radius-full" style={{ width: '100%' }}></div>
            </div>
            <p className="glass-glass-text-sm glass-text-secondary dark:text-gray-300">Fully accessible</p>
          </div>

          <div className="glass-glass-p-4 glass-surface-subtle/80 dark:bg-gray-800/80 backdrop-blur-lg glass-radius-xl glass-glass-border glass-glass-border-subtle/50 dark:glass-glass-border-gray-700/50">
            <h4 className="glass-glass-font-semibold glass-text-secondary dark:glass-glass-text-primary glass-glass-mb-2">Screen Reader Support</h4>
            <div className="glass-glass-w-full bg-gray-200 dark:bg-gray-700 glass-radius-full h-2 glass-glass-mb-2">
              <div className="bg-purple-500 h-2 glass-radius-full" style={{ width: '90%' }}></div>
            </div>
            <p className="glass-glass-text-sm glass-text-secondary dark:text-gray-300">90% supported</p>
          </div>
        </div>

        <GlassA11y {...args} />
      </div>
    </div>
  )
};

export const HighContrast: Story = {
  args: {
    showDashboard: true,
    enableTesting: false,
    position: 'relative',
    className: 'custom-accessibility-theme',
    onConfigChange: fn()
  },
  render: (args) => (
    <div className="min-h-screen glass-surface-dark glass-glass-p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="glass-glass-text-3xl font-bold glass-glass-text-primary mb-8">
          High Contrast Mode Demo
        </h1>

        <div className="glass-glass-p-6 glass-surface-subtle glass-glass-border-2 glass-glass-border-black glass-radius-xl">
          <h3 className="glass-glass-text-xl glass-glass-font-semibold glass-text-inverse glass-glass-mb-4">
            High Contrast Content
          </h3>
          <p className="glass-text-inverse glass-glass-mb-4">
            This content uses high contrast colors for better visibility.
            The accessibility panel can automatically switch to high contrast mode.
          </p>
          <button className="glass-glass-px-4 glass-glass-py-2 glass-surface-dark glass-glass-text-primary glass-glass-border-2 glass-glass-border-black glass-radius hover:bg-gray-800 transition-colors">
            High Contrast Button
          </button>
        </div>

        <div className="mt-8">
          <GlassA11y {...args} />
        </div>
      </div>
    </div>
  )
};

export const Minimal: Story = {
  args: {
    showDashboard: true,
    enableTesting: false,
    position: 'relative',
    onConfigChange: fn()
  },
  render: (args) => (
    <div className="min-h-screen glass-surface-subtle glass-glass-p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="glass-glass-text-3xl font-bold glass-text-secondary mb-8">
          Minimal Accessibility Demo
        </h1>

        <div className="glass-glass-grid glass-glass-glass-grid-cols-1 md:glass-glass-glass-grid-cols-2 glass-glass-gap-6 mb-8">
          <div className="glass-glass-p-6 glass-surface-subtle glass-radius-xl glass-glass-border glass-glass-border-subtle">
            <h3 className="glass-glass-text-lg glass-glass-font-semibold glass-text-secondary glass-glass-mb-4">
              Clean Interface
            </h3>
            <p className="glass-text-secondary glass-glass-mb-4">
              Simple, clean design that works well with accessibility features.
            </p>
          </div>

          <div className="glass-glass-p-6 glass-surface-subtle glass-radius-xl glass-glass-border glass-glass-border-subtle">
            <h3 className="glass-glass-text-lg glass-glass-font-semibold glass-text-secondary glass-glass-mb-4">
              Focus States
            </h3>
            <p className="glass-text-secondary glass-glass-mb-4">
              Clear focus indicators for keyboard navigation.
            </p>
            <button className="glass-glass-px-4 glass-glass-py-2 glass-surface-blue glass-glass-text-primary glass-radius hover:glass-surface-blue focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors">
              Focusable Button
            </button>
          </div>
        </div>

        <GlassA11y {...args} />
      </div>
    </div>
  )
};

