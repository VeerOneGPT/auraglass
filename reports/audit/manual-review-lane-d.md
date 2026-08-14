# Manual visual review — lane D (ordered targets 374–498)

## Provenance

- Authoritative promoted run: `runtime-audit-full-20260813055808-cc8820be-2dfa-420c-9fd1-021b0af29598`
- Run generated: `2026-08-13T05:58:08.638Z`
- Visual summary generated: `2026-08-13T06:17:06.968Z`
- Source fingerprint: `sha256:2df81c5e3b293a1c443acd94ccda78723503e24d6ea91bbf0618f67d37e12002`
- Evidence root: `reports/audit/visual-all`
- Contact-sheet inventory: `reports/audit/visual-contact-sheets/inventory.json`
- Contact sheets inspected: export batches 16–20 at desktop/tablet/mobile and both recipe batches at desktop/tablet/mobile.
- Inventory provenance: same-run, authoritative, verifier PASS, exact 470 exports + 28 recipes + 1,494 PNGs.
- Source integrity: originals opened read-only; post-generation SHA-256 recheck PASS.
- Lane coverage: 125 targets × 3 viewports = 375 human-inspected frames.

## Human gate result

**FAIL.** The automated summary reports 498/498 pass, but human inspection rejects 48/125 targets in this lane. No rejected target may be represented as Apple-liquid-glass quality.

Verdict vocabulary:

- `PASS`: no visible defect under the lane criteria.
- `FAIL:CHROMATIC`: dominant or materially distracting blue/cyan/pink/green tint.
- `FAIL:CHROMATIC_DARK`: dark/navy canvas plus saturated color.
- `FAIL:BLANK` / `FAIL:INCOMPLETE`: absent or non-substantive render.
- `FAIL:CLIPPED` / `FAIL:OVERFLOW` / `FAIL:TRUNCATED`: responsive or content geometry defect.
- `FAIL:NAVY` / `FAIL:OPAQUE_CANVAS`: disallowed opaque dark/gray presentation.

## Per-target viewport verdicts

| Ordinal | ID | Kind | Desktop | Tablet | Mobile | Human defect |
|---:|---|---|---|---|---|---|
| 374 | glass-vortex-portal | export | FAIL:CHROMATIC_DARK | FAIL:CHROMATIC_DARK | FAIL:CHROMATIC_DARK | dominant opaque black/navy canvas with saturated blue material |
| 375 | glass-wave-function | export | PASS | PASS | PASS | — |
| 376 | glass-weather-glass | export | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | dominant blue/cyan/pink/green chromatic canvas or material |
| 377 | glass-web-glshader | export | PASS | PASS | PASS | — |
| 378 | glass-whiteboard | export | PASS | PASS | PASS | — |
| 379 | glass-wipe-slider | export | FAIL:BLANK | FAIL:BLANK | FAIL:BLANK | blank or materially incomplete render |
| 380 | glass-wizard | export | PASS | PASS | PASS | — |
| 381 | glass-wizard-template | export | PASS | PASS | PASS | — |
| 382 | glass3-dengine | export | PASS | PASS | PASS | — |
| 383 | glass360-viewer | export | PASS | PASS | PASS | — |
| 384 | global-cookie-consent | export | PASS | PASS | PASS | — |
| 385 | glowing-card | export | PASS | PASS | PASS | — |
| 386 | heat-glass | export | PASS | PASS | PASS | — |
| 387 | houdini-glass-card | export | PASS | PASS | PASS | — |
| 388 | houdini-glass-provider | export | PASS | PASS | PASS | — |
| 389 | houdini-glass-showcase | export | PASS | PASS | PASS | — |
| 390 | hstack | export | PASS | PASS | PASS | — |
| 391 | image-list | export | PASS | PASS | PASS | — |
| 392 | image-list-item | export | PASS | PASS | PASS | — |
| 393 | image-list-item-bar | export | FAIL:TRUNCATED | FAIL:TRUNCATED | FAIL:TRUNCATED | collapsed component with visibly truncated labels |
| 394 | lazy-glass-loading | export | PASS | PASS | PASS | — |
| 395 | liquid-glass-adaptive-sheet | export | PASS | PASS | PASS | — |
| 396 | liquid-glass-backdrop-sampler | export | FAIL:NAVY | FAIL:NAVY | FAIL:NAVY | opaque dark/navy material |
| 397 | liquid-glass-badge-cluster | export | PASS | PASS | PASS | — |
| 398 | liquid-glass-bottom-accessory | export | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | dominant blue/cyan/pink/green chromatic canvas or material |
| 399 | liquid-glass-button-style | export | PASS | PASS | PASS | — |
| 400 | liquid-glass-carousel-rail | export | PASS | FAIL:CLIPPED | FAIL:CLIPPED | Tablet/mobile carousel content is displaced and clipped beyond the viewport. |
| 401 | liquid-glass-command-surface | export | PASS | PASS | PASS | — |
| 402 | liquid-glass-concentric-frame | export | PASS | PASS | PASS | — |
| 403 | liquid-glass-control-group | export | PASS | PASS | PASS | — |
| 404 | liquid-glass-destination | export | PASS | PASS | PASS | — |
| 405 | liquid-glass-effect-group | export | PASS | PASS | PASS | — |
| 406 | liquid-glass-gpu | export | PASS | PASS | PASS | — |
| 407 | liquid-glass-gpudriver | export | PASS | PASS | PASS | — |
| 408 | liquid-glass-inset-sidebar | export | PASS | PASS | PASS | — |
| 409 | liquid-glass-inspector-panel | export | PASS | PASS | PASS | — |
| 410 | liquid-glass-layer-provider | export | PASS | PASS | PASS | — |
| 411 | liquid-glass-map-controls | export | PASS | PASS | PASS | — |
| 412 | liquid-glass-material | export | PASS | PASS | PASS | — |
| 413 | liquid-glass-media-controls | export | PASS | PASS | PASS | — |
| 414 | liquid-glass-now-playing-bar | export | PASS | PASS | PASS | — |
| 415 | liquid-glass-photo-inspector | export | PASS | PASS | PASS | — |
| 416 | liquid-glass-popover-menu | export | PASS | PASS | PASS | — |
| 417 | liquid-glass-scroll-edge | export | PASS | PASS | PASS | — |
| 418 | liquid-glass-search-field | export | PASS | PASS | PASS | — |
| 419 | liquid-glass-search-tab | export | PASS | PASS | PASS | — |
| 420 | liquid-glass-segmented-control | export | PASS | PASS | PASS | — |
| 421 | liquid-glass-showcase | export | PASS | PASS | FAIL:OVERFLOW | Mobile showcase tabs/content/playbar run beyond the right edge. |
| 422 | liquid-glass-source | export | PASS | PASS | PASS | — |
| 423 | liquid-glass-source-transition | export | PASS | PASS | PASS | — |
| 424 | liquid-glass-surface-layer | export | PASS | PASS | PASS | — |
| 425 | liquid-glass-tab-bar | export | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | dominant blue/cyan/pink/green chromatic canvas or material |
| 426 | liquid-glass-toolbar | export | PASS | PASS | PASS | — |
| 427 | liquid-glass-transition-provider | export | PASS | PASS | PASS | — |
| 428 | living-ecosystem-simulator | export | PASS | PASS | PASS | — |
| 429 | magnetic-button | export | PASS | PASS | PASS | — |
| 430 | mobile-glass-bottom-sheet | export | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | dominant blue/cyan/pink/green chromatic canvas or material |
| 431 | mobile-glass-navigation | export | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | dominant blue/cyan/pink/green chromatic canvas or material |
| 432 | molecular-bonding-interface | export | PASS | PASS | PASS | — |
| 433 | motion | export | PASS | PASS | PASS | — |
| 434 | motion-aware-glass | export | PASS | PASS | PASS | — |
| 435 | motion-framer | export | PASS | PASS | PASS | — |
| 436 | motion-preference-provider | export | PASS | PASS | PASS | — |
| 437 | multi-dimensional-gesture-recognizer | export | PASS | PASS | PASS | — |
| 438 | multi-user-glass-editor | export | PASS | PASS | PASS | — |
| 439 | neural-weight-visualization | export | PASS | PASS | PASS | — |
| 440 | neuromorphic-learning-network | export | PASS | PASS | PASS | — |
| 441 | optimized-glass | export | PASS | PASS | PASS | — |
| 442 | optimized-glass-advanced | export | PASS | PASS | PASS | — |
| 443 | optimized-glass-container | export | FAIL:BLANK | FAIL:BLANK | FAIL:BLANK | blank or materially incomplete render |
| 444 | page-glass-container | export | PASS | PASS | PASS | — |
| 445 | particle-background | export | FAIL:NAVY | FAIL:NAVY | FAIL:NAVY | opaque dark/navy material |
| 446 | persona-picker | export | PASS | PASS | PASS | — |
| 447 | progressive-glass-enhancement | export | PASS | PASS | PASS | — |
| 448 | quantum-entanglement-visualizer | export | PASS | PASS | PASS | — |
| 449 | recipe-admin-data-table | recipe | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | All viewports use a visibly blue/cyan-tinted dominant canvas/material field; human color/material rejection. |
| 450 | recipe-ai-command-center | recipe | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | All viewports use a visibly blue/cyan-tinted dominant canvas/material field; human color/material rejection. |
| 451 | recipe-ai-ops-control-room | recipe | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | All viewports use a visibly blue/cyan-tinted dominant canvas/material field; human color/material rejection. |
| 452 | recipe-ai-product-console | recipe | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | All viewports use a visibly blue/cyan-tinted dominant canvas/material field; human color/material rejection. |
| 453 | recipe-analytics-command-center | recipe | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | All viewports use a visibly blue/cyan-tinted dominant canvas/material field; human color/material rejection. |
| 454 | recipe-analytics-overview | recipe | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | All viewports use a visibly blue/cyan-tinted dominant canvas/material field; human color/material rejection. |
| 455 | recipe-calendar-operations-board | recipe | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | All viewports use a visibly blue/cyan-tinted dominant canvas/material field; human color/material rejection. |
| 456 | recipe-calendar-schedule | recipe | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | All viewports use a visibly blue/cyan-tinted dominant canvas/material field; human color/material rejection. |
| 457 | recipe-collaboration-room-console | recipe | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | All viewports use a visibly blue/cyan-tinted dominant canvas/material field; human color/material rejection. |
| 458 | recipe-collaborative-workspace | recipe | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | All viewports use a visibly blue/cyan-tinted dominant canvas/material field; human color/material rejection. |
| 459 | recipe-commerce-operations-panel | recipe | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | All viewports use a visibly blue/cyan-tinted dominant canvas/material field; human color/material rejection. |
| 460 | recipe-creator-studio-dashboard | recipe | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | All viewports use a visibly blue/cyan-tinted dominant canvas/material field; human color/material rejection. |
| 461 | recipe-customer-support-console | recipe | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | All viewports use a visibly blue/cyan-tinted dominant canvas/material field; human color/material rejection. |
| 462 | recipe-developer-docs-portal | recipe | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | All viewports use a visibly blue/cyan-tinted dominant canvas/material field; human color/material rejection. |
| 463 | recipe-ecommerce-product-panel | recipe | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | All viewports use a visibly blue/cyan-tinted dominant canvas/material field; human color/material rejection. |
| 464 | recipe-kanban-workspace | recipe | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | All viewports use a visibly blue/cyan-tinted dominant canvas/material field; human color/material rejection. |
| 465 | recipe-marketing-launch-kit | recipe | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | All viewports use a visibly blue/cyan-tinted dominant canvas/material field; human color/material rejection. |
| 466 | recipe-media-player-surface | recipe | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | All viewports use a visibly blue/cyan-tinted dominant canvas/material field; human color/material rejection. |
| 467 | recipe-media-review-workspace | recipe | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | All viewports use a visibly blue/cyan-tinted dominant canvas/material field; human color/material rejection. |
| 468 | recipe-release-command-center | recipe | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | All viewports use a visibly blue/cyan-tinted dominant canvas/material field; human color/material rejection. |
| 469 | recipe-saas-admin-shell | recipe | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | All viewports use a visibly blue/cyan-tinted dominant canvas/material field; human color/material rejection. |
| 470 | recipe-saas-dashboard | recipe | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | All viewports use a visibly blue/cyan-tinted dominant canvas/material field; human color/material rejection. |
| 471 | recipe-semantic-search-console | recipe | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | All viewports use a visibly blue/cyan-tinted dominant canvas/material field; human color/material rejection. |
| 472 | recipe-settings-and-billing-suite | recipe | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | All viewports use a visibly blue/cyan-tinted dominant canvas/material field; human color/material rejection. |
| 473 | recipe-settings-billing | recipe | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | All viewports use a visibly blue/cyan-tinted dominant canvas/material field; human color/material rejection. |
| 474 | recipe-support-triage-workspace | recipe | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | All viewports use a visibly blue/cyan-tinted dominant canvas/material field; human color/material rejection. |
| 475 | recipe-team-collaboration-hub | recipe | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | All viewports use a visibly blue/cyan-tinted dominant canvas/material field; human color/material rejection. |
| 476 | recipe-vision-review-workbench | recipe | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | All viewports use a visibly blue/cyan-tinted dominant canvas/material field; human color/material rejection. |
| 477 | reduced-motion-glass | export | PASS | PASS | PASS | — |
| 478 | responsive-navigation | export | PASS | PASS | PASS | — |
| 479 | ripple-button | export | PASS | PASS | PASS | — |
| 480 | smart-shopping-cart | export | PASS | PASS | PASS | — |
| 481 | spatial-computing-engine | export | PASS | PASS | PASS | — |
| 482 | speed-dial | export | FAIL:OPAQUE_CANVAS | FAIL:OPAQUE_CANVAS | FAIL:OPAQUE_CANVAS | dominant opaque gray scrim/canvas |
| 483 | speed-dial-action | export | FAIL:INCOMPLETE | FAIL:INCOMPLETE | FAIL:INCOMPLETE | near-invisible standalone render with no meaningful content |
| 484 | speed-dial-icon | export | FAIL:INCOMPLETE | FAIL:INCOMPLETE | FAIL:INCOMPLETE | near-invisible standalone render with no meaningful content |
| 485 | state-indicator | export | PASS | PASS | PASS | — |
| 486 | theme-provider | export | PASS | PASS | PASS | — |
| 487 | toggle-button | export | PASS | PASS | PASS | — |
| 488 | toggle-button-group | export | PASS | PASS | PASS | — |
| 489 | touch-optimized-glass | export | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | dominant blue/cyan/pink/green chromatic canvas or material |
| 490 | touch-ripple-effects | export | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | dominant blue/cyan/pink/green chromatic canvas or material |
| 491 | tree-item | export | PASS | PASS | PASS | — |
| 492 | tree-view | export | PASS | PASS | PASS | — |
| 493 | visual-feedback | export | PASS | PASS | PASS | — |
| 494 | voice-glass-control | export | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | dominant blue/cyan/pink/green chromatic canvas or material |
| 495 | voice-glass-demo | export | FAIL:CHROMATIC | FAIL:CHROMATIC | FAIL:CHROMATIC | dominant blue/cyan/pink/green chromatic canvas or material |
| 496 | vstack | export | PASS | PASS | PASS | — |
| 497 | widget-glass | export | PASS | PASS | PASS | — |
| 498 | zspace-app-layout | export | PASS | PASS | PASS | — |

## Review constraints

- These are human verdicts from the same promoted run, not copied automated statuses.
- No source files were edited in this review lane.
- A target with any failed viewport is not approved.
- A fresh full capture and full re-review are required after remediation.

