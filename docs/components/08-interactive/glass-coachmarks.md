### GlassCoachmarks

Guided tour component with step-by-step instructions and glassmorphism styling.

```tsx
const tourSteps = [
  {
    id: 'welcome',
    content: (
      <div>
        <h3>Welcome to the Dashboard!</h3>
        <p>This is your main analytics view.</p>
      </div>
    )
  },
  {
    id: 'navigation',
    content: (
      <div>
        <h3>Navigation</h3>
        <p>Use the sidebar to navigate between different sections.</p>
      </div>
    )
  },
  {
    id: 'charts',
    content: (
      <div>
        <h3>Data Visualization</h3>
        <p>View your analytics data in beautiful chart formats.</p>
      </div>
    )
  }
];

<GlassCoachmarks
  steps={tourSteps}
  current={currentStep}
  onNext={() => setCurrentStep(prev => prev + 1)}
  onPrev={() => setCurrentStep(prev => prev - 1)}
  onClose={() => setShowTour(false)}
/>
```

**Props:**
- `steps: CoachmarkStep[]` - Array of tour steps
- `current: number` - Current step index
- `onNext: () => void` - Next step handler
- `onPrev: () => void` - Previous step handler
- `onClose: () => void` - Close tour handler

**CoachmarkStep Interface:**
- `id: string` - Unique step identifier
- `content: ReactNode` - Step content to display
