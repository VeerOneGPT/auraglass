'use client';

import React from 'react';
import { createGlassStyle } from '../../core/mixins/glassMixins';
import { GlassButton } from '../button/GlassButton';

export interface Reaction { key: string; label: string; count: number }
export interface GlassReactionBarProps { reactions: Reaction[]; onReact?: (key:string)=>void; className?: string }

export function GlassReactionBar({ reactions, onReact, className }: GlassReactionBarProps) {
  return (
    <div className={className}>
      <div className="flex gap-2">
        {reactions.map(r => (
          <GlassButton key={r.key} variant="ghost" size="sm" onClick={()=>onReact?.(r.key)}>
            <span className="mr-1">{r.label}</span>
            <span className="text-white/70">{r.count}</span>
          </GlassButton>
        ))}
      </div>
    </div>
  );
}

export default GlassReactionBar;

