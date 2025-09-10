### GlassChat

Chat interface component.

```tsx
<GlassChat messages={messages} onSendMessage={handleSend}>
  <GlassChat.Header>
    <h3>Chat</h3>
  </GlassChat.Header>
  <GlassChat.Messages />
  <GlassChat.Input />
</GlassChat>
```

**Props:**
- `messages?: Message[]` - Chat messages
- `onSendMessage?: (message: string) => void` - Send message handler
