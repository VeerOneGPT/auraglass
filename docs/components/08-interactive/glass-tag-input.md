### GlassTagInput

Tag input component with autocomplete and validation.

```tsx
<GlassTagInput
  tags={selectedTags}
  onTagsChange={setSelectedTags}
  suggestions={tagSuggestions}
  maxTags={10}
  allowCustomTags
/>
```

**Props:**
- `tags: string[]` - Current tags
- `onTagsChange?: (tags: string[]) => void` - Tags change handler
- `suggestions?: string[]` - Tag suggestions
- `maxTags?: number` - Maximum number of tags
- `allowCustomTags?: boolean` - Allow custom tag creation
- `validateTag?: (tag: string) => boolean` - Tag validation function
