### GlassSelect

Dropdown selection component.

```tsx
<GlassSelect
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
  ]}
  value={selectedValue}
  onChange={setSelectedValue}
  placeholder="Select an option"
/>
```

**Props:**
- `options?: SelectOption[]` - Array of options
- `value?: string` - Selected value
- `onChange?: (value: string) => void` - Change handler
- `placeholder?: string` - Placeholder text
