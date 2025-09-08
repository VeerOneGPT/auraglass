'use client';

// import type { Meta, StoryObj } from '@storybook/react';
import { GlassFormTemplate } from '../GlassFormTemplate';
import { GlassWizardTemplate } from '../GlassWizardTemplate';

const meta: any = {
  title: 'Templates/Forms/FormTemplate',
  component: GlassFormTemplate,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive form template with single-step and multi-step wizard support.',
      },
    },
  },
  argTypes: {
    layout: {
      control: 'select',
      options: ['default', 'centered', 'sidebar'],
    },
    multiStep: {
      control: 'boolean',
    },
    showProgress: {
      control: 'boolean',
    },
    allowDraft: {
      control: 'boolean',
    },
    autoSave: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = any;

const sampleSchema = [
  {
    id: 'personal-info',
    title: 'Personal Information',
    fields: [
      {
        id: 'firstName',
        label: 'First Name',
        type: 'text',
        required: true,
        placeholder: 'Enter your first name',
      },
      {
        id: 'lastName',
        label: 'Last Name',
        type: 'text',
        required: true,
        placeholder: 'Enter your last name',
      },
      {
        id: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        placeholder: 'Enter your email address',
      },
      {
        id: 'phone',
        label: 'Phone Number',
        type: 'tel',
        placeholder: 'Enter your phone number',
      },
    ],
  },
];

const sampleSteps = [
  {
    id: 'step1',
    title: 'Personal Information',
    description: 'Please provide your basic personal information.',
    sections: [
      {
        id: 'personal',
        title: 'Personal Details',
        fields: [
          {
            id: 'firstName',
            label: 'First Name',
            type: 'text',
            required: true,
            placeholder: 'Enter your first name',
          },
          {
            id: 'lastName',
            label: 'Last Name',
            type: 'text',
            required: true,
            placeholder: 'Enter your last name',
          },
          {
            id: 'email',
            label: 'Email',
            type: 'email',
            required: true,
            placeholder: 'Enter your email address',
          },
        ],
      },
    ],
  },
  {
    id: 'step2',
    title: 'Contact Information',
    description: 'How can we reach you?',
    sections: [
      {
        id: 'contact',
        title: 'Contact Details',
        fields: [
          {
            id: 'phone',
            label: 'Phone Number',
            type: 'tel',
            required: true,
            placeholder: 'Enter your phone number',
          },
          {
            id: 'address',
            label: 'Address',
            type: 'textarea',
            placeholder: 'Enter your address',
          },
          {
            id: 'city',
            label: 'City',
            type: 'text',
            required: true,
            placeholder: 'Enter your city',
          },
        ],
      },
    ],
  },
  {
    id: 'step3',
    title: 'Preferences',
    description: 'Tell us about your preferences.',
    optional: true,
    sections: [
      {
        id: 'preferences',
        title: 'Communication Preferences',
        fields: [
          {
            id: 'newsletter',
            label: 'Subscribe to newsletter',
            type: 'checkbox',
          },
          {
            id: 'notifications',
            label: 'Enable notifications',
            type: 'checkbox',
          },
          {
            id: 'contactMethod',
            label: 'Preferred contact method',
            type: 'select',
            options: [
              { value: 'email', label: 'Email' },
              { value: 'phone', label: 'Phone' },
              { value: 'sms', label: 'SMS' },
            ],
          },
        ],
      },
    ],
  },
];

export const Default: Story = {
  args: {
    title: 'User Registration',
    description: 'Create a new user account with our registration form.',
    schema: sampleSchema,
    layout: 'default',
    showProgress: true,
    allowDraft: true,
    onSubmit: async (values: any) => {
      console.log('Form submitted:', values);
      await new Promise(resolve => setTimeout(resolve, 2000));
    },
    onChange: (values: any) => {
      console.log('Form changed:', values);
    },
  },
};

export const Centered: Story = {
  args: {
    ...Default.args,
    layout: 'centered',
    title: 'Contact Us',
    description: 'Get in touch with our team.',
  },
};

export const WithSidebar: Story = {
  args: {
    ...Default.args,
    layout: 'sidebar',
    sidebar: (
      <div className="space-y-4">
        <div className="p-4 bg-muted/20 rounded-lg">
          <h3 className="font-semibold mb-2">Help & Support</h3>
          <p className="text-sm text-muted-foreground">
            Need help filling out this form? Contact our support team.
          </p>
        </div>
        <div className="p-4 bg-primary/10 rounded-lg">
          <h3 className="font-semibold mb-2">Privacy Notice</h3>
          <p className="text-sm text-muted-foreground">
            Your personal information is protected and will not be shared.
          </p>
        </div>
      </div>
    ),
  },
};

export const MultiStep: Story = {
  args: {
    title: 'Complete Registration',
    description: 'Follow the steps to complete your registration.',
    multiStep: true,
    steps: sampleSteps,
    showProgress: true,
    allowDraft: true,
    onSubmit: async (values: any) => {
      console.log('Multi-step form submitted:', values);
      await new Promise(resolve => setTimeout(resolve, 2000));
    },
    onStepChange: (step: any) => {
      console.log('Step changed to:', step);
    },
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
};

const WizardMeta: any = {
  title: 'Templates/Forms/WizardTemplate',
  component: GlassWizardTemplate,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Advanced multi-step wizard template with enhanced navigation and validation.',
      },
    },
  },
  argTypes: {
    layout: {
      control: 'select',
      options: ['default', 'compact', 'sidebar'],
    },
    showStepIndicator: {
      control: 'boolean',
    },
    allowSkipping: {
      control: 'boolean',
    },
    allowDraft: {
      control: 'boolean',
    },
    autoSave: {
      control: 'boolean',
    },
  },
};

type WizardStory = any;

const wizardSteps = [
  {
    id: 'account',
    title: 'Account Setup',
    description: 'Create your account credentials.',
    schema: [
      {
        id: 'account-section',
        title: 'Account Information',
        fields: [
          {
            id: 'username',
            label: 'Username',
            type: 'text',
            required: true,
            placeholder: 'Choose a username',
          },
          {
            id: 'password',
            label: 'Password',
            type: 'password',
            required: true,
            placeholder: 'Create a strong password',
          },
          {
            id: 'confirmPassword',
            label: 'Confirm Password',
            type: 'password',
            required: true,
            placeholder: 'Confirm your password',
          },
        ],
      },
    ],
    validation: async (values: any) => {
      const errors: Record<string, string> = {};
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
      return errors;
    },
  },
  {
    id: 'profile',
    title: 'Profile Information',
    description: 'Tell us about yourself.',
    schema: [
      {
        id: 'profile-section',
        title: 'Personal Details',
        fields: [
          {
            id: 'fullName',
            label: 'Full Name',
            type: 'text',
            required: true,
            placeholder: 'Enter your full name',
          },
          {
            id: 'bio',
            label: 'Bio',
            type: 'textarea',
            placeholder: 'Tell us about yourself',
          },
          {
            id: 'avatar',
            label: 'Profile Picture',
            type: 'file',
            accept: 'image/*',
          },
        ],
      },
    ],
  },
  {
    id: 'preferences',
    title: 'Preferences',
    description: 'Customize your experience.',
    optional: true,
    canSkip: true,
    schema: [
      {
        id: 'preferences-section',
        title: 'User Preferences',
        fields: [
          {
            id: 'theme',
            label: 'Theme',
            type: 'select',
            options: [
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
              { value: 'system', label: 'System' },
            ],
          },
          {
            id: 'language',
            label: 'Language',
            type: 'select',
            options: [
              { value: 'en', label: 'English' },
              { value: 'es', label: 'Spanish' },
              { value: 'fr', label: 'French' },
            ],
          },
        ],
      },
    ],
  },
];

export const WizardDefault: WizardStory = {
  render: (args: any) => <GlassWizardTemplate {...args} />,
  args: {
    title: 'Account Setup Wizard',
    description: 'Complete these steps to set up your account.',
    steps: wizardSteps,
    showStepIndicator: true,
    allowSkipping: true,
    allowDraft: true,
    onSubmit: async (values: any) => {
      console.log('Wizard completed:', values);
      await new Promise(resolve => setTimeout(resolve, 2000));
    },
    onStepChange: (step: any) => {
      console.log('Wizard step changed to:', step);
    },
  },
};

export const WizardCompact: WizardStory = {
  render: (args: any) => <GlassWizardTemplate {...args} />,
  args: {
    ...WizardDefault.args,
    layout: 'compact',
    title: 'Quick Setup',
  },
};

export const WizardSidebar: WizardStory = {
  render: (args: any) => <GlassWizardTemplate {...args} />,
  args: {
    ...WizardDefault.args,
    layout: 'sidebar',
    title: 'Detailed Setup',
  },
};