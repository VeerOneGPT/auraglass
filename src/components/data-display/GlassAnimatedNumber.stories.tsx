import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  GlassAnimatedNumber,
  GlassAnimatedCounter,
  GlassAnimatedStat,
  useAnimatedNumber
} from './GlassAnimatedNumber';
import { GlassCard } from '../card/GlassCard';
import { GlassButton } from '../button/GlassButton';

const meta: Meta<typeof GlassAnimatedNumber> = {
  title: 'Components/Data-Display/GlassAnimatedNumber',
  component: GlassAnimatedNumber,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Animated number components with glass morphism styling for displaying counters, stats, and metrics.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 1000000 },
      description: 'The target number to animate to',
    },
    from: {
      control: { type: 'number', min: 0, max: 1000000 },
      description: 'Starting value for animation',
    },
    duration: {
      control: { type: 'number', min: 100, max: 10000, step: 100 },
      description: 'Animation duration in milliseconds',
    },
    decimals: {
      control: { type: 'number', min: 0, max: 10 },
      description: 'Number of decimal places to show',
    },
    separator: {
      control: 'boolean',
      description: 'Whether to use comma separators',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Font size',
    },
    variant: {
      control: { type: 'select' },
      options: ['count', 'scale', 'glow'],
      description: 'Animation variant',
    },
  },
  args: {
    value: 1234,
    from: 0,
    duration: 2000,
    decimals: 0,
    separator: true,
    size: 'lg',
    variant: 'count',
  },
};

export default meta;
type Story = StoryObj<typeof GlassAnimatedNumber>;

export const Default: Story = {
  args: {
    value: 2500,
    suffix: ' users',
  },
};

export const WithPrefixSuffix: Story = {
  render: (args) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      <GlassCard>
        <div className="p-6 text-center">
          <GlassAnimatedNumber {...args} value={42.5} prefix="$" suffix="K" decimals={1} />
          <p className="text-sm opacity-80 mt-2">Revenue</p>
        </div>
      </GlassCard>

      <GlassCard>
        <div className="p-6 text-center">
          <GlassAnimatedNumber {...args} value={9876543} suffix=" views" separator={true} />
          <p className="text-sm opacity-80 mt-2">Total Views</p>
        </div>
      </GlassCard>

      <GlassCard>
        <div className="p-6 text-center">
          <GlassAnimatedNumber {...args} value={89.7} suffix="%" decimals={1} />
          <p className="text-sm opacity-80 mt-2">Completion Rate</p>
        </div>
      </GlassCard>

      <GlassCard>
        <div className="p-6 text-center">
          <GlassAnimatedNumber {...args} value={156} prefix="Level " />
          <p className="text-sm opacity-80 mt-2">Current Level</p>
        </div>
      </GlassCard>
    </div>
  ),
  args: {},
};

export const Variants: Story = {
  render: (args) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
      <GlassCard>
        <div className="p-6 text-center">
          <h4 className="text-sm font-medium mb-4">Count Variant</h4>
          <GlassAnimatedNumber {...args} variant="count" value={54321} />
        </div>
      </GlassCard>

      <GlassCard>
        <div className="p-6 text-center">
          <h4 className="text-sm font-medium mb-4">Scale Variant</h4>
          <GlassAnimatedNumber {...args} variant="scale" value={54321} />
        </div>
      </GlassCard>

      <GlassCard>
        <div className="p-6 text-center">
          <h4 className="text-sm font-medium mb-4">Glow Variant</h4>
          <GlassAnimatedNumber {...args} variant="glow" value={54321} />
        </div>
      </GlassCard>
    </div>
  ),
  args: {},
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col items-center space-y-6">
      <div className="text-center">
        <GlassAnimatedNumber {...args} size="sm" value={1234} />
        <p className="text-xs opacity-80 mt-1">Small</p>
      </div>

      <div className="text-center">
        <GlassAnimatedNumber {...args} size="md" value={56789} />
        <p className="text-xs opacity-80 mt-1">Medium</p>
      </div>

      <div className="text-center">
        <GlassAnimatedNumber {...args} size="lg" value={123456} />
        <p className="text-xs opacity-80 mt-1">Large</p>
      </div>

      <div className="text-center">
        <GlassAnimatedNumber {...args} size="xl" value={987654} />
        <p className="text-xs opacity-80 mt-1">Extra Large</p>
      </div>
    </div>
  ),
  args: {},
};

export const InteractiveDemo: Story = {
  render: (args) => {
    const [currentValue, setCurrentValue] = React.useState(1000);
    const [isAnimating, setIsAnimating] = React.useState(false);

    const handleRandomValue = () => {
      setIsAnimating(true);
      const newValue = Math.floor(Math.random() * 100000) + 1000;
      setCurrentValue(newValue);
      setTimeout(() => setIsAnimating(false), 2500);
    };

    const handleIncrement = () => {
      setIsAnimating(true);
      setCurrentValue(prev => prev + 1000);
      setTimeout(() => setIsAnimating(false), 2500);
    };

    return (
      <GlassCard>
        <div className="p-8 text-center space-y-6">
          <div>
            <GlassAnimatedNumber
              {...args}
              value={currentValue}
              className={isAnimating ? 'animate-pulse' : ''}
            />
            <p className="text-sm opacity-80 mt-2">Current Value</p>
          </div>

          <div className="flex justify-center space-x-3">
            <GlassButton onClick={handleRandomValue} disabled={isAnimating}>
              Random Value
            </GlassButton>
            <GlassButton onClick={handleIncrement} variant="secondary" disabled={isAnimating}>
              +1000
            </GlassButton>
          </div>

          <div className="text-xs opacity-60">
            Click buttons to see the number animate to new values
          </div>
        </div>
      </GlassCard>
    );
  },
  args: {},
};

export const AnimatedCounter: Story = {
  render: (args) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      <GlassCard>
        <div className="p-6 text-center">
          <h4 className="text-sm font-medium mb-4">Simple Counter</h4>
          <GlassAnimatedCounter value={42} />
          <p className="text-xs opacity-80 mt-2">Items in cart</p>
        </div>
      </GlassCard>

      <GlassCard>
        <div className="p-6 text-center">
          <h4 className="text-sm font-medium mb-4">Score Counter</h4>
          <GlassAnimatedCounter value={15420} />
          <p className="text-xs opacity-80 mt-2">Total score</p>
        </div>
      </GlassCard>
    </div>
  ),
  args: {},
};

export const AnimatedStat: Story = {
  render: (args) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
      <GlassCard>
        <div className="p-6 text-center">
          <GlassAnimatedStat
            value={2847}
            label="Active Users"
          />
        </div>
      </GlassCard>

      <GlassCard>
        <div className="p-6 text-center">
          <GlassAnimatedStat
            value={95.2}
            label="Uptime"
          />
        </div>
      </GlassCard>

      <GlassCard>
        <div className="p-6 text-center">
          <GlassAnimatedStat
            value={1247}
            label="Revenue"
          />
        </div>
      </GlassCard>
    </div>
  ),
  args: {},
};

export const DashboardExample: Story = {
  render: (args) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl">
      <GlassCard>
        <div className="p-6 text-center">
          <div className="text-2xl mb-2">📊</div>
          <GlassAnimatedNumber {...args} value={15420} size="xl" />
          <p className="text-sm opacity-80 mt-2">Total Views</p>
        </div>
      </GlassCard>

      <GlassCard>
        <div className="p-6 text-center">
          <div className="text-2xl mb-2">👥</div>
          <GlassAnimatedNumber {...args} value={2847} size="xl" />
          <p className="text-sm opacity-80 mt-2">Active Users</p>
        </div>
      </GlassCard>

      <GlassCard>
        <div className="p-6 text-center">
          <div className="text-2xl mb-2">💰</div>
          <GlassAnimatedNumber {...args} value={89456} prefix="$" separator={true} size="xl" />
          <p className="text-sm opacity-80 mt-2">Revenue</p>
        </div>
      </GlassCard>

      <GlassCard>
        <div className="p-6 text-center">
          <div className="text-2xl mb-2">⚡</div>
          <GlassAnimatedNumber {...args} value={99.7} suffix="%" decimals={1} size="xl" />
          <p className="text-sm opacity-80 mt-2">Uptime</p>
        </div>
      </GlassCard>
    </div>
  ),
  args: {},
};