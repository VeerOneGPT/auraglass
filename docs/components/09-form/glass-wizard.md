### GlassWizard

Multi-step form wizard with validation, progress tracking, and glassmorphism styling.

```tsx
const wizardSteps = [
  {
    id: 'personal',
    title: 'Personal Info',
    description: 'Tell us about yourself',
    content: (
      <div>
        <GlassInput label="Name" />
        <GlassInput label="Email" type="email" />
      </div>
    ),
    validation: () => {
      // Custom validation logic
      return true;
    }
  },
  {
    id: 'preferences',
    title: 'Preferences',
    content: <PreferencesForm />,
    optional: true
  },
  {
    id: 'review',
    title: 'Review',
    content: <ReviewStep />
  }
];

<GlassWizard
  steps={wizardSteps}
  title="Setup Wizard"
  description="Complete your profile setup"
  showProgress={true}
  showStepNavigation={true}
  onComplete={(data) => console.log('Wizard completed!', data)}
  onCancel={() => console.log('Wizard cancelled')}
/>
```

**Props:**
- `steps: WizardStep[]` - Array of wizard steps
- `currentStep?: number` - Current active step (controlled)
- `onStepChange?: (stepIndex: number) => void` - Step change callback
- `onComplete?: (data?: any) => void` - Completion callback
- `onCancel?: () => void` - Cancellation callback
- `title?: string` - Wizard title
- `description?: string` - Wizard description
- `showStepNavigation?: boolean` - Show step navigation (default: true)
- `showProgress?: boolean` - Show progress bar (default: true)
- `allowSkip?: boolean` - Allow skipping optional steps
- `loading?: boolean` - Loading state
- `validationMode?: 'onChange' | 'onNext'` - When to validate steps

**WizardStep Interface:**
- `id: string` - Unique step identifier
- `title: string` - Step title
- `description?: string` - Step description
- `icon?: ReactNode` - Step icon
- `content: ReactNode` - Step content
- `validation?: () => boolean | Promise<boolean>` - Validation function
- `optional?: boolean` - Whether step is optional
- `disabled?: boolean` - Whether step is disabled
