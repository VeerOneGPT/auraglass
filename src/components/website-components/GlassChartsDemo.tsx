import React from 'react';
import { cn } from '@/lib/utils';

// Localized semantic colors to avoid cross-package imports
const semanticColors = {
  chart: {
    primary: '#60A5FA',    // brand blue
    secondary: '#8B5CF6',  // brand purple
    senary: '#22D3EE',     // cyan-ish for area fill
  }
} as const;

// Small collection of SVG defs + helpers to make Recharts look like the admin portal charts
// without pulling in a chart layer from there. These are composable within any Recharts Chart.

export function GlassDefs({ id }: { id: string }) {
  const grad = `${id}-grad`;
  const area = `${id}-area`;
  const glow = `${id}-glow`;
  const sweep = `${id}-sweep`;
  const primary = semanticColors.chart.primary;
  const secondary = semanticColors.chart.secondary;
  const areaTop = semanticColors.chart.senary; // cyan-ish top
  return (
    <defs>
      {/* Brand stroke gradient */}
      <linearGradient id={grad} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={primary} />
        <stop offset="100%" stopColor={secondary} />
      </linearGradient>
      {/* Brand area fill */}
      <linearGradient id={area} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={areaTop} stopOpacity={0.38} />
        <stop offset="100%" stopColor={areaTop} stopOpacity={0.06} />
      </linearGradient>
      {/* Moving sweep highlight for bars/lines (used with <animate> on x) */}
      <linearGradient id={sweep} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#fff" stopOpacity={0} />
        <stop offset="50%" stopColor="#fff" stopOpacity={0.35} />
        <stop offset="100%" stopColor="#fff" stopOpacity={0} />
      </linearGradient>
      {/* Soft glow around strokes/points */}
      <filter id={glow} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

export const chartGlass = {
  grid: 'rgba(255,255,255,0.08)',
  axis: 'rgba(255,255,255,0.25)',
  tick: { fill: 'rgba(255,255,255,0.88)', fontSize: 13 },
  yTick: { fill: 'rgba(255,255,255,0.88)', fontSize: 13 },
  label: (text: string) => ({ value: text, fill: 'rgba(255,255,255,0.8)', fontSize: 14 }),
  tooltip: {
    cursor: { stroke: 'rgba(255,255,255,0.12)' },
    contentStyle: {
      background: 'rgba(14,17,24,0.95)',
      border: '1px solid ${glassStyles.borderColor || "rgba(255, 255, 255, 0.15)"}',
      borderRadius: 10,
      color: '#fff',
    } as React.CSSProperties,
    itemStyle: { color: '#fff' } as React.CSSProperties,
    labelStyle: { color: 'rgba(255,255,255,0.85)' } as React.CSSProperties,
  },
  brandGrad: (base: string) => `url(#${base}-grad)`,
  brandArea: (base: string) => `url(#${base}-area)`,
  glow: (base: string) => `url(#${base}-glow)`,
  sweep: (base: string) => `url(#${base}-sweep)`,
  // Subtle, neutral competitor palette (less saturated)
  comp: ['#475569', '#3A4756', '#2C3947']
};

// Standardized axis and layout tokens for Recharts demos
export const axisTokens = {
  margin: { top: 12, right: 16, bottom: 24, left: 44 },
  tickMargin: 8,
  xLabelDy: 10,
  yLabelDx: -10,
  tickFontSize: 13,
};

// GlassChartsDemo Component
export interface GlassChartsDemoProps {
  className?: string;
  children?: React.ReactNode;
}

export function GlassChartsDemo({ className, children }: GlassChartsDemoProps) {
  return (
    <div className={className}>
      <h3>Glass Charts Demo</h3>
      {children}
    </div>
  );
}
