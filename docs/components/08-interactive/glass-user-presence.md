### GlassUserPresence

User presence indicator with real-time status updates.

```tsx
<GlassUserPresence
  users={onlineUsers}
  currentUser={currentUser}
  showAvatars={true}
  maxDisplay={5}
/>
```

**Props:**
- `users: UserPresence[]` - Users with presence data
- `currentUser?: string` - Current user ID
- `showAvatars?: boolean` - Display user avatars
- `maxDisplay?: number` - Maximum users to display
- `showCount?: boolean` - Show user count
- `size?: 'small' | 'medium' | 'large'` - Component size
