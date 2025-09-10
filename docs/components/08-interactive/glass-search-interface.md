### GlassSearchInterface

Comprehensive search interface with filters and suggestions.

```tsx
<GlassSearchInterface
  placeholder="Search..."
  onSearch={handleSearch}
  filters={searchFilters}
  suggestions={searchSuggestions}
  recentSearches={recentSearches}
/>
```

**Props:**
- `placeholder?: string` - Search input placeholder
- `onSearch?: (query: string, filters: any) => void` - Search handler
- `filters?: SearchFilter[]` - Available filters
- `suggestions?: string[]` - Search suggestions
- `recentSearches?: string[]` - Recent search history
- `debounceMs?: number` - Search debounce delay
