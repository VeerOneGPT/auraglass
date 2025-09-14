# Universal Glass Audit

Generated: 2025-09-13T08:28:29.408Z

- Files audited: 341
- Pass (>=95): 341
- Near (85–94): 0
- Needs work (<85): 0
- Issue counts: missing-tokens:79, raw-utilities:148, inline-style-attr:39, focus:159, a11y:114, inline-glass:5, typography:3

## Top 25 Needing Attention
- 95/100 — src/components/ai/GlassIntelligentFormBuilder.tsx — Replace raw utilities with glass-* equivalents or tokens
- 95/100 — src/components/collaboration/CollaborativeGlassWorkspace.tsx — Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)
- 95/100 — src/components/demo/EnhancementShowcase.tsx — Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)
- 95/100 — src/components/image/GlassIntelligentImageUploader.tsx — Replace raw utilities with glass-* equivalents or tokens
- 95/100 — src/components/immersive/GlassHologram.tsx — Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)
- 95/100 — src/components/input/GlassMultiStepForm.tsx — Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)
- 95/100 — src/components/website-components/GlassWipeSliderExamples.tsx — Replace raw utilities with glass-* equivalents or tokens
- 96/100 — src/components/advanced/GlassAutoComposer.tsx — Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)
- 96/100 — src/components/advanced/GlassMetaEngine.tsx — Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)
- 96/100 — src/components/advanced/GlassSpatialAudio.tsx — Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)
- 96/100 — src/components/advanced/GlassTrophyCase.tsx — Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes
- 96/100 — src/components/ai/GlassDeepDreamGlass.tsx — Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)
- 96/100 — src/components/ai/GlassGANGenerator.tsx — Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)
- 96/100 — src/components/backgrounds/AtmosphericBackground.tsx — Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities
- 96/100 — src/components/backgrounds/ParticleBackground.tsx — Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)
- 96/100 — src/components/experiential/GlassMoodRing.tsx — Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)
- 96/100 — src/components/image-list/ImageList.tsx — Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities
- 96/100 — src/components/layouts/GlassMasonryGrid.tsx — Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)
- 96/100 — src/components/media/GlassAdvancedVideoPlayer.tsx — Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)
- 96/100 — src/components/navigation/components/TabItem.tsx — Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus); Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)
- 96/100 — src/components/quantum/GlassQuantumTunnel.tsx — Replace raw utilities with glass-* equivalents or tokens
- 96/100 — src/components/search/GlassIntelligentSearch.tsx — Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)
- 96/100 — src/components/social/GlassSocialFeed.tsx — Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)
- 96/100 — src/components/surfaces/HeatGlass.tsx — Remove inline style attributes; use tokens, mixins, or utility classes
- 96/100 — src/components/website-components/GlassPrismComparison.tsx — Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

## File-by-File

### src/components/GlassErrorBoundary.tsx
- Score: 100/100
- Issues: none

### src/components/accessibility/AccessibilityProvider.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/accessibility/GlassA11y.tsx
- Score: 100/100
- Issues: none

### src/components/accessibility/GlassFocusIndicators.tsx
- Score: 98/100
- WARN raw-utilities: max-w-sm
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/advanced/BrandColorIntegration.tsx
- Score: 98/100
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/advanced/GlassAchievementSystem.tsx
- Score: 99/100
- WARN raw-utilities: overflow-hidden, text-amber-400, bg-amber-400
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/advanced/GlassAutoComposer.tsx
- Score: 96/100
- WARN raw-utilities: max-w-7xl, space-y-6, max-w-md, mb-6, placeholder-opacity-50, overflow-hidden, max-w-2xl, pt-4
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/advanced/GlassBiometricAdaptation.tsx
- Score: 100/100
- WARN raw-utilities: pt-4
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/advanced/GlassContextAware.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/advanced/GlassContextualEngine.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/advanced/GlassEngine.tsx
- Score: 97/100
- WARN raw-utilities: space-y-6, mt-4, space-x-2
- WARN inline-style-attr (x1)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/advanced/GlassEyeTracking.tsx
- Score: 98/100
- WARN inline-style-attr (x1)
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/advanced/GlassFoldableSupport.tsx
- Score: 98/100
- WARN inline-style-attr (x1)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/advanced/GlassLiquidTransition.tsx
- Score: 98/100
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/advanced/GlassLiveCursorPresence.tsx
- Score: 100/100
- Issues: none

### src/components/advanced/GlassMagneticCursor.tsx
- Score: 98/100
- WARN inline-style-attr (x1)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/advanced/GlassMeshGradient.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/advanced/GlassMetaEngine.tsx
- Score: 96/100
- WARN inline-style-attr (x2)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/advanced/GlassNeuroSync.tsx
- Score: 100/100
- INFO a11y — Consider aria-* attributes / roles for interactive elements

### src/components/advanced/GlassOrientationEffects.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/advanced/GlassParallaxLayers.tsx
- Score: 100/100
- Issues: none

### src/components/advanced/GlassParticles.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/advanced/GlassPerformanceOptimization.tsx
- Score: 98/100
- WARN inline-style-attr (x1)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/advanced/GlassPredictiveEngine.tsx
- Score: 98/100
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/advanced/GlassProgressiveEnhancement.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/advanced/GlassQuantumStates.tsx
- Score: 100/100
- WARN raw-utilities: overflow-hidden
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/advanced/GlassReactions.tsx
- Score: 100/100
- WARN raw-utilities: overflow-hidden
- INFO missing-tokens — No glass token usage detected
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/advanced/GlassSelfHealingSystem.tsx
- Score: 98/100
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/advanced/GlassSpatialAudio.tsx
- Score: 96/100
- WARN raw-utilities: overflow-hidden, bg-emerald-500, bg-amber-500, bg-pink-500
- WARN inline-style-attr (x1)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/advanced/GlassTrophyCase.tsx
- Score: 96/100
- WARN raw-utilities: overflow-hidden, mt-2, mb-8, mb-6, max-w-lg
- WARN inline-style-attr (x1)
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/advanced/GlassWebGLShader.tsx
- Score: 100/100
- Issues: none

### src/components/advanced/IntelligentColorSystem.tsx
- Score: 98/100
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/advanced/LiquidGlassGPU.tsx
- Score: 98/100
- WARN inline-style-attr (x1)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/ai/AIGlassThemeProvider.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/ai/GlassDeepDreamGlass.tsx
- Score: 96/100
- WARN raw-utilities: space-x-2, space-x-4, mt-2, ml-2, pt-2, space-x-1, overflow-hidden, mt-1, pt-4
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/ai/GlassGANGenerator.tsx
- Score: 96/100
- WARN raw-utilities: space-x-2, space-x-4, ml-2, space-x-1, overflow-hidden, max-w-md, pb-2, pt-4
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/ai/GlassGenerativeArt.tsx
- Score: 97/100
- WARN raw-utilities: space-x-2, space-x-1, placeholder-white/50, space-x-4, overflow-hidden, space-x-3, mt-1
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/ai/GlassIntelligentFormBuilder.tsx
- Score: 95/100
- WARN raw-utilities: mb-6, mt-1, ml-auto, space-y-1, max-glass-glass-glass-h-96, mt-2, max-w-2xl, space-y-6, mb-8, ml-1
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/ai/GlassLiveFilter.tsx
- Score: 97/100
- WARN raw-utilities: space-x-2, mt-2, space-x-1, overflow-hidden, space-x-4, pt-4
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/ai/GlassMusicVisualizer.tsx
- Score: 99/100
- WARN raw-utilities: space-x-4, space-x-2, space-x-1
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/ai/GlassStyleTransfer.tsx
- Score: 97/100
- WARN raw-utilities: overflow-hidden, space-x-6, space-x-2, space-x-1, mt-1, pt-4, space-x-4
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/ai/ProductionAIIntegration.tsx
- Score: 98/100
- WARN raw-utilities: production-ai-integration, ml-2, ml-1, space-y-1, mt-4
- INFO missing-tokens — No glass token usage detected
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus); Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/animations/AdvancedAnimations.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/animations/GlassMotionController.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/animations/GlassTransitions.tsx
- Score: 98/100
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/animations/OrganicAnimationEngine.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/ar/ARGlassEffects.tsx
- Score: 99/100
- WARN raw-utilities: max-w-xs, space-y-1
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/atmospheric/GlassAuroraDisplay.tsx
- Score: 100/100
- WARN raw-utilities: min-w-[3ch]
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/atmospheric/GlassBiomeSimulator.tsx
- Score: 100/100
- Issues: none

### src/components/atmospheric/GlassNebulaClouds.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/atmospheric/GlassWeatherGlass.tsx
- Score: 98/100
- WARN raw-utilities: min-w-[3ch]
- WARN inline-style-attr (x1)
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/backgrounds/AtmosphericBackground.tsx
- Score: 96/100
- ERROR inline-glass (x2)
- Suggestions: Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities

### src/components/backgrounds/GlassDynamicAtmosphere.tsx
- Score: 100/100
- Issues: none

### src/components/backgrounds/ParticleBackground.tsx
- Score: 96/100
- ERROR inline-glass (x2)
- INFO missing-tokens — No glass token usage detected
- Suggestions: Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/button/EnhancedGlassButton.tsx
- Score: 100/100
- INFO a11y — Consider aria-* attributes / roles for interactive elements

### src/components/button/GlassButton.tsx
- Score: 99/100
- WARN raw-utilities: ml-2, mr-2
- WARN typography — Raw text-* classes; use Typography or glass-text-* tokens
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Use <Typography /> or glass-text-* tokens for consistent type

### src/components/button/GlassFab.tsx
- Score: 100/100
- Issues: none

### src/components/button/GlassMagneticButton.tsx
- Score: 100/100
- Issues: none

### src/components/calendar/GlassCalendar.tsx
- Score: 99/100
- WARN raw-utilities: mt-6, pt-4
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/card/GlassCard.tsx
- Score: 100/100
- Issues: none

### src/components/card/div.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/card/glass-card-link.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/card/patterns.tsx
- Score: 98/100
- WARN raw-utilities: overflow-hidden, items-baseline, mt-3, pt-4
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/charts/GlassAreaChart.tsx
- Score: 99/100
- WARN raw-utilities: overflow-visible, mt-6
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/charts/GlassBarChart.tsx
- Score: 99/100
- WARN raw-utilities: overflow-visible, mt-6
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/charts/GlassChart.tsx
- Score: 98/100
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/charts/GlassDataChart.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/charts/GlassLineChart.tsx
- Score: 99/100
- WARN raw-utilities: overflow-visible, mt-6, mb-6
- INFO missing-tokens — No glass token usage detected
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/charts/GlassPieChart.tsx
- Score: 100/100
- WARN raw-utilities: overflow-visible
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/charts/ModularGlassDataChart.tsx
- Score: 100/100
- WARN raw-utilities: pointer-events-none
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/charts/components/AtmosphericEffects.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/charts/components/ChartAxis.tsx
- Score: 100/100
- Issues: none

### src/components/charts/components/ChartContainer.tsx
- Score: 100/100
- Issues: none

### src/components/charts/components/ChartFilters.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/charts/components/ChartGrid.tsx
- Score: 100/100
- Issues: none

### src/components/charts/components/ChartLegend.tsx
- Score: 98/100
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/charts/components/ChartRenderer.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/charts/components/ChartTooltip.tsx
- Score: 100/100
- Issues: none

### src/components/charts/components/KpiChart.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/cms/GlassCanvas.tsx
- Score: 97/100
- WARN raw-utilities: bg-opacity-5, mb-6, max-w-sm
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/cms/GlassComponentPalette.tsx
- Score: 99/100
- WARN raw-utilities: mt-2, pl-4, pl-10
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/cms/GlassDragDropProvider.tsx
- Score: 100/100
- Issues: none

### src/components/cms/GlassPageBuilder.tsx
- Score: 99/100
- WARN raw-utilities: overflow-hidden, text-gray-300
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/cms/GlassPageStructure.tsx
- Score: 98/100
- WARN raw-utilities: ml-1, ml-2, pl-10, text-gray-300, space-y-1
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/cms/GlassPropertyPanel.tsx
- Score: 98/100
- WARN raw-utilities: mr-2, mt-2, overflow-hidden, space-y-1
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/collaboration/CollaborativeGlassWorkspace.tsx
- Score: 95/100
- WARN raw-utilities: mt-2, bg-slate-800, mt-8, mr-2, mr-1, w-14, h-14, bg-slate-700, bg-slate-600, bg-slate-900
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/collaboration/GlassCollaborationDashboard.tsx
- Score: 99/100
- WARN raw-utilities: max-glass-glass-glass-h-96, overflow-hidden, space-y-1
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/collaboration/GlassCollaborationProvider.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/collaboration/GlassCollaborativeComments.tsx
- Score: 99/100
- WARN raw-utilities: mt-2, ml-4, max-w-xs
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/collaboration/GlassCollaborativeCursor.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/cookie-consent/CompactCookieNotice.tsx
- Score: 98/100
- ERROR inline-glass (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/cookie-consent/CookieConsent.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/cookie-consent/GlobalCookieConsent.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/dashboard/GlassActivityFeed.tsx
- Score: 97/100
- WARN raw-utilities: pb-4, bg-glass-fill, pt-0, max-w-[100px], max-w-[80px], mt-6
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/dashboard/GlassChartWidget.tsx
- Score: 99/100
- WARN raw-utilities: pb-4, pt-0, pt-4
- WARN typography — Raw text-* classes; use Typography or glass-text-* tokens
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Use <Typography /> or glass-text-* tokens for consistent type; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/dashboard/GlassKPICard.tsx
- Score: 98/100
- WARN raw-utilities: pb-2, pt-0, items-baseline, premium-glow
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/dashboard/GlassMetricCard.tsx
- Score: 99/100
- WARN raw-utilities: pb-2, pt-0
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/dashboard/GlassStatCard.tsx
- Score: 98/100
- WARN raw-utilities: pb-2, pt-0, overflow-visible, overflow-hidden
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/data-display/GlassAccordion.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/data-display/GlassAlert.tsx
- Score: 100/100
- Issues: none

### src/components/data-display/GlassAnimatedNumber.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/data-display/GlassAvatar.tsx
- Score: 100/100
- Issues: none

### src/components/data-display/GlassBadge.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/data-display/GlassBadgeLine.tsx
- Score: 100/100
- Issues: none

### src/components/data-display/GlassChip.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/data-display/GlassDataGrid.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/data-display/GlassDataGridPro.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/data-display/GlassDataTable.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/data-display/GlassDiffViewer.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/data-display/GlassDivider.tsx
- Score: 99/100
- WARN raw-utilities: mr-3, ml-3, mt-3
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/data-display/GlassGanttChart.tsx
- Score: 99/100
- WARN raw-utilities: overflow-x-hidden, overflow-hidden, overflow-y-hidden
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/data-display/GlassHeatmap.tsx
- Score: 97/100
- WARN raw-utilities: pr-2, gap-px
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/data-display/GlassJSONViewer.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/data-display/GlassKanbanBoard.tsx
- Score: 97/100
- WARN raw-utilities: pt-2, overflow-y-hidden
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/data-display/GlassLoadingSkeleton.tsx
- Score: 99/100
- WARN raw-utilities: pt-2, pt-4
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/data-display/GlassMetricChip.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/data-display/GlassMetricsGrid.tsx
- Score: 100/100
- WARN raw-utilities: mb-6
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/data-display/GlassNotificationCenter.tsx
- Score: 99/100
- WARN raw-utilities: mt-3, overflow-hidden
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/data-display/GlassProgress.tsx
- Score: 99/100
- WARN raw-utilities: mix-blend-difference, bg-stripes, text-muted/20
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/data-display/GlassSchemaViewer.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/data-display/GlassSkeleton.tsx
- Score: 100/100
- WARN raw-utilities: pt-2
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/data-display/GlassSkeletonLoader.tsx
- Score: 100/100
- Issues: none

### src/components/data-display/GlassSparkline.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/data-display/GlassStatusDot.tsx
- Score: 100/100
- Issues: none

### src/components/data-display/GlassTimeline.tsx
- Score: 99/100
- WARN raw-utilities: bg-glass-glass-glass-border/20, pt-12
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/data-display/GlassToast.tsx
- Score: 99/100
- WARN raw-utilities: overflow-hidden, mt-3, pointer-events-auto
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/data-display/GlassTreeView.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/data-display/GlassVirtualTable.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/data-display/Typography.tsx
- Score: 100/100
- Issues: none

### src/components/demo/EnhancementShowcase.tsx
- Score: 95/100
- WARN raw-utilities: space-y-6, space-y-8, h-80, overflow-hidden, max-w-md, mt-8, max-w-7xl, space-x-8, max-w-3xl, mt-6
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/ecommerce/GlassEcommerceProvider.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/ecommerce/GlassProductRecommendations.tsx
- Score: 97/100
- WARN raw-utilities: mt-1, mt-2, overflow-hidden, mb-6, mt-6, mt-3
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/ecommerce/GlassSmartShoppingCart.tsx
- Score: 97/100
- WARN raw-utilities: mt-1, ml-2, mb-6, max-glass-glass-glass-h-96, pt-4, pt-2
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/effects/AuroraPro.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/effects/Glass3DEngine.tsx
- Score: 98/100
- WARN inline-style-attr (x1)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/effects/GlassMorphingEngine.tsx
- Score: 100/100
- Issues: none

### src/components/effects/GlassPhysicsEngine.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus); Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/effects/GlassShatterEffects.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/effects/SeasonalParticles.tsx
- Score: 100/100
- Issues: none

### src/components/experiential/GlassMoodRing.tsx
- Score: 96/100
- WARN raw-utilities: max-w-xs
- WARN inline-style-attr (x2)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/feedback/GlassToast.tsx
- Score: 98/100
- WARN raw-utilities: pr-2, mt-1, mt-2, mt-3, overflow-hidden
- INFO missing-tokens — No glass token usage detected
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/houdini/HoudiniGlassCard.tsx
- Score: 97/100
- WARN raw-utilities: text-gray-300, ml-4, ml-auto, mt-2, bg-amber-400, space-y-6, mt-1
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/houdini/HoudiniGlassProvider.tsx
- Score: 100/100
- Issues: none

### src/components/icons/ClearIcon.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus); Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/image-list/ImageList.tsx
- Score: 96/100
- ERROR inline-glass (x2)
- Suggestions: Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities

### src/components/image-list/ImageListItem.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/image-list/ImageListItemBar.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/image/GlassImageProcessingProvider.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/image/GlassIntelligentImageUploader.tsx
- Score: 95/100
- WARN raw-utilities: bg-opacity-75, max-w-6xl, max-h-[90vh], overflow-hidden, max-glass-glass-glass-w-full, max-glass-glass-glass-h-full, bg-indigo-600, bg-indigo-700, space-y-6, bg-opacity-0
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/immersive/Glass360Viewer.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/immersive/GlassARPreview.tsx
- Score: 100/100
- WARN raw-utilities: max-w-xs
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/immersive/GlassFluidSimulation.tsx
- Score: 99/100
- WARN raw-utilities: bg-secondary/20, bg-secondary/30
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/immersive/GlassHologram.tsx
- Score: 95/100
- WARN raw-utilities: max-glass-glass-glass-w-full, max-glass-glass-glass-h-full, overflow-hidden
- WARN inline-style-attr (x2)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/immersive/GlassParticleField.tsx
- Score: 98/100
- WARN raw-utilities: pointer-events-auto
- WARN inline-style-attr (x1)
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/immersive/GlassVortexPortal.tsx
- Score: 99/100
- WARN raw-utilities: bg-secondary/20, bg-secondary/30, min-w-[3ch]
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/input/GlassCheckbox.tsx
- Score: 100/100
- WARN raw-utilities: pt-0.5
- INFO missing-tokens — No glass token usage detected
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/input/GlassCheckboxGroup.tsx
- Score: 100/100
- Issues: none

### src/components/input/GlassColorPicker.tsx
- Score: 99/100
- WARN raw-utilities: pb-4, space-y-6, pt-4
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/input/GlassDatePicker.tsx
- Score: 100/100
- WARN raw-utilities: pt-4
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/input/GlassDateRangePicker.tsx
- Score: 100/100
- WARN raw-utilities: pt-4
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/input/GlassFileUpload.tsx
- Score: 98/100
- WARN raw-utilities: mr-3, ml-2, mt-2, mt-1
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/input/GlassForm.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/input/GlassFormStepper.tsx
- Score: 99/100
- WARN raw-utilities: mt-3, max-glass-glass-glass-w-24, pt-1
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/input/GlassFormTable.tsx
- Score: 100/100
- Issues: none

### src/components/input/GlassInput.tsx
- Score: 100/100
- Issues: none

### src/components/input/GlassLabel.tsx
- Score: 100/100
- WARN raw-utilities: text-destructive
- INFO missing-tokens — No glass token usage detected
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/input/GlassMultiSelect.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/input/GlassMultiStepForm.tsx
- Score: 95/100
- WARN raw-utilities: max-w-4xl, pb-6, mt-6, overflow-hidden, max-glass-glass-glass-w-20, pt-0, min-h-[400px], mb-6, mt-8, pt-6
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/input/GlassRadioGroup.tsx
- Score: 100/100
- WARN raw-utilities: text-destructive
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/input/GlassSelect.tsx
- Score: 99/100
- WARN raw-utilities: ml-3, pointer-events-auto, max-glass-glass-glass-h-48
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/input/GlassSelectCompound.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/input/GlassSlider.tsx
- Score: 100/100
- Issues: none

### src/components/input/GlassStep.tsx
- Score: 100/100
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
- Score: 100/100
- Issues: none

### src/components/input/GlassToggle.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/input/GlassWizard.tsx
- Score: 98/100
- WARN raw-utilities: max-w-4xl, mt-6, pb-2, min-h-[300px], mb-6
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/ContextAwareGlass.tsx
- Score: 98/100
- WARN inline-style-attr (x1)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/interactive/CursorGlow.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/interactive/GlassA11yAuditor.tsx
- Score: 99/100
- WARN raw-utilities: text-md, max-glass-glass-glass-h-96
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/interactive/GlassAdvancedSearch.tsx
- Score: 97/100
- WARN raw-utilities: pb-3, pt-0, pl-10, pr-4, placeholder-white/50, h-auto
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassAvatarGroup.tsx
- Score: 100/100
- WARN raw-utilities: ml-[-10px]
- INFO missing-tokens — No glass token usage detected
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/interactive/GlassCardLink.tsx
- Score: 98/100
- WARN raw-utilities: mb-6, bg-gradient-radial, mt-auto, pt-4, min-h-[200px]
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassCarousel.tsx
- Score: 100/100
- WARN raw-utilities: overflow-hidden
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassChat.tsx
- Score: 98/100
- WARN raw-utilities: pb-3, overflow-hidden, pb-2, h-auto, max-glass-glass-glass-w-32
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassChatInput.tsx
- Score: 100/100
- WARN raw-utilities: mt-3
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/interactive/GlassCoachmarks.tsx
- Score: 100/100
- WARN raw-utilities: max-w-xl
- INFO missing-tokens — No glass token usage detected
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus); Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/interactive/GlassCodeEditor.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassColorSchemeGenerator.tsx
- Score: 100/100
- WARN raw-utilities: placeholder-white/50
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassColorWheel.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassCommand.tsx
- Score: 99/100
- WARN raw-utilities: mr-3, max-w-lg
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/interactive/GlassCommandPalette.tsx
- Score: 99/100
- WARN raw-utilities: pt-[10vh], max-w-2xl, max-glass-glass-glass-h-96
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassCommentThread.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/interactive/GlassComponentPlayground.tsx
- Score: 98/100
- WARN raw-utilities: placeholder-white/50, overflow-hidden, max-w-4xl, space-y-6
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassDraggable.tsx
- Score: 100/100
- Issues: none

### src/components/interactive/GlassDrawingCanvas.tsx
- Score: 99/100
- WARN raw-utilities: min-w-[2ch], ml-auto
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassFacetSearch.tsx
- Score: 98/100
- WARN raw-utilities: pr-12, max-h-60, overflow-hidden, mb-6, pb-3
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassFileExplorer.tsx
- Score: 99/100
- WARN raw-utilities: text-pink-400, pb-4, max-w-md
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassFileTree.tsx
- Score: 99/100
- WARN raw-utilities: text-pink-400, overflow-hidden, max-w-md
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassFileUpload.tsx
- Score: 100/100
- WARN raw-utilities: text-destructive
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassFilterPanel.tsx
- Score: 99/100
- WARN raw-utilities: mb-6, overflow-hidden, max-w-md
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassFocusRing.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/interactive/GlassFormBuilder.tsx
- Score: 99/100
- WARN raw-utilities: text-destructive, mb-6, mt-8
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassGallery.tsx
- Score: 97/100
- WARN raw-utilities: overflow-hidden, mt-3, max-w-4xl, max-glass-glass-glass-h-full, max-h-[80vh], bg-glass-fill
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassGestureZone.tsx
- Score: 98/100
- WARN raw-utilities: bg-secondary/20, bg-secondary/30, min-w-[3ch], space-y-1
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassGradientPicker.tsx
- Score: 99/100
- WARN raw-utilities: pb-3, pt-0
- INFO missing-tokens — No glass token usage detected
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/interactive/GlassImageViewer.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassInfiniteScroll.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/interactive/GlassInlineEdit.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassKanban.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassKeyValueEditor.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/interactive/GlassLazyImage.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassMentionList.tsx
- Score: 100/100
- WARN raw-utilities: max-h-60
- INFO missing-tokens — No glass token usage detected
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/interactive/GlassMessageList.tsx
- Score: 99/100
- WARN raw-utilities: bg-glass-fill, placeholder-white/50, mt-3
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassMindMap.tsx
- Score: 100/100
- WARN raw-utilities: overflow-hidden
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassPatternBuilder.tsx
- Score: 100/100
- WARN raw-utilities: min-w-[3ch]
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassPresets.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/interactive/GlassQueryBuilder.tsx
- Score: 99/100
- WARN raw-utilities: w-40, w-28
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassReactionBar.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/interactive/GlassSearchInterface.tsx
- Score: 99/100
- WARN raw-utilities: max-glass-glass-glass-h-96, overflow-hidden
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassSignaturePad.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassSpotlight.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/interactive/GlassStepper.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassTagInput.tsx
- Score: 99/100
- WARN raw-utilities: min-w-[120px], placeholder:glass-glass-glass-text-primary/50
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassThemeDemo.tsx
- Score: 100/100
- WARN raw-utilities: mt-6
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassThemeSwitcher.tsx
- Score: 99/100
- WARN raw-utilities: pb-3, pt-0, mt-6
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/interactive/GlassUserPresence.tsx
- Score: 99/100
- WARN raw-utilities: pb-3, pt-0, mb-6
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassVideoPlayer.tsx
- Score: 100/100
- WARN raw-utilities: overflow-hidden
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassVirtualList.tsx
- Score: 100/100
- Issues: none

### src/components/interactive/GlassVoiceInput.tsx
- Score: 98/100
- WARN raw-utilities: bg-secondary/20, bg-secondary/30, overflow-hidden, space-y-1
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/interactive/GlassWhiteboard.tsx
- Score: 100/100
- INFO a11y — Consider aria-* attributes / roles for interactive elements

### src/components/interactive/PageTransitionDemo.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/interactive/ThemedGlassComponents.tsx
- Score: 100/100
- Issues: none

### src/components/layout/Box.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/layout/GlassAppShell.tsx
- Score: 100/100
- WARN raw-utilities: overflow-hidden
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/layout/GlassBox.tsx
- Score: 100/100
- Issues: none

### src/components/layout/GlassContainer.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/layout/GlassFlex.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/layout/GlassGrid.tsx
- Score: 100/100
- Issues: none

### src/components/layout/GlassMasonry.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/layout/GlassScrollArea.tsx
- Score: 100/100
- Issues: none

### src/components/layout/GlassSeparator.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/layout/GlassSplitPane.tsx
- Score: 100/100
- Issues: none

### src/components/layout/GlassStack.tsx
- Score: 100/100
- Issues: none

### src/components/layout/HStack.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/layout/OptimizedGlassContainer.tsx
- Score: 100/100
- Issues: none

### src/components/layout/VStack.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/layouts/GlassFractalLayout.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/layouts/GlassGoldenRatioGrid.tsx
- Score: 98/100
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/layouts/GlassIslandLayout.tsx
- Score: 98/100
- WARN raw-utilities: w-50, h-38, space-y-1, overflow-hidden, space-x-1
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/layouts/GlassMasonryGrid.tsx
- Score: 96/100
- WARN raw-utilities: masonry-sentinel, mb-6, placeholder-white/50, space-x-2, space-x-1, mt-6, pt-4, space-x-4
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/layouts/GlassOrbitalMenu.tsx
- Score: 99/100
- WARN raw-utilities: pointer-events-auto, text-[10px], mt-2
- INFO missing-tokens — No glass token usage detected
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/layouts/GlassTessellation.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/media/GlassAdvancedAudioPlayer.tsx
- Score: 98/100
- WARN raw-utilities: mt-2, space-y-6, mt-1, overflow-hidden
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/media/GlassAdvancedVideoPlayer.tsx
- Score: 96/100
- WARN raw-utilities: ml-1, max-glass-glass-glass-h-96, h-9, mt-1, placeholder-gray-400, mt-2, text-gray-300, overflow-hidden
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/media/GlassMediaProvider.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/mobile/TouchGlassOptimization.tsx
- Score: 99/100
- WARN raw-utilities: pb-6, max-glass-glass-glass-h-full
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/modal/GlassBottomSheet.tsx
- Score: 100/100
- Issues: none

### src/components/modal/GlassDialog.tsx
- Score: 100/100
- WARN raw-utilities: text-muted-foreground
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/modal/GlassDrawer.tsx
- Score: 100/100
- WARN raw-utilities: text-muted-foreground
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/modal/GlassHoverCard.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/modal/GlassModal.tsx
- Score: 100/100
- WARN raw-utilities: text-muted-foreground
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/modal/GlassPopover.tsx
- Score: 100/100
- WARN raw-utilities: pointer-events-auto
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/modal/GlassTooltip.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/navigation/EnhancedGlassTabs.tsx
- Score: 97/100
- WARN raw-utilities: min-w-[18px], h-[18px]
- WARN inline-style-attr (x1)
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/navigation/GlassBottomNav.tsx
- Score: 100/100
- WARN raw-utilities: min-w-[1.25rem]
- INFO missing-tokens — No glass token usage detected
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/navigation/GlassBreadcrumb.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/navigation/GlassCommandBar.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/navigation/GlassContextMenu.tsx
- Score: 99/100
- WARN raw-utilities: mr-3, ml-6, ml-3
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/navigation/GlassDropdownMenu.tsx
- Score: 99/100
- WARN raw-utilities: mr-3, ml-auto, ml-6
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/navigation/GlassHeader.tsx
- Score: 99/100
- WARN raw-utilities: max-w-md, max-h-60
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/navigation/GlassMenubar.tsx
- Score: 100/100
- Issues: none

### src/components/navigation/GlassMobileNav.tsx
- Score: 100/100
- WARN raw-utilities: ml-auto
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/navigation/GlassNavigation.tsx
- Score: 99/100
- WARN raw-utilities: min-w-[18px], h-[18px]
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/navigation/GlassNavigationMenu.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/navigation/GlassPagination.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/navigation/GlassResponsiveNav.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/navigation/GlassSegmentedControl.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/navigation/GlassSidebar.tsx
- Score: 100/100
- WARN raw-utilities: pl-4
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/navigation/GlassTabBar.tsx
- Score: 98/100
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/navigation/GlassTabs.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/navigation/GlassToolbar.tsx
- Score: 100/100
- Issues: none

### src/components/navigation/HeaderUserMenu.tsx
- Score: 100/100
- WARN raw-utilities: pt-4
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/navigation/components/CollapsedMenu.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/navigation/components/ScrollButtons.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/navigation/components/TabItem.tsx
- Score: 96/100
- WARN inline-style-attr (x2)
- INFO missing-tokens — No glass token usage detected
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus); Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/quantum/GlassCoherenceIndicator.tsx
- Score: 98/100
- WARN inline-style-attr (x1)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/quantum/GlassProbabilityCloud.tsx
- Score: 98/100
- WARN raw-utilities: space-x-4, space-y-1, ml-1, space-x-1
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/quantum/GlassQuantumField.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/quantum/GlassQuantumTunnel.tsx
- Score: 96/100
- WARN raw-utilities: space-x-4, space-x-1, space-x-2, bg-pink-400, text-pink-300, space-x-6, space-y-1, bg-pink-500/20
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/quantum/GlassSuperpositionalMenu.tsx
- Score: 98/100
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/quantum/GlassWaveFunction.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/search/GlassIntelligentSearch.tsx
- Score: 96/100
- WARN raw-utilities: pl-10, pr-4, mt-2, max-h-60, mt-4, max-glass-glass-glass-h-32, mt-1, mt-6
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/social/GlassCollaborativeCursor.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/social/GlassPresenceIndicator.tsx
- Score: 99/100
- WARN raw-utilities: space-x-1, mt-3, pt-3
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/social/GlassReactionBubbles.tsx
- Score: 98/100
- WARN inline-style-attr (x1)
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/social/GlassSharedWhiteboard.tsx
- Score: 99/100
- WARN raw-utilities: space-x-4, space-x-2, space-x-1
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/social/GlassSocialFeed.tsx
- Score: 96/100
- WARN raw-utilities: space-x-3, space-x-2, ml-2, mt-2, overflow-hidden, pt-3, space-x-6, space-x-1
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/social/GlassVoiceWaveform.tsx
- Score: 97/100
- WARN raw-utilities: space-x-1, space-x-0.5, overflow-visible, space-x-px, space-x-2, space-x-4, pt-3
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/spatial/SpatialComputingEngine.tsx
- Score: 100/100
- Issues: none

### src/components/speed-dial/SpeedDial.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus); Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/speed-dial/SpeedDialAction.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/speed-dial/SpeedDialIcon.tsx
- Score: 100/100
- Issues: none

### src/components/surfaces/DimensionalGlass.tsx
- Score: 100/100
- Issues: none

### src/components/surfaces/FrostedGlass.tsx
- Score: 98/100
- WARN inline-style-attr (x1)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/surfaces/GlassDepthLayer.tsx
- Score: 100/100
- Issues: none

### src/components/surfaces/HeatGlass.tsx
- Score: 96/100
- WARN inline-style-attr (x2)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/surfaces/PageGlassContainer.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/surfaces/WidgetGlass.tsx
- Score: 98/100
- WARN inline-style-attr (x1)
- Suggestions: Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/templates/dashboard/GlassDashboard.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/templates/dashboard/widgets/ChartWidget.tsx
- Score: 100/100
- Issues: none

### src/components/templates/dashboard/widgets/MetricWidget.tsx
- Score: 100/100
- Issues: none

### src/components/templates/dashboard/widgets/TableWidget.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/templates/detail/GlassDetailView.tsx
- Score: 99/100
- WARN raw-utilities: mt-6, space-x-8, text-destructive
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/templates/forms/GlassFormTemplate.tsx
- Score: 99/100
- WARN raw-utilities: max-glass-glass-glass-w-16, max-w-2xl
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/templates/forms/GlassFormWizardSteps.tsx
- Score: 99/100
- WARN raw-utilities: bg-success, text-success-foreground, w-fit
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/templates/forms/GlassWizardTemplate.tsx
- Score: 100/100
- WARN raw-utilities: max-w-2xl
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/templates/interactive/GlassDataTable.tsx
- Score: 100/100
- WARN raw-utilities: bg-background
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/templates/list/GlassListView.tsx
- Score: 100/100
- WARN raw-utilities: bg-background
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/toggle-button/ToggleButton.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/toggle-button/ToggleButtonGroup.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/tree-view/TreeItem.tsx
- Score: 98/100
- ERROR inline-glass (x1)
- Suggestions: Eliminate inline backdrop-filter/background/box-shadow; use createGlassStyle or surface utilities

### src/components/tree-view/TreeView.tsx
- Score: 100/100
- Issues: none

### src/components/ui-components/GlassAccordionUI.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/ui-components/GlassCheckboxUI.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/ui-components/glass-panel.tsx
- Score: 100/100
- Issues: none

### src/components/visual-feedback/FocusIndicator.tsx
- Score: 100/100
- Issues: none

### src/components/visual-feedback/RippleButton.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus); Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/visual-feedback/StateIndicator.tsx
- Score: 100/100
- Issues: none

### src/components/visual-feedback/VisualFeedback.tsx
- Score: 100/100
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/visualization/GlassAdvancedDataViz.tsx
- Score: 97/100
- WARN raw-utilities: mb-6, mt-1, overflow-hidden, ml-1, mt-4, pt-4
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/voice/VoiceGlassControl.tsx
- Score: 97/100
- WARN raw-utilities: mt-2, mt-1, pt-3, space-y-1, max-h-80, ml-5
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/website-components/GlassChartsDemo.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)

### src/components/website-components/GlassLinkButton.tsx
- Score: 98/100
- WARN raw-utilities: text-indigo-50
- WARN inline-style-attr (x1)
- WARN typography — Raw text-* classes; use Typography or glass-text-* tokens
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes; Use <Typography /> or glass-text-* tokens for consistent type

### src/components/website-components/GlassPrismComparison.tsx
- Score: 96/100
- WARN raw-utilities: overflow-hidden, text-7xl, mb-8, bg-clip-text, text-transparent, max-w-3xl, max-w-7xl, mb-6, text-8xl
- INFO focus — Interactive content; ensure focus-visible rings via utilities/hooks
- INFO a11y — Consider aria-* attributes / roles for interactive elements
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Add focus-visible indicators (GlassFocusRing/useGlassFocus or .glass-focus)

### src/components/website-components/GlassWipeSlider.tsx
- Score: 96/100
- WARN raw-utilities: overflow-hidden, bg-glass-gradient-strong, max-w-md, mb-6, max-w-lg
- WARN inline-style-attr (x1)
- Suggestions: Replace raw utilities with glass-* equivalents or tokens; Remove inline style attributes; use tokens, mixins, or utility classes

### src/components/website-components/GlassWipeSliderExamples.tsx
- Score: 95/100
- WARN raw-utilities: bg-glass-gradient-subtle, bg-glass-gradient-strong, h-[500px], max-w-md, mb-6, mt-6, text-green-200/60, overflow-hidden, max-w-xs, max-w-2xl
- Suggestions: Replace raw utilities with glass-* equivalents or tokens

### src/components/website-components/MotionAwareGlass.tsx
- Score: 100/100
- INFO missing-tokens — No glass token usage detected
- Suggestions: Adopt glass tokens (createGlassStyle, AURA_GLASS, glass-* utilities)
