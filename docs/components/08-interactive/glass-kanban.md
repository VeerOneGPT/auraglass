### GlassKanban

Kanban board for task management.

```tsx
<GlassKanban>
  <GlassKanban.Column title="To Do">
    <GlassKanban.Card id="1" title="Task 1" />
    <GlassKanban.Card id="2" title="Task 2" />
  </GlassKanban.Column>
  <GlassKanban.Column title="In Progress">
    <GlassKanban.Card id="3" title="Task 3" />
  </GlassKanban.Column>
</GlassKanban>
```

**Props:**
- `children?: ReactNode` - Kanban columns
- `onCardMove?: (cardId: string, fromColumn: string, toColumn: string) => void` - Card move handler
