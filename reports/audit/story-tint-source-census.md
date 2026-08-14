# Story presentation tint source census

Date: 2026-08-13

## Whole-field criterion

A story fails this census when a non-semantic preview frame, work area, panel, or
material stage occupies a substantial part of the viewport and uses blue, cyan,
mint, purple, amber, or navy paint strongly enough that the field reads colored
at a glance. This includes low-alpha radial/linear gradients, tinted shadows,
and blue/mint substitutes for white frost. Tiny status marks, chart encodings,
media artwork, authored color swatches, and explicit dark/high-contrast
certification examples are not treated as presentation corruption.

## Remediated story sources and exact Storybook IDs

- `src/stories/AuraGlass33ThemeShowcase.stories.tsx`
  - `3-3-theme-preset-showcase--domain-presets`
- `src/stories/CuratedComponentGuide.stories.tsx`
  - `start-here-guide--guide`
- `src/lib/GlassLocalizationProvider.stories.tsx`
  - `foundations-tokens-glass-localization-provider--default`
  - The same neutral frame also covers Date Operations, Date Parsing, Multiple
    Components, and With Calendar.
- `src/utils/errorBoundary.stories.tsx`
  - `effects-advanced-error-boundary--default`
  - The shared neutral frame covers all seven Error Boundary variants.
- `src/components/primitives/LiquidGlassMaterial.stories.tsx`
  - `foundations-liquid-glass-primitives-liquid-glass-material--default`
  - The neutral stage covers all nine material stories. The intentionally named
    Colorful Tints story may retain color inside its mounted sample only.
- `src/components/primitives/LiquidGlassEffectGroup.stories.tsx`
  - `foundations-liquid-glass-primitives-liquid-glass-effect-group--grouped-buttons`
- `src/components/templates/showcase/ComprehensiveShowcase.stories.tsx`
  - `showcases-comprehensive-showcase--complete`
- `src/components/navigation/LiquidGlassToolbar.stories.tsx`
  - `navigation-liquid-glass-toolbar--default`
- `src/components/navigation/LiquidGlassInsetSidebar.stories.tsx`
  - `navigation-liquid-glass-inset-sidebar--default`
- `src/components/navigation/LiquidGlassInspectorPanel.stories.tsx`
  - `navigation-liquid-glass-inspector-panel--default`
- `src/components/navigation/LiquidGlassSegmentedControl.stories.tsx`
  - `navigation-liquid-glass-segmented-control--default`
- `src/components/interactive/LiquidGlassCommandSurface.stories.tsx`
  - `effects-advanced-liquid-glass-command-surface--default`

## Deliberately excluded source matches

- `src/stories/AppChromeVisualBaseline.stories.tsx`,
  `src/stories/GlassAuditCoverage.stories.tsx`, and
  `src/stories/IconsGallery.stories.tsx`: explicit dark/media certification
  canvases rather than light preview framing.
- `src/components/showcase/LiquidGlassStateMatrix.stories.tsx`: the story is an
  explicit cross-mode state matrix whose dark and chromatic samples are the
  content under test.
- Chart series, color-picker swatches, ecommerce status art, image/video SVG
  fixtures, heat-map marks, and small badges: semantic or media content rather
  than a broad story field.
- AI, data-table, accessibility, modal, and atmospheric component sources that
  were under dedicated repair ownership during the census were not overwritten
  by this presentation pass.

## Proof

- 12 exact remediated story IDs were rendered at desktop 1440x900, tablet
  768x1024, mobile 390x844, and narrow 320x720: **48/48 passed**.
- Every proof had substantive text, zero horizontal document overflow, zero
  Storybook render errors, and zero page errors.
- Screenshots and measurements are in `reports/audit/story-tint-census-proof/`.
- `npm run audit:storybook:presentation`: passed across 462 story/presentation
  files.
- `npx tsc --noEmit --pretty false`: passed.
- Scoped `git diff --check`: passed.
