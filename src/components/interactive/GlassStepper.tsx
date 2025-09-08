'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/design-system/utilsCore';

export interface Step { id: string; label: string; optional?: boolean }
export interface GlassStepperProps { steps: Step[]; active: string; onChange?: (id:string)=>void; className?: string }

export function GlassStepper({ steps, active, onChange, className }: GlassStepperProps) {
  const lastActiveRef = useRef<string | null>(null);

  useEffect(() => {
    lastActiveRef.current = active;
  }, [active]);

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {steps.map((s, i) => {
        const isActive = s.id === active;
        const wasJustActivated = isActive && lastActiveRef.current !== active;
        return (
          <div key={s.id} className="flex items-center gap-3">
            <button
              type="button"
              aria-current={isActive ? 'step' : undefined}
              className={cn(
                'px-3 py-1.5 rounded-full text-sm transition-all duration-200',
                'ring-1 ring-white/10 bg-glass-fill hover:-translate-y-0.5 glass-press glass-ripple',
                isActive ? 'text-white' : 'text-white/80',
              )}
              onClick={() => onChange?.(s.id)}
            >
              <span className={cn('relative', wasJustActivated && 'glass-pulse-ring')}>
                {s.label}
              </span>
            </button>
            {i < steps.length - 1 && <div className="w-8 h-px bg-white/15" />}
          </div>
        );
      })}
    </div>
  );
}

export default GlassStepper;
