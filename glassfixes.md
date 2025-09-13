# AuraGlass Glass Fixes — Batches 1 & 2 (Plan + Applied)

Date: 2025-09-13

This document captures the design-system changes planned and applied in the first two remediation batches (100 lowest-scoring components), plus the guardrails we introduced to eliminate drift. It also serves as the checklist we continue to apply in subsequent batches.

## Goals
- One universal glass aesthetic: typography, spacing, surfaces, elevation, motion, and a11y.
- Zero inline glass styles (rgba/blur/shadow/gradient literals).
- Zero raw utility drift (tailwind-like classes); all layout/spacing/typography via glass tokens/utilities.
- Focus-visible and WCAG AA contrast across light/dark.

## Enforcement (added)
- ESLint rules (auraglass plugin):
  - `no-inline-glass` (error): blocks `backdrop-filter`, box-shadow literals, and glassy rgba/gradient backgrounds.
  - `require-glass-tokens` (warn): nudges token usage.
  - `no-raw-tailwind` (warn → will promote to error after cleanup): flags raw utility classes; suggests glass-* or tokens.
  - `no-inline-style-attr` (warn → will promote to error): flags JSX `style={{}}`—use tokens, utilities, or mixins.
- Scope relaxations only for tests/stories/low-level probes.

## Token & Utility System (added/standardized)
- Fluid typography with clamp() in `src/styles/tokens.css` and global h1–h6/p defaults in `src/styles/typography.css`.
- Typography component applies glass text tokens per variant.
- New/expanded glass utilities in `src/styles/glass.css`:
  - Layout/display: `glass-flex`, `glass-inline-flex`, `glass-grid`, `glass-inline-grid`, `glass-block`.
  - Alignment/position: `glass-items-*`, `glass-justify-*`, `glass-text-center`, `glass-text-left`, `glass-absolute`, `glass-fixed`, `glass-cursor-pointer`.
  - Sizing: `glass-w-{1,2,3,4,5,6,8,10,12,16,20,32,80}`, `glass-h-{1,2,3,4,5,6,8,10,12,16}`, `glass-w-full`, `glass-h-full`, `glass-min-w-0`, `glass-min-h-0`.
  - Overflow/truncation: `glass-overflow-auto`, `glass-overflow-y-auto`, `glass-truncate`.
  - Spacing helpers: `glass-space-y-{2,3,4}`, `glass-mb-{1,2,3,4}`, `glass-mt-0-5`.
  - Typography helpers: `glass-text-{xs..6xl}`, `glass-font-{medium,semibold}`.
  - Surfaces/gradients/opacity: `glass-gradient-primary`, `glass-surface-overlay`, `glass-bg-transparent`, `glass-opacity-90`.
- Codemod mappings (scripts/codemods/tw-to-glass.js):
  - Converts common raw classes to glass-* equivalents (spacing, radius, text size, overflow, display, position, gradients, sizing, opacity, cursor, alignment, sr-only, etc.).

## Visual/A11y Validation (added)
- Playwright AA contrast test (light/dark) for text tokens in `tests/visual/accessibility/contrast.spec.ts`.
- Existing visual regression suite retained.

## Component Remediations (Batches 1 & 2)
- Safe automated tokenization applied to the first 100 offenders (15 files changed in code in Batches 1–2; many converted via codemod):
  - Inline rgba backgrounds → `var(--glass-bg-*)`
  - Inline borders → `var(--glass-border-*)`
  - Inline `backdrop-filter: blur(...)` → `var(--glass-backdrop-blur)`
  - Inline box-shadows → `var(--glass-elev-2)` (conservative default)
  - Replaced story-only layout classes with glass-* where feasible
- Example explicit refactors:
  - `src/components/cookie-consent/GlobalCookieConsent.tsx`: surfaces/border/backdrop/shadow tokenized; kept dynamic transform styles only.
  - `src/components/navigation/GlassTabBar.tsx`: selection indicator uses `glass-surface-subtle` + `glass-border-subtle` + `glass-overlay-specular` instead of inline blur/rgba.

## Still To Apply (within Batches 1 & 2 scope)
- Remove remaining `style={{}}` in remediated files where properties are static; keep only genuinely dynamic transforms.
- Ensure `GlassFocusRing` or `useGlassFocus` (or `.glass-focus`) on all interactive controls.
- Add aria-* roles/labels on custom buttons, menus, and dialog controls.
- Normalize gradients to `glass-gradient-*` tokens when visuals intend branded fills.
- Convert any lingering raw utilities detected in leftovers report to glass-* (covered by newly added utilities).

## Metrics After Batch 2
- Audited 340 files (covers 317 components + internals).
- Pass: 101, Near: 160, Needs work: 79 (down from 101 pre-batch2).

## Next Steps (Batch 3 and beyond)
- Target next 50 lowest-score components (see Batch 3 analysis in the chat/report):
  - Priorities per issue counts in Batch 3 set: inline-style-attr (44), inline-glass (25), raw-utilities (32), focus (36), a11y (22), missing-tokens (7).
  - Apply tokenization and remove style attrs where static; add focus-visible and aria-*; keep dynamic transforms only.
- After Batch 3: promote `no-raw-tailwind` and `no-inline-style-attr` from warn → error for full lock.

