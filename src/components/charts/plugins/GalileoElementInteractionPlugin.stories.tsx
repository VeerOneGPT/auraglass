import type { Meta, StoryObj } from '@storybook/react';
import createGalileoPluginUntyped from './GalileoElementInteractionPlugin';

// Define the interface locally to avoid import issues
interface GalileoInteractionConfig {
  enabled: boolean;
  magneticEffect: boolean;
  rippleEffect: boolean;
  glowEffect: boolean;
  physics: {
    stiffness: number;
    damping: number;
    mass: number;
  };
  visual: {
    scale: number;
    glowIntensity: number;
    rippleSpeed: number;
    rippleSize: number;
  };
}

// Force the correct typing
const createGalileoPlugin = createGalileoPluginUntyped as unknown as (config?: Partial<GalileoInteractionConfig>) => any;

// Define the args type
type PluginArgs = {
  enabled?: boolean;
  magneticEffect?: boolean;
  rippleEffect?: boolean;
  glowEffect?: boolean;
};

const meta: Meta = {
  title: 'Components/Plugins/GalileoElementInteractionPlugin',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A chart plugin that adds interactive effects like magnetic attraction, ripple effects, and glow to chart elements.',
      },
    },
  },
  argTypes: {
    enabled: {
      control: 'boolean',
      description: 'Enable/disable the plugin',
      defaultValue: true,
    },
    magneticEffect: {
      control: 'boolean',
      description: 'Enable magnetic attraction effect on hover',
      defaultValue: true,
    },
    rippleEffect: {
      control: 'boolean',
      description: 'Enable ripple effect on click',
      defaultValue: true,
    },
    glowEffect: {
      control: 'boolean',
      description: 'Enable glow effect',
      defaultValue: true,
    },
  },
  args: {
    enabled: true,
    magneticEffect: true,
    rippleEffect: true,
    glowEffect: true,
    stiffness: 0.1,
    damping: 0.8,
    mass: 1,
    scale: 1.1,
    glowIntensity: 0.5,
    rippleSpeed: 0.6,
    rippleSize: 2,
  },
};

export default meta;
type Story = StoryObj<PluginArgs>;

export const Default: Story = {
  render: (args) => {
    // Create plugin instance with story args
    const config: Partial<GalileoInteractionConfig> = {
      enabled: args.enabled ?? true,
      magneticEffect: args.magneticEffect ?? true,
      rippleEffect: args.rippleEffect ?? true,
      glowEffect: args.glowEffect ?? true,
      physics: {
        stiffness: 200,
        damping: 15,
        mass: 0.8,
      },
      visual: {
        scale: 1.05,
        glowIntensity: 0.3,
        rippleSpeed: 0.6,
        rippleSize: 2,
      },
    };
    const plugin = createGalileoPlugin(config);

    return (
      <div className="p-8 space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Galileo Element Interaction Plugin</h3>
          <p className="text-sm opacity-80 mb-4">
            Hover over and click the elements below to see the interactive effects.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          {/* Demo elements that the plugin would interact with */}
          <div className="chart-element p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 rounded-lg cursor-pointer transition-all duration-200">
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium">Data Point 1</p>
            </div>
          </div>

          <div className="chart-element p-4 bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-white/20 rounded-lg cursor-pointer transition-all duration-200">
            <div className="text-center">
              <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium">Data Point 2</p>
            </div>
          </div>

          <div className="chart-element p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/20 rounded-lg cursor-pointer transition-all duration-200">
            <div className="text-center">
              <div className="w-8 h-8 bg-purple-500 rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium">Data Point 3</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-lg p-4">
          <h4 className="text-sm font-semibold mb-2">Plugin Status:</h4>
          <p className="text-xs opacity-75">
            Plugin created successfully with effects: Magnetic, Ripple, Glow
          </p>
        </div>
      </div>
    );
  },
  args: {
    enabled: true,
    magneticEffect: true,
    rippleEffect: true,
    glowEffect: true,
  },
};

export const DisabledEffects: Story = {
  render: (args) => {
    const config: Partial<GalileoInteractionConfig> = {
      enabled: args.enabled ?? true,
      magneticEffect: false,
      rippleEffect: false,
      glowEffect: false,
      physics: {
        stiffness: 200,
        damping: 15,
        mass: 0.8,
      },
      visual: {
        scale: 1.05,
        glowIntensity: 0.3,
        rippleSpeed: 0.6,
        rippleSize: 2,
      },
    };
    const plugin = createGalileoPlugin(config);

    return (
      <div className="p-8 space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Disabled Effects</h3>
          <p className="text-sm opacity-80 mb-4">
            All interactive effects are disabled. Elements won't respond to hover or click.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <div className="chart-element p-4 bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-white/20 rounded-lg cursor-pointer">
            <div className="text-center">
              <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium">No Effects</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-lg p-4">
          <h4 className="text-sm font-semibold mb-2">Plugin Status:</h4>
          <p className="text-xs opacity-75">
            Plugin created with all effects disabled
          </p>
        </div>
      </div>
    );
  },
  args: {
    enabled: true,
    magneticEffect: false,
    rippleEffect: false,
    glowEffect: false,
  },
};
