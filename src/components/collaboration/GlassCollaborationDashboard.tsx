'use client';

import React, { useState, useEffect } from 'react';
import { Glass } from '../../primitives';
import { useCollaboration, CollaborationUser, CollaborationActivity } from './GlassCollaborationProvider';
import { cn } from '../../lib/utilsComprehensive';

interface CollaborationDashboardProps {
  className?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  showUserList?: boolean;
  showActivityFeed?: boolean;
  showControls?: boolean;
}

const UserAvatar: React.FC<{ 
  user: CollaborationUser; 
  size?: 'sm' | 'md' | 'lg';
  showStatus?: boolean;
}> = ({ user, size = 'md', showStatus = true }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base'
  };

  const isActive = Date.now() - user.lastActive < 60000; // Active within last minute

  return (
    <div className="glass-glass-glass-relative">
      {user.avatar ? (
        <img
          src={user.avatar}
          alt={user.name}
          className={cn(
            "rounded-full object-cover border-2",
            sizeClasses[size],
            isActive ? "border-green-400" : "border-gray-300"
          )}
        />
      ) : (
        <div
          className={cn(
            "rounded-full flex items-center justify-center text-white font-medium border-2",
            sizeClasses[size],
            isActive ? "border-green-400" : "border-gray-300"
          )}
          style={{ backgroundColor: user.color }}
        >
          {user.name[0]?.toUpperCase()}
        </div>
      )}
      
      {showStatus && (
        <div
          className={cn(
            "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white",
            isActive ? "bg-green-400" : "bg-gray-400"
          )}
        />
      )}
    </div>
  );
};

const ActivityItem: React.FC<{ activity: CollaborationActivity; user?: CollaborationUser }> = ({ 
  activity, 
  user 
}) => {
  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return new Date(timestamp).toLocaleDateString();
  };

  const getActivityIcon = () => {
    switch (activity.type) {
      case 'join': return '🟢';
      case 'leave': return '🔴';
      case 'edit': return '✏️';
      case 'comment': return '💬';
      case 'cursor_move': return '👆';
      default: return '•';
    }
  };

  const getActivityColor = () => {
    switch (activity.type) {
      case 'join': return 'text-green-600';
      case 'leave': return 'text-red-600';
      case 'edit': return 'text-blue-600';
      case 'comment': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-3 glass-glass-glass-p-2 glass-radius hover:glass-surface-subtle transition-colors">
      <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2">
        {user && <UserAvatar user={user} size="sm" showStatus={false} />}
        <span className="glass-glass-glass-text-lg">{getActivityIcon()}</span>
      </div>
      
      <div className="glass-glass-glass-flex-1 glass-glass-glass-min-glass-glass-w-0">
        <p className={cn("text-sm", getActivityColor())}>
          {activity.description}
        </p>
      </div>
      
      <span className="glass-glass-glass-text-xs glass-text-secondary whitespace-nowrap">
        {formatTime(activity.timestamp)}
      </span>
    </div>
  );
};

const ConnectionStatus: React.FC = () => {
  const { connectionStatus, isConnected } = useCollaboration();

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-green-600';
      case 'connecting': case 'reconnecting': return 'text-yellow-600';
      case 'disconnected': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected': return '🟢';
      case 'connecting': case 'reconnecting': return '🟡';
      case 'disconnected': return '🔴';
      default: return '⚫';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected': return 'Connected';
      case 'connecting': return 'Connecting...';
      case 'reconnecting': return 'Reconnecting...';
      case 'disconnected': return 'Disconnected';
      default: return 'Unknown';
    }
  };

  return (
    <div className={cn("flex items-center gap-2 text-sm", getStatusColor())}>
      <span>{getStatusIcon()}</span>
      <span>{getStatusText()}</span>
    </div>
  );
};

export const GlassCollaborationDashboard: React.FC<CollaborationDashboardProps> = ({
  className,
  position = 'top-right',
  showUserList = true,
  showActivityFeed = true,
  showControls = true
}) => {
  const { 
    users, 
    currentUser, 
    activities, 
    comments,
    showCursors, 
    showComments, 
    showActivity,
    toggleCursors, 
    toggleComments, 
    toggleActivity
  } = useCollaboration();

  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'users' | 'activity'>('users');

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4'
  };

  const activeUsers = users.filter(user => Date.now() - user.lastActive < 300000); // Active within 5 minutes
  const recentActivities = activities.slice(0, 20);
  const unresolvedComments = comments.filter(c => !c.resolved);

  return (
    <div className={cn("fixed z-40", positionClasses[position], className)}>
      {!isExpanded ? (
        // Collapsed state
        <Glass className="glass-glass-glass-p-3">
          <button
            onClick={() => setIsExpanded(true)}
            className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-3 hover:glass-surface-subtle glass-radius glass-glass-glass-p-2 transition-colors"
          >
            <div className="glass-glass-glass-flex -space-x-2">
              {activeUsers.slice(0, 3).map(user => (
                <UserAvatar key={user.id} user={user} size="sm" />
              ))}
              {activeUsers.length > 3 && (
                <div className="glass-glass-glass-w-6 glass-glass-glass-h-6 glass-surface-subtle glass-text-secondary glass-radius-full glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-text-xs glass-glass-glass-border-2 glass-glass-glass-border-white">
                  +{activeUsers.length - 3}
                </div>
              )}
            </div>
            
            <div className="glass-glass-glass-text-left">
              <div className="glass-glass-glass-text-sm glass-glass-glass-font-medium glass-text-secondary">
                {activeUsers.length} online
              </div>
              <ConnectionStatus />
            </div>
            
            {unresolvedComments.length > 0 && (
              <div className="glass-glass-glass-w-5 glass-glass-glass-h-5 glass-surface-red glass-glass-glass-text-primary glass-radius-full glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-text-xs">
                {unresolvedComments.length}
              </div>
            )}
          </button>
        </Glass>
      ) : (
        // Expanded state
        <Glass className="glass-glass-glass-w-80 max-glass-glass-glass-h-96 overflow-hidden">
          {/* Header */}
          <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-between glass-glass-glass-p-4 glass-glass-glass-border-b glass-glass-glass-border-subtle">
            <h3 className="glass-glass-glass-font-semibold glass-text-secondary">Collaboration</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="glass-text-secondary hover:glass-text-secondary glass-glass-glass-p-1"
            >
              ✕
            </button>
          </div>

          {/* Connection Status */}
          <div className="glass-glass-glass-px-4 glass-glass-glass-py-2 glass-surface-subtle glass-glass-glass-border-b glass-glass-glass-border-subtle">
            <ConnectionStatus />
          </div>

          {/* Controls */}
          {showControls && (
            <div className="glass-glass-glass-p-4 glass-glass-glass-border-b glass-glass-glass-border-subtle">
              <div className="glass-glass-glass-grid glass-glass-glass-glass-glass-grid-cols-3 glass-glass-glass-gap-2">
                <button
                  onClick={toggleCursors}
                  className={cn(
                    "flex flex-col items-center gap-1 p-2 rounded text-xs transition-colors",
                    showCursors 
                      ? "bg-blue-100 text-blue-700" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  <span>👆</span>
                  Cursors
                </button>
                
                <button
                  onClick={toggleComments}
                  className={cn(
                    "flex flex-col items-center gap-1 p-2 rounded text-xs transition-colors relative",
                    showComments 
                      ? "bg-purple-100 text-purple-700" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  <span>💬</span>
                  Comments
                  {unresolvedComments.length > 0 && (
                    <div className="glass-glass-glass-absolute -glass--glass--glass--glass--glassglass--glass-top-1 -right-1 glass-glass-glass-w-4 glass-glass-glass-h-4 glass-surface-red glass-glass-glass-text-primary glass-radius-full glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-text-xs">
                      {unresolvedComments.length}
                    </div>
                  )}
                </button>
                
                <button
                  onClick={toggleActivity}
                  className={cn(
                    "flex flex-col items-center gap-1 p-2 rounded text-xs transition-colors",
                    showActivity 
                      ? "bg-green-100 text-green-700" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  <span>📊</span>
                  Activity
                </button>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="glass-glass-glass-flex glass-glass-glass-border-b glass-glass-glass-border-subtle">
            <button
              onClick={() => setActiveTab('users')}
              className={cn(
                "flex-1 px-4 py-2 text-sm font-medium transition-colors",
                activeTab === 'users'
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              Users ({activeUsers.length})
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={cn(
                "flex-1 px-4 py-2 text-sm font-medium transition-colors",
                activeTab === 'activity'
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              Activity
            </button>
          </div>

          {/* Content */}
          <div className="glass-max-glass-glass-glass-h-64 glass-glass-glass-overflow-y-auto">
            {activeTab === 'users' && showUserList && (
              <div className="glass-glass-glass-p-4 glass-glass-glass-space-y-3">
                {activeUsers.map(user => {
                  const isCurrentUser = user.id === currentUser?.id;
                  const isActive = Date.now() - user.lastActive < 60000;
                  
                  return (
                    <div
                      key={user.id}
                      className={cn(
                        "flex items-center gap-3 p-2 rounded",
                        isCurrentUser ? "bg-blue-50" : "hover:bg-gray-50"
                      )}
                    >
                      <UserAvatar user={user} size="md" />
                      
                      <div className="glass-glass-glass-flex-1 glass-glass-glass-min-glass-glass-w-0">
                        <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2">
                          <span className="glass-glass-glass-text-sm glass-glass-glass-font-medium glass-text-secondary glass-glass-glass-truncate">
                            {user.name}
                            {isCurrentUser && " (You)"}
                          </span>
                          {!isActive && (
                            <span className="glass-glass-glass-text-xs glass-text-secondary">Away</span>
                          )}
                        </div>
                        <span className="glass-glass-glass-text-xs glass-text-secondary glass-glass-glass-truncate">
                          {user.email}
                        </span>
                      </div>
                      
                      {user.cursor && (
                        <span className="glass-glass-glass-text-xs glass-glass-glass-text-primary">📍</span>
                      )}
                    </div>
                  );
                })}
                
                {activeUsers.length === 0 && (
                  <div className="glass-glass-glass-text-center glass-glass-glass-py-6 glass-text-secondary">
                    <div className="glass-glass-glass-text-2xl glass-glass-glass-mb-2">👥</div>
                    <p className="glass-glass-glass-text-sm">No users online</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'activity' && showActivityFeed && (
              <div className="glass-glass-glass-p-4 space-y-1">
                {recentActivities.map(activity => {
                  const user = users.find(u => u.id === activity.userId);
                  return (
                    <ActivityItem
                      key={activity.id}
                      activity={activity}
                      user={user}
                    />
                  );
                })}
                
                {recentActivities.length === 0 && (
                  <div className="glass-glass-glass-text-center glass-glass-glass-py-6 glass-text-secondary">
                    <div className="glass-glass-glass-text-2xl glass-glass-glass-mb-2">📊</div>
                    <p className="glass-glass-glass-text-sm">No recent activity</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Stats */}
          <div className="glass-glass-glass-px-4 glass-glass-glass-py-2 glass-surface-subtle glass-glass-glass-border-t glass-glass-glass-border-subtle glass-glass-glass-text-xs glass-text-secondary">
            <div className="glass-glass-glass-flex glass-glass-glass-justify-between">
              <span>{comments.length} comments</span>
              <span>{activities.length} activities</span>
            </div>
          </div>
        </Glass>
      )}
    </div>
  );
};