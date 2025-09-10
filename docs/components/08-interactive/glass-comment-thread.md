### GlassCommentThread

Threaded comment system with nested replies and glassmorphism styling.

```tsx
const comments = [
  {
    id: '1',
    author: 'John Doe',
    text: 'This is a great component! Love the glassmorphism effects.',
    createdAt: '2024-01-15T10:30:00Z',
    replies: [
      {
        id: '1-1',
        author: 'Jane Smith',
        text: 'Agreed! The animations are smooth too.',
        createdAt: '2024-01-15T11:45:00Z'
      }
    ]
  },
  {
    id: '2',
    author: 'Bob Wilson',
    text: 'Has anyone tried using this in a production app?',
    createdAt: '2024-01-15T14:20:00Z'
  }
];

<GlassCommentThread
  comments={comments}
  onReply={(parentId, text) => {
    console.log('New reply:', parentId, text);
    // Handle reply submission
  }}
/>
```

**Props:**
- `comments: Comment[]` - Array of comment objects
- `onReply?: (parentId: string, text: string) => void` - Reply handler function

**Comment Interface:**
- `id: string` - Unique comment identifier
- `author: string` - Comment author name
- `text: string` - Comment content
- `createdAt?: string` - ISO timestamp of comment creation
- `replies?: Comment[]` - Nested reply comments
