import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { CollaborationProvider, CollaborationUser, useCollaboration } from './GlassCollaborationProvider';
import { GlassCollaborativeCursor } from './GlassCollaborativeCursor';
import { GlassCollaborativeComments } from './GlassCollaborativeComments';
import { GlassCollaborationDashboard } from './GlassCollaborationDashboard';
import { Glass } from '../../primitives';

const meta: Meta = {
  title: 'Collaboration/GlassCollaboration',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete real-time collaboration system with live cursors, comments, user presence, and activity tracking - like Google Docs, Figma, or Miro.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Bridge component to set current user via context with stable hook order
const CurrentUserBridge: React.FC<{ user: CollaborationUser | null }> = ({ user }) => {
  const { setCurrentUser } = useCollaboration();
  useEffect(() => {
    if (user) setCurrentUser(user);
  }, [user, setCurrentUser]);
  return null;
};

const CollaborationDemo: React.FC<{
  roomId: string;
  currentUser?: CollaborationUser;
  showCursors?: boolean;
  showComments?: boolean;
  showDashboard?: boolean;
}> = ({ 
  roomId, 
  currentUser,
  showCursors = true,
  showComments = true,
  showDashboard = true
}) => {
  const [user, setUser] = useState<CollaborationUser | null>(currentUser || null);

  // Auto-login for demo
  useEffect(() => {
    if (!user) {
      const demoUser: CollaborationUser = {
        id: `user-${Date.now()}`,
        name: 'Demo User',
        email: 'demo@example.com',
        color: '#3B82F6',
        lastActive: Date.now()
      };
      setUser(demoUser);
    }
  }, [user]);

  // Keep internal user in sync with prop changes (e.g., MultipleUsers story)
  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);

  return (
    <CollaborationProvider roomId={roomId} enableRealTime={true}>
      <div className="glass-min-glass-glass-h-screen glass-gradient-primary glass-gradient-primary via-white glass-gradient-primary glass-glass-glass-relative">
        {/* Header */}
        <div className="glass-glass-glass-relative glass-glass-glass-z-10 glass-glass-glass-p-8">
          <div className="max-w-4xl glass-glass-glass-mx-auto">
            <h1 className="glass-glass-glass-text-4xl glass-glass-glass-font-bold glass-text-secondary glass-glass-glass-mb-4">
              Real-Time Collaboration Demo
            </h1>
            <p className="glass-glass-glass-text-lg glass-text-secondary mb-8">
              Experience the future of collaborative work with live cursors, comments, and real-time activity tracking.
            </p>

            <div className="glass-glass-glass-grid glass-glass-glass-glass-glass-grid-cols-1 lg:glass-glass-glass-glass-glass-grid-cols-2 glass-glass-glass-gap-8">
              {/* Interactive Content Area */}
              <Glass className="glass-glass-glass-relative glass-glass-glass-p-8 glass-min-glass-glass-h-96">
                <h2 className="glass-glass-glass-text-2xl glass-glass-glass-font-semibold glass-text-secondary glass-glass-glass-mb-4">
                  Interactive Workspace
                </h2>
                <p className="glass-text-secondary mb-6">
                  Double-click anywhere to add comments. Move your cursor to see live collaboration in action.
                </p>

                {/* Sample content to interact with */}
                <div className="space-y-6">
                  <div className="glass-glass-glass-p-4 glass-surface-subtle glass-radius-lg">
                    <h3 className="glass-glass-glass-font-semibold glass-glass-glass-text-primary glass-glass-glass-mb-2">Project Overview</h3>
                    <p className="glass-glass-glass-text-primary glass-glass-glass-text-sm">
                      This is a sample content area where you can add comments and see other users' cursors.
                      Try double-clicking on different parts of this text to leave comments.
                    </p>
                  </div>

                  <div className="glass-glass-glass-p-4 glass-surface-subtle glass-radius-lg">
                    <h3 className="glass-glass-glass-font-semibold glass-glass-glass-text-primary glass-glass-glass-mb-2">Features Implemented</h3>
                    <ul className="glass-glass-glass-text-primary glass-glass-glass-text-sm space-y-1">
                      <li>• Real-time cursor tracking</li>
                      <li>• Collaborative commenting system</li>
                      <li>• User presence indicators</li>
                      <li>• Activity feed and history</li>
                      <li>• Live connection status</li>
                    </ul>
                  </div>

                  <div className="glass-glass-glass-p-4 glass-surface-subtle glass-radius-lg">
                    <h3 className="glass-glass-glass-font-semibold glass-glass-glass-text-primary glass-glass-glass-mb-2">Try It Out</h3>
                    <p className="glass-glass-glass-text-primary glass-glass-glass-text-sm">
                      Watch as simulated users join the session and move their cursors around.
                      You can interact with their comments and see live activity updates.
                    </p>
                  </div>
                </div>

                {/* Collaboration layers */}
                {showComments && (
                  <GlassCollaborativeComments 
                    className="glass-glass-glass-absolute glass-glass-glass-inset-0"
                    allowComments={true}
                  />
                )}
              </Glass>

              {/* Features Overview */}
              <div className="space-y-6">
                <Glass className="glass-glass-glass-p-6">
                  <h3 className="glass-glass-glass-text-xl glass-glass-glass-font-semibold glass-text-secondary glass-glass-glass-mb-4">🚀 Collaboration Features</h3>
                  <div className="glass-glass-glass-space-y-4">
                    <div className="glass-glass-glass-flex glass-glass-glass-items-start glass-glass-glass-gap-3">
                      <div className="glass-glass-glass-w-8 glass-glass-glass-h-8 glass-surface-subtle glass-glass-glass-text-primary glass-radius-full glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-text-sm">
                        👆
                      </div>
                      <div>
                        <h4 className="glass-glass-glass-font-medium glass-text-secondary">Live Cursors</h4>
                        <p className="glass-glass-glass-text-sm glass-text-secondary">See where other users are working in real-time</p>
                      </div>
                    </div>
                    
                    <div className="glass-glass-glass-flex glass-glass-glass-items-start glass-glass-glass-gap-3">
                      <div className="glass-glass-glass-w-8 glass-glass-glass-h-8 glass-surface-subtle glass-glass-glass-text-primary glass-radius-full glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-text-sm">
                        💬
                      </div>
                      <div>
                        <h4 className="glass-glass-glass-font-medium glass-text-secondary">Smart Comments</h4>
                        <p className="glass-glass-glass-text-sm glass-text-secondary">Add contextual comments with replies and resolution</p>
                      </div>
                    </div>
                    
                    <div className="glass-glass-glass-flex glass-glass-glass-items-start glass-glass-glass-gap-3">
                      <div className="glass-glass-glass-w-8 glass-glass-glass-h-8 glass-surface-subtle glass-glass-glass-text-primary glass-radius-full glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-text-sm">
                        👥
                      </div>
                      <div>
                        <h4 className="glass-glass-glass-font-medium glass-text-secondary">User Presence</h4>
                        <p className="glass-glass-glass-text-sm glass-text-secondary">See who's online and their activity status</p>
                      </div>
                    </div>
                    
                    <div className="glass-glass-glass-flex glass-glass-glass-items-start glass-glass-glass-gap-3">
                      <div className="glass-glass-glass-w-8 glass-glass-glass-h-8 glass-surface-subtle glass-glass-glass-text-primary glass-radius-full glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-text-sm">
                        📊
                      </div>
                      <div>
                        <h4 className="glass-glass-glass-font-medium glass-text-secondary">Activity Feed</h4>
                        <p className="glass-glass-glass-text-sm glass-text-secondary">Track all collaboration events and changes</p>
                      </div>
                    </div>
                  </div>
                </Glass>

                <Glass className="glass-glass-glass-p-6">
                  <h3 className="glass-glass-glass-text-xl glass-glass-glass-font-semibold glass-text-secondary glass-glass-glass-mb-4">💡 How to Use</h3>
                  <div className="glass-glass-glass-space-y-3 glass-glass-glass-text-sm glass-text-secondary">
                    <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2">
                      <span className="glass-glass-glass-w-5 glass-glass-glass-h-5 glass-surface-blue glass-glass-glass-text-primary glass-radius-full glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-text-xs">1</span>
                      <span>Move your cursor around to see live tracking</span>
                    </div>
                    <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2">
                      <span className="glass-glass-glass-w-5 glass-glass-glass-h-5 glass-surface-primary glass-glass-glass-text-primary glass-radius-full glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-text-xs">2</span>
                      <span>Double-click anywhere to add a comment</span>
                    </div>
                    <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2">
                      <span className="glass-glass-glass-w-5 glass-glass-glass-h-5 glass-surface-green glass-glass-glass-text-primary glass-radius-full glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-text-xs">3</span>
                      <span>Click comment dots to view and reply</span>
                    </div>
                    <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2">
                      <span className="glass-glass-glass-w-5 glass-glass-glass-h-5 glass-surface-primary glass-glass-glass-text-primary glass-radius-full glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-text-xs">4</span>
                      <span>Watch the collaboration dashboard for activity</span>
                    </div>
                  </div>
                </Glass>
              </div>
            </div>
          </div>
        </div>

        {/* Collaboration Overlays */}
        {showCursors && <GlassCollaborativeCursor />}
        
        {showDashboard && (
          <GlassCollaborationDashboard 
            position="top-right"
            showUserList={true}
            showActivityFeed={true}
            showControls={true}
          />
        )}

        {/* Set current user via bridge with stable hooks */}
        <CurrentUserBridge user={user} />
      </div>
    </CollaborationProvider>
  );
};

export const FullDemo: Story = {
  render: () => (
    <CollaborationDemo 
      roomId="demo-room-1"
      showCursors={true}
      showComments={true}
      showDashboard={true}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete collaboration demo with all features enabled. Watch as simulated users join and interact with the workspace.',
      },
    },
  },
};

export const CursorsOnly: Story = {
  render: () => (
    <CollaborationDemo 
      roomId="cursors-demo"
      showCursors={true}
      showComments={false}
      showDashboard={true}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstration focusing on real-time cursor tracking and user presence.',
      },
    },
  },
};

export const CommentsOnly: Story = {
  render: () => (
    <CollaborationDemo 
      roomId="comments-demo"
      showCursors={false}
      showComments={true}
      showDashboard={true}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstration focusing on the collaborative commenting system with replies and resolution.',
      },
    },
  },
};

export const MultipleUsers: Story = {
  render: () => {
    const [selectedUser, setSelectedUser] = useState<CollaborationUser>();

    const demoUsers: CollaborationUser[] = [
      {
        id: 'user-1',
        name: 'Alice Johnson',
        email: 'alice@company.com',
        color: '#3B82F6',
        lastActive: Date.now()
      },
      {
        id: 'user-2',
        name: 'Bob Smith',
        email: 'bob@company.com',
        color: '#EF4444',
        lastActive: Date.now()
      },
      {
        id: 'user-3',
        name: 'Carol Davis',
        email: 'carol@company.com',
        color: '#10B981',
        lastActive: Date.now()
      }
    ];

    return (
      <div className="glass-glass-glass-space-y-4">
        <div className="glass-surface-subtle glass-glass-glass-p-4 glass-radius-lg">
          <h3 className="glass-glass-glass-font-semibold glass-glass-glass-text-primary glass-glass-glass-mb-2">Switch User Perspective</h3>
          <div className="glass-glass-glass-flex glass-glass-glass-gap-2">
            {demoUsers.map(user => (
              <button
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`px-3 py-2 rounded text-sm ${
                  selectedUser?.id === user.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-blue-600 hover:bg-blue-100'
                }`}
                style={{ borderColor: user.color }}
              >
                {user.name}
              </button>
            ))}
          </div>
        </div>

        <CollaborationDemo 
          roomId="multi-user-demo"
          currentUser={selectedUser || demoUsers[0]}
          showCursors={true}
          showComments={true}
          showDashboard={true}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Switch between different user perspectives to see how collaboration looks from each user\'s viewpoint.',
      },
    },
  },
};

export const CollaborationShowcase: Story = {
  render: () => {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="glass-glass-glass-text-center glass-glass-glass-py-8 glass-gradient-primary glass-gradient-primary glass-gradient-primary glass-radius-xl">
          <h1 className="glass-glass-glass-text-3xl glass-glass-glass-font-bold glass-text-secondary glass-glass-glass-mb-4">🤝 Real-Time Collaboration System</h1>
          <p className="glass-glass-glass-text-lg glass-text-secondary max-w-3xl glass-glass-glass-mx-auto leading-relaxed">
            Experience the next generation of collaborative interfaces with live cursors, 
            contextual comments, user presence, and real-time activity tracking.
          </p>
          
          <div className="glass-glass-glass-grid glass-glass-glass-glass-glass-grid-cols-1 md:glass-glass-glass-glass-glass-grid-cols-4 glass-glass-glass-gap-6 mt-8 max-w-4xl glass-glass-glass-mx-auto">
            <div className="glass-glass-glass-text-center">
              <div className="glass-glass-glass-w-12 glass-glass-glass-h-12 glass-surface-blue glass-glass-glass-text-primary glass-radius-full glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-mx-auto glass-glass-glass-mb-3">
                👆
              </div>
              <h3 className="glass-glass-glass-font-semibold">Live Cursors</h3>
              <p className="glass-glass-glass-text-sm glass-text-secondary mt-1">See exactly where other users are working</p>
            </div>
            <div className="glass-glass-glass-text-center">
              <div className="glass-glass-glass-w-12 glass-glass-glass-h-12 glass-surface-primary glass-glass-glass-text-primary glass-radius-full glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-mx-auto glass-glass-glass-mb-3">
                💬
              </div>
              <h3 className="glass-glass-glass-font-semibold">Smart Comments</h3>
              <p className="glass-glass-glass-text-sm glass-text-secondary mt-1">Contextual discussions with replies and resolution</p>
            </div>
            <div className="glass-glass-glass-text-center">
              <div className="glass-glass-glass-w-12 glass-glass-glass-h-12 glass-surface-green glass-glass-glass-text-primary glass-radius-full glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-mx-auto glass-glass-glass-mb-3">
                👥
              </div>
              <h3 className="glass-glass-glass-font-semibold">User Presence</h3>
              <p className="glass-glass-glass-text-sm glass-text-secondary mt-1">Real-time online status and activity indicators</p>
            </div>
            <div className="glass-glass-glass-text-center">
              <div className="glass-glass-glass-w-12 glass-glass-glass-h-12 glass-surface-primary glass-glass-glass-text-primary glass-radius-full glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-mx-auto glass-glass-glass-mb-3">
                📊
              </div>
              <h3 className="glass-glass-glass-font-semibold">Activity Feed</h3>
              <p className="glass-glass-glass-text-sm glass-text-secondary mt-1">Complete history of all collaboration events</p>
            </div>
          </div>
        </div>

        <CollaborationDemo 
          roomId="showcase-demo"
          showCursors={true}
          showComments={true}
          showDashboard={true}
        />

        <div className="glass-surface-subtle glass-glass-glass-border-l-4 glass-glass-glass-border-yellow glass-glass-glass-p-6 glass-radius-r-lg">
          <h3 className="glass-glass-glass-font-semibold glass-glass-glass-text-primary glass-glass-glass-mb-2">🚀 Advanced Collaboration Features</h3>
          <div className="glass-glass-glass-grid glass-glass-glass-glass-glass-grid-cols-1 md:glass-glass-glass-glass-glass-grid-cols-2 glass-glass-glass-gap-6 glass-glass-glass-text-sm glass-glass-glass-text-primary">
            <div>
              <h4 className="glass-glass-glass-font-medium glass-glass-glass-mb-2">Real-Time Features:</h4>
              <ul className="space-y-1">
                <li>• Live cursor tracking with user identification</li>
                <li>• Instant comment synchronization</li>
                <li>• Real-time user presence indicators</li>
                <li>• Connection status monitoring</li>
                <li>• Activity feed with live updates</li>
              </ul>
            </div>
            <div>
              <h4 className="glass-glass-glass-font-medium glass-glass-glass-mb-2">Collaboration Tools:</h4>
              <ul className="space-y-1">
                <li>• Contextual commenting system</li>
                <li>• Comment replies and resolution</li>
                <li>• User avatars and color coding</li>
                <li>• Expandable collaboration dashboard</li>
                <li>• Toggle controls for all features</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="glass-gradient-primary glass-gradient-primary glass-gradient-primary glass-glass-glass-text-primary glass-glass-glass-p-8 glass-radius-xl">
          <h2 className="glass-glass-glass-text-2xl glass-glass-glass-font-bold glass-glass-glass-mb-4">🎯 Perfect for Modern Applications</h2>
          <div className="glass-glass-glass-grid glass-glass-glass-glass-glass-grid-cols-1 md:glass-glass-glass-glass-glass-grid-cols-3 glass-glass-glass-gap-6">
            <div>
              <h3 className="glass-glass-glass-font-semibold glass-glass-glass-mb-2">Document Editing</h3>
              <ul className="glass-glass-glass-text-sm space-y-1 glass-glass-glass-opacity-90">
                <li>• Google Docs-style collaboration</li>
                <li>• Real-time text editing</li>
                <li>• Comment threads</li>
                <li>• User presence awareness</li>
              </ul>
            </div>
            <div>
              <h3 className="glass-glass-glass-font-semibold glass-glass-glass-mb-2">Design Tools</h3>
              <ul className="glass-glass-glass-text-sm space-y-1 glass-glass-glass-opacity-90">
                <li>• Figma-like cursor tracking</li>
                <li>• Live design feedback</li>
                <li>• Collaborative annotations</li>
                <li>• Multi-user workspaces</li>
              </ul>
            </div>
            <div>
              <h3 className="glass-glass-glass-font-semibold glass-glass-glass-mb-2">Project Management</h3>
              <ul className="glass-glass-glass-text-sm space-y-1 glass-glass-glass-opacity-90">
                <li>• Team activity monitoring</li>
                <li>• Real-time discussions</li>
                <li>• Progress tracking</li>
                <li>• Instant notifications</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete showcase of the collaboration system with detailed feature explanations and use cases.',
      },
    },
  },
};
