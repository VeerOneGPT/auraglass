### GlassStep

Individual step in a multi-step form.

```tsx
<GlassStep
  title="Step 1"
  description="First step description"
  completed={step1Complete}
  active={currentStep === 1}
/>
```

**Props:**
- `title?: string` - Step title
- `description?: string` - Step description
- `completed?: boolean` - Completion status
- `active?: boolean` - Active status
