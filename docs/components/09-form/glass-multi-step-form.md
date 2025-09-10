### GlassMultiStepForm

Advanced multi-step form component with validation, progress tracking, and smooth transitions.

```tsx
const formSteps = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Tell us about yourself',
    component: PersonalInfoForm,
    validation: (data) => data.name && data.email,
    validationMessage: 'Please fill in all required fields'
  },
  {
    id: 'preferences',
    title: 'Preferences',
    component: PreferencesForm,
    optional: true
  },
  {
    id: 'review',
    title: 'Review',
    component: ReviewForm
  }
];

<GlassMultiStepForm
  steps={formSteps}
  title="Complete Your Profile"
  description="Fill out the form to get started"
  showProgress={true}
  showNavigation={true}
  allowSkip={true}
  onSubmit={(data) => console.log('Form submitted:', data)}
  onCancel={() => console.log('Form cancelled')}
/>
```

**Props:**
- `steps: FormStep[]` - Array of form steps with components and validation
- `initialData?: Record<string, any>` - Initial form data
- `onSubmit?: (data: Record<string, any>) => void | Promise<void>` - Form submission handler
- `onCancel?: () => void` - Form cancellation handler
- `onStepChange?: (stepIndex: number, data: Record<string, any>) => void` - Step change handler
- `title?: string` - Form title
- `description?: string` - Form description
- `showProgress?: boolean` - Show progress indicator
- `showNavigation?: boolean` - Show navigation buttons
- `allowSkip?: boolean` - Allow skipping optional steps
- `submitButtonText?: string` - Custom submit button text
- `cancelButtonText?: string` - Custom cancel button text
- `loading?: boolean` - Loading state
- `validationMode?: 'onChange' | 'onSubmit' | 'onBlur'` - When to validate
- `showSummary?: boolean` - Show form summary
- `className?: string` - Additional CSS classes

**FormStep Interface:**
- `id: string` - Unique step identifier
- `title: string` - Step title
- `description?: string` - Step description
- `icon?: ReactNode` - Step icon
- `component: React.ComponentType<any>` - React component for step content
- `validation?: (data: any) => boolean | Promise<boolean>` - Validation function
- `validationMessage?: string` - Validation error message
- `optional?: boolean` - Whether step is optional
- `data?: any` - Step-specific data
