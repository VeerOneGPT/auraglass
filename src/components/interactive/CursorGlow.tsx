import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface CursorGlowProps {
  size?: number; // diameter in px
  intensity?: number; // 0..1
  color?: string; // CSS color for glow
  opacity?: number; // 0..1
  global?: boolean; // fixed overlay
}

/**
 * CursorGlow
 * Renders a pointer-following radial glow. Pointer-events: none.
 * Uses rAF to throttle updates. Respects reduced motion.
 */
export const CursorGlow: React.FC<CursorGlowProps> = ({
  size = 280,
  intensity = 0.6,
  color = '#ffffff',
  opacity = 0.18,
  global = true,
}) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const frame = useRef<number | null>(null);
  const latest = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    if (reduce) return; // respect reduced motion
    const handleMove = (e: MouseEvent) => {
      latest.current = { x: e.clientX, y: e.clientY };
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = null;
        const el = ref.current; if (!el) return;
        const { x, y } = latest.current;
        el.style.background = `radial-gradient(${size}px ${size}px at ${x}px ${y}px, ${color}${toAlpha(opacity)}, transparent ${Math.round(
          100 * (1 - opacity)
        )}%)`;
      });
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handleMove);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [size, color, opacity, reduce]);

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: global ? 'fixed' : 'absolute',
        inset: 0,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
        filter: `blur(${Math.round(size / 16)}px) saturate(${100 + intensity * 60}%)`,
        zIndex: 2,
      }}
    />
  );
};

function toAlpha(opacity: number) {
  const a = Math.max(0, Math.min(1, opacity));
  const hex = Math.round(a * 255)
    .toString(16)
    .padStart(2, '0');
  return hex.length === 2 ? hex : '2d';
}

export default CursorGlow;

