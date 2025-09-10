### GlassActivityFeed

Activity feed component for displaying chronological events, notifications, and user actions with glassmorphism styling.

```tsx
const activities = [
  {
    id: '1',
    type: 'user',
    title: 'John Doe updated the project',
    description: 'Modified the dashboard layout and added new metrics',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    user: {
      name: 'John Doe',
      avatar: '/avatars/john.jpg',
      id: 'user1'
    },
    category: 'project',
    tags: ['update', 'dashboard']
  },
  {
    id: '2',
    type: 'system',
    title: 'Backup completed',
    description: 'Daily database backup finished successfully',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    metadata: { size: '2.4GB', duration: '45min' }
  }
];

<GlassActivityFeed
  activities={activities}
  title="Recent Activity"
  maxItems={10}
  showFilters={true}
  showTimestamps={true}
  showAvatars={true}
  groupByDate={true}
/>
```

**Props:**
- `activities: ActivityItem[]` - Array of activity items to display
- `title?: string` - Feed title
- `subtitle?: string` - Feed subtitle
- `maxItems?: number` - Maximum activities to show
- `showFilters?: boolean` - Show filter options
- `showCategories?: boolean` - Show activity categories
- `showTimestamps?: boolean` - Show timestamps
- `showAvatars?: boolean` - Show user avatars
- `compact?: boolean` - Compact display mode
- `loading?: boolean` - Loading state
- `emptyMessage?: string` - Empty state message
- `filterBy?: string[]` - Filter activities by type
- `groupByDate?: boolean` - Group activities by date
- `showLoadMore?: boolean` - Show load more button
- `onLoadMore?: () => void` - Load more handler
- `onActivityClick?: (activity: ActivityItem) => void` - Activity click handler
- `className?: string` - Additional CSS classes

**ActivityItem Interface:**
- `id: string` - Unique identifier
- `type: 'user' | 'system' | 'notification' | 'error' | 'success' | 'warning' | 'info'` - Activity type
- `title: string` - Activity title
- `description?: string` - Activity description
- `timestamp: Date` - Activity timestamp
- `user?: { name: string; avatar?: string; id: string }` - User information
- `metadata?: Record<string, any>` - Additional metadata
- `icon?: ReactNode` - Custom icon
- `color?: string` - Custom color
- `category?: string` - Activity category
- `tags?: string[]` - Activity tags
- `actions?: Array<{ label: string; onClick: () => void; icon?: ReactNode }>` - Action buttons
