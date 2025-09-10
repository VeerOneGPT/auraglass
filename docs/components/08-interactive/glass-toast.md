### GlassToast

Toast notification component with glassmorphism styling and smooth animations.

```tsx
// Using with ToastProvider
<GlassToastProvider position="top-right" maxToasts={3}>
  <div>
    <GlassButton onClick={() => addToast({
      title: "Success!",
      description: "Your changes have been saved.",
      type: "success"
    })}>
      Show Toast
    </GlassButton>
  </div>

  <GlassToastViewport />
</GlassToastProvider>

// Individual toast usage
<GlassToast
  id="toast-1"
  title="Operation Complete"
  description="Your file has been uploaded successfully."
  type="success"
  duration={4000}
  action={{
    label: "View File",
    onClick: () => console.log("View file clicked")
  }}
  onDismiss={(id) => console.log("Toast dismissed:", id)}
/>
```

**Props:**
- `id: string` - Unique toast identifier
- `title?: string` - Toast title
- `description?: string` - Toast description
- `type?: 'success' | 'error' | 'warning' | 'info'` - Toast type
- `duration?: number` - Auto-dismiss duration (ms)
- `action?: { label: string; onClick: () => void }` - Action button
- `onClose?: () => void` - Close callback
- `onDismiss?: (id: string) => void` - Dismiss callback
- `className?: string` - Additional CSS classes

**GlassToastProvider Props:**
- `children: ReactNode` - Child components
- `duration?: number` - Default toast duration
- `maxToasts?: number` - Maximum toasts to display
- `position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center'` - Toast position

**ToastData Interface:**
- `id: string` - Unique identifier
- `title?: string` - Toast title
- `description?: string` - Toast description
- `type?: 'success' | 'error' | 'warning' | 'info'` - Toast type
- `duration?: number` - Display duration
- `action?: { label: string; onClick: () => void }` - Action button
- `onClose?: () => void` - Close callback
