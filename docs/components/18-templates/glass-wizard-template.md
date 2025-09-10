### GlassWizardTemplate

Complete wizard template with steps, navigation, and progress tracking.

```tsx
<GlassWizardTemplate
  title="Setup Wizard"
  steps={wizardConfig}
  onFinish={handleWizardFinish}
  showProgress={true}
  allowBackNavigation={true}
/>
```

**Props:**
- `title?: string` - Wizard title
- `steps: WizardStepConfig[]` - Step configurations
- `onFinish?: (result: any) => void` - Finish handler
- `showProgress?: boolean` - Show progress indicator
- `allowBackNavigation?: boolean` - Allow backward navigation
- `initialData?: any` - Initial form data
