import type { Meta, StoryObj } from '@storybook/react';
import { GlassStepper } from './GlassStepper';

const meta: Meta<typeof GlassStepper> = {
  title: 'Components/Interactive/GlassStepper',
  component: GlassStepper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glassstepper component.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    active: {
      control: 'text',
      description: 'Active step ID',
    },
  },
  args: {
    className: '',
    active: 'step1',
  },
};

export default meta;
type Story = StoryObj<typeof GlassStepper>;

export const Default: Story = {
  args: {
    steps: [
      { id: 'step1', label: 'Step 1' },
      { id: 'step2', label: 'Step 2' },
      { id: 'step3', label: 'Step 3' },
      { id: 'step4', label: 'Step 4' },
    ],
    onChange: (id) => console.log('Step changed to:', id),
  },
};

export const WithOptionalSteps: Story = {
  args: {
    steps: [
      { id: 'personal', label: 'Personal Info' },
      { id: 'account', label: 'Account Setup' },
      { id: 'preferences', label: 'Preferences', optional: true },
      { id: 'review', label: 'Review' },
      { id: 'complete', label: 'Complete' },
    ],
    active: 'account',
    onChange: (id) => console.log('Step changed to:', id),
  },
};
