'use client';

import React from 'react';
import { cn } from '../../lib/utilsComprehensive';

export interface CoachmarkStep { id: string; content: React.ReactNode }
export interface GlassCoachmarksProps { steps: CoachmarkStep[]; current: number; onNext: ()=>void; onPrev: ()=>void; onClose: ()=>void }

export function GlassCoachmarks({ steps, current, onNext, onPrev, onClose }: GlassCoachmarksProps) {
  const step = steps[current];
  if (!step) return null;
  return (
    <div className="glass-glass-fixed glass-glass-inset-0 z-[2000]">
      <div className="glass-glass-absolute glass-glass-inset-0 glass-surface-dark/60" onClick={onClose} />
      <div className="glass-glass-absolute inset-x-0 bottom-10 mx-auto glass-glass-w-full max-w-xl">
        <div className="glass-radius-2xl glass-surface-subtle/10 glass-glass-border glass-glass-border-white/20 glass-glass-p-4 glass-glass-mx-4 glass-glass-text-primary">
          <div className="glass-glass-mb-3">{step.content}</div>
          <div className="glass-glass-flex glass-glass-justify-between">
            <button className="glass-glass-px-3 glass-glass-py-1 glass-radius-md glass-surface-subtle/10" onClick={onPrev} disabled={current===0}>Back</button>
            <div className="glass-glass-gap-2">
              <button className="glass-glass-px-3 glass-glass-py-1 glass-radius-md glass-surface-subtle/10" onClick={onClose}>Close</button>
              <button className="glass-glass-px-3 glass-glass-py-1 glass-radius-md glass-surface-blue glass-glass-text-primary" onClick={onNext}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GlassCoachmarks;

