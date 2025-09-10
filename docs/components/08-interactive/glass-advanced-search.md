### GlassAdvancedSearch

Advanced search interface with filters, suggestions, and result management.

```tsx
const searchFilters = [
  {
    id: 'type',
    label: 'Content Type',
    type: 'select',
    options: [
      { label: 'Documents', value: 'document' },
      { label: 'Images', value: 'image' },
      { label: 'Videos', value: 'video' }
    ]
  },
  {
    id: 'dateRange',
    label: 'Date Range',
    type: 'date',
    placeholder: 'Select date range'
  },
  {
    id: 'tags',
    label: 'Tags',
    type: 'multiselect',
    options: [
      { label: 'Important', value: 'important' },
      { label: 'Urgent', value: 'urgent' },
      { label: 'Review', value: 'review' }
    ]
  }
];

const searchSuggestions = [
  { id: '1', text: 'project management', category: 'topic', count: 25 },
  { id: '2', text: 'team collaboration', category: 'topic', count: 18 },
  { id: '3', text: 'recent documents', category: 'filter' }
];

<GlassAdvancedSearch
  placeholder="Search documents, images, videos..."
  filters={searchFilters}
  suggestions={searchSuggestions}
  enableHistory={true}
  enableSavedSearches={true}
  enableAdvancedFilters={true}
  showStats={true}
  onSearch={(query, filters) => console.log('Search:', query, filters)}
/>
```

**Props:**
- `placeholder?: string` - Search input placeholder
- `filters?: SearchFilter[]` - Available search filters
- `suggestions?: SearchSuggestion[]` - Search suggestions
- `results?: SearchResult[]` - Search results
- `loading?: boolean` - Loading state
- `enableHistory?: boolean` - Enable search history
- `enableSavedSearches?: boolean` - Enable saved searches
- `enableAdvancedFilters?: boolean` - Enable advanced filters
- `showStats?: boolean` - Show result statistics
- `onSearch?: (query: string, filters: Record<string, any>) => void` - Search handler
- `onFilterChange?: (filters: Record<string, any>) => void` - Filter change handler
- `onSuggestionSelect?: (suggestion: SearchSuggestion) => void` - Suggestion select handler
- `onResultClick?: (result: SearchResult) => void` - Result click handler
- `className?: string` - Additional CSS classes

**SearchFilter Interface:**
- `id: string` - Filter identifier
- `label: string` - Filter label
- `type: 'text' | 'select' | 'multiselect' | 'date' | 'range' | 'boolean'` - Filter type
- `value?: any` - Current filter value
- `options?: Array<{ label: string; value: any }>` - Select options
- `placeholder?: string` - Filter placeholder

**SearchSuggestion Interface:**
- `id: string` - Suggestion identifier
- `text: string` - Suggestion text
- `category?: string` - Suggestion category
- `icon?: ReactNode` - Suggestion icon
- `count?: number` - Result count

**SearchResult Interface:**
- `id: string` - Result identifier
- `title: string` - Result title
- `description?: string` - Result description
- `type: 'document' | 'image' | 'video' | 'audio' | 'user' | 'location' | 'tag'` - Result type
- `thumbnail?: string` - Result thumbnail
- `metadata: Record<string, any>` - Result metadata
- `relevance: number` - Search relevance score
- `createdAt: Date` - Creation date
- `updatedAt: Date` - Last update date
