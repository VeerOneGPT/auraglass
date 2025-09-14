'use client';

import React, { forwardRef } from 'react';
import { cn } from '../../lib/utilsComprehensive';
import { useA11yId } from '../../utils/a11y';

export interface AvatarItem { 
  name: string; 
  avatar?: string; 
  status?: 'online'|'away'|'busy'|'offline' 
}

export interface GlassAvatarGroupProps { 
  users: AvatarItem[]; 
  max?: number; 
  size?: 'sm'|'md'|'lg'; 
  className?: string;
  /** Custom ID */
  id?: string;
  /** Custom ARIA label */
  'aria-label'?: string;
}

export const GlassAvatarGroup = forwardRef<HTMLDivElement, GlassAvatarGroupProps>(({ 
  users, 
  max = 5, 
  size = 'md', 
  className,
  id,
  'aria-label': ariaLabel,
  ...props 
}, ref) => {
  const componentId = useA11yId(id || 'avatar-group');
  const s = size === 'sm' ? 24 : size === 'lg' ? 40 : 32;
  const overlap = size === 'sm' ? -8 : size === 'lg' ? -12 : -10;
  const shown = users.slice(0, max);
  const rest = users.length - shown.length;
  
  const defaultAriaLabel = `Group of ${users.length} users${rest > 0 ? `, showing ${shown.length} of ${users.length}` : ''}`;
  return (
    <div 
      ref={ref}
      id={componentId}
      className={cn('flex items-center', className)}
      role="group"
      aria-label={ariaLabel || defaultAriaLabel}
      {...props}
    >
      {shown.map((u, i) => (
        <div 
          key={u.name+i} 
          className="glass-glass-glass-relative" 
          style={{ marginLeft: i===0?0:overlap }}
          role="img"
          aria-label={`${u.name}${u.status ? ` (${u.status})` : ''}`}
        >
          {u.avatar ? (
            <img src={u.avatar} alt={u.name} width={s} height={s} className="glass-radius-full object-cover glass-glass-glass-border glass-glass-glass-border-white/20" />
          ) : (
            <div className="glass-radius-full glass-surface-subtle/10 glass-glass-glass-border glass-glass-glass-border-white/20 glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center" style={{ width: s, height: s }}>
              <span className="glass-glass-glass-text-xs glass-glass-glass-text-primary/80" aria-hidden="true">{u.name.charAt(0)}</span>
            </div>
          )}
          {u.status && (
            <span 
              className={cn(
                'absolute -bottom-0.5 -right-0.5 w-3 h-3 glass-radius-full border-2 border-background',
                u.status==='online' ? 'bg-green-500' : 
                u.status==='away' ? 'bg-yellow-500' : 
                u.status==='busy' ? 'bg-red-500' : 'bg-slate-500'
              )}
              aria-label={`Status: ${u.status}`}
              role="img"
            />
          )}
        </div>
      ))}
      {rest>0 && (
        <div 
          className="glass-radius-full glass-surface-subtle/10 glass-glass-glass-border glass-glass-glass-border-white/20 glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center ml-[-10px]" 
          style={{ width: s, height: s }}
          role="img"
          aria-label={`${rest} more users`}
        >
          <span className="glass-glass-glass-text-xs glass-glass-glass-text-primary/80" aria-hidden="true">+{rest}</span>
        </div>
      )}
    </div>
  );
});

GlassAvatarGroup.displayName = 'GlassAvatarGroup';

export default GlassAvatarGroup;

