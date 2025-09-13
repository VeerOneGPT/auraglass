# Universal Glass Audit

Generated: 2025-09-13T07:10:25.335Z

- Files audited: 340
- Pass (>=95): 101
- Near (85–94): 162
- Needs work (<85): 77
- Issue counts: missing-tokens:79, raw-utilities:183, inline-style-attr:201, focus:167, inline-glass:45, a11y:117, typography:3

## Top 25 Needing Attention
- 55/100 — src/components/charts/GlassDataChart.tsx — Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)
- 58/100 — src/components/cookie-consent/GlobalCookieConsent.tsx — Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus); Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)
- 62/100 — src/components/speed-dial/SpeedDial.tsx — Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus); Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)
- 64/100 — src/components/advanced/BrandColorIntegration.tsx — Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)
- 65/100 — src/components/advanced/GlassAutoComposer.tsx — Replace raw utilities with glass-* equivalents or tokens; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)
- 66/100 — src/components/immersive/GlassHologram.tsx — Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)
- 67/100 — src/components/advanced/GlassProgressiveEnhancement.tsx — Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)
- 69/100 — src/components/experiential/GlassMoodRing.tsx — Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)
- 70/100 — src/components/charts/GlassChart.tsx — Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)
- 70/100 — src/components/image-list/ImageListItemBar.tsx — Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)
- 70/100 — src/components/input/GlassMultiSelect.tsx — Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)
- 70/100 — src/components/speed-dial/SpeedDialAction.tsx — Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)
- 70/100 — src/components/website-components/GlassWipeSlider.tsx — Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities
- 71/100 — src/components/cms/GlassCanvas.tsx — Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)
- 71/100 — src/components/website-components/GlassPrismComparison.tsx — Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)
- 72/100 — src/components/cookie-consent/CookieConsent.tsx — Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)
- 73/100 — src/components/data-display/GlassDataGrid.tsx — Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)
- 74/100 — src/components/advanced/GlassTrophyCase.tsx — Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities
- 74/100 — src/components/layouts/GlassMasonryGrid.tsx — Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)
- 75/100 — src/components/advanced/GlassEyeTracking.tsx — Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)
- 75/100 — src/components/advanced/GlassSpatialAudio.tsx — Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)
- 75/100 — src/components/data-display/GlassSkeletonLoader.tsx — Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities
- 75/100 — src/components/houdini/HoudiniGlassProvider.tsx — Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities
- 75/100 — src/components/image-list/ImageList.tsx — Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities
- 75/100 — src/components/quantum/GlassSuperpositionalMenu.tsx — Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

## File-by-File

### src/components/GlassErrorBoundary.tsx
- Score: 100/100
- Issues: none

### src/components/accessibility/AccessibilityProvider.tsx
- Score: 95/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/accessibility/GlassA11y.tsx
- Score: 99/100
- WARN raw-utilities: w-3, h-3
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/accessibility/GlassFocusIndicators.tsx
- Score: 89/100
- WARN raw-utilities: max-w-sm
- WARN inline-style-attr (x2)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/advanced/BrandColorIntegration.tsx
- Score: 64/100
- WARN raw-utilities: w-2, h-2
- WARN inline-style-attr (x5)
- ERROR inline-glass (x3)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/advanced/GlassAchievementSystem.tsx
- Score: 85/100
- WARN raw-utilities: w-80, overflow-hidden, text-amber-400, w-1, h-1, bg-amber-400, h-2, bg-gray-700
- WARN inline-style-attr (x2)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/advanced/GlassAutoComposer.tsx
- Score: 65/100
- WARN raw-utilities: min-h-screen, max-w-7xl, mx-auto, space-y-6, md:glass-glass-glass-grid-cols-2, max-w-md, mb-6, placeholder-opacity-50, overflow-hidden, max-w-2xl
- ERROR inline-glass (x9)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/advanced/GlassBiometricAdaptation.tsx
- Score: 83/100
- WARN raw-utilities: w-2, h-2, bg-gray-700, overflow-hidden, pt-4, bg-gray-800/50, w-1
- WARN inline-style-attr (x3)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/advanced/GlassContextAware.tsx
- Score: 92/100
- WARN inline-style-attr (x1)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/advanced/GlassContextualEngine.tsx
- Score: 94/100
- WARN raw-utilities: w-3, h-3
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/advanced/GlassEngine.tsx
- Score: 89/100
- WARN raw-utilities: space-y-6, md:glass-glass-glass-grid-cols-4, md:glass-glass-glass-grid-cols-3, md:glass-glass-glass-grid-cols-2, mt-4, space-x-2
- WARN inline-style-attr (x1)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/advanced/GlassEyeTracking.tsx
- Score: 75/100
- WARN inline-style-attr (x5)
- ERROR inline-glass (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/advanced/GlassFoldableSupport.tsx
- Score: 86/100
- WARN inline-style-attr (x3)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/advanced/GlassLiquidTransition.tsx
- Score: 85/100
- WARN raw-utilities: w-32, h-32
- WARN inline-style-attr (x3)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/advanced/GlassLiveCursorPresence.tsx
- Score: 90/100
- WARN raw-utilities: w-3, h-3
- WARN inline-style-attr (x3)
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/advanced/GlassMagneticCursor.tsx
- Score: 79/100
- WARN raw-utilities: w-20, h-20
- WARN inline-style-attr (x6)
- ERROR inline-glass (x1)
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities

### src/components/advanced/GlassMeshGradient.tsx
- Score: 92/100
- WARN inline-style-attr (x1)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/advanced/GlassMetaEngine.tsx
- Score: 86/100
- WARN raw-utilities: w-1, h-1, w-3, h-3, bg-gray-700, h-2, w-2
- WARN inline-style-attr (x2)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/advanced/GlassNeuroSync.tsx
- Score: 78/100
- WARN raw-utilities: w-2, h-2, bg-gray-700, overflow-hidden, w-1
- WARN inline-style-attr (x5)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/advanced/GlassOrientationEffects.tsx
- Score: 80/100
- WARN inline-style-attr (x8)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/advanced/GlassParallaxLayers.tsx
- Score: 94/100
- WARN inline-style-attr (x2)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/advanced/GlassParticles.tsx
- Score: 95/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/advanced/GlassPerformanceOptimization.tsx
- Score: 85/100
- WARN inline-style-attr (x5)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/advanced/GlassPredictiveEngine.tsx
- Score: 90/100
- WARN raw-utilities: w-3, h-3, w-2, h-2
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/advanced/GlassProgressiveEnhancement.tsx
- Score: 67/100
- WARN inline-style-attr (x1)
- ERROR inline-glass (x13)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/advanced/GlassQuantumStates.tsx
- Score: 84/100
- WARN raw-utilities: w-20, h-2, bg-gray-700, overflow-hidden
- WARN inline-style-attr (x3)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/advanced/GlassReactions.tsx
- Score: 89/100
- WARN raw-utilities: overflow-hidden
- WARN inline-style-attr (x2)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/advanced/GlassSelfHealingSystem.tsx
- Score: 88/100
- WARN raw-utilities: w-3, h-3
- WARN inline-style-attr (x2)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/advanced/GlassSpatialAudio.tsx
- Score: 75/100
- WARN raw-utilities: overflow-hidden, h-px, w-px, w-2, h-2, w-3, h-3, bg-emerald-500, bg-amber-500, bg-pink-500
- WARN inline-style-attr (x5)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/advanced/GlassTrophyCase.tsx
- Score: 74/100
- WARN raw-utilities: h-2, overflow-hidden, w-3, h-3, mt-2, mb-8, mb-6, min-w-64, max-w-lg, text-purple-400
- WARN inline-style-attr (x8)
- ERROR inline-glass (x1)
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities

### src/components/advanced/GlassWebGLShader.tsx
- Score: 97/100
- WARN inline-style-attr (x1)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/advanced/IntelligentColorSystem.tsx
- Score: 80/100
- WARN inline-style-attr (x11)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/advanced/LiquidGlassGPU.tsx
- Score: 94/100
- WARN inline-style-attr (x2)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/ai/AIGlassThemeProvider.tsx
- Score: 95/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/ai/GlassDeepDreamGlass.tsx
- Score: 85/100
- WARN raw-utilities: space-x-2, space-x-4, mt-2, ml-2, pt-2, space-x-1, w-1, md:glass-glass-glass-grid-cols-2, h-2, w-2
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/ai/GlassGANGenerator.tsx
- Score: 87/100
- WARN raw-utilities: md:glass-glass-glass-grid-cols-2, space-x-2, text-green-300, bg-orange-500/20, text-orange-300, space-x-4, ml-2, h-2, space-x-1, w-2
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/ai/GlassGenerativeArt.tsx
- Score: 89/100
- WARN raw-utilities: space-x-2, md:glass-glass-glass-grid-cols-2, h-2, space-x-1, w-2, h-24, placeholder-white/50, space-x-4, md:glass-glass-glass-grid-cols-3, overflow-hidden
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/ai/GlassIntelligentFormBuilder.tsx
- Score: 84/100
- WARN raw-utilities: max-w-6xl, mx-auto, space-y-8, mb-6, mt-1, ml-auto, text-purple-600, space-y-1, w-1.5, h-1.5
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/ai/GlassLiveFilter.tsx
- Score: 91/100
- WARN raw-utilities: md:glass-glass-glass-grid-cols-3, space-x-2, mt-2, h-2, space-x-1, w-2, overflow-hidden, space-x-4, pt-4
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/ai/GlassMusicVisualizer.tsx
- Score: 94/100
- WARN raw-utilities: space-x-4, bg-gray-500, space-x-2, h-2, space-x-1, w-2, md:glass-glass-glass-grid-cols-2
- WARN inline-style-attr (x1)
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/ai/GlassStyleTransfer.tsx
- Score: 89/100
- WARN raw-utilities: md:glass-glass-glass-grid-cols-3, overflow-hidden, md:glass-glass-glass-grid-cols-2, h-2, space-x-6, space-x-2, space-x-1, w-2, mt-1, mx-auto
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/animations/AdvancedAnimations.tsx
- Score: 95/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/animations/GlassMotionController.tsx
- Score: 95/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/animations/GlassTransitions.tsx
- Score: 92/100
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/animations/OrganicAnimationEngine.tsx
- Score: 84/100
- WARN inline-style-attr (x2)
- ERROR inline-glass (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/ar/ARGlassEffects.tsx
- Score: 99/100
- WARN raw-utilities: max-w-xs, space-y-1
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/atmospheric/GlassAuroraDisplay.tsx
- Score: 96/100
- WARN raw-utilities: w-20, min-w-[3ch]
- WARN inline-style-attr (x1)
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/atmospheric/GlassBiomeSimulator.tsx
- Score: 97/100
- WARN raw-utilities: w-20
- WARN inline-style-attr (x1)
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/atmospheric/GlassNebulaClouds.tsx
- Score: 92/100
- WARN raw-utilities: w-20
- WARN inline-style-attr (x1)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/atmospheric/GlassWeatherGlass.tsx
- Score: 93/100
- WARN raw-utilities: w-20, min-w-[3ch]
- WARN inline-style-attr (x2)
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/backgrounds/AtmosphericBackground.tsx
- Score: 90/100
- ERROR inline-glass (x2)
- Suggestions: Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities

### src/components/backgrounds/GlassDynamicAtmosphere.tsx
- Score: 85/100
- ERROR inline-glass (x3)
- Suggestions: Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities

### src/components/backgrounds/ParticleBackground.tsx
- Score: 85/100
- ERROR inline-glass (x2)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/button/EnhancedGlassButton.tsx
- Score: 100/100
- INFO a11y — Consider aria-* attributes / roles for interactive elements

### src/components/button/GlassButton.tsx
- Score: 91/100
- WARN raw-utilities: ml-2, mr-2
- WARN inline-style-attr (x1)
- WARN typography — Raw text-* classes; use Typography or glass-text-* tokens
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Use <Typography /> or glass-text-* tokens for consistent type

### src/components/button/GlassFab.tsx
- Score: 100/100
- Issues: none

### src/components/button/GlassMagneticButton.tsx
- Score: 100/100
- Issues: none

### src/components/calendar/GlassCalendar.tsx
- Score: 92/100
- WARN raw-utilities: w-32, mt-6, pt-4, w-3, h-3
- WARN inline-style-attr (x2)
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/card/GlassCard.tsx
- Score: 96/100
- WARN raw-utilities: w-3/4, w-1/2
- WARN inline-style-attr (x1)
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/card/div.tsx
- Score: 95/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/card/glass-card-link.tsx
- Score: 95/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/card/patterns.tsx
- Score: 92/100
- WARN raw-utilities: overflow-hidden, h-48, items-baseline, bg-muted, mt-3, pt-4
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/charts/GlassAreaChart.tsx
- Score: 77/100
- WARN raw-utilities: w-48, h-64, w-20, overflow-visible, w-3, h-3, mt-6
- WARN inline-style-attr (x8)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/charts/GlassBarChart.tsx
- Score: 82/100
- WARN raw-utilities: w-48, h-64, w-20, overflow-visible, mt-6, w-3, h-3
- WARN inline-style-attr (x7)
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/charts/GlassChart.tsx
- Score: 70/100
- WARN inline-style-attr (x8)
- ERROR inline-glass (x2)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/charts/GlassDataChart.tsx
- Score: 55/100
- WARN inline-style-attr (x5)
- ERROR inline-glass (x5)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/charts/GlassLineChart.tsx
- Score: 76/100
- WARN raw-utilities: w-48, h-64, w-20, overflow-visible, mt-6, w-3, h-3, mb-6
- WARN inline-style-attr (x6)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/charts/GlassPieChart.tsx
- Score: 85/100
- WARN raw-utilities: w-48, w-64, h-64, w-20, overflow-visible, w-3, h-3
- WARN inline-style-attr (x4)
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/charts/ModularGlassDataChart.tsx
- Score: 80/100
- WARN inline-style-attr (x8)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/charts/components/AtmosphericEffects.tsx
- Score: 86/100
- WARN inline-style-attr (x3)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/charts/components/ChartAxis.tsx
- Score: 91/100
- WARN inline-style-attr (x3)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/charts/components/ChartContainer.tsx
- Score: 95/100
- ERROR inline-glass (x1)
- Suggestions: Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities

### src/components/charts/components/ChartFilters.tsx
- Score: 92/100
- WARN inline-style-attr (x1)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/charts/components/ChartGrid.tsx
- Score: 97/100
- WARN inline-style-attr (x1)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/charts/components/ChartLegend.tsx
- Score: 86/100
- WARN inline-style-attr (x3)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/charts/components/ChartRenderer.tsx
- Score: 89/100
- WARN inline-style-attr (x2)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/charts/components/ChartTooltip.tsx
- Score: 89/100
- WARN inline-style-attr (x2)
- ERROR inline-glass (x1)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities

### src/components/charts/components/KpiChart.tsx
- Score: 86/100
- WARN inline-style-attr (x3)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/cms/GlassCanvas.tsx
- Score: 71/100
- WARN raw-utilities: bg-yellow-50, bg-opacity-5, bg-blue-300, bg-green-100, mx-auto, min-h-96, mb-6, max-w-sm
- WARN inline-style-attr (x8)
- ERROR inline-glass (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/cms/GlassComponentPalette.tsx
- Score: 99/100
- WARN raw-utilities: mt-2, pl-4, pl-10
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/cms/GlassDragDropProvider.tsx
- Score: 90/100
- ERROR inline-glass (x2)
- Suggestions: Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities

### src/components/cms/GlassPageBuilder.tsx
- Score: 93/100
- WARN raw-utilities: w-px, bg-gray-300, overflow-hidden, bg-gray-800, text-gray-300
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/cms/GlassPageStructure.tsx
- Score: 88/100
- WARN raw-utilities: ml-1, bg-gray-200, text-orange-500, ml-2, pl-10, text-gray-300, text-purple-600, space-y-1
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/cms/GlassPropertyPanel.tsx
- Score: 92/100
- WARN raw-utilities: mr-2, mt-2, h-24, overflow-hidden, bg-blue-50, space-y-1, text-orange-600
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/collaboration/CollaborativeGlassWorkspace.tsx
- Score: 76/100
- WARN raw-utilities: mt-2, bg-slate-800, bg-gray-600, w-3, h-3, w-20, w-80, mt-8, mr-2, w-2
- WARN inline-style-attr (x3)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/collaboration/GlassCollaborationDashboard.tsx
- Score: 95/100
- WARN raw-utilities: bg-gray-300, w-80, max-h-96, overflow-hidden, space-y-1
- WARN inline-style-attr (x1)
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/collaboration/GlassCollaborationProvider.tsx
- Score: 95/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/collaboration/GlassCollaborativeComments.tsx
- Score: 77/100
- WARN raw-utilities: bg-blue-50, mt-2, ml-4, w-0, h-0, max-w-xs, bg-blue-100
- WARN inline-style-attr (x8)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/collaboration/GlassCollaborativeCursor.tsx
- Score: 94/100
- WARN inline-style-attr (x2)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/cookie-consent/CompactCookieNotice.tsx
- Score: 87/100
- WARN inline-style-attr (x1)
- ERROR inline-glass (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/cookie-consent/CookieConsent.tsx
- Score: 72/100
- WARN inline-style-attr (x1)
- ERROR inline-glass (x4)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/cookie-consent/GlobalCookieConsent.tsx
- Score: 58/100
- WARN inline-style-attr (x4)
- ERROR inline-glass (x4)
- INFO missing-tokens — No glass token usage detected
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus); Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/dashboard/GlassActivityFeed.tsx
- Score: 86/100
- WARN raw-utilities: w-48, w-3/4, h-3, w-1/2, pb-4, bg-glass-fill, pt-0, h-px, w-3, max-w-[100px]
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/dashboard/GlassChartWidget.tsx
- Score: 88/100
- WARN raw-utilities: pb-4, min-w-48, pt-0, pt-4
- WARN typography — Raw text-* classes; use Typography or glass-text-* tokens
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Use <Typography /> or glass-text-* tokens for consistent type; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/dashboard/GlassKPICard.tsx
- Score: 97/100
- WARN raw-utilities: w-24, w-32, w-20, pb-2, pt-0, items-baseline, premium-glow
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/dashboard/GlassMetricCard.tsx
- Score: 89/100
- WARN raw-utilities: w-24, w-32, w-20, h-2, pb-2, pt-0
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/dashboard/GlassStatCard.tsx
- Score: 88/100
- WARN raw-utilities: w-24, w-32, w-20, pb-2, pt-0, overflow-visible, h-2, overflow-hidden
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/data-display/GlassAccordion.tsx
- Score: 95/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/data-display/GlassAlert.tsx
- Score: 100/100
- Issues: none

### src/components/data-display/GlassAnimatedNumber.tsx
- Score: 92/100
- WARN inline-style-attr (x1)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/data-display/GlassAvatar.tsx
- Score: 99/100
- WARN raw-utilities: w-3, h-3
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/data-display/GlassBadge.tsx
- Score: 94/100
- WARN raw-utilities: w-2.5, h-2.5
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/data-display/GlassBadgeLine.tsx
- Score: 100/100
- Issues: none

### src/components/data-display/GlassChip.tsx
- Score: 95/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/data-display/GlassDataGrid.tsx
- Score: 73/100
- WARN inline-style-attr (x4)
- ERROR inline-glass (x2)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/data-display/GlassDataGridPro.tsx
- Score: 95/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/data-display/GlassDataTable.tsx
- Score: 91/100
- WARN raw-utilities: w-64, bg-muted/5
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/data-display/GlassDiffViewer.tsx
- Score: 95/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/data-display/GlassDivider.tsx
- Score: 99/100
- WARN raw-utilities: mr-3, ml-3, mt-3
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/data-display/GlassGanttChart.tsx
- Score: 77/100
- WARN raw-utilities: w-1, w-64, overflow-x-hidden, overflow-hidden, overflow-y-hidden, w-3, h-3
- WARN inline-style-attr (x12)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/data-display/GlassHeatmap.tsx
- Score: 79/100
- WARN raw-utilities: pr-2, gap-px
- WARN inline-style-attr (x6)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/data-display/GlassJSONViewer.tsx
- Score: 95/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/data-display/GlassKanbanBoard.tsx
- Score: 83/100
- WARN raw-utilities: bg-muted/20, pt-2, w-3, h-3, overflow-y-hidden, h-32, bg-current/10
- WARN inline-style-attr (x3)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/data-display/GlassLoadingSkeleton.tsx
- Score: 88/100
- WARN raw-utilities: pt-2, pt-4, md:glass-glass-glass-grid-cols-2
- WARN inline-style-attr (x2)
- ERROR inline-glass (x1)
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities

### src/components/data-display/GlassMetricChip.tsx
- Score: 95/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/data-display/GlassMetricsGrid.tsx
- Score: 79/100
- WARN raw-utilities: h-2, mb-6, h-64
- WARN inline-style-attr (x5)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/data-display/GlassNotificationCenter.tsx
- Score: 96/100
- WARN raw-utilities: mt-3, h-1, overflow-hidden
- WARN inline-style-attr (x1)
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/data-display/GlassProgress.tsx
- Score: 85/100
- WARN raw-utilities: mix-blend-difference, bg-stripes, text-muted/20
- WARN inline-style-attr (x3)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/data-display/GlassSchemaViewer.tsx
- Score: 95/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/data-display/GlassSkeleton.tsx
- Score: 88/100
- WARN raw-utilities: pt-2
- WARN inline-style-attr (x4)
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/data-display/GlassSkeletonLoader.tsx
- Score: 75/100
- WARN inline-style-attr (x5)
- ERROR inline-glass (x2)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities

### src/components/data-display/GlassSparkline.tsx
- Score: 95/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/data-display/GlassStatusDot.tsx
- Score: 97/100
- WARN inline-style-attr (x1)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/data-display/GlassTimeline.tsx
- Score: 87/100
- WARN raw-utilities: h-px, bg-glass-glass-border/20, pt-12
- WARN inline-style-attr (x4)
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/data-display/GlassToast.tsx
- Score: 90/100
- WARN raw-utilities: h-1, overflow-hidden, mt-3, pointer-events-auto
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/data-display/GlassTreeView.tsx
- Score: 86/100
- WARN raw-utilities: w-2
- WARN inline-style-attr (x3)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/data-display/GlassVirtualTable.tsx
- Score: 95/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/data-display/Typography.tsx
- Score: 100/100
- Issues: none

### src/components/demo/EnhancementShowcase.tsx
- Score: 85/100
- WARN raw-utilities: md:glass-glass-glass-grid-cols-3, space-y-6, md:glass-glass-glass-grid-cols-4, h-20, h-24, h-64, h-32, bg-gradient-to-t, md:glass-glass-glass-grid-cols-2, h-48
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/ecommerce/GlassEcommerceProvider.tsx
- Score: 95/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/ecommerce/GlassProductRecommendations.tsx
- Score: 81/100
- WARN raw-utilities: mt-1, w-20, h-20, mt-2, bg-gray-200, h-1, overflow-hidden, mb-6, mt-6, bg-blue-50
- WARN inline-style-attr (x3)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/ecommerce/GlassSmartShoppingCart.tsx
- Score: 89/100
- WARN raw-utilities: mt-1, w-20, h-20, bg-opacity-50, text-orange-600, bg-orange-50, ml-2, bg-green-50, mb-6, max-h-96
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/effects/AuroraPro.tsx
- Score: 89/100
- WARN inline-style-attr (x2)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/effects/Glass3DEngine.tsx
- Score: 85/100
- WARN inline-style-attr (x10)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/effects/GlassMorphingEngine.tsx
- Score: 80/100
- WARN inline-style-attr (x9)
- ERROR inline-glass (x1)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities

### src/components/effects/GlassPhysicsEngine.tsx
- Score: 81/100
- WARN inline-style-attr (x3)
- INFO missing-tokens — No glass token usage detected
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus); Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/effects/GlassShatterEffects.tsx
- Score: 92/100
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/effects/SeasonalParticles.tsx
- Score: 99/100
- WARN raw-utilities: w-3, h-3
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/experiential/GlassMoodRing.tsx
- Score: 69/100
- WARN raw-utilities: max-w-xs, w-2, h-2
- WARN inline-style-attr (x5)
- ERROR inline-glass (x2)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/feedback/GlassToast.tsx
- Score: 89/100
- WARN raw-utilities: pr-2, mt-1, mt-2, mt-3, h-1, overflow-hidden
- WARN inline-style-attr (x1)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/houdini/HoudiniGlassCard.tsx
- Score: 94/100
- WARN raw-utilities: ml-4, w-3, h-3, ml-auto, mt-2, w-2, h-2, bg-amber-400, space-y-6, md:glass-glass-glass-grid-cols-3
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/houdini/HoudiniGlassProvider.tsx
- Score: 75/100
- ERROR inline-glass (x5)
- Suggestions: Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities

### src/components/icons/ClearIcon.tsx
- Score: 87/100
- WARN inline-style-attr (x1)
- INFO missing-tokens — No glass token usage detected
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus); Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/image-list/ImageList.tsx
- Score: 75/100
- ERROR inline-glass (x5)
- Suggestions: Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities

### src/components/image-list/ImageListItem.tsx
- Score: 82/100
- WARN inline-style-attr (x1)
- ERROR inline-glass (x2)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/image-list/ImageListItemBar.tsx
- Score: 70/100
- ERROR inline-glass (x5)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/image/GlassImageProcessingProvider.tsx
- Score: 95/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/image/GlassIntelligentImageUploader.tsx
- Score: 76/100
- WARN raw-utilities: bg-opacity-75, max-w-6xl, max-h-[90vh], overflow-hidden, max-glass-glass-w-full, max-glass-glass-h-full, bg-opacity-50, w-80, mt-1, mt-2
- WARN inline-style-attr (x2)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/immersive/Glass360Viewer.tsx
- Score: 92/100
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/immersive/GlassARPreview.tsx
- Score: 94/100
- WARN raw-utilities: w-2, h-2, max-w-xs
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/immersive/GlassFluidSimulation.tsx
- Score: 91/100
- WARN raw-utilities: bg-secondary/20, bg-purple-500/20, text-purple-400
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/immersive/GlassHologram.tsx
- Score: 66/100
- WARN raw-utilities: max-glass-glass-w-full, max-glass-glass-h-full, w-20, h-20, w-1, h-1, overflow-hidden, w-3, h-3
- WARN inline-style-attr (x22)
- ERROR inline-glass (x2)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/immersive/GlassParticleField.tsx
- Score: 88/100
- WARN raw-utilities: pointer-events-auto
- WARN inline-style-attr (x4)
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/immersive/GlassVortexPortal.tsx
- Score: 91/100
- WARN raw-utilities: bg-secondary/20, w-20, min-w-[3ch]
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/input/GlassCheckbox.tsx
- Score: 95/100
- WARN raw-utilities: pt-0.5
- INFO missing-tokens — No glass token usage detected
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/input/GlassCheckboxGroup.tsx
- Score: 99/100
- WARN raw-utilities: w-2, h-0.5, bg-current
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/input/GlassColorPicker.tsx
- Score: 77/100
- WARN raw-utilities: pb-4, space-y-6, h-2, bg-gray-700, mx-auto, pt-4
- WARN inline-style-attr (x10)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/input/GlassDatePicker.tsx
- Score: 93/100
- WARN raw-utilities: w-80, w-1, h-1, pt-4
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/input/GlassDateRangePicker.tsx
- Score: 94/100
- WARN raw-utilities: w-3, h-3, pt-4
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/input/GlassFileUpload.tsx
- Score: 89/100
- WARN raw-utilities: bg-muted, mr-3, ml-2, mt-2, bg-gray-200, h-1, mt-1
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/input/GlassForm.tsx
- Score: 95/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/input/GlassFormStepper.tsx
- Score: 93/100
- WARN raw-utilities: w-2, h-2, mt-3, max-w-24, pt-1
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/input/GlassFormTable.tsx
- Score: 100/100
- Issues: none

### src/components/input/GlassInput.tsx
- Score: 97/100
- WARN inline-style-attr (x1)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/input/GlassLabel.tsx
- Score: 95/100
- WARN raw-utilities: text-destructive
- INFO missing-tokens — No glass token usage detected
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/input/GlassMultiSelect.tsx
- Score: 70/100
- ERROR inline-glass (x10)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/input/GlassMultiStepForm.tsx
- Score: 85/100
- WARN raw-utilities: max-w-4xl, mx-auto, pb-6, mt-6, h-2, overflow-hidden, max-w-20, pt-0, min-h-[400px], mb-6
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/input/GlassRadioGroup.tsx
- Score: 99/100
- WARN raw-utilities: text-destructive, w-2, h-2
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/input/GlassSelect.tsx
- Score: 91/100
- WARN raw-utilities: ml-3, pointer-events-auto, max-h-48
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/input/GlassSelectCompound.tsx
- Score: 94/100
- WARN raw-utilities: h-3.5, w-3.5
- INFO missing-tokens — No glass token usage detected
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/input/GlassSlider.tsx
- Score: 100/100
- Issues: none

### src/components/input/GlassStep.tsx
- Score: 90/100
- INFO missing-tokens — No glass token usage detected
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus); Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/input/GlassStepIcon.tsx
- Score: 100/100
- Issues: none

### src/components/input/GlassStepLabel.tsx
- Score: 100/100
- Issues: none

### src/components/input/GlassStepper.tsx
- Score: 100/100
- Issues: none

### src/components/input/GlassSwitch.tsx
- Score: 100/100
- Issues: none

### src/components/input/GlassTextarea.tsx
- Score: 99/100
- WARN raw-utilities: h-3, w-3
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/input/GlassToggle.tsx
- Score: 95/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/input/GlassWizard.tsx
- Score: 91/100
- WARN raw-utilities: max-w-4xl, mx-auto, w-24, mt-6, pb-2, w-3, h-3, min-h-[300px], mb-6
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/ContextAwareGlass.tsx
- Score: 92/100
- WARN inline-style-attr (x1)
- ERROR inline-glass (x1)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities

### src/components/interactive/CursorGlow.tsx
- Score: 92/100
- WARN inline-style-attr (x1)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/interactive/GlassA11yAuditor.tsx
- Score: 97/100
- WARN raw-utilities: text-blue-300, md:glass-glass-glass-grid-cols-4, text-md, max-h-96, w-80, text-green-300
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/interactive/GlassAdvancedSearch.tsx
- Score: 90/100
- WARN raw-utilities: pb-3, pt-0, pl-10, pr-4, placeholder-white/50, h-auto, w-3, h-3, md:glass-glass-glass-grid-cols-2, mx-auto
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassAvatarGroup.tsx
- Score: 86/100
- WARN raw-utilities: ml-[-10px]
- WARN inline-style-attr (x3)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/interactive/GlassCardLink.tsx
- Score: 90/100
- WARN raw-utilities: mb-6, bg-gradient-radial, mt-auto, pt-4, min-h-[200px]
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassCarousel.tsx
- Score: 82/100
- WARN raw-utilities: w-32, h-1, overflow-hidden
- WARN inline-style-attr (x4)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassChat.tsx
- Score: 84/100
- WARN raw-utilities: pb-3, overflow-hidden, pb-2, w-3, h-3, bg-orange-500/20, text-orange-300, h-auto, max-w-32, w-64
- WARN inline-style-attr (x2)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassChatInput.tsx
- Score: 99/100
- WARN raw-utilities: w-3, h-3, mt-3
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/interactive/GlassCoachmarks.tsx
- Score: 89/100
- WARN raw-utilities: mx-auto, max-w-xl
- INFO missing-tokens — No glass token usage detected
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus); Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/interactive/GlassCodeEditor.tsx
- Score: 86/100
- WARN inline-style-attr (x3)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassColorSchemeGenerator.tsx
- Score: 89/100
- WARN raw-utilities: md:glass-glass-glass-grid-cols-2, placeholder-white/50, md:glass-glass-glass-grid-cols-4, text-blue-300, text-green-300, bg-purple-500/20, text-purple-300
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassColorWheel.tsx
- Score: 79/100
- WARN raw-utilities: w-3, h-3
- WARN inline-style-attr (x5)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassCommand.tsx
- Score: 96/100
- WARN raw-utilities: mr-3, max-w-lg
- WARN inline-style-attr (x1)
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/interactive/GlassCommandPalette.tsx
- Score: 93/100
- WARN raw-utilities: pt-[10vh], max-w-2xl, max-h-96, bg-muted/10, bg-muted/5
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassCommentThread.tsx
- Score: 95/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/interactive/GlassComponentPlayground.tsx
- Score: 91/100
- WARN raw-utilities: placeholder-white/50, overflow-hidden, w-64, max-w-4xl, mx-auto, space-y-6, min-h-64, h-64
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassDraggable.tsx
- Score: 97/100
- WARN inline-style-attr (x1)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/interactive/GlassDrawingCanvas.tsx
- Score: 91/100
- WARN raw-utilities: w-20, min-w-[2ch], ml-auto
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassFacetSearch.tsx
- Score: 91/100
- WARN raw-utilities: pr-12, max-h-60, overflow-hidden, mb-6, text-blue-300, w-3, h-3, pb-3
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassFileExplorer.tsx
- Score: 92/100
- WARN raw-utilities: text-purple-400, text-pink-400, text-orange-400, pb-4, w-3, h-3, max-w-md
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassFileTree.tsx
- Score: 82/100
- WARN raw-utilities: text-purple-400, text-pink-400, text-orange-400, w-3, h-3, md:glass-glass-block, overflow-hidden, max-w-md
- WARN inline-style-attr (x3)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassFileUpload.tsx
- Score: 94/100
- WARN raw-utilities: bg-muted/30, text-destructive
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassFilterPanel.tsx
- Score: 93/100
- WARN raw-utilities: mb-6, text-blue-300, overflow-hidden, max-w-md
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassFocusRing.tsx
- Score: 92/100
- WARN inline-style-attr (x1)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/interactive/GlassFormBuilder.tsx
- Score: 90/100
- WARN raw-utilities: text-destructive, mb-6, bg-muted/30, h-2, mt-8
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassGallery.tsx
- Score: 82/100
- WARN raw-utilities: overflow-hidden, w-2, h-2, bg-gradient-to-t, w-3, h-3, w-32, h-32, mt-3, max-w-4xl
- WARN inline-style-attr (x2)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassGestureZone.tsx
- Score: 90/100
- WARN raw-utilities: bg-secondary/20, w-20, min-w-[3ch], space-y-1
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassGradientPicker.tsx
- Score: 87/100
- WARN raw-utilities: pb-3, pt-0, h-32, h-2
- WARN inline-style-attr (x2)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/interactive/GlassImageViewer.tsx
- Score: 89/100
- WARN inline-style-attr (x2)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassInfiniteScroll.tsx
- Score: 95/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/interactive/GlassInlineEdit.tsx
- Score: 95/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassKanban.tsx
- Score: 85/100
- WARN raw-utilities: text-orange-400, w-3, h-3
- WARN inline-style-attr (x3)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassKeyValueEditor.tsx
- Score: 95/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/interactive/GlassLazyImage.tsx
- Score: 87/100
- WARN raw-utilities: bg-gradient-to-t, w-3, h-3, min-w-32
- WARN inline-style-attr (x2)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassMentionList.tsx
- Score: 95/100
- WARN raw-utilities: max-h-60
- INFO missing-tokens — No glass token usage detected
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/interactive/GlassMessageList.tsx
- Score: 89/100
- WARN raw-utilities: bg-glass-fill, placeholder-white/50, w-3, h-3, mt-3, text-purple-400
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassMindMap.tsx
- Score: 88/100
- WARN raw-utilities: w-32, h-24, overflow-hidden
- WARN inline-style-attr (x2)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassPatternBuilder.tsx
- Score: 88/100
- WARN raw-utilities: w-20, min-w-[3ch], w-64
- WARN inline-style-attr (x2)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassPresets.tsx
- Score: 89/100
- WARN inline-style-attr (x2)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/interactive/GlassQueryBuilder.tsx
- Score: 93/100
- WARN raw-utilities: w-40, w-28, w-48, w-24
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassReactionBar.tsx
- Score: 95/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/interactive/GlassSearchInterface.tsx
- Score: 93/100
- WARN raw-utilities: max-h-96, overflow-hidden, bg-muted/30, mx-auto, md:glass-glass-glass-grid-cols-2
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassSignaturePad.tsx
- Score: 91/100
- WARN raw-utilities: w-2, h-2
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassSpotlight.tsx
- Score: 90/100
- ERROR inline-glass (x1)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/interactive/GlassStepper.tsx
- Score: 95/100
- WARN raw-utilities: h-px
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassTagInput.tsx
- Score: 94/100
- WARN raw-utilities: min-w-[120px], placeholder:glass-glass-text-primary/50
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassThemeDemo.tsx
- Score: 79/100
- WARN raw-utilities: md:glass-glass-glass-grid-cols-2, mt-6
- WARN inline-style-attr (x22)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassThemeSwitcher.tsx
- Score: 82/100
- WARN raw-utilities: pb-3, pt-0, h-2, h-1, mt-6, h-20, h-3
- WARN inline-style-attr (x7)
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/interactive/GlassUserPresence.tsx
- Score: 93/100
- WARN raw-utilities: pb-3, pt-0, mb-6, w-3, h-3
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassVideoPlayer.tsx
- Score: 87/100
- WARN raw-utilities: overflow-hidden, bg-gradient-to-t, h-1, w-20
- WARN inline-style-attr (x2)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassVirtualList.tsx
- Score: 85/100
- WARN inline-style-attr (x9)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/interactive/GlassVoiceInput.tsx
- Score: 87/100
- WARN raw-utilities: bg-secondary/20, w-20, h-2, overflow-hidden, space-y-1
- WARN inline-style-attr (x2)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassWhiteboard.tsx
- Score: 94/100
- WARN inline-style-attr (x2)
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/interactive/PageTransitionDemo.tsx
- Score: 80/100
- WARN inline-style-attr (x7)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/interactive/ThemedGlassComponents.tsx
- Score: 97/100
- WARN inline-style-attr (x1)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/layout/Box.tsx
- Score: 95/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/layout/GlassAppShell.tsx
- Score: 95/100
- WARN raw-utilities: overflow-hidden
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/layout/GlassBox.tsx
- Score: 100/100
- Issues: none

### src/components/layout/GlassContainer.tsx
- Score: 92/100
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/layout/GlassFlex.tsx
- Score: 95/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/layout/GlassGrid.tsx
- Score: 100/100
- Issues: none

### src/components/layout/GlassMasonry.tsx
- Score: 89/100
- WARN inline-style-attr (x2)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/layout/GlassScrollArea.tsx
- Score: 94/100
- WARN inline-style-attr (x2)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/layout/GlassSeparator.tsx
- Score: 95/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/layout/GlassSplitPane.tsx
- Score: 97/100
- WARN inline-style-attr (x1)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/layout/GlassStack.tsx
- Score: 100/100
- Issues: none

### src/components/layout/HStack.tsx
- Score: 95/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/layout/OptimizedGlassContainer.tsx
- Score: 97/100
- WARN inline-style-attr (x1)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/layout/VStack.tsx
- Score: 95/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/layouts/GlassFractalLayout.tsx
- Score: 79/100
- WARN raw-utilities: w-32, h-2
- WARN inline-style-attr (x6)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/layouts/GlassGoldenRatioGrid.tsx
- Score: 82/100
- WARN raw-utilities: w-2, h-2, h-0.5
- WARN inline-style-attr (x4)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/layouts/GlassIslandLayout.tsx
- Score: 77/100
- WARN raw-utilities: w-50, h-38, space-y-1, text-blue-300, overflow-hidden, space-x-1
- WARN inline-style-attr (x7)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/layouts/GlassMasonryGrid.tsx
- Score: 74/100
- WARN raw-utilities: masonry-sentinel, mb-6, min-w-48, placeholder-white/50, space-x-2, md:glass-glass-glass-grid-cols-4, space-x-1, w-2, h-2, mt-6
- WARN inline-style-attr (x6)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/layouts/GlassOrbitalMenu.tsx
- Score: 78/100
- WARN raw-utilities: h-0.5, pointer-events-auto, text-[10px], mt-2
- WARN inline-style-attr (x5)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/layouts/GlassTessellation.tsx
- Score: 89/100
- WARN inline-style-attr (x2)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/media/GlassAdvancedAudioPlayer.tsx
- Score: 83/100
- WARN raw-utilities: h-20, h-24, bg-yellow-200, mt-2, bg-gray-200, space-y-6, mt-1, h-2, w-20, w-80
- WARN inline-style-attr (x2)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/media/GlassAdvancedVideoPlayer.tsx
- Score: 76/100
- WARN raw-utilities: bg-gradient-to-t, h-2, w-1, w-0, h-0, ml-1, h-1, min-w-20, bg-gray-900, max-h-96
- WARN inline-style-attr (x3)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/media/GlassMediaProvider.tsx
- Score: 95/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/mobile/TouchGlassOptimization.tsx
- Score: 79/100
- WARN raw-utilities: pb-6, max-glass-glass-h-full
- WARN inline-style-attr (x5)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/modal/GlassBottomSheet.tsx
- Score: 96/100
- WARN raw-utilities: mx-auto, h-1.5
- WARN inline-style-attr (x1)
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/modal/GlassDialog.tsx
- Score: 91/100
- WARN raw-utilities: text-muted-foreground, bg-orange-500/20, text-orange-300
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/modal/GlassDrawer.tsx
- Score: 90/100
- WARN raw-utilities: text-muted-foreground, bg-orange-500/20, text-orange-300, text-blue-300
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/modal/GlassHoverCard.tsx
- Score: 89/100
- WARN inline-style-attr (x2)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/modal/GlassModal.tsx
- Score: 88/100
- WARN raw-utilities: text-muted-foreground, bg-orange-500/20, text-orange-300
- WARN inline-style-attr (x2)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/modal/GlassPopover.tsx
- Score: 91/100
- WARN raw-utilities: pointer-events-auto
- WARN inline-style-attr (x3)
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/modal/GlassTooltip.tsx
- Score: 91/100
- WARN raw-utilities: w-0, h-0
- WARN inline-style-attr (x1)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/navigation/EnhancedGlassTabs.tsx
- Score: 85/100
- WARN raw-utilities: min-w-[18px], h-[18px]
- WARN inline-style-attr (x3)
- ERROR inline-glass (x1)
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities

### src/components/navigation/GlassBottomNav.tsx
- Score: 94/100
- WARN raw-utilities: w-1, h-1, min-w-[1.25rem]
- INFO missing-tokens — No glass token usage detected
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/navigation/GlassBreadcrumb.tsx
- Score: 95/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/navigation/GlassCommandBar.tsx
- Score: 95/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/navigation/GlassContextMenu.tsx
- Score: 95/100
- WARN raw-utilities: h-px, mr-3, ml-6, ml-3
- WARN inline-style-attr (x1)
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/navigation/GlassDropdownMenu.tsx
- Score: 95/100
- WARN raw-utilities: mr-3, ml-auto, h-3.5, w-3.5, h-3, w-3, ml-6, h-2, w-2, bg-current
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/navigation/GlassHeader.tsx
- Score: 77/100
- WARN raw-utilities: md:hidden, md:glass-glass-block, max-w-md, max-h-60, w-80, w-2, h-2
- WARN inline-style-attr (x8)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/navigation/GlassMenubar.tsx
- Score: 99/100
- WARN raw-utilities: h-px, w-2, h-2
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/navigation/GlassMobileNav.tsx
- Score: 90/100
- WARN raw-utilities: ml-auto
- INFO missing-tokens — No glass token usage detected
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus); Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/navigation/GlassNavigation.tsx
- Score: 90/100
- WARN raw-utilities: min-w-[18px], h-[18px]
- WARN inline-style-attr (x3)
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/navigation/GlassNavigationMenu.tsx
- Score: 92/100
- WARN raw-utilities: h-px, text-red-300, w-3, h-3, w-2, h-2
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/navigation/GlassPagination.tsx
- Score: 92/100
- WARN raw-utilities: h-0.5
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/navigation/GlassResponsiveNav.tsx
- Score: 95/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/navigation/GlassSegmentedControl.tsx
- Score: 95/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/navigation/GlassSidebar.tsx
- Score: 82/100
- WARN raw-utilities: h-screen, pl-4
- WARN inline-style-attr (x4)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/navigation/GlassTabBar.tsx
- Score: 89/100
- WARN inline-style-attr (x2)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/navigation/GlassTabs.tsx
- Score: 92/100
- WARN raw-utilities: h-0.5
- WARN inline-style-attr (x1)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/navigation/GlassToolbar.tsx
- Score: 100/100
- Issues: none

### src/components/navigation/HeaderUserMenu.tsx
- Score: 91/100
- WARN raw-utilities: w-80, pt-4
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/navigation/components/CollapsedMenu.tsx
- Score: 95/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/navigation/components/ScrollButtons.tsx
- Score: 89/100
- WARN inline-style-attr (x2)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/navigation/components/TabItem.tsx
- Score: 84/100
- WARN inline-style-attr (x2)
- INFO missing-tokens — No glass token usage detected
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus); Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/quantum/GlassCoherenceIndicator.tsx
- Score: 91/100
- WARN inline-style-attr (x3)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/quantum/GlassProbabilityCloud.tsx
- Score: 90/100
- WARN raw-utilities: space-x-4, md:glass-glass-glass-grid-cols-4, space-y-1, ml-1, space-x-1
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/quantum/GlassQuantumField.tsx
- Score: 92/100
- WARN raw-utilities: w-20
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/quantum/GlassQuantumTunnel.tsx
- Score: 88/100
- WARN raw-utilities: space-x-4, space-x-1, w-2, h-2, space-x-2, w-3, h-3, bg-pink-400, text-pink-300, space-x-6
- WARN inline-style-attr (x2)
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/quantum/GlassSuperpositionalMenu.tsx
- Score: 75/100
- WARN inline-style-attr (x6)
- ERROR inline-glass (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/quantum/GlassWaveFunction.tsx
- Score: 86/100
- WARN inline-style-attr (x3)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/search/GlassIntelligentSearch.tsx
- Score: 88/100
- WARN raw-utilities: pl-10, pr-4, mt-2, max-h-60, mt-4, bg-blue-50, bg-blue-100, bg-purple-100, text-purple-700, bg-green-100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/social/GlassCollaborativeCursor.tsx
- Score: 80/100
- WARN inline-style-attr (x6)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/social/GlassPresenceIndicator.tsx
- Score: 86/100
- WARN raw-utilities: space-x-1, w-1.5, h-1.5, w-3, h-3, mt-3, pt-3
- WARN inline-style-attr (x2)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/social/GlassReactionBubbles.tsx
- Score: 80/100
- WARN inline-style-attr (x5)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/social/GlassSharedWhiteboard.tsx
- Score: 79/100
- WARN raw-utilities: space-x-4, space-x-2, space-x-1, bg-current, w-3, h-3, w-2, h-2
- WARN inline-style-attr (x4)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/social/GlassSocialFeed.tsx
- Score: 84/100
- WARN raw-utilities: space-x-3, space-x-2, w-2, h-2, ml-2, mt-2, overflow-hidden, pt-3, space-x-6, space-x-1
- WARN inline-style-attr (x2)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/social/GlassVoiceWaveform.tsx
- Score: 84/100
- WARN raw-utilities: space-x-1, space-x-0.5, bg-current, overflow-visible, space-x-px, w-32, space-x-2, space-x-4, w-2, h-2
- WARN inline-style-attr (x2)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/spatial/SpatialComputingEngine.tsx
- Score: 85/100
- WARN inline-style-attr (x6)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/speed-dial/SpeedDial.tsx
- Score: 62/100
- WARN inline-style-attr (x1)
- ERROR inline-glass (x7)
- INFO missing-tokens — No glass token usage detected
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus); Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/speed-dial/SpeedDialAction.tsx
- Score: 70/100
- ERROR inline-glass (x6)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/speed-dial/SpeedDialIcon.tsx
- Score: 100/100
- Issues: none

### src/components/surfaces/DimensionalGlass.tsx
- Score: 91/100
- WARN inline-style-attr (x3)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/surfaces/FrostedGlass.tsx
- Score: 83/100
- WARN inline-style-attr (x4)
- ERROR inline-glass (x1)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities

### src/components/surfaces/GlassDepthLayer.tsx
- Score: 92/100
- WARN inline-style-attr (x1)
- ERROR inline-glass (x1)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities

### src/components/surfaces/HeatGlass.tsx
- Score: 78/100
- WARN inline-style-attr (x4)
- ERROR inline-glass (x2)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities

### src/components/surfaces/PageGlassContainer.tsx
- Score: 89/100
- WARN inline-style-attr (x2)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/surfaces/WidgetGlass.tsx
- Score: 86/100
- WARN inline-style-attr (x3)
- ERROR inline-glass (x1)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities

### src/components/templates/dashboard/GlassDashboard.tsx
- Score: 90/100
- WARN raw-utilities: h-32, bg-muted/30, h-64, min-h-96, min-h-24
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/templates/dashboard/widgets/ChartWidget.tsx
- Score: 93/100
- WARN raw-utilities: w-3, h-3
- WARN inline-style-attr (x2)
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/templates/dashboard/widgets/MetricWidget.tsx
- Score: 96/100
- WARN raw-utilities: bg-muted/30, h-2
- WARN inline-style-attr (x1)
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/templates/dashboard/widgets/TableWidget.tsx
- Score: 89/100
- WARN inline-style-attr (x2)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/templates/detail/GlassDetailView.tsx
- Score: 93/100
- WARN raw-utilities: mt-6, md:glass-glass-glass-grid-cols-2, space-x-8, h-64, text-destructive
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/templates/forms/GlassFormTemplate.tsx
- Score: 94/100
- WARN raw-utilities: max-glass-glass-w-16, max-w-2xl, mx-auto
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/templates/forms/GlassFormWizardSteps.tsx
- Score: 87/100
- WARN raw-utilities: bg-success, text-success-foreground, bg-muted, w-fit
- WARN inline-style-attr (x2)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/templates/forms/GlassWizardTemplate.tsx
- Score: 94/100
- WARN raw-utilities: bg-muted, max-w-2xl, mx-auto
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/templates/interactive/GlassDataTable.tsx
- Score: 99/100
- WARN raw-utilities: bg-gray-300, bg-background, bg-muted
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/templates/list/GlassListView.tsx
- Score: 90/100
- WARN raw-utilities: md:glass-glass-glass-grid-cols-2, bg-background, h-64, w-64
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/toggle-button/ToggleButton.tsx
- Score: 95/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/toggle-button/ToggleButtonGroup.tsx
- Score: 95/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/tree-view/TreeItem.tsx
- Score: 89/100
- WARN inline-style-attr (x2)
- ERROR inline-glass (x1)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities

### src/components/tree-view/TreeView.tsx
- Score: 100/100
- Issues: none

### src/components/ui-components/GlassAccordionUI.tsx
- Score: 95/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/ui-components/GlassCheckboxUI.tsx
- Score: 95/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/ui-components/glass-panel.tsx
- Score: 100/100
- Issues: none

### src/components/visual-feedback/FocusIndicator.tsx
- Score: 90/100
- ERROR inline-glass (x2)
- Suggestions: Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities

### src/components/visual-feedback/RippleButton.tsx
- Score: 84/100
- WARN inline-style-attr (x2)
- INFO missing-tokens — No glass token usage detected
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus); Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/visual-feedback/StateIndicator.tsx
- Score: 100/100
- Issues: none

### src/components/visual-feedback/VisualFeedback.tsx
- Score: 80/100
- ERROR inline-glass (x3)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/visualization/GlassAdvancedDataViz.tsx
- Score: 84/100
- WARN raw-utilities: mb-6, mt-1, overflow-hidden, bg-blue-100, ml-1, mt-4, pt-4, w-3, h-3, bg-gray-900
- WARN inline-style-attr (x2)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/voice/VoiceGlassControl.tsx
- Score: 86/100
- WARN raw-utilities: mt-2, h-3, w-3, h-1, w-80, mt-1, bg-gray-800, pt-3, space-y-1, w-96
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/website-components/GlassChartsDemo.tsx
- Score: 95/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/website-components/GlassLinkButton.tsx
- Score: 89/100
- WARN inline-style-attr (x2)
- WARN typography — Raw text-* classes; use Typography or glass-text-* tokens
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Use <Typography /> or glass-text-* tokens for consistent type

### src/components/website-components/GlassPrismComparison.tsx
- Score: 71/100
- WARN raw-utilities: overflow-hidden, md:text-7xl, mb-8, bg-clip-text, text-transparent, max-w-3xl, mx-auto, max-w-7xl, h-96, mb-6
- WARN inline-style-attr (x10)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/website-components/GlassWipeSlider.tsx
- Score: 70/100
- WARN raw-utilities: w-3, h-3, overflow-hidden, bg-glass-gradient-strong, w-1, h-1, bg-current, max-w-md, mb-6, max-w-lg
- WARN inline-style-attr (x9)
- ERROR inline-glass (x2)
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities

### src/components/website-components/GlassWipeSliderExamples.tsx
- Score: 85/100
- WARN raw-utilities: bg-glass-gradient-subtle, max-w-md, text-red-300, text-red-200, text-red-300/60, bg-glass-gradient-strong, text-cyan-300, text-cyan-200, text-cyan-300/60, h-[500px]
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/website-components/MotionAwareGlass.tsx
- Score: 85/100
- ERROR inline-glass (x2)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)
