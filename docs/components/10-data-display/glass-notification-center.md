### GlassNotificationCenter

System notification management with glassmorphism styling.

```tsx
<GlassNotificationProvider>
  <GlassNotificationCenter
    position="top-right"
    maxNotifications={5}
    autoHideDelay={5000}
  />
  {/* Your app content */}
</GlassNotificationProvider>
```

**Props:**
- `position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'` - Notification position
- `maxNotifications?: number` - Maximum notifications to show
- `autoHideDelay?: number` - Auto-hide delay (ms)
