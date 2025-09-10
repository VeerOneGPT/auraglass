import type { Meta, StoryObj } from '@storybook/react';
import { GlassSocialFeed, type SocialPost } from './GlassSocialFeed';

const mockPosts: SocialPost[] = [
  {
    id: '1',
    author: {
      id: 'user1',
      name: 'Alice Johnson',
      username: 'alicej',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=48&h=48&fit=crop&crop=face',
      verified: true
    },
    content: 'Just shipped a new feature using Glass UI components! The glassmorphism effects look incredible. 🚀✨ #WebDev #GlassUI',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    likes: 142,
    shares: 23,
    comments: 18,
    tags: ['WebDev', 'GlassUI', 'Frontend'],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
        alt: 'Glass UI screenshot'
      }
    ]
  },
  {
    id: '2',
    author: {
      id: 'user2',
      name: 'Bob Chen',
      username: 'bobdev',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face',
      verified: false
    },
    content: 'Working on a new dashboard design. The blur effects and transparency create such a modern feel! What do you think about the color scheme? Should I go with warmer tones or keep it cool? 🎨',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    likes: 89,
    shares: 12,
    comments: 34,
    tags: ['Design', 'Dashboard', 'UI'],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
        alt: 'Dashboard mockup'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
        alt: 'Color palette'
      }
    ]
  },
  {
    id: '3',
    author: {
      id: 'user3',
      name: 'Carol Martinez',
      username: 'carolcodes',
      verified: true
    },
    content: 'Quick tip: When using glassmorphism, make sure your contrast ratios are still accessible! Beautiful design shouldn\'t come at the cost of usability. 💡♿ #A11y #DesignTips',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    likes: 256,
    shares: 89,
    comments: 42,
    tags: ['A11y', 'DesignTips', 'Accessibility']
  },
  {
    id: '4',
    author: {
      id: 'user4',
      name: 'David Kim',
      username: 'dkim_design',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=48&h=48&fit=crop&crop=face',
      verified: false
    },
    content: 'New animation preview! 🎬 Created this smooth transition effect for our app\'s onboarding flow. The combination of glass morphism and micro-interactions creates such an engaging experience.',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    likes: 312,
    shares: 56,
    comments: 67,
    tags: ['Animation', 'Microinteractions', 'Onboarding'],
    media: [
      {
        type: 'video',
        url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
        alt: 'Animation preview'
      }
    ]
  },
  {
    id: '5',
    author: {
      id: 'user5',
      name: 'Emma Thompson',
      username: 'emmaux',
      verified: true
    },
    content: 'Just published a comprehensive guide on implementing glassmorphism in React components. Covers everything from basic styling to advanced techniques like backdrop filters and layering. Link in bio! 📖',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    likes: 445,
    shares: 127,
    comments: 93,
    tags: ['React', 'Tutorial', 'Glassmorphism', 'Frontend']
  },
  {
    id: '6',
    author: {
      id: 'user6',
      name: 'Frank Wilson',
      username: 'frankw',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face',
      verified: false
    },
    content: 'Beautiful glass components! 😍 The depth and lighting effects are perfect. How do you handle browser compatibility issues with backdrop-filter?',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    likes: 67,
    shares: 8,
    comments: 23,
    tags: ['BrowserSupport', 'CSS']
  }
];

const meta = {
  title: 'Glass UI/Social/GlassSocialFeed',
  component: GlassSocialFeed,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    sortBy: {
      control: { type: 'select' },
      options: ['timestamp', 'likes', 'engagement'],
    },
    filterBy: {
      control: { type: 'select' },
      options: ['all', 'following', 'liked'],
    },
    maxHeight: {
      control: { type: 'range', min: 300, max: 800, step: 50 },
    },
  },
} satisfies Meta<typeof GlassSocialFeed>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    posts: mockPosts,
    currentUserId: 'current',
    showInteractions: true,
    showTimestamps: true,
    showMedia: true,
    showTags: true,
  },
};

export const CompactMode: Story = {
  args: {
    posts: mockPosts,
    currentUserId: 'current',
    compactMode: true,
    showInteractions: true,
    showTimestamps: true,
    showMedia: true,
    showTags: false,
  },
};

export const RealTimeUpdates: Story = {
  args: {
    posts: mockPosts,
    currentUserId: 'current',
    realTimeUpdates: true,
    showInteractions: true,
    showTimestamps: true,
    showMedia: true,
    showTags: true,
  },
};

export const SortByLikes: Story = {
  args: {
    posts: mockPosts,
    currentUserId: 'current',
    sortBy: 'likes',
    showInteractions: true,
    showTimestamps: true,
    showMedia: true,
    showTags: true,
  },
};

export const SortByEngagement: Story = {
  args: {
    posts: mockPosts,
    currentUserId: 'current',
    sortBy: 'engagement',
    showInteractions: true,
    showTimestamps: true,
    showMedia: true,
    showTags: true,
  },
};

export const LimitedHeight: Story = {
  args: {
    posts: mockPosts,
    currentUserId: 'current',
    maxHeight: 500,
    showInteractions: true,
    showTimestamps: true,
    showMedia: true,
    showTags: true,
  },
};

export const NoMedia: Story = {
  args: {
    posts: mockPosts,
    currentUserId: 'current',
    showMedia: false,
    showInteractions: true,
    showTimestamps: true,
    showTags: true,
  },
};

export const NoInteractions: Story = {
  args: {
    posts: mockPosts,
    currentUserId: 'current',
    showInteractions: false,
    showTimestamps: true,
    showMedia: true,
    showTags: true,
  },
};

export const TextOnly: Story = {
  args: {
    posts: mockPosts.map(post => ({ ...post, media: undefined })),
    currentUserId: 'current',
    showInteractions: true,
    showTimestamps: true,
    showMedia: false,
    showTags: true,
  },
};

export const VerifiedUsers: Story = {
  args: {
    posts: mockPosts.filter(post => post.author.verified),
    currentUserId: 'current',
    showInteractions: true,
    showTimestamps: true,
    showMedia: true,
    showTags: true,
  },
};

export const HighEngagement: Story = {
  args: {
    posts: mockPosts.filter(post => 
      (post.likes + post.comments + post.shares) > 200
    ),
    currentUserId: 'current',
    sortBy: 'engagement',
    showInteractions: true,
    showTimestamps: true,
    showMedia: true,
    showTags: true,
  },
};

export const RecentPosts: Story = {
  args: {
    posts: mockPosts.filter(post => 
      Date.now() - post.timestamp.getTime() < 4 * 60 * 60 * 1000
    ),
    currentUserId: 'current',
    sortBy: 'timestamp',
    showInteractions: true,
    showTimestamps: true,
    showMedia: true,
    showTags: true,
  },
};

export const WithInfiniteScroll: Story = {
  args: {
    posts: mockPosts,
    currentUserId: 'current',
    infiniteScroll: true,
    maxHeight: 600,
    showInteractions: true,
    showTimestamps: true,
    showMedia: true,
    showTags: true,
  },
};

export const MinimalView: Story = {
  args: {
    posts: mockPosts,
    currentUserId: 'current',
    compactMode: true,
    showInteractions: false,
    showTimestamps: false,
    showMedia: false,
    showTags: false,
  },
};

export const EmptyFeed: Story = {
  args: {
    posts: [],
    currentUserId: 'current',
    showInteractions: true,
    showTimestamps: true,
    showMedia: true,
    showTags: true,
  },
};

export const SinglePost: Story = {
  args: {
    posts: [mockPosts[0]],
    currentUserId: 'current',
    showInteractions: true,
    showTimestamps: true,
    showMedia: true,
    showTags: true,
  },
};

export const LongContent: Story = {
  args: {
    posts: [
      {
        ...mockPosts[1],
        content: `This is a much longer post to demonstrate how the feed handles extended content. 
        
        When users write longer posts, we automatically truncate them and provide an option to expand. This keeps the feed clean while still allowing for detailed content when needed.
        
        The glass morphism effects work beautifully with longer content too, creating a cohesive visual experience throughout the entire feed. The backdrop blur and transparency effects help maintain readability even with complex layouts.
        
        We also handle various media types including images, videos, and GIFs. The grid layout automatically adjusts based on the number of media items, and we show a preview indicator when there are more than 4 items.`
      }
    ],
    currentUserId: 'current',
    showInteractions: true,
    showTimestamps: true,
    showMedia: true,
    showTags: true,
  },
};