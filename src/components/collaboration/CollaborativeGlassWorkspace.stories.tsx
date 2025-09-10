import type { Meta, StoryObj } from '@storybook/react';
import { CollaborativeGlassWorkspace } from './CollaborativeGlassWorkspace';

const meta: Meta<typeof CollaborativeGlassWorkspace> = {
  title: 'Collaboration/CollaborativeGlassWorkspace',
  component: CollaborativeGlassWorkspace,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A complete real-time collaborative design environment with multi-user editing, voice chat, version control, and live cursors.'
      }
    }
  },
  argTypes: {
    layout: {
      control: { type: 'select', options: ['split', 'tabs', 'canvas-focused', 'editor-focused'] },
      description: 'Workspace layout mode'
    },
    theme: {
      control: { type: 'select', options: ['dark', 'light', 'auto'] },
      description: 'UI theme preference'
    },
    showMiniMap: {
      control: 'boolean',
      description: 'Show workspace minimap'
    },
    showOnlineUsers: {
      control: 'boolean',
      description: 'Show online users panel'
    },
    showCursors: {
      control: 'boolean',
      description: 'Show collaborative cursors'
    },
    enableVoiceChat: {
      control: 'boolean',
      description: 'Enable voice communication'
    },
    enableVersionControl: {
      control: 'boolean',
      description: 'Enable version control features'
    }
  }
};

export default meta;
type Story = StoryObj<typeof CollaborativeGlassWorkspace>;

export const Default: Story = {
  args: {
    workspaceId: 'demo-workspace-1',
    userId: 'user-demo-1',
    userName: 'Demo User',
    userEmail: 'demo@example.com',
    userRole: 'admin',
    layout: 'split',
    theme: 'dark',
    showMiniMap: true,
    showOnlineUsers: true,
    showCursors: true,
    enableVoiceChat: true,
    enableVersionControl: true,
    canvasWidth: 1200,
    canvasHeight: 800
  }
};

export const DesignStudio: Story = {
  args: {
    workspaceId: 'design-studio',
    userId: 'designer-1',
    userName: 'Design Pro',
    userEmail: 'designer@studio.com',
    userRole: 'admin',
    layout: 'canvas-focused',
    theme: 'dark',
    showMiniMap: true,
    showOnlineUsers: true,
    showCursors: true,
    enableVoiceChat: true,
    enableVersionControl: true,
    enableAdvancedEffects: true,
    canvasWidth: 1920,
    canvasHeight: 1080,
    gridSize: 15
  }
};

export const CodeCollaboration: Story = {
  args: {
    workspaceId: 'code-session',
    userId: 'developer-1',
    userName: 'Code Master',
    userEmail: 'dev@company.com',
    userRole: 'editor',
    layout: 'editor-focused',
    theme: 'dark',
    showMiniMap: false,
    showOnlineUsers: true,
    showCursors: true,
    enableVoiceChat: false,
    enableVersionControl: true,
    enableRealTimeSync: true
  }
};

export const MinimalWorkspace: Story = {
  args: {
    workspaceId: 'minimal-workspace',
    userId: 'user-minimal',
    userName: 'Minimal User',
    userEmail: 'minimal@example.com',
    userRole: 'viewer',
    layout: 'tabs',
    theme: 'light',
    showMiniMap: false,
    showOnlineUsers: false,
    showCursors: false,
    enableVoiceChat: false,
    enableVersionControl: false
  }
};

export const VoiceEnabled: Story = {
  args: {
    workspaceId: 'voice-workspace',
    userId: 'voice-user',
    userName: 'Voice User',
    userEmail: 'voice@example.com',
    userRole: 'admin',
    layout: 'split',
    theme: 'dark',
    showMiniMap: true,
    showOnlineUsers: true,
    showCursors: true,
    enableVoiceChat: true,
    enableScreenSharing: true,
    enableComments: true,
    enableVersionControl: true
  }
};

