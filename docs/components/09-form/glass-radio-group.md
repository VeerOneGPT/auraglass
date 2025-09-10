### GlassRadioGroup

Radio button group component with glassmorphism styling and flexible layouts.

```tsx
const radioOptions = [
  {
    value: 'option1',
    label: 'Option 1',
    description: 'This is the first option with additional description'
  },
  {
    value: 'option2',
    label: 'Option 2',
    icon: <StarIcon />
  },
  {
    value: 'option3',
    label: 'Option 3',
    disabled: true
  }
];

// Default variant
<GlassRadioGroup
  options={radioOptions}
  value={selectedValue}
  onValueChange={setSelectedValue}
  name="radio-group"
  orientation="vertical"
/>

// Card variant
<GlassRadioGroup
  options={radioOptions}
  value={selectedValue}
  onValueChange={setSelectedValue}
  variant="card"
  size="lg"
/>
```

**Props:**
- `options: RadioOption[]` - Array of radio options
- `value?: string | number` - Currently selected value
- `defaultValue?: string | number` - Default selected value
- `onValueChange?: (value: string | number) => void` - Value change handler
- `name?: string` - Group name for form compatibility
- `disabled?: boolean` - Whether the entire group is disabled
- `orientation?: 'vertical' | 'horizontal'` - Layout orientation
- `size?: 'sm' | 'md' | 'lg'` - Size variant
- `variant?: 'default' | 'card'` - Visual variant
- `renderOption?: (option: RadioOption, isSelected: boolean) => ReactNode` - Custom option renderer
- `className?: string` - Additional CSS classes

**RadioOption Interface:**
- `value: string | number` - Option value
- `label: string` - Option label
- `description?: string` - Optional description
- `disabled?: boolean` - Whether option is disabled
- `icon?: ReactNode` - Optional icon
