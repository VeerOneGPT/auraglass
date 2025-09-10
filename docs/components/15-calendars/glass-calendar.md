### GlassCalendar

Calendar component for date selection.

```tsx
<GlassCalendar
  value={selectedDate}
  onChange={setSelectedDate}
  minDate={new Date('2020-01-01')}
  maxDate={new Date('2030-12-31')}
/>
```

**Props:**
- `value?: Date` - Selected date
- `onChange?: (date: Date) => void` - Date change handler
- `minDate?: Date` - Minimum selectable date
- `maxDate?: Date` - Maximum selectable date
