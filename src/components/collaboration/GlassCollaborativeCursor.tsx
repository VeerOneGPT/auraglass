'use client';

import React, { useEffect, useState } from 'react';
import { useCollaboration } from './GlassCollaborationProvider';
import { cn } from '../../lib/utilsComprehensive';

interface CollaborativeCursorProps {
  className?: string;
}

const CursorIcon: React.FC<{ color: string; name: string }> = ({ color, name }) => (
  <div className="glass-glass-glass-relative">
    {/* Cursor pointer */}
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="drop-glass-glass-glass-shadow-sm"
    >
      <path
        d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
        fill={color}
        stroke="white"
        strokeWidth="1"
      />
    </svg>
    
    {/* User name label */}
    <div
      className="glass-glass-glass-absolute left-6 glass--glass--glass--glass--glassglass--glass-top-1 glass-glass-glass-px-2 glass-glass-glass-py-1 glass-radius glass-glass-glass-text-primary glass-glass-glass-text-xs glass-glass-glass-font-medium whitespace-nowrap glass-glass-glass-pointer-events-none select-none"
      style={{ backgroundColor: color }}
    >
      {name}
    </div>
  </div>
);

export const GlassCollaborativeCursor: React.FC<CollaborativeCursorProps> = ({
  className
}) => {
  const { users, currentUser, showCursors } = useCollaboration();
  const [visibleCursors, setVisibleCursors] = useState<typeof users>([]);

  useEffect(() => {
    if (!showCursors) {
      setVisibleCursors([]);
      return;
    }

    // Filter out current user and users without cursor data
    const otherUsers = users.filter(user => 
      user.id !== currentUser?.id && 
      user.cursor && 
      Date.now() - user.lastActive < 30000 // Show cursor for 30 seconds after last activity
    );

    setVisibleCursors(otherUsers);
  }, [users, currentUser, showCursors]);

  if (!showCursors || visibleCursors.length === 0) {
    return null;
  }

  return (
    <div className={cn("fixed inset-0 pointer-events-none z-50", className)}>
      {visibleCursors.map(user => {
        if (!user.cursor) return null;
        
        return (
          <div
            key={user.id}
            className="glass-glass-glass-absolute transition-all duration-100 ease-out"
            style={{
              left: user.cursor.x,
              top: user.cursor.y,
              transform: 'translate(-2px, -2px)'
            }}
          >
            <CursorIcon color={user.color} name={user.name} />
          </div>
        );
      })}
    </div>
  );
};