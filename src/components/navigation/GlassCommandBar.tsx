'use client';

import React from 'react';
import { cn } from '@/design-system/utils';
import { OptimizedGlass } from '../../primitives/glass/OptimizedGlass';

export interface CommandItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onSelect?: () => void;
  shortcut?: string;
  disabled?: boolean;
}

export interface GlassCommandBarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: CommandItem[];
  position?: 'top' | 'bottom';
}

export function GlassCommandBar({ items, position = 'bottom', className, ...rest }: GlassCommandBarProps) {
  return (
    <div className={cn('w-full', position === 'top' ? 'mt-2' : 'mb-2')}>
      <OptimizedGlass
        elevation={2}
        className={cn(
          // Let child buttons render without being clipped by the glass container rounding
          'rounded-xl px-2 py-1 flex flex-wrap gap-1 overflow-visible',
          className
        )}
        {...rest}
      >
        {items.map((it) => (
          <button
            key={it.id}
            disabled={it.disabled}
            onClick={it.onSelect}
            className={cn(
              // Avoid text cropping and keep shape consistent
              'px-3 py-1 rounded-md text-sm text-white/90 hover:bg-white/10 border border-white/10 whitespace-nowrap leading-normal',
              it.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <span className="inline-flex items-center gap-2">
              {it.icon}
              {it.label}
              {it.shortcut && (
                <kbd className="ml-1 text-xs px-1 py-0.5 rounded bg-white/10 border border-white/15">{it.shortcut}</kbd>
              )}
            </span>
          </button>
        ))}
      </OptimizedGlass>
    </div>
  );
}

export default GlassCommandBar;
