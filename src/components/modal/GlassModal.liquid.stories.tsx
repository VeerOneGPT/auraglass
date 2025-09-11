import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { GlassModal } from './GlassModal';
import { cn } from '@/lib/utils';
import { GlassButton } from '../button/GlassButton';

const meta: Meta<typeof GlassModal> = {
  title: 'Components/GlassModal/Liquid Glass',
  component: GlassModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# GlassModal with Liquid Glass Material

Experience next-generation modal dialogs with Apple-quality **Liquid Glass** material system. Features physically accurate refraction, environmental adaptation, and motion responsiveness.

## Key Features

- **Liquid Glass Material**: Photorealistic glass physics with IOR-based refraction
- **Environmental Adaptation**: Content-aware tinting with automatic contrast compliance
- **Motion Responsiveness**: Subtle parallax and depth effects
- **Accessibility**: Full WCAG AA/AAA compliance with Contrast Guard middleware

## Material Properties

Configure the liquid glass material through \`materialProps\`:
- \`ior\`: Index of Refraction (1.0-2.0) - controls refraction intensity
- \`thickness\`: Material depth in pixels
- \`tint\`: RGBA color object for environmental tinting
- \`variant\`: 'regular' or 'clear' density modes
- \`quality\`: Performance tier (ultra/high/balanced/efficient)
        `,
      },
    },
  },
  argTypes: {
    material: {
      control: { type: 'select' },
      options: ['glass', 'liquid'],
      description: 'Material system to use',
      defaultValue: 'liquid',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'],
      description: 'Modal size',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'centered', 'drawer', 'fullscreen'],
      description: 'Modal variant',
    },
    materialProps: {
      control: 'object',
      description: 'Liquid glass material properties',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ModalTrigger = ({ children, ...modalProps }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <GlassButton 
        material="liquid"
        onClick={() => setOpen(true)}
        className="px-6 py-3"
      >
        Open Liquid Glass Modal
      </GlassButton>
      
      <GlassModal
        {...modalProps}
        open={open}
        onClose={() => setOpen(false)}
      >
        {children}
      </GlassModal>
    </>
  );
};

export const Default: Story = {
  render: (args) => (
    <ModalTrigger {...args}>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Liquid Glass Modal
        </h2>
        <p className="text-foreground/80">
          This modal uses the new Liquid Glass material system with physically 
          accurate refraction and environmental adaptation.
        </p>
        <p className="text-sm text-foreground/60">
          Notice the subtle refraction effects and how the glass adapts to 
          the content behind it while maintaining perfect readability.
        </p>
      </div>
    </ModalTrigger>
  ),
  args: {
    material: 'liquid',
    size: 'md',
    variant: 'default',
    title: 'Liquid Glass Experience',
    description: 'Next-generation modal with Apple-quality liquid glass',
    materialProps: {
      ior: 1.52,
      thickness: 12,
      tint: { r: 0, g: 0, b: 0, a: 0.1 },
      variant: 'regular',
      quality: 'high',
    },
  },
};

export const HighRefraction: Story = {
  render: (args) => (
    <ModalTrigger {...args}>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          High IOR Crystal Modal
        </h2>
        <p className="text-foreground/80">
          Enhanced refraction (IOR: 1.8) creates dramatic depth and crystal-like appearance.
        </p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <h4 className="font-medium text-primary">Enhanced Depth</h4>
            <p className="text-xs text-primary/80">Crystal-like refraction</p>
          </div>
          <div className="p-3 bg-accent/10 rounded-lg">
            <h4 className="font-medium text-accent">Visual Drama</h4>
            <p className="text-xs text-accent/80">Increased material presence</p>
          </div>
        </div>
      </div>
    </ModalTrigger>
  ),
  args: {
    ...Default.args,
    title: 'High Refraction Modal',
    description: 'Crystal-like glass with enhanced depth perception',
    materialProps: {
      ior: 1.8,
      thickness: 20,
      tint: { r: 59, g: 130, b: 246, a: 0.15 },
      variant: 'regular',
      quality: 'ultra',
    },
  },
};

export const UltraClear: Story = {
  render: (args) => (
    <ModalTrigger {...args}>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Ultra Clear Glass
        </h2>
        <p className="text-foreground/80">
          Water-like transparency with minimal visual weight while maintaining structure.
        </p>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-foreground/70">Minimal visual interference</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-foreground/70">Perfect content legibility</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-foreground/70">Subtle depth perception</span>
          </div>
        </div>
      </div>
    </ModalTrigger>
  ),
  args: {
    ...Default.args,
    title: 'Ultra Clear Modal',
    description: 'Minimal visual weight with perfect transparency',
    materialProps: {
      ior: 1.33,
      thickness: 6,
      tint: { r: 0, g: 0, b: 0, a: 0.02 },
      variant: 'clear',
      quality: 'ultra',
    },
  },
};

export const ColorfulTints: Story = {
  render: (args) => (
    <ModalTrigger {...args}>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Colored Liquid Glass
        </h2>
        <p className="text-foreground/80">
          Environmental tinting adapts to content while maintaining accessibility standards.
        </p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { name: 'Success', color: 'bg-green-500/20', text: 'text-green-600' },
            { name: 'Warning', color: 'bg-yellow-500/20', text: 'text-yellow-600' },
            { name: 'Error', color: 'bg-red-500/20', text: 'text-red-600' },
          ].map(({ name, color, text }) => (
            <div key={name} className={`p-3 rounded-lg ${color}`}>
              <h4 className={`font-medium ${text}`}>{name}</h4>
              <p className="text-xs opacity-80">Adaptive tinting</p>
            </div>
          ))}
        </div>
      </div>
    </ModalTrigger>
  ),
  args: {
    ...Default.args,
    title: 'Adaptive Tinting',
    description: 'Intelligent color adaptation with accessibility compliance',
    materialProps: {
      ior: 1.48,
      thickness: 14,
      tint: { r: 34, g: 197, b: 94, a: 0.12 },
      variant: 'regular',
      quality: 'high',
    },
  },
};

export const DrawerVariant: Story = {
  render: (args) => (
    <ModalTrigger {...args}>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Liquid Glass Drawer
          </h2>
          <p className="text-foreground/80">
            Bottom drawer with adapted liquid glass density for optimal mobile experience.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-muted/20 rounded-lg">
            <h3 className="font-medium mb-2">Mobile Optimized</h3>
            <p className="text-sm text-muted-foreground">
              Density automatically adjusts for drawer positioning and mobile interaction patterns.
            </p>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className="text-sm font-medium">Adaptive Density</span>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">85%</span>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className="text-sm font-medium">Motion Factor</span>
            <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">60%</span>
          </div>
        </div>
      </div>
    </ModalTrigger>
  ),
  args: {
    ...Default.args,
    variant: 'drawer',
    title: 'Mobile Drawer',
    description: 'Optimized liquid glass for mobile interactions',
    materialProps: {
      ior: 1.45,
      thickness: 8,
      tint: { r: 0, g: 0, b: 0, a: 0.06 },
      variant: 'regular',
      quality: 'balanced',
    },
  },
};

export const PerformanceComparison: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {(['glass', 'liquid'] as const).map((material) => {
        const [open, setOpen] = useState(false);
        return (
          <div key={material} className="space-y-3">
            <GlassButton 
              material={material}
              onClick={() => setOpen(true)}
              className="w-full px-4 py-3"
            >
              Open {material === 'glass' ? 'Standard Glass' : 'Liquid Glass'} Modal
            </GlassButton>
            
            <GlassModal
              material={material}
              open={open}
              onClose={() => setOpen(false)}
              title={`${material === 'glass' ? 'Standard Glass' : 'Liquid Glass'} Modal`}
              description="Compare the visual and performance differences"
              materialProps={material === 'liquid' ? {
                ior: 1.48,
                thickness: 12,
                tint: { r: 0, g: 0, b: 0, a: 0.1 },
                variant: 'regular',
                quality: 'high',
              } : undefined}
            >
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">
                      {material === 'glass' ? 'Standard Glass' : 'Liquid Glass'}
                    </h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      {material === 'glass' ? (
                        <>
                          <li>• CSS blur effects</li>
                          <li>• Static transparency</li>
                          <li>• Basic backdrop filter</li>
                          <li>• Good performance</li>
                        </>
                      ) : (
                        <>
                          <li>• Physical IOR refraction</li>
                          <li>• Environmental adaptation</li>
                          <li>• GPU-accelerated rendering</li>
                          <li>• Motion responsiveness</li>
                        </>
                      )}
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-muted/10 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Quality</div>
                    <div className="text-lg font-mono">
                      {material === 'glass' ? '★★★☆☆' : '★★★★★'}
                    </div>
                  </div>
                </div>
              </div>
            </GlassModal>
          </div>
        );
      })}
    </div>
  ),
};