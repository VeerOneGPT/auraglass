import type { Meta, StoryObj } from '@storybook/react';
import { GlassButton } from '../button/GlassButton';
import { GlassCard } from '../card/GlassCard';
import { GlassInput } from '../input/GlassInput';
import { AccessibilityProvider } from './AccessibilityProvider';
import { GlassFocusIndicators } from './GlassFocusIndicators';

const meta: Meta<typeof GlassFocusIndicators> = {
  title: 'Accessibility/GlassFocusIndicators',
  component: GlassFocusIndicators,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Advanced focus management system with animated rings, keyboard navigation, and screen reader integration for WCAG compliance.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <AccessibilityProvider>
        <Story />
      </AccessibilityProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const DemoForm = () => (
  <GlassCard className="glass-glass-glass-p-6 glass-glass-glass-space-y-4">
    <h3 className="glass-glass-glass-text-lg glass-glass-glass-font-semibold">Focus Indicator Demo</h3>
    <p className="glass-glass-glass-text-sm glass-text-secondary">
      Use Tab to navigate between elements and see the focus indicators in action.
    </p>
    
    <div className="glass-glass-glass-space-y-3">
      <GlassInput 
        placeholder="First input field"
        label="Name"
      />
      
      <GlassInput 
        placeholder="Second input field"
        label="Email"
        type="email"
      />
      
      <div className="glass-glass-glass-flex glass-glass-glass-gap-3">
        <GlassButton>Primary Button</GlassButton>
        <GlassButton variant="secondary">Secondary Button</GlassButton>
        <GlassButton variant="ghost">Ghost Button</GlassButton>
      </div>
      
      <div className="glass-glass-glass-flex glass-glass-glass-items-center space-x-2">
        <input type="checkbox" id="checkbox1" className="focus:ring-2" />
        <label htmlFor="checkbox1">Checkbox option</label>
      </div>
      
      <div className="glass-glass-glass-flex glass-glass-glass-items-center space-x-2">
        <input type="radio" id="radio1" name="demo" className="focus:ring-2" />
        <label htmlFor="radio1">Radio option 1</label>
      </div>
      
      <div className="glass-glass-glass-flex glass-glass-glass-items-center space-x-2">
        <input type="radio" id="radio2" name="demo" className="focus:ring-2" />
        <label htmlFor="radio2">Radio option 2</label>
      </div>
    </div>
  </GlassCard>
);

export const Default: Story = {
  render: () => (
    <div>
      <GlassFocusIndicators />
      <DemoForm />
    </div>
  ),
};

export const OutlineVariant: Story = {
  render: () => (
    <div>
      <GlassFocusIndicators />
      <DemoForm />
    </div>
  ),
};

export const GlowVariant: Story = {
  render: () => (
    <div>
      <GlassFocusIndicators />
      <DemoForm />
    </div>
  ),
};

export const HighContrast: Story = {
  decorators: [
    (Story) => (
      <AccessibilityProvider initialSettings={{ highContrast: true }}>
        <Story />
      </AccessibilityProvider>
    ),
  ],
  render: () => (
    <div>
      <GlassFocusIndicators />
      <DemoForm />
    </div>
  ),
};

export const DangerColor: Story = {
  render: () => (
    <div>
      <GlassFocusIndicators />
      <DemoForm />
    </div>
  ),
};

export const AlwaysVisible: Story = {
  render: () => (
    <div>
      <GlassFocusIndicators />
      <DemoForm />
    </div>
  ),
};