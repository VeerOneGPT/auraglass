### GlassDatePicker

Advanced date picker component with calendar interface and glassmorphism styling.

```tsx
// Single date selection
<GlassDatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  placeholder="Select a date"
  minDate={new Date('2020-01-01')}
  maxDate={new Date('2030-12-31')}
  showWeekNumbers={true}
  firstDayOfWeek={1} // Monday
/>

// Range date selection
<GlassDatePicker
  mode="range"
  rangeValue={dateRange}
  onRangeChange={setDateRange}
  placeholder="Select date range"
  disabledDates={[new Date('2024-01-01')]} // Disable New Year's Day
/>
```

**Props:**
- `value?: Date | null` - Selected date (single mode)
- `defaultValue?: Date | null` - Default selected date (single mode)
- `onChange?: (date: Date | null) => void` - Date change handler (single mode)
- `mode?: 'single' | 'range'` - Selection mode
- `rangeValue?: DateRange` - Selected date range (range mode)
- `defaultRangeValue?: DateRange` - Default date range (range mode)
- `onRangeChange?: (range: DateRange) - Range change handler (range mode)
- `minDate?: Date` - Minimum selectable date
- `maxDate?: Date` - Maximum selectable date
- `disabledDates?: Date[] | ((date: Date) => boolean)` - Disabled dates
- `format?: string` - Date format string
- `placeholder?: string` - Input placeholder
- `size?: 'sm' | 'md' | 'lg'` - Component size
- `disabled?: boolean` - Disabled state
- `required?: boolean` - Required field
- `error?: boolean` - Error state
- `helperText?: string` - Helper text
- `errorMessage?: string` - Error message
- `showWeekNumbers?: boolean` - Show week numbers
- `firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6` - First day of week (0=Sunday)
- `showTodayButton?: boolean` - Show today button
- `todayButtonText?: string` - Today button text
- `clearButtonText?: string` - Clear button text
- `locale?: string` - Locale for date formatting

**DateRange Interface:**
- `from: Date | null` - Start date
- `to: Date | null` - End date
