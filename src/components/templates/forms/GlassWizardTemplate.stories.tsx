import type { Meta, StoryObj } from '@storybook/react';
import { GlassWizardTemplate } from './GlassWizardTemplate';

const meta: Meta<typeof GlassWizardTemplate> = {
  title: 'Components/Forms/GlassWizardTemplate',
  component: GlassWizardTemplate,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glasswizardtemplate component.',
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
type Story = StoryObj<typeof GlassWizardTemplate>;

export const Default: Story = {
  args: {
    
  },
};

export const Variants: Story = {
  render: (args: any) => (
    <div className="flex flex-wrap gap-4">
      <GlassWizardTemplate {...args}>
        Default
      </GlassWizardTemplate>
    </div>
  ),
  args: {
    
  },
};
