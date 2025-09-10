import type { Meta, StoryObj } from '@storybook/react';
import { GlassSharedWhiteboard, type WhiteboardUser, type DrawingStroke } from './GlassSharedWhiteboard';

const mockUsers: WhiteboardUser[] = [
  {
    id: 'user1',
    name: 'Alice Johnson',
    color: '#FF6B6B',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
    cursorX: 150,
    cursorY: 100,
    isDrawing: false,
    currentTool: 'pen',
    lastActivity: Date.now()
  },
  {
    id: 'user2',
    name: 'Bob Smith',
    color: '#4ECDC4',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
    cursorX: 300,
    cursorY: 200,
    isDrawing: true,
    currentTool: 'marker',
    lastActivity: Date.now() - 1000
  },
  {
    id: 'user3',
    name: 'Carol Davis',
    color: '#45B7D1',
    cursorX: 450,
    cursorY: 150,
    isDrawing: false,
    currentTool: 'pen',
    lastActivity: Date.now() - 2000
  },
  {
    id: 'current',
    name: 'You',
    color: '#96CEB4',
    cursorX: 200,
    cursorY: 250,
    isDrawing: false,
    currentTool: 'pen',
    lastActivity: Date.now()
  }
];

const mockStrokes: DrawingStroke[] = [
  {
    id: 'stroke1',
    userId: 'user1',
    userName: 'Alice Johnson',
    userColor: '#FF6B6B',
    points: [
      { x: 100, y: 100 },
      { x: 150, y: 120 },
      { x: 200, y: 110 },
      { x: 250, y: 130 }
    ],
    tool: 'pen',
    color: '#FF6B6B',
    size: 4,
    opacity: 1,
    timestamp: Date.now() - 10000,
    isComplete: true
  },
  {
    id: 'stroke2',
    userId: 'user2',
    userName: 'Bob Smith',
    userColor: '#4ECDC4',
    points: [
      { x: 200, y: 200 },
      { x: 220, y: 180 },
      { x: 240, y: 200 },
      { x: 260, y: 180 },
      { x: 280, y: 200 }
    ],
    tool: 'marker',
    color: '#4ECDC4',
    size: 8,
    opacity: 0.7,
    timestamp: Date.now() - 5000,
    isComplete: true
  }
];

const meta = {
  title: 'Glass UI/Social/GlassSharedWhiteboard',
  component: GlassSharedWhiteboard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: { type: 'range', min: 400, max: 1200, step: 50 },
    },
    height: {
      control: { type: 'range', min: 300, max: 800, step: 50 },
    },
    backgroundColor: {
      control: { type: 'color' },
    },
  },
} satisfies Meta<typeof GlassSharedWhiteboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 800,
    height: 600,
    users: mockUsers,
    currentUserId: 'current',
    strokes: mockStrokes,
    showUserCursors: true,
    showToolbar: true,
    showUserList: true,
    showUndoRedo: true,
    canDraw: true,
  },
};

export const WithGrid: Story = {
  args: {
    width: 800,
    height: 600,
    users: mockUsers,
    currentUserId: 'current',
    strokes: mockStrokes,
    gridVisible: true,
    showUserCursors: true,
    showToolbar: true,
    showUserList: true,
  },
};

export const RealTimeCollaboration: Story = {
  args: {
    width: 800,
    height: 600,
    users: mockUsers,
    currentUserId: 'current',
    strokes: mockStrokes,
    realTimeSync: true,
    showUserCursors: true,
    showToolbar: true,
    showUserList: true,
    soundEnabled: true,
  },
};

export const ReadOnlyMode: Story = {
  args: {
    width: 800,
    height: 600,
    users: mockUsers.slice(0, 2),
    currentUserId: 'current',
    strokes: mockStrokes,
    readOnly: true,
    showUserCursors: false,
    showToolbar: false,
    showUserList: true,
    canDraw: false,
  },
};

export const MinimalInterface: Story = {
  args: {
    width: 700,
    height: 500,
    users: mockUsers,
    currentUserId: 'current',
    strokes: mockStrokes,
    showUserCursors: false,
    showToolbar: false,
    showUserList: false,
    showUndoRedo: false,
  },
};

export const SmallCanvas: Story = {
  args: {
    width: 500,
    height: 400,
    users: mockUsers.slice(0, 2),
    currentUserId: 'current',
    strokes: [],
    showUserCursors: true,
    showToolbar: true,
    showUserList: true,
  },
};

export const LargeCanvas: Story = {
  args: {
    width: 1000,
    height: 700,
    users: mockUsers,
    currentUserId: 'current',
    strokes: mockStrokes,
    showUserCursors: true,
    showToolbar: true,
    showUserList: true,
    realTimeSync: true,
  },
};

export const DarkBackground: Story = {
  args: {
    width: 800,
    height: 600,
    users: mockUsers,
    currentUserId: 'current',
    strokes: mockStrokes.map(stroke => ({
      ...stroke,
      color: stroke.color === '#FF6B6B' ? '#FF8A8A' : stroke.color === '#4ECDC4' ? '#6EEEE4' : stroke.color
    })),
    backgroundColor: '#2A2A2A',
    showUserCursors: true,
    showToolbar: true,
    showUserList: true,
  },
};

export const NoToolbar: Story = {
  args: {
    width: 800,
    height: 600,
    users: mockUsers,
    currentUserId: 'current',
    strokes: mockStrokes,
    showToolbar: false,
    showUserCursors: true,
    showUserList: true,
    canDraw: true,
  },
};

export const NoUserList: Story = {
  args: {
    width: 800,
    height: 600,
    users: mockUsers,
    currentUserId: 'current',
    strokes: mockStrokes,
    showToolbar: true,
    showUserCursors: true,
    showUserList: false,
  },
};

export const SoloMode: Story = {
  args: {
    width: 800,
    height: 600,
    users: [mockUsers.find(u => u.id === 'current')!],
    currentUserId: 'current',
    strokes: [],
    showUserCursors: false,
    showToolbar: true,
    showUserList: false,
    showUndoRedo: true,
  },
};

export const ManyUsers: Story = {
  args: {
    width: 900,
    height: 650,
    users: [
      ...mockUsers,
      ...Array.from({ length: 6 }, (_, i) => ({
        id: `extra-${i}`,
        name: `User ${i + 5}`,
        color: ['#EE5A6F', '#0FB9B1', '#3867D6', '#1DD1A1', '#FD79A8', '#54A0FF'][i],
        cursorX: Math.random() * 800,
        cursorY: Math.random() * 500,
        isDrawing: Math.random() > 0.7,
        currentTool: 'pen',
        lastActivity: Date.now() - Math.random() * 5000
      }))
    ],
    currentUserId: 'current',
    strokes: mockStrokes,
    realTimeSync: true,
    showUserCursors: true,
    showToolbar: true,
    showUserList: true,
  },
};

export const WithManyStrokes: Story = {
  args: {
    width: 800,
    height: 600,
    users: mockUsers,
    currentUserId: 'current',
    strokes: [
      ...mockStrokes,
      ...Array.from({ length: 20 }, (_, i) => ({
        id: `stroke-${i + 3}`,
        userId: mockUsers[i % mockUsers.length].id,
        userName: mockUsers[i % mockUsers.length].name,
        userColor: mockUsers[i % mockUsers.length].color,
        points: Array.from({ length: 5 }, (_, j) => ({
          x: 100 + i * 30 + j * 10,
          y: 150 + Math.sin(i + j) * 50
        })),
        tool: ['pen', 'marker'][i % 2] as any,
        color: mockUsers[i % mockUsers.length].color,
        size: [2, 4, 6, 8][i % 4],
        opacity: i % 2 === 0 ? 1 : 0.7,
        timestamp: Date.now() - i * 1000,
        isComplete: true
      }))
    ],
    showUserCursors: true,
    showToolbar: true,
    showUserList: true,
  },
};

export const SilentMode: Story = {
  args: {
    width: 800,
    height: 600,
    users: mockUsers,
    currentUserId: 'current',
    strokes: mockStrokes,
    soundEnabled: false,
    realTimeSync: true,
    showUserCursors: true,
    showToolbar: true,
    showUserList: true,
  },
};

export const LimitedStrokes: Story = {
  args: {
    width: 800,
    height: 600,
    users: mockUsers,
    currentUserId: 'current',
    strokes: mockStrokes,
    maxStrokes: 10,
    showUserCursors: true,
    showToolbar: true,
    showUserList: true,
    showUndoRedo: true,
  },
};

export const CustomBackground: Story = {
  args: {
    width: 800,
    height: 600,
    users: mockUsers,
    currentUserId: 'current',
    strokes: mockStrokes,
    backgroundColor: '#F0F8FF',
    showUserCursors: true,
    showToolbar: true,
    showUserList: true,
  },
};