### GlassDateRangePicker

Advanced date range picker with calendar interface, presets, and glassmorphism styling.

```tsx
// Basic date range picker
<GlassDateRangePicker
  value={dateRange}
  onChange={setDateRange}
  placeholder="Select date range"
/>

// With presets and constraints
<GlassDateRangePicker
  value={dateRange}
  onChange={setDateRange}
  placeholder="Select date range"
  minDate={new Date('2020-01-01')}
  maxDate={new Date('2030-12-31')}
  presets={[
    {
      label: 'Last 7 days',
      getValue: () => ({
        from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        to: new Date()
      })
    },
    {
      label: 'Last 30 days',
      getValue: () => ({
        from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        to: new Date()
      })
    },
    {
      label: 'This month',
      getValue: () => {
        const now = new Date();
        return {
          from: new Date(now.getFullYear(), now.getMonth(), 1),
          to: new Date(now.getFullYear(), now.getMonth() + 1, 0)
        };
      }
    }
  ]}
  size="lg"
  showClear={true}
/>
```

**Props:**
- `value?: DateRange` - Selected date range
- `defaultValue?: DateRange` - Default date range
- `onChange?: (range: DateRange) => void` - Range change handler
- `placeholder?: string` - Input placeholder text
- `dateFormat?: 'short' | 'long' | 'numeric'` - Date display format
- `locale?: string` - Date locale
- `minDate?: Date` - Minimum selectable date
- `maxDate?: Date` - Maximum selectable date
- `disabled?: boolean` - Disabled state
- `size?: 'sm' | 'md' | 'lg'` - Component size
- `className?: string` - Additional CSS classes
- `popoverClassName?: string` - Popover CSS classes
- `showClear?: boolean` - Show clear button
- `presets?: Preset[]` - Predefined date ranges
- `rangeLabel?: string` - Custom range label

**DateRange Interface:**
- `from: Date | null` - Start date
- `to: Date | null` - End date

**Preset Interface:**
- `label: string` - Preset label
- `getValue: () => DateRange` - Function to get preset range
