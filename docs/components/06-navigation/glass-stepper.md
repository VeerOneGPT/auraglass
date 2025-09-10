### GlassStepper

Horizontal step indicator component with glass styling.

```tsx
const steps = [
  { id: 'personal', label: 'Personal Info' },
  { id: 'address', label: 'Address', optional: true },
  { id: 'payment', label: 'Payment' },
  { id: 'review', label: 'Review' }
];

<GlassStepper
  steps={steps}
  active="address"
  onChange={(stepId) => console.log('Step changed:', stepId)}
/>
```

**Props:**
- `steps: Step[]` - Array of step definitions
- `active: string` - Currently active step ID
- `onChange?: (id: string) => void` - Step change handler
- `className?: string` - Additional CSS classes

**Step Interface:**
- `id: string` - Unique step identifier
- `label: string` - Step label
- `optional?: boolean` - Whether step is optional
