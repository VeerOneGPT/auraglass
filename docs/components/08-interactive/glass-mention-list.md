### GlassMentionList

Autocomplete mention list for user mentions in text inputs.

```tsx
<GlassMentionList
  users={availableUsers}
  onMention={handleMention}
  trigger="@"
  maxSuggestions={5}
/>
```

**Props:**
- `users: User[]` - Available users for mentions
- `onMention?: (user: User) => void` - Mention selection handler
- `trigger?: string` - Mention trigger character
- `maxSuggestions?: number` - Maximum suggestions shown
- `searchable?: boolean` - Enable user search
