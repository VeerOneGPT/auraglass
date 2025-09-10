### GlassMessageList

Message list component with threading and reactions.

```tsx
<GlassMessageList
  messages={chatMessages}
  currentUser={currentUser}
  onMessageReaction={handleReaction}
  showThreadReplies={true}
/>
```

**Props:**
- `messages: Message[]` - Message data array
- `currentUser?: string` - Current user ID
- `onMessageReaction?: (messageId: string, reaction: string) => void` - Reaction handler
- `showThreadReplies?: boolean` - Show threaded replies
- `virtualized?: boolean` - Enable virtualization for large lists
