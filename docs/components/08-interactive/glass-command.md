### GlassCommand

Powerful command palette with search functionality, keyboard navigation, and glassmorphism styling.

```tsx
const commandItems = [
  {
    id: 'create-project',
    label: 'Create Project',
    description: 'Start a new project',
    icon: <PlusIcon />,
    keywords: ['new', 'project', 'start'],
    action: () => console.log('Creating project...')
  },
  {
    id: 'open-settings',
    label: 'Open Settings',
    description: 'Configure application settings',
    icon: <SettingsIcon />,
    action: () => console.log('Opening settings...')
  }
];

<GlassCommand
  items={commandItems}
  placeholder="Search commands..."
  emptyMessage="No commands found"
/>
```

**Props:**
- `items: CommandItem[]` - Array of command items with id, label, description, icon, keywords, and action
- `placeholder?: string` - Search input placeholder text
- `emptyMessage?: string` - Message shown when no results found
- `loading?: boolean` - Loading state
- `maxHeight?: string` - Maximum height of command list
- `filterItems?: (items: CommandItem[], query: string) => CommandItem[]` - Custom filter function
- `groupBy?: (item: CommandItem) => string` - Function to group items
- `renderItem?: (item: CommandItem, isSelected: boolean) => ReactNode` - Custom item renderer
- `renderEmpty?: () => ReactNode` - Custom empty state renderer
- `onSelect?: (item: CommandItem) => void` - Selection callback
- `onSearchChange?: (query: string) => void` - Search query change callback

**CommandItem Interface:**
- `id: string` - Unique identifier
- `label: string` - Display label
- `description?: string` - Optional description
- `icon?: ReactNode` - Optional icon
- `keywords?: string[]` - Search keywords
- `action: () => void` - Action to execute
- `group?: string` - Group identifier
- `disabled?: boolean` - Whether item is disabled
