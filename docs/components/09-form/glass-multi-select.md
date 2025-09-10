### GlassMultiSelect

Multi-selection dropdown component.

```tsx
<GlassMultiSelect
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]}
  value={selectedValues}
  onChange={setSelectedValues}
  placeholder="Select multiple options"
/>
```

**Props:**
- `options?: SelectOption[]` - Available options
- `value?: string[]` - Selected values
- `onChange?: (values: string[]) => void` - Selection change handler
- `placeholder?: string` - Placeholder text
