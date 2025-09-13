'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Glass } from '../../primitives';
import { useCollaboration, CollaborationComment } from './GlassCollaborationProvider';
import { cn } from '../../lib/utilsComprehensive';

interface CollaborativeCommentsProps {
  className?: string;
  allowComments?: boolean;
}

const CommentBubble: React.FC<{
  comment: CollaborationComment;
  user: any;
  onReply: (commentId: string, content: string) => void;
  onResolve: (commentId: string) => void;
  isOwner: boolean;
}> = ({ comment, user, onReply, onResolve, isOwner }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  const handleReply = () => {
    if (replyText.trim()) {
      onReply(comment.id, replyText.trim());
      setReplyText('');
      setIsReplying(false);
    }
  };

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div
      className={cn(
        "absolute z-40 max-w-xs",
        comment.resolved && "opacity-60"
      )}
      style={{
        left: comment.position.x,
        top: comment.position.y,
        transform: 'translate(-50%, -100%)'
      }}
    >
      <div className="glass-glass-relative">
        {/* Main comment */}
        <Glass className={cn(
          "p-3 mb-2 shadow-lg border-l-4",
          comment.resolved ? "border-gray-400" : "border-blue-500"
        )}>
          <div className="glass-glass-flex glass-glass-items-start glass-glass-justify-between glass-glass-mb-2">
            <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2">
              <div
                className="glass-glass-w-6 glass-glass-h-6 glass-radius-full glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-text-primary glass-glass-text-xs glass-glass-font-medium"
                style={{ backgroundColor: user?.color || '#6B7280' }}
              >
                {user?.name?.[0]?.toUpperCase() || '?'}
              </div>
              <span className="glass-glass-text-sm glass-glass-font-medium glass-text-secondary">
                {user?.name || 'Unknown User'}
              </span>
              <span className="glass-glass-text-xs glass-text-secondary">
                {formatTime(comment.timestamp)}
              </span>
            </div>
            <div className="glass-glass-flex glass-glass-gap-1">
              {!comment.resolved && (isOwner || user?.id === comment.userId) && (
                <button
                  onClick={() => onResolve(comment.id)}
                  className="glass-glass-text-primary hover:glass-glass-text-primary glass-glass-text-xs glass-glass-p-1"
                  title="Resolve comment"
                >
                  ✓
                </button>
              )}
              {comment.resolved && (
                <span className="glass-glass-text-primary glass-glass-text-xs">Resolved</span>
              )}
            </div>
          </div>
          
          <p className="glass-glass-text-sm glass-text-secondary glass-glass-mb-2">{comment.content}</p>
          
          <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-3 glass-glass-text-xs">
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="glass-glass-text-primary hover:glass-glass-text-primary"
            >
              Reply
            </button>
            
            {(comment.replies?.length || 0) > 0 && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="glass-text-secondary hover:glass-text-secondary"
              >
                {showReplies ? 'Hide' : 'Show'} {comment.replies?.length} replies
              </button>
            )}
          </div>
        </Glass>

        {/* Reply input */}
        {isReplying && (
          <Glass className="glass-glass-p-3 glass-glass-mb-2 bg-blue-50">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              className="glass-glass-w-full glass-glass-p-2 glass-glass-text-sm glass-glass-border glass-glass-border-subtle glass-radius resize-none focus:ring-2 focus:ring-blue-500 focus:glass-glass-border-blue"
              rows={2}
              autoFocus
            />
            <div className="glass-glass-flex glass-glass-justify-end glass-glass-gap-2 mt-2">
              <button
                onClick={() => setIsReplying(false)}
                className="glass-glass-px-3 glass-glass-py-1 glass-glass-text-xs glass-text-secondary hover:glass-text-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleReply}
                disabled={!replyText.trim()}
                className="glass-glass-px-3 glass-glass-py-1 glass-glass-text-xs glass-surface-blue glass-glass-text-primary glass-radius hover:glass-surface-blue disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reply
              </button>
            </div>
          </Glass>
        )}

        {/* Replies */}
        {showReplies && comment.replies && comment.replies.length > 0 && (
          <div className="ml-4 glass-glass-space-y-2">
            {comment.replies.map(reply => {
              const replyUser = user; // In real app, would look up by reply.userId
              return (
                <Glass key={reply.id} className="glass-glass-p-2 glass-surface-subtle">
                  <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2 glass-glass-mb-1">
                    <div
                      className="glass-glass-w-4 glass-glass-h-4 glass-radius-full glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-text-primary glass-glass-text-xs"
                      style={{ backgroundColor: replyUser?.color || '#6B7280' }}
                    >
                      {replyUser?.name?.[0]?.toUpperCase() || '?'}
                    </div>
                    <span className="glass-glass-text-xs glass-glass-font-medium glass-text-secondary">
                      {replyUser?.name || 'Unknown User'}
                    </span>
                    <span className="glass-glass-text-xs glass-text-secondary">
                      {formatTime(reply.timestamp)}
                    </span>
                  </div>
                  <p className="glass-glass-text-xs glass-text-secondary">{reply.content}</p>
                </Glass>
              );
            })}
          </div>
        )}

        {/* Comment pointer */}
        <div
          className="glass-glass-absolute left-1/2 top-full w-0 h-0 glass-glass-border-l-4 glass-glass-border-r-4 glass-glass-border-t-4 glass-glass-border-transparent glass-glass-border-t-white transform -translate-x-1/2"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
        />
      </div>
    </div>
  );
};

const CommentDot: React.FC<{
  position: { x: number; y: number };
  color: string;
  count?: number;
  onClick: () => void;
  resolved?: boolean;
}> = ({ position, color, count = 1, onClick, resolved }) => (
  <button
    className={cn(
      "absolute z-30 w-6 h-6 rounded-full border-2 border-white shadow-lg transition-all hover:scale-110",
      resolved ? "opacity-60" : "animate-pulse"
    )}
    style={{
      left: position.x,
      top: position.y,
      backgroundColor: resolved ? '#6B7280' : color,
      transform: 'translate(-50%, -50%)'
    }}
    onClick={onClick}
  >
    <span className="glass-glass-text-primary glass-glass-text-xs font-bold">{count}</span>
  </button>
);

export const GlassCollaborativeComments: React.FC<CollaborativeCommentsProps> = ({
  className,
  allowComments = true
}) => {
  const { 
    comments, 
    users, 
    currentUser, 
    addComment, 
    resolveComment, 
    replyToComment,
    showComments 
  } = useCollaboration();
  
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [newCommentPosition, setNewCommentPosition] = useState<{ x: number; y: number } | null>(null);
  const [newCommentText, setNewCommentText] = useState('');
  const [selectedComment, setSelectedComment] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!allowComments || !showComments) return;

    const handleDoubleClick = (e: MouseEvent) => {
      if (!currentUser) return;
      
      // Don't add comments on UI elements
      const target = e.target as HTMLElement;
      if (target.closest('button, input, textarea, select, a')) return;
      
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const position = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      
      setNewCommentPosition(position);
      setIsAddingComment(true);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('dblclick', handleDoubleClick);
    }

    return () => {
      if (container) {
        container.removeEventListener('dblclick', handleDoubleClick);
      }
    };
  }, [allowComments, showComments, currentUser]);

  const handleAddComment = () => {
    if (!newCommentText.trim() || !newCommentPosition || !currentUser) return;

    addComment({
      userId: currentUser.id,
      content: newCommentText.trim(),
      position: newCommentPosition
    });

    setNewCommentText('');
    setIsAddingComment(false);
    setNewCommentPosition(null);
  };

  const handleReply = (commentId: string, content: string) => {
    if (!currentUser) return;
    
    replyToComment(commentId, {
      userId: currentUser.id,
      content
    });
  };

  const handleResolve = (commentId: string) => {
    resolveComment(commentId);
  };

  // Group comments by position for clustering
  const groupedComments = React.useMemo(() => {
    const groups: { [key: string]: CollaborationComment[] } = {};
    
    comments.forEach(comment => {
      const key = `${Math.floor(comment.position.x / 50)}-${Math.floor(comment.position.y / 50)}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(comment);
    });
    
    return Object.values(groups);
  }, [comments]);

  if (!showComments || !allowComments) {
    return null;
  }

  return (
    <div 
      ref={containerRef}
      className={cn("relative w-full h-full", className)}
    >
      {/* Comment dots */}
      {groupedComments.map((group, index) => {
        const firstComment = group[0];
        const user = users.find(u => u.id === firstComment.userId) || currentUser;
        const hasUnresolved = group.some(c => !c.resolved);
        
        return (
          <CommentDot
            key={`group-${index}`}
            position={firstComment.position}
            color={user?.color || '#6B7280'}
            count={group.length}
            resolved={!hasUnresolved}
            onClick={() => setSelectedComment(
              selectedComment === firstComment.id ? null : firstComment.id
            )}
          />
        );
      })}

      {/* Selected comment bubble */}
      {selectedComment && (
        <>
          {comments
            .filter(comment => 
              groupedComments.find(group => 
                group.some(c => c.id === selectedComment) && 
                group.includes(comment)
              )
            )
            .map(comment => {
              const user = users.find(u => u.id === comment.userId) || currentUser;
              
              return (
                <CommentBubble
                  key={comment.id}
                  comment={comment}
                  user={user}
                  onReply={handleReply}
                  onResolve={handleResolve}
                  isOwner={currentUser?.id === comment.userId}
                />
              );
            })}
        </>
      )}

      {/* New comment input */}
      {isAddingComment && newCommentPosition && (
        <div
          className="glass-glass-absolute z-40 max-w-xs"
          style={{
            left: newCommentPosition.x,
            top: newCommentPosition.y,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <Glass className="glass-glass-p-3 glass-glass-shadow-lg glass-glass-border-l-4 glass-glass-border-blue">
            <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2 glass-glass-mb-2">
              <div
                className="glass-glass-w-6 glass-glass-h-6 glass-radius-full glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-text-primary glass-glass-text-xs glass-glass-font-medium"
                style={{ backgroundColor: currentUser?.color || '#6B7280' }}
              >
                {currentUser?.name?.[0]?.toUpperCase() || '?'}
              </div>
              <span className="glass-glass-text-sm glass-glass-font-medium glass-text-secondary">
                {currentUser?.name || 'You'}
              </span>
            </div>
            
            <textarea
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="glass-glass-w-full glass-glass-p-2 glass-glass-text-sm glass-glass-border glass-glass-border-subtle glass-radius resize-none focus:ring-2 focus:ring-blue-500 focus:glass-glass-border-blue"
              rows={3}
              autoFocus
            />
            
            <div className="glass-glass-flex glass-glass-justify-end glass-glass-gap-2 mt-2">
              <button
                onClick={() => {
                  setIsAddingComment(false);
                  setNewCommentPosition(null);
                  setNewCommentText('');
                }}
                className="glass-glass-px-3 glass-glass-py-1 glass-glass-text-xs glass-text-secondary hover:glass-text-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleAddComment}
                disabled={!newCommentText.trim()}
                className="glass-glass-px-3 glass-glass-py-1 glass-glass-text-xs glass-surface-blue glass-glass-text-primary glass-radius hover:glass-surface-blue disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Comment
              </button>
            </div>
          </Glass>
          
          {/* Comment pointer */}
          <div
            className="glass-glass-absolute left-1/2 top-full w-0 h-0 glass-glass-border-l-4 glass-glass-border-r-4 glass-glass-border-t-4 glass-glass-border-transparent glass-glass-border-t-white transform -translate-x-1/2"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
          />
        </div>
      )}

      {/* Click outside to close */}
      {(selectedComment || isAddingComment) && (
        <div
          className="glass-glass-fixed glass-glass-inset-0 z-20"
          onClick={() => {
            setSelectedComment(null);
            if (isAddingComment) {
              setIsAddingComment(false);
              setNewCommentPosition(null);
              setNewCommentText('');
            }
          }}
        />
      )}

      {/* Helper text */}
      {comments.length === 0 && currentUser && (
        <div className="glass-glass-absolute bottom-4 right-4 bg-blue-100 glass-glass-text-primary glass-glass-p-3 glass-radius-lg glass-glass-text-sm max-w-xs">
          💡 Double-click anywhere to add a comment
        </div>
      )}
    </div>
  );
};