'use client';

import React from 'react';
import { createGlassStyle } from '../../core/mixins/glassMixins';
import { cn } from '@/lib/utilsComprehensive';

export interface AvatarItem { name: string; avatar?: string; status?: 'online'|'away'|'busy'|'offline' }
export interface GlassAvatarGroupProps { users: AvatarItem[]; max?: number; size?: 'sm'|'md'|'lg'; className?: string }

export function GlassAvatarGroup({ users, max = 5, size = 'md', className }: GlassAvatarGroupProps) {
  const s = size === 'sm' ? 24 : size === 'lg' ? 40 : 32;
  const overlap = size === 'sm' ? -8 : size === 'lg' ? -12 : -10;
  const shown = users.slice(0, max);
  const rest = users.length - shown.length;
  return (
    <div className={cn('flex items-center', className)}>
      {shown.map((u, i) => (
        <div key={u.name+i} className="relative" style={{ marginLeft: i===0?0:overlap }}>
          {u.avatar ? (
            <img src={u.avatar} alt={u.name} width={s} height={s} className="rounded-full object-cover border border-white/20" />
          ) : (
            <div className="rounded-full bg-white/10 border border-white/20 flex items-center justify-center" style={{ width: s, height: s }}>
              <span className="text-xs text-white/80">{u.name.charAt(0)}</span>
            </div>
          )}
          {u.status && <span className={cn('absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background',
            u.status==='online'?'bg-green-500':u.status==='away'?'bg-yellow-500':u.status==='busy'?'bg-red-500':'bg-slate-500')} />}
        </div>
      ))}
      {rest>0 && (
        <div className="rounded-full bg-white/10 border border-white/20 flex items-center justify-center ml-[-10px]" style={{ width: s, height: s }}>
          <span className="text-xs text-white/80">+{rest}</span>
        </div>
      )}
    </div>
  );
}

export default GlassAvatarGroup;

