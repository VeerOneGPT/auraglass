### GlassFormStepper

Multi-step form navigation.

```tsx
<GlassFormStepper
  steps={[
    { title: 'Personal Info', completed: true },
    { title: 'Address', active: true },
    { title: 'Review' }
  ]}
  currentStep={1}
  onStepChange={setCurrentStep}
/>
```

**Props:**
- `steps?: Step[]` - Form steps
- `currentStep?: number` - Current step index
- `onStepChange?: (step: number) => void` - Step change handler
