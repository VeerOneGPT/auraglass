import type { Meta, StoryObj } from '@storybook/react';
import { GlassFormTemplate } from './GlassFormTemplate';

const meta: Meta<typeof GlassFormTemplate> = {
  title: 'Components/Forms/GlassFormTemplate',
  component: GlassFormTemplate,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glassformtemplate component.',
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
type Story = StoryObj<typeof GlassFormTemplate>;

export const Default: Story = {
  args: {
    
  },
};

export const Variants: Story = {
  render: (args: any) => (
    <div className="flex flex-wrap gap-4">
      <GlassFormTemplate {...args}>
        Default
      </GlassFormTemplate>
    </div>
  ),
  args: {
    
  },
};
