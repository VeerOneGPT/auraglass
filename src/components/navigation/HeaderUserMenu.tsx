'use client';

import React, { useState } from 'react';
import { cn } from '@/design-system/utilsCore';
import { GlassPopover } from '../modal/GlassPopover';
import { GlassAvatar } from '../data-display/GlassAvatar';
import { ChevronRight } from 'lucide-react';

import { createGlassStyle } from '../../core/mixins/glassMixins';
export interface HeaderUserMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'default' | 'danger';
  separator?: boolean;
}

export interface HeaderUserInfo {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  status?: 'online' | 'away' | 'busy' | 'offline';
}

export interface HeaderUserMenuProps {
  user: HeaderUserInfo;
  items: HeaderUserMenuItem[];
  className?: string;

  /** Glass surface intent */
  intent?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  
  /** Glass surface elevation */
  elevation?: 'level1' | 'level2' | 'level3' | 'level4';
  
  /** Performance tier */
  tier?: 'low' | 'medium' | 'high';
}

export function HeaderUserMenu({ user, items, className }: HeaderUserMenuProps) {
  const [open, setOpen] = useState(false);

  const statusColor =
    user.status === 'online' ? 'bg-green-500' :
    user.status === 'away' ? 'bg-yellow-500' :
    user.status === 'busy' ? 'bg-red-500' : 'bg-gray-500';

  return (
    <GlassPopover
      open={open}
      onOpenChange={setOpen}
      trigger="click"
      placement="bottom-end"
      appearance="glass"
      contentClassName="w-80 p-1 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(2,8,23,0.55)] rounded-2xl"
      content={
        <div className="w-80">
          {/* User header */}
          <div className="px-4 pt-4">
            <div
              className="flex items-center gap-3 px-3 py-3 bg-gradient-to-br from-white/6 via-white/3 to-transparent border border-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
              style={{ borderRadius: 18 }}
            >
              <GlassAvatar size="md" src={user.avatar} fallbackText={user.name} showStatus={!!user.status} status={user.status as any} />
              <div className="min-w-0">
                <div className="font-semibold text-white truncate">{user.name}</div>
                {user.email && (
                  <div className="text-xs text-white/80 truncate">{user.email}</div>
                )}
                {user.status && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className={cn('inline-block w-2 h-2 rounded-full', statusColor)} />
                    <span className="text-xs text-white/70 capitalize">{user.status}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Menu items */}
          <div className="p-2">
            {items.map((item, idx) => (
              <React.Fragment key={item?.id}>
                {item?.separator && idx > 0 && (
                  <div className="my-2 border-t border-white/10" />
                )}
                {item?.href ? (
                  <a
                    href={item?.href}
                    className={cn(
                      'group w-full flex items-center justify-between gap-3 rounded-[14px] px-3 py-2.5 transition-colors',
                      'text-white/90 hover:text-white hover:bg-white/10'
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <span className="inline-flex items-center gap-3 truncate">
                      {item?.icon && <span className="text-white/80">{item?.icon}</span>}
                      <span className="truncate">{item?.label}</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white/70" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => { item?.onClick?.(); setOpen(false); }}
                    className={cn(
                      'w-full flex items-center justify-between gap-3 rounded-[14px] px-3 py-2.5 transition-colors',
                      item?.variant === 'danger'
                        ? 'text-red-300 hover:bg-red-500/10'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    )}
                  >
                    <span className="inline-flex items-center gap-3 truncate">
                      {item?.icon && (
                        <span className={cn(item?.variant === 'danger' ? 'text-red-400' : 'text-white/80')}>{item?.icon}</span>
                      )}
                      <span className="truncate">{item?.label}</span>
                    </span>
                    {item?.variant !== 'danger' && (
                      <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white/70" />
                    )}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      }
    >
      <button
        type="button"
        className={cn(
          'flex items-center gap-2 px-1.5 py-1 rounded-full',
          'bg-transparent text-foreground hover:bg-white/10 focus:outline-none',
          className
        )}
        aria-label={user.name}
      >
        <GlassAvatar size="sm" src={user.avatar} fallbackText={user.name} showStatus={!!user.status} status={user.status as any} />
      </button>
    </GlassPopover>
  );
}
