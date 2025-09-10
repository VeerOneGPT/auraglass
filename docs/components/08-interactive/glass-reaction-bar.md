### GlassReactionBar

Interactive reaction bar with emoji support.

```tsx
<GlassReactionBar
  reactions={reactions}
  onReaction={handleReaction}
  userReactions={userReactions}
  maxReactions={5}
/>
```

**Props:**
- `reactions: Reaction[]` - Available reactions
- `onReaction?: (reactionId: string) => void` - Reaction handler
- `userReactions?: string[]` - User's reactions
- `maxReactions?: number` - Maximum reactions shown
- `size?: 'small' | 'medium' | 'large'` - Reaction size
