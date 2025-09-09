'use client';

import React from 'react';
import { createGlassStyle } from '../../core/mixins/glassMixins';
import { cn } from '@/design-system/utilsCore';
import { GlassButton } from '../button/GlassButton';
import { OptimizedGlass } from '../../primitives';

export interface GlassTagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
  className?: string;
}

export function GlassTagInput({ value, onChange, placeholder = 'Add tag…', suggestions = [], className }: GlassTagInputProps) {
  const [input, setInput] = React.useState('');
  const add = (t: string) => {
    const tag = t.trim();
    if (!tag) return;
    if (!value.includes(tag)) onChange([...value, tag]);
    setInput('');
  };
  const remove = (tag: string) => onChange(value.filter(v => v !== tag));

  return (
    <OptimizedGlass elevation={'level1'} className={cn('rounded-xl p-2 flex flex-wrap gap-2', className)}>
      {value.map((t) => (
        <span key={t} className="inline-flex items-center gap-1 px-2 py-1 text-sm rounded-lg bg-white/10 border border-white/20">
          {t}
          <button onClick={() => remove(t)} className="text-white/60 hover:text-white">×</button>
        </span>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            add(input);
          } else if (e.key === 'Backspace' && !input && value.length) {
            remove(value[value.length - 1]);
          }
        }}
        placeholder={placeholder}
        className="flex-1 min-w-[120px] bg-transparent outline-none text-sm placeholder:text-white/50"
      />
      {!!suggestions.length && input && (
        <div className="w-full -mb-1">
          <div className="mt-1 rounded-lg border border-white/15 bg-black/20 p-1">
            {suggestions.filter(s => s.toLowerCase().includes(input.toLowerCase())).slice(0,6).map(s => (
              <GlassButton key={s} variant="ghost" size="sm" className="w-full justify-start" onClick={() => add(s)}>
                {s}
              </GlassButton>
            ))}
          </div>
        </div>
      )}
    </OptimizedGlass>
  );
}

export default GlassTagInput;

