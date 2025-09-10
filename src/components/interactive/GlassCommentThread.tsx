'use client';

import React from 'react';
import { GlassButton } from '../button/GlassButton';
import { OptimizedGlass } from '../../primitives';

export interface Comment {
  id: string;
  author: string;
  text: string;
  createdAt?: string;
  replies?: Comment[];
}

export interface GlassCommentThreadProps {
  comments: Comment[];
  onReply?: (parentId: string, text: string) => void;
}

export function GlassCommentThread({ comments, onReply }: GlassCommentThreadProps) {
  const [drafts, setDrafts] = React.useState<Record<string, string>>({});
  const setDraft = (id: string, v: string) => setDrafts((d) => ({ ...d, [id]: v }));

  const render = (c: Comment, depth = 0) => (
    <div key={c.id} className="glass-gap-2">
      <OptimizedGlass elevation={'level1'} className="glass-radius-lg glass-p-3 border border-white/15">
        <div className="glass-text-sm glass-text-primary/90 font-medium">{c.author}</div>
        <div className="glass-text-sm glass-text-primary/80 whitespace-pre-wrap">{c.text}</div>
        {c.createdAt && <div className="glass-text-xs glass-text-primary/60 glass-mt-1">{c.createdAt}</div>}
      </OptimizedGlass>
      <div className="ml-6">
        <div className="flex glass-gap-2 items-center">
          <input 
            value={drafts[c.id] ?? ''} 
            onChange={(e) => setDraft(c.id, e.target.value)} 
            placeholder="Reply…" 
            className="flex-1 bg-transparent border border-white/20 glass-radius-lg glass-px-2 glass-py-1 glass-text-sm outline-none" 
          />
          <GlassButton size="sm" variant="secondary" onClick={(e) => { if (onReply && drafts[c.id]) { onReply(c.id, drafts[c.id]); setDraft(c.id, ''); } }}>Reply</GlassButton>
        </div>
        {c.replies?.length ? (
          <div className="glass-mt-2 glass-gap-2">
            {(c.replies || []).map(r => render(r, depth + 1))}
          </div>
        ) : null}
      </div>
    </div>
  );

  return <div className="glass-gap-3">{(comments || []).map(c => render(c))}</div>;
}

export default GlassCommentThread;

