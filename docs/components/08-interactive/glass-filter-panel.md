### GlassFilterPanel

Advanced filtering panel with multiple filter types, presets, and collapsible groups.

```tsx
const filterGroups = [
  {
    id: 'status',
    label: 'Status',
    type: 'checkbox',
    options: [
      { id: 'active', label: 'Active', count: 25 },
      { id: 'inactive', label: 'Inactive', count: 10 },
      { id: 'pending', label: 'Pending', count: 5 }
    ]
  },
  {
    id: 'category',
    label: 'Category',
    type: 'select',
    options: [
      { id: 'work', label: 'Work', count: 15 },
      { id: 'personal', label: 'Personal', count: 20 },
      { id: 'other', label: 'Other', count: 5 }
    ]
  },
  {
    id: 'priority',
    label: 'Priority',
    type: 'slider',
    min: 1,
    max: 5,
    step: 1
  },
  {
    id: 'dateRange',
    label: 'Date Range',
    type: 'daterange'
  }
];

const filterValues = {
  status: ['active'],
  category: 'work',
  priority: { min: 3, max: 5 },
  dateRange: { from: new Date('2024-01-01'), to: new Date() }
};

const filterPresets = [
  {
    id: 'urgent',
    name: 'Urgent Tasks',
    filters: {
      priority: { min: 4, max: 5 },
      status: ['active', 'pending']
    }
  },
  {
    id: 'completed',
    name: 'Completed This Month',
    filters: {
      status: ['completed'],
      dateRange: {
        from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        to: new Date()
      }
    }
  }
];

<GlassFilterPanel
  filters={filterGroups}
  values={filterValues}
  onChange={(filters) => {
    setFilterValues(filters);
    console.log('Filters changed:', filters);
  }}
  onApply={() => console.log('Filters applied')}
  onClear={() => {
    setFilterValues({});
    console.log('Filters cleared');
  }}
  presets={filterPresets}
  onSavePreset={(name) => console.log('Save preset:', name)}
  title="Filter Tasks"
  collapsible={true}
  showSearch={true}
  showPresets={true}
  variant="default"
  size="md"
/>
```

**Props:**
- `filters: FilterGroup[]` - Filter group definitions
- `values: Record<string, any>` - Current filter values
- `onChange: (filters: Record<string, any>) => void` - Filter change handler
- `onApply?: () => void` - Apply filters handler
- `onClear?: () => void` - Clear filters handler
- `presets?: FilterPreset[]` - Saved filter presets
- `onSavePreset?: (name: string) => void` - Save preset handler
- `className?: string` - Additional CSS classes
- `title?: string` - Panel title
- `collapsible?: boolean` - Enable collapsible groups
- `showSearch?: boolean` - Show search input
- `showPresets?: boolean` - Show presets dropdown
- `showApplyButton?: boolean` - Show apply button
- `showClearButton?: boolean` - Show clear button
- `variant?: 'default' | 'compact' | 'minimal'` - Panel variant
- `size?: 'sm' | 'md' | 'lg'` - Component size
- `elevation?: 'low' | 'medium' | 'high'` - Glass elevation

**FilterGroup Interface:**
- `id: string` - Unique filter identifier
- `label: string` - Filter display label
- `type: 'checkbox' | 'select' | 'slider' | 'daterange' | 'search'` - Filter type
- `options?: FilterOption[]` - Available options (for checkbox/select)
- `min?: number` - Minimum value (for slider)
- `max?: number` - Maximum value (for slider)
- `step?: number` - Step increment (for slider)
- `placeholder?: string` - Input placeholder (for search)
- `collapsed?: boolean` - Initially collapsed state
- `required?: boolean` - Required filter

**FilterOption Interface:**
- `id: string` - Option identifier
- `label: string` - Option label
- `value: string` - Option value
- `count?: number` - Result count
- `disabled?: boolean` - Disabled state

**FilterPreset Interface:**
- `id: string` - Preset identifier
- `name: string` - Preset display name
- `filters: Record<string, any>` - Preset filter values
