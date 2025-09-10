### GlassFacetSearch

Advanced faceted search interface with filters, search suggestions, and result management.

```tsx
const facets = [
  {
    id: 'category',
    label: 'Category',
    type: 'checkbox',
    options: [
      { id: 'docs', label: 'Documentation', count: 25 },
      { id: 'tutorials', label: 'Tutorials', count: 18 },
      { id: 'examples', label: 'Examples', count: 42 }
    ]
  },
  {
    id: 'dateRange',
    label: 'Date Range',
    type: 'daterange'
  },
  {
    id: 'rating',
    label: 'Rating',
    type: 'range',
    min: 1,
    max: 5,
    step: 1
  }
];

const facetValues = {
  category: ['docs', 'tutorials'],
  dateRange: { from: new Date('2024-01-01'), to: new Date() },
  rating: { min: 3, max: 5 }
};

const results = [
  {
    id: '1',
    title: 'Getting Started Guide',
    description: 'Learn how to set up and configure your project',
    category: 'docs',
    tags: ['setup', 'configuration'],
    score: 0.95
  }
];

<GlassFacetSearch
  query="getting started"
  onQueryChange={setQuery}
  facets={facets}
  facetValues={facetValues}
  onFacetChange={(facetId, value) => {
    setFacetValues(prev => ({ ...prev, [facetId]: value }));
  }}
  results={results}
  onResultSelect={(result) => console.log('Selected:', result)}
  enableHistory={true}
  enableSavedSearches={true}
  suggestions={['getting started', 'setup guide', 'configuration']}
  onSuggestionSelect={(suggestion) => setQuery(suggestion)}
  variant="default"
  size="md"
/>
```

**Props:**
- `query: string` - Search query string
- `onQueryChange: (query: string) => void` - Query change handler
- `facets: Facet[]` - Available filter facets
- `facetValues: Record<string, any>` - Current filter values
- `onFacetChange: (facetId: string, value: any) => void` - Filter change handler
- `results: SearchResult[]` - Search results array
- `onResultSelect?: (result: SearchResult) => void` - Result selection handler
- `placeholder?: string` - Search input placeholder
- `loading?: boolean` - Loading state
- `showFilters?: boolean` - Show/hide filter panel
- `showResults?: boolean` - Show/hide results
- `maxResults?: number` - Maximum results to display
- `onSearch?: (query: string, filters: Record<string, any>) => void` - Search execution handler
- `suggestions?: string[]` - Search suggestions
- `onSuggestionSelect?: (suggestion: string) => void` - Suggestion selection handler
- `recentSearches?: string[]` - Recent searches
- `onRecentSearchSelect?: (search: string) => void` - Recent search selection handler
- `variant?: 'default' | 'compact' | 'minimal'` - Component variant
- `size?: 'sm' | 'md' | 'lg'` - Component size
- `elevation?: 'low' | 'medium' | 'high'` - Glass elevation
- `className?: string` - Additional CSS classes

**Facet Interface:**
- `id: string` - Unique facet identifier
- `label: string` - Facet display label
- `type: 'checkbox' | 'range' | 'select' | 'daterange'` - Facet type
- `options?: FacetOption[]` - Available options (for checkbox/select)
- `min?: number` - Minimum value (for range)
- `max?: number` - Maximum value (for range)
- `step?: number` - Step increment (for range)
- `collapsed?: boolean` - Initially collapsed state
- `showCount?: boolean` - Show result counts

**FacetOption Interface:**
- `id: string` - Option identifier
- `label: string` - Option label
- `value: string` - Option value
- `count?: number` - Result count
- `selected?: boolean` - Selection state
- `disabled?: boolean` - Disabled state

**SearchResult Interface:**
- `id: string` - Result identifier
- `title: string` - Result title
- `description?: string` - Result description
- `category?: string` - Result category
- `tags?: string[]` - Result tags
- `score?: number` - Search relevance score
- `metadata?: Record<string, any>` - Additional metadata
