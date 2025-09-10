### GlassQueryBuilder

Advanced query builder with visual drag-and-drop interface.

```tsx
<GlassQueryBuilder
  fields={queryFields}
  onQueryChange={setQuery}
  operators={customOperators}
/>
```

**Props:**
- `fields: QueryField[]` - Available query fields
- `query?: QueryCondition` - Current query object
- `onQueryChange?: (query: QueryCondition) => void` - Query change handler
- `operators?: QueryOperator[]` - Available operators
- `maxDepth?: number` - Maximum nesting depth
