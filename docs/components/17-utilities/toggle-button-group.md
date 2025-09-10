### ToggleButtonGroup

Group of toggle buttons with single/multiple selection.

```tsx
<ToggleButtonGroup
  value={selectedValues}
  onChange={setSelectedValues}
  exclusive
>
  <ToggleButton value="option1">Option 1</ToggleButton>
  <ToggleButton value="option2">Option 2</ToggleButton>
  <ToggleButton value="option3">Option 3</ToggleButton>
</ToggleButtonGroup>
```

**Props:**
- `value?: string | string[]` - Selected values
- `onChange?: (value: string | string[]) => void` - Selection change handler
- `exclusive?: boolean` - Single selection mode
