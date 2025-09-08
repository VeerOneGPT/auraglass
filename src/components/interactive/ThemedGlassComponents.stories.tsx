import type { Meta, StoryObj } from '@storybook/react';
import { ThemedGlassComponents } from './ThemedGlassComponents';

const meta: Meta<typeof ThemedGlassComponents> = {
  title: 'Components/Interactive/ThemedGlassComponents',
  component: ThemedGlassComponents,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism themedglasscomponents component.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'className prop',
    },
  },
  args: {
    className: ''
  },
};

export default meta;
type Story = StoryObj<typeof ThemedGlassComponents>;

export const Default: Story = {
  args: {
    
  },
};

export const Variants: Story = {
  render: (args: any) => (
    <div className="flex flex-wrap gap-4">
      <ThemedGlassComponents {...args}>
        Default
      </ThemedGlassComponents>
    </div>
  ),
  args: {
    
  },
};
