'use client';

import React from 'react';
import { cn } from '@/design-system/utils';
import { GlassButton } from '../button/GlassButton';
import { OptimizedGlass } from '../../primitives/glass/OptimizedGlass';

export interface SegmentedItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface GlassSegmentedControlProps {
  items: SegmentedItem[];
  value: string;
  onChange: (id: string) => void;
  size?: 'sm' | 'md' | 'lg';
  condensed?: boolean;
  className?: string;
}

export function GlassSegmentedControl({ items, value, onChange, size = 'md', condensed = false, className }: GlassSegmentedControlProps) {
  const sizes = {
    sm: 'h-8 text-xs',
    md: 'h-9 text-sm',
    lg: 'h-10 text-base'
  };

  return (
    <OptimizedGlass
      elevation={1}
      className={cn(
        // Avoid clipping child button content (icons/text) against rounded corners
        'inline-flex items-center rounded-xl p-1 gap-1 overflow-visible',
        className
      )}
    >
      {items.map(it => (
        <GlassButton
          key={it.id}
          variant={it.id === value ? 'primary' : 'secondary'}
          size={size}
          disabled={it.disabled}
          className={cn(
            // Prevent glyphs from being visually cropped on some GPUs/Safari when glass effects are active
            'rounded-md overflow-visible whitespace-nowrap leading-normal',
            sizes[size],
            condensed && 'px-2'
          )}
          onClick={() => !it.disabled && onChange(it.id)}
          aria-pressed={it.id === value}
        >
          {it.icon && <span className="mr-2 inline-flex">{it.icon}</span>}
          {!condensed && it.label}
        </GlassButton>
      ))}
    </OptimizedGlass>
  );
}

export default GlassSegmentedControl;
