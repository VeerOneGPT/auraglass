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
    <div key={c.id} className="space-y-2">
      <OptimizedGlass elevation={1} className="rounded-lg p-3 border border-white/15">
        <div className="text-sm text-white/90 font-medium">{c.author}</div>
        <div className="text-sm text-white/80 whitespace-pre-wrap">{c.text}</div>
        {c.createdAt && <div className="text-xs text-white/60 mt-1">{c.createdAt}</div>}
      </OptimizedGlass>
      <div className="ml-6">
        <div className="flex gap-2 items-center">
          <input 
            value={drafts[c.id] ?? ''} 
            onChange={(e)=>setDraft(c.id, e.target.value)} 
            placeholder="Reply…" 
            className="flex-1 bg-transparent border border-white/20 rounded-lg px-2 py-1 text-sm outline-none" 
          />
          <GlassButton size="sm" variant="secondary" onClick={()=>{ if (onReply && drafts[c.id]) { onReply(c.id, drafts[c.id]); setDraft(c.id,''); } }}>Reply</GlassButton>
        </div>
        {c.replies?.length ? (
          <div className="mt-2 space-y-2">
            {(c.replies || []).map(r => render(r, depth+1))}
          </div>
        ) : null}
      </div>
    </div>
  );

  return <div className="space-y-3">{(comments || []).map(c => render(c))}</div>;
}

export default GlassCommentThread;

