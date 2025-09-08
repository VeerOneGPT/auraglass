import type { Meta, StoryObj } from '@storybook/react';
import { GlassFormWizardSteps } from './GlassFormWizardSteps';

const meta: Meta<typeof GlassFormWizardSteps> = {
  title: 'Components/Forms/GlassFormWizardSteps',
  component: GlassFormWizardSteps,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glassformwizardsteps component.',
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
type Story = StoryObj<typeof GlassFormWizardSteps>;

export const Default: Story = {
  args: {
    
  },
};

export const Variants: Story = {
  render: (args: any) => (
    <div className="flex flex-wrap gap-4">
      <GlassFormWizardSteps {...args}>
        Default
      </GlassFormWizardSteps>
    </div>
  ),
  args: {
    
  },
};
