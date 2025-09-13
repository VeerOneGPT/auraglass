import type { Meta, StoryObj } from '@storybook/react';
import { GlassPanel } from './glass-panel';
import { cn } from '../../lib/utils';

const meta: Meta<typeof GlassPanel> = {
  title: 'Components/UI-Components/GlassPanel',
  component: GlassPanel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile glass morphism panel component for organizing content with various styles and elevations.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'success', 'warning', 'error'],
      description: 'Panel variant style',
    },
    elevation: {
      control: { type: 'select' },
      options: ['level1', 'level2', 'level3', 'level4'],
      description: 'Panel elevation level',
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Panel padding',
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the panel is interactive',
    },
  },
  args: {
    variant: 'default',
    elevation: 'level1',
    padding: 'md',
    interactive: false,
  },
};

export default meta;
type Story = StoryObj<typeof GlassPanel>;

export const Default: Story = {
  args: {
    children: (
      <div className="glass-glass-text-center">
        <h3 className="glass-glass-text-lg glass-glass-font-semibold glass-glass-mb-2">Default Panel</h3>
        <p className="glass-glass-text-sm opacity-80">This is a standard glass panel.</p>
      </div>
    ),
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="glass-glass-grid glass-glass-glass-grid-cols-1 md:glass-glass-glass-grid-cols-2 lg:glass-glass-glass-grid-cols-3 glass-glass-gap-6 max-w-6xl">
      {(['default', 'primary', 'success', 'warning', 'error'] as const).map((variant) => (
        <GlassPanel key={variant} {...args} variant={variant}>
          <div className="glass-glass-text-center">
            <h4 className="glass-glass-text-sm glass-glass-font-medium glass-glass-capitalize glass-glass-mb-2">{variant} Panel</h4>
            <p className="glass-glass-text-xs opacity-70">This is a {variant} variant panel.</p>
          </div>
        </GlassPanel>
      ))}
    </div>
  ),
  args: {
    children: null, // Will be overridden in render
  },
};

export const Elevations: Story = {
  render: (args) => (
    <div className="glass-glass-grid glass-glass-glass-grid-cols-1 md:glass-glass-glass-grid-cols-4 glass-glass-gap-6 max-w-5xl">
      {( ['level1', 'level2', 'level3', 'level4'] as const).map((elevation) => (
        <GlassPanel key={elevation} {...args} elevation={elevation}>
          <div className="glass-glass-text-center">
            <h4 className="glass-glass-text-sm glass-glass-font-medium glass-glass-mb-2 glass-glass-capitalize">{elevation} Elevation</h4>
            <p className="glass-glass-text-xs opacity-70">Panel with {elevation} elevation.</p>
          </div>
        </GlassPanel>
      ))}
    </div>
  ),
  args: {
    children: null, // Will be overridden in render
  },
};

export const PaddingSizes: Story = {
  render: (args) => (
    <div className="glass-glass-grid glass-glass-glass-grid-cols-1 md:glass-glass-glass-grid-cols-3 glass-glass-gap-6 max-w-4xl">
      {(['none', 'sm', 'md', 'lg', 'xl'] as const).map((padding) => (
        <GlassPanel key={padding} {...args} padding={padding}>
          <div className="glass-glass-text-center">
            <h4 className="glass-glass-text-sm glass-glass-font-medium glass-glass-mb-2 glass-glass-capitalize">{padding} Padding</h4>
            <p className="glass-glass-text-xs opacity-70">Panel with {padding} padding.</p>
            {padding === 'none' && <p className="glass-glass-text-xs opacity-60 glass-mt-1">No padding applied</p>}
          </div>
        </GlassPanel>
      ))}
    </div>
  ),
  args: {
    children: null, // Will be overridden in render
  },
};

export const Interactive: Story = {
  args: {
    interactive: true,
    children: (
      <div className="glass-glass-text-center glass-glass-cursor-pointer">
        <h3 className="glass-glass-text-lg glass-glass-font-semibold glass-glass-mb-2">Interactive Panel</h3>
        <p className="glass-glass-text-sm opacity-80">Hover over this panel to see the interactive effects.</p>
        <div className="glass-mt-4 glass-glass-text-xs opacity-60">Click me!</div>
      </div>
    ),
  },
};

export const ContentShowcase: Story = {
  args: {
    variant: 'primary',
    elevation: 'level3',
    padding: 'lg',
    children: (
      <div className="glass-auto-gap glass-auto-gap-lg">
        <div className="glass-glass-text-center">
          <h3 className="glass-glass-text-xl font-bold glass-glass-mb-2">Premium Panel</h3>
          <p className="glass-glass-text-sm opacity-80">
            This panel showcases the full capabilities of the GlassPanel component
            with primary variant, high elevation, and generous padding.
          </p>
        </div>

        <div className="glass-glass-grid glass-glass-glass-grid-cols-2 glass-glass-gap-4 mt-6">
          <div className="glass-glass-text-center glass-glass-p-3 glass-surface-subtle/10 glass-radius-lg">
            <div className="glass-glass-text-lg glass-glass-font-semibold glass-glass-text-primary">42</div>
            <div className="glass-glass-text-xs opacity-70">Active Users</div>
          </div>
          <div className="glass-glass-text-center glass-glass-p-3 glass-surface-subtle/10 glass-radius-lg">
            <div className="glass-glass-text-lg glass-glass-font-semibold glass-glass-text-primary">89%</div>
            <div className="glass-glass-text-xs opacity-70">Completion Rate</div>
          </div>
        </div>

        <div className="glass-glass-flex glass-glass-justify-center glass-glass-gap-2 pt-2">
          <span className="glass-glass-px-3 glass-glass-py-1 glass-surface-subtle/20 glass-radius-full glass-glass-text-xs">Responsive</span>
          <span className="glass-glass-px-3 glass-glass-py-1 glass-surface-subtle/20 glass-radius-full glass-glass-text-xs">Interactive</span>
          <span className="glass-glass-px-3 glass-glass-py-1 glass-surface-subtle/20 glass-radius-full glass-glass-text-xs">Accessible</span>
        </div>
      </div>
    ),
  },
};

export const DashboardLayout: Story = {
  render: (args) => (
    <div className="glass-glass-grid glass-glass-glass-grid-cols-1 md:glass-glass-glass-grid-cols-2 lg:glass-glass-glass-grid-cols-3 glass-glass-gap-6 max-w-7xl">
      <GlassPanel {...args} variant="primary" elevation="level2">
        <div className="glass-glass-text-center">
          <div className="glass-glass-text-3xl glass-glass-mb-2">📊</div>
          <h4 className="glass-glass-text-lg glass-glass-font-semibold glass-glass-mb-1">Analytics</h4>
          <p className="glass-glass-text-sm opacity-80">View detailed analytics and insights</p>
        </div>
      </GlassPanel>

      <GlassPanel {...args} variant="success" elevation="level2">
        <div className="glass-glass-text-center">
          <div className="glass-glass-text-3xl glass-glass-mb-2">💰</div>
          <h4 className="glass-glass-text-lg glass-glass-font-semibold glass-glass-mb-1">Revenue</h4>
          <p className="glass-glass-text-sm opacity-80">Track financial performance</p>
        </div>
      </GlassPanel>

      <GlassPanel {...args} variant="warning" elevation="level2">
        <div className="glass-glass-text-center">
          <div className="glass-glass-text-3xl glass-glass-mb-2">👥</div>
          <h4 className="glass-glass-text-lg glass-glass-font-semibold glass-glass-mb-1">Users</h4>
          <p className="glass-glass-text-sm opacity-80">Manage user accounts and permissions</p>
        </div>
      </GlassPanel>

      <GlassPanel {...args} variant="error" elevation="level1">
        <div className="glass-glass-text-center">
          <div className="glass-glass-text-3xl glass-glass-mb-2">⚠️</div>
          <h4 className="glass-glass-text-lg glass-glass-font-semibold glass-glass-mb-1">Alerts</h4>
          <p className="glass-glass-text-sm opacity-80">Monitor system alerts and notifications</p>
        </div>
      </GlassPanel>

      <GlassPanel {...args} variant="default" elevation="level1">
        <div className="glass-glass-text-center">
          <div className="glass-glass-text-3xl glass-glass-mb-2">🔧</div>
          <h4 className="glass-glass-text-lg glass-glass-font-semibold glass-glass-mb-1">Settings</h4>
          <p className="glass-glass-text-sm opacity-80">Configure system preferences</p>
        </div>
      </GlassPanel>

      <GlassPanel {...args} variant="primary" elevation="level1">
        <div className="glass-glass-text-center">
          <div className="glass-glass-text-3xl glass-glass-mb-2">📈</div>
          <h4 className="glass-glass-text-lg glass-glass-font-semibold glass-glass-mb-1">Reports</h4>
          <p className="glass-glass-text-sm opacity-80">Generate and view reports</p>
        </div>
      </GlassPanel>
    </div>
  ),
  args: {
    children: null, // Will be overridden in render
  },
};
