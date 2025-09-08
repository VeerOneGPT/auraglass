import type { Meta, StoryObj } from '@storybook/react';
import { GlassMessageList } from './GlassMessageList';

const meta: Meta<typeof GlassMessageList> = {
  title: 'Components/Interactive/GlassMessageList',
  component: GlassMessageList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glassmessagelist component.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    currentUserId: {
      control: 'text',
      description: 'Current user ID',
    },
    enableReactions: {
      control: 'boolean',
      description: 'Enable message reactions',
    },
    showTimestamps: {
      control: 'boolean',
      description: 'Show message timestamps',
    },
    showAvatars: {
      control: 'boolean',
      description: 'Show user avatars',
    },
  },
  args: {
    className: '',
    currentUserId: 'user1',
    enableReactions: true,
    showTimestamps: true,
    showAvatars: true,
  },
};

export default meta;
type Story = StoryObj<typeof GlassMessageList>;

export const Default: Story = {
  args: {
    messages: [
      {
        id: '1',
        content: 'Hello everyone! Welcome to the chat.',
        sender: {
          id: 'user1',
          name: 'Alice',
          avatar: '',
          status: 'online' as const,
        },
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        type: 'text' as const,
      },
      {
        id: '2',
        content: 'Thanks Alice! Glad to be here.',
        sender: {
          id: 'user2',
          name: 'Bob',
          avatar: '',
          status: 'online' as const,
        },
        timestamp: new Date(Date.now() - 240000), // 4 minutes ago
        type: 'text' as const,
      },
      {
        id: '3',
        content: 'How is everyone doing today?',
        sender: {
          id: 'user3',
          name: 'Charlie',
          avatar: '',
          status: 'away' as const,
        },
        timestamp: new Date(Date.now() - 180000), // 3 minutes ago
        type: 'text' as const,
      },
    ],
    onMessageClick: (message) => console.log('Message clicked:', message.id),
    onMessageReaction: (messageId, emoji) => console.log('Reaction:', messageId, emoji),
  },
};

export const WithAttachments: Story = {
  args: {
    messages: [
      {
        id: '1',
        content: 'Check out this image I found!',
        sender: {
          id: 'user1',
          name: 'Alice',
          avatar: '',
          status: 'online' as const,
        },
        timestamp: new Date(Date.now() - 120000),
        type: 'text' as const,
        attachments: [
          {
            type: 'image',
            url: 'https://via.placeholder.com/300x200',
            name: 'sample-image.jpg',
            size: 245760,
          },
        ],
      },
      {
        id: '2',
        content: 'Here\'s the document you requested.',
        sender: {
          id: 'user2',
          name: 'Bob',
          avatar: '',
          status: 'online' as const,
        },
        timestamp: new Date(Date.now() - 60000),
        type: 'text' as const,
        attachments: [
          {
            type: 'file',
            url: '#',
            name: 'important-document.pdf',
            size: 1048576,
          },
        ],
      },
    ],
    onAttachmentDownload: (attachment) => console.log('Download:', attachment.name),
  },
};
