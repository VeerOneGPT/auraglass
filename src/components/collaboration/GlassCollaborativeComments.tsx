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
  const bubbleRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);

  // Apply dynamic positioning and colors without JSX style attribute
  useEffect(() => {
    const el = bubbleRef.current;
    if (!el) return;
    el.style.left = `${comment.position.x}px`;
    el.style.top = `${comment.position.y}px`;
    el.style.transform = 'translate(-50%, -100%)';
  }, [comment.position.x, comment.position.y]);

  useEffect(() => {
    const ptr = pointerRef.current; if (!ptr) return;
    ptr.style.left = '50%';
    ptr.style.top = '100%';
    ptr.style.transform = 'translateX(-50%)';
    ptr.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))';
  }, []);

  useEffect(() => {
    if (avatarRef.current) {
      avatarRef.current.style.backgroundColor = user?.color || '#6B7280';
    }
  }, [user?.color]);

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
      ref={bubbleRef}
      className={cn(
        'glass-absolute glass-z-40 glass-container-xs',
        comment.resolved && 'opacity-60'
      )}
    >
      <div className="glass-glass-glass-relative">
        {/* Main comment */}
        <Glass className={cn(
          "p-3 mb-2 shadow-lg border-l-4",
          comment.resolved ? "border-gray-400" : "border-blue-500"
        )}>
          <div className="glass-glass-glass-flex glass-glass-glass-items-start glass-glass-glass-justify-between glass-glass-glass-mb-2">
            <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2">
              <div
                ref={avatarRef}
                className="glass-glass-glass-w-6 glass-glass-glass-h-6 glass-radius-full glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-text-primary glass-glass-glass-text-xs glass-glass-glass-font-medium"
              >
                {user?.name?.[0]?.toUpperCase() || '?'}
              </div>
              <span className="glass-glass-glass-text-sm glass-glass-glass-font-medium glass-text-secondary">
                {user?.name || 'Unknown User'}
              </span>
              <span className="glass-glass-glass-text-xs glass-text-secondary">
                {formatTime(comment.timestamp)}
              </span>
            </div>
            <div className="glass-glass-glass-flex glass-glass-glass-gap-1">
              {!comment.resolved && (isOwner || user?.id === comment.userId) && (
                <button
                  onClick={() => onResolve(comment.id)}
                  className="glass-glass-glass-text-primary hover:glass-glass-glass-text-primary glass-glass-glass-text-xs glass-glass-glass-p-1 glass-focus"
                  title="Resolve comment"
                >
                  ✓
                </button>
              )}
              {comment.resolved && (
                <span className="glass-glass-glass-text-primary glass-glass-glass-text-xs">Resolved</span>
              )}
            </div>
          </div>
          
          <p className="glass-glass-glass-text-sm glass-text-secondary glass-glass-glass-mb-2">{comment.content}</p>
          
          <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-3 glass-glass-glass-text-xs">
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="glass-glass-glass-text-primary hover:glass-glass-glass-text-primary glass-focus"
            >
              Reply
            </button>
            
            {(comment.replies?.length || 0) > 0 && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="glass-text-secondary hover:glass-text-secondary glass-focus"
              >
                {showReplies ? 'Hide' : 'Show'} {comment.replies?.length} replies
              </button>
            )}
          </div>
        </Glass>

        {/* Reply input */}
        {isReplying && (
          <Glass className="glass-glass-glass-p-3 glass-glass-glass-mb-2 glass-surface-subtle">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              className="glass-glass-glass-w-full glass-glass-glass-p-2 glass-glass-glass-text-sm glass-glass-glass-border glass-glass-glass-border-subtle glass-radius resize-none focus:ring-2 focus:ring-blue-500 focus:glass-glass-glass-border-blue"
              rows={2}
              autoFocus
            />
            <div className="glass-glass-glass-flex glass-glass-glass-justify-end glass-glass-glass-gap-2 mt-2">
              <button
                onClick={() => setIsReplying(false)}
                className="glass-glass-glass-px-3 glass-glass-glass-py-1 glass-glass-glass-text-xs glass-text-secondary hover:glass-text-secondary glass-focus"
              >
                Cancel
              </button>
              <button
                onClick={handleReply}
                disabled={!replyText.trim()}
                className="glass-glass-glass-px-3 glass-glass-glass-py-1 glass-glass-glass-text-xs glass-surface-blue glass-glass-glass-text-primary glass-radius hover:glass-surface-blue disabled:opacity-50 disabled:cursor-not-allowed glass-focus"
              >
                Reply
              </button>
            </div>
          </Glass>
        )}

        {/* Replies */}
        {showReplies && comment.replies && comment.replies.length > 0 && (
          <div className="ml-4 glass-glass-glass-space-y-2">
            {comment.replies.map(reply => {
              const replyUser = user; // In real app, would look up by reply.userId
              return (
                <Glass key={reply.id} className="glass-glass-glass-p-2 glass-surface-subtle">
                  <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2 glass-glass-glass-mb-1">
                    <div
                      ref={(el) => { if (el) el.style.backgroundColor = replyUser?.color || '#6B7280'; }}
                      className="glass-glass-glass-w-4 glass-glass-glass-h-4 glass-radius-full glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-text-primary glass-glass-glass-text-xs"
                    >
                      {replyUser?.name?.[0]?.toUpperCase() || '?'}
                    </div>
                    <span className="glass-glass-glass-text-xs glass-glass-glass-font-medium glass-text-secondary">
                      {replyUser?.name || 'Unknown User'}
                    </span>
                    <span className="glass-glass-glass-text-xs glass-text-secondary">
                      {formatTime(reply.timestamp)}
                    </span>
                  </div>
                  <p className="glass-glass-glass-text-xs glass-text-secondary">{reply.content}</p>
                </Glass>
              );
            })}
          </div>
        )}

        {/* Comment pointer */}
        <div
          ref={pointerRef}
          className="glass-glass-glass-absolute glass-glass-glass-w-0 glass-glass-glass-h-0 glass-glass-glass-border-l-4 glass-glass-glass-border-r-4 glass-glass-glass-border-t-4 glass-glass-glass-border-transparent glass-glass-glass-border-t-white"
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
}> = ({ position, color, count = 1, onClick, resolved }) => {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    el.style.left = `${position.x}px`;
    el.style.top = `${position.y}px`;
    el.style.transform = 'translate(-50%, -50%)';
    el.style.backgroundColor = resolved ? '#6B7280' : color;
  }, [position.x, position.y, color, resolved]);
  return (
    <button
      ref={ref}
      className={cn(
        'glass-absolute glass-z-30 glass-w-6 glass-h-6 glass-radius-full glass-border glass-shadow-lg glass-transition glass-focus',
        resolved ? 'opacity-60' : 'animate-pulse'
      )}
      onClick={onClick}
      aria-label={resolved ? 'Resolved comment' : 'Comment'}
    >
      <span className="glass-glass-glass-text-primary glass-glass-glass-text-xs glass-glass-glass-font-bold">{count}</span>
    </button>
  );
};

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
  const newBubbleRef = useRef<HTMLDivElement>(null);
  const newAvatarRef = useRef<HTMLDivElement>(null);
  const newPointerRef = useRef<HTMLDivElement>(null);

  // Position and color for the new comment bubble (no JSX style attr)
  useEffect(() => {
    const el = newBubbleRef.current;
    if (!el || !newCommentPosition) return;
    el.style.left = `${newCommentPosition.x}px`;
    el.style.top = `${newCommentPosition.y}px`;
    el.style.transform = 'translate(-50%, -100%)';
  }, [newCommentPosition]);

  useEffect(() => {
    if (newAvatarRef.current) {
      newAvatarRef.current.style.backgroundColor = currentUser?.color || '#6B7280';
    }
  }, [currentUser?.color]);

  useEffect(() => {
    if (newPointerRef.current) {
      const ptr = newPointerRef.current;
      ptr.style.left = '50%';
      ptr.style.top = '100%';
      ptr.style.transform = 'translateX(-50%)';
      ptr.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))';
    }
  }, [isAddingComment, newCommentPosition]);

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
            ref={newBubbleRef}
            className="glass-glass-glass-absolute glass-z-40 glass-container-xs"
          >
          <Glass className="glass-glass-glass-p-3 glass-glass-glass-shadow-lg glass-glass-glass-border-l-4 glass-glass-glass-border-blue">
            <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2 glass-glass-glass-mb-2">
              <div
                ref={newAvatarRef}
                className="glass-glass-glass-w-6 glass-glass-glass-h-6 glass-radius-full glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-text-primary glass-glass-glass-text-xs glass-glass-glass-font-medium"
              >
                {currentUser?.name?.[0]?.toUpperCase() || '?'}
              </div>
              <span className="glass-glass-glass-text-sm glass-glass-glass-font-medium glass-text-secondary">
                {currentUser?.name || 'You'}
              </span>
            </div>
            
            <textarea
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="glass-glass-glass-w-full glass-glass-glass-p-2 glass-glass-glass-text-sm glass-glass-glass-border glass-glass-glass-border-subtle glass-radius resize-none focus:ring-2 focus:ring-blue-500 focus:glass-glass-glass-border-blue"
              rows={3}
              autoFocus
            />
            
            <div className="glass-glass-glass-flex glass-glass-glass-justify-end glass-glass-glass-gap-2 mt-2">
              <button
                onClick={() => {
                  setIsAddingComment(false);
                  setNewCommentPosition(null);
                  setNewCommentText('');
                }}
                className="glass-glass-glass-px-3 glass-glass-glass-py-1 glass-glass-glass-text-xs glass-text-secondary hover:glass-text-secondary glass-focus"
              >
                Cancel
              </button>
              <button
                onClick={handleAddComment}
                disabled={!newCommentText.trim()}
                className="glass-glass-glass-px-3 glass-glass-glass-py-1 glass-glass-glass-text-xs glass-surface-blue glass-glass-glass-text-primary glass-radius hover:glass-surface-blue disabled:opacity-50 disabled:cursor-not-allowed glass-focus"
              >
                Comment
              </button>
            </div>
          </Glass>
          
          {/* Comment pointer */}
          <div
            ref={newPointerRef}
            className="glass-glass-glass-absolute glass-glass-glass-w-0 glass-glass-glass-h-0 glass-glass-glass-border-l-4 glass-glass-glass-border-r-4 glass-glass-glass-border-t-4 glass-glass-glass-border-transparent glass-glass-glass-border-t-white"
          />
        </div>
      )}

      {/* Click outside to close */}
      {(selectedComment || isAddingComment) && (
        <div
          className="glass-glass-glass-fixed glass-glass-glass-inset-0 z-20"
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
        <div className="glass-glass-glass-absolute bottom-4 right-4 glass-surface-subtle glass-glass-glass-text-primary glass-glass-glass-p-3 glass-radius-lg glass-glass-glass-text-sm max-w-xs">
          💡 Double-click anywhere to add a comment
        </div>
      )}
    </div>
  );
};
