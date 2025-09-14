import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { GlassInput } from './GlassInput';
import { cn } from '../../lib/utils';

const meta: Meta<typeof GlassInput> = {
  title: 'Components/Input/GlassInput',
  component: GlassInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glassinput component.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'className prop',
    },
    disabled: {
      control: 'boolean',
      description: 'disabled prop',
    },
    placeholder: {
      control: 'text',
      description: 'placeholder prop',
    },
    // Intentionally omit `value` from Controls to avoid
    // passing a controlled value without onChange by default
    size: {
      control: { type: 'select' },
      options: ["sm","md","lg"],
      description: 'size prop',
    },
    variant: {
      control: { type: 'select' },
      options: ["default","filled","outlined","minimal"],
      description: 'variant prop',
    },
    state: {
      control: { type: 'select' },
      options: ["default","error","warning","success"],
      description: 'state prop',
    },
  },
  args: {
    className: '',
    disabled: false,
    placeholder: 'Enter text...',
    size: 'md',
    variant: 'default',
    state: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof GlassInput>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your text here...',
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="glass-glass-glass-flex glass-glass-glass-flex-col glass-glass-glass-gap-4 max-w-md">
      <GlassInput {...args} variant="default" placeholder="Default variant" />
      <GlassInput {...args} variant="filled" placeholder="Filled variant" />
      <GlassInput {...args} variant="outlined" placeholder="Outlined variant" />
      <GlassInput {...args} variant="minimal" placeholder="Minimal variant" />
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div className="glass-glass-glass-flex glass-glass-glass-flex-col glass-glass-glass-gap-4 max-w-md">
      <GlassInput {...args} state="default" placeholder="Default state" />
      <GlassInput {...args} state="success" placeholder="Success state" />
      <GlassInput {...args} state="warning" placeholder="Warning state" />
      <GlassInput {...args} state="error" placeholder="Error state" />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="glass-glass-glass-flex glass-glass-glass-flex-col glass-glass-glass-gap-4 max-w-md">
      <GlassInput {...args} size="sm" placeholder="Small size" />
      <GlassInput {...args} size="md" placeholder="Medium size" />
      <GlassInput {...args} size="lg" placeholder="Large size" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <div className="glass-glass-glass-flex glass-glass-glass-flex-col glass-glass-glass-gap-4 max-w-md">
      <GlassInput {...args} leftIcon="🔍" placeholder="With left icon" />
      <GlassInput {...args} rightIcon="✨" placeholder="With right icon" />
      <GlassInput {...args} leftIcon="👤" rightIcon="✓" placeholder="With both icons" />
    </div>
  ),
};

// Controlled example that wires value + onChange via Storybook args
export const Controlled: Story = {
  render: (args) => {
    const [{ value = '' }, updateArgs] = useArgs();
    return (
      <div className="max-w-md glass-glass-glass-space-y-3">
        <GlassInput
          {...args}
          value={value}
          onChange={(e) => updateArgs({ value: (e.target as HTMLInputElement).value })}
          placeholder={args.placeholder ?? 'Controlled input'}
        />
        <div className="glass-glass-glass-text-sm glass-text-secondary">
          Current value: <code>{JSON.stringify(value)}</code>
        </div>
      </div>
    );
  },
  args: {
    value: 'Hello',
  },
};
