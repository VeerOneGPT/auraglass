### GlassSwitch

Toggle switch component with glassmorphism styling, smooth animations, and customizable states.

```tsx
// Basic switch
<GlassSwitch
  checked={isEnabled}
  onChange={setIsEnabled}
  label="Enable feature"
  description="This will activate the advanced features"
/>

// Controlled switch with custom styling
<GlassSwitch
  checked={darkMode}
  onCheckedChange={toggleDarkMode}
  size="lg"
  variant="success"
  label="Dark Mode"
  icons={{
    checked: <MoonIcon />,
    unchecked: <SunIcon />
  }}
/>

// Switch with focus ring
<GlassSwitch
  checked={notifications}
  onChange={setNotifications}
  label="Push Notifications"
  focusRing={true}
  disabled={false}
/>
```

**Props:**
- `checked?: boolean` - Switch state (controlled)
- `defaultChecked?: boolean` - Default state (uncontrolled)
- `onChange?: (checked: boolean) => void` - State change handler
- `onCheckedChange?: (checked: boolean) => void` - Alternative change handler
- `size?: 'sm' | 'md' | 'lg'` - Switch size
- `variant?: 'default' | 'success' | 'warning' | 'error' | 'info'` - Visual variant
- `label?: string` - Switch label
- `description?: string` - Additional description
- `labelPosition?: 'left' | 'right' | 'top' | 'bottom'` - Label position
- `disabled?: boolean` - Disabled state
- `loading?: boolean` - Loading state
- `icons?: { checked?: ReactNode; unchecked?: ReactNode }` - Custom icons
- `focusRing?: boolean` - Show focus ring
- `thumbContent?: ReactNode` - Custom thumb content
- `className?: string` - Additional CSS classes
