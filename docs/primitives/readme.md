# Primitives

Native primitives power menus, selects, dialogs, drawers, popovers, tooltips, tabs, command palettes, and custom product surfaces. They live on `aura-glass/primitives` and the focused subpaths.

Prefer a public AuraGlass component first. Reach for primitives only when you need a custom interaction the component layer does not cover.

## Entrypoints

```txt
aura-glass/primitives
aura-glass/primitives/slot
aura-glass/primitives/portal
aura-glass/primitives/focus
aura-glass/primitives/dismissable-layer
aura-glass/primitives/roving-focus
aura-glass/primitives/positioning
```

Each focused subpath has its own compiled file (`src/primitives/Slot.tsx`, `Portal.tsx`, `FocusScope.tsx`, `DismissableLayer.tsx`, `RovingFocusGroup.tsx`, `Positioner.tsx`).

## Primitive set

| Export | Also exported as | Job |
| --- | --- | --- |
| `GlassSlot` | `Slot` | `asChild` composition, prop merging, handler composition, ref composition |
| `GlassPortal` | `Portal` | SSR-safe portal rendering with a custom container |
| `GlassFocusScope` | `FocusScope` | Focus looping and restore for custom overlays |
| `GlassDismissableLayer` | `DismissableLayer` | Escape, outside pointer, outside focus, nested dismissal |
| `GlassRovingFocusGroup` | `RovingFocusGroup` | Arrow-key focus for menus, tabs, and option groups |
| `GlassPositioner` | `Positioner` | Anchored placement, collision, flip, offset, viewport padding |

The barrel also exports Liquid Glass primitives (`LiquidGlassMaterial`, `LiquidGlassLayerProvider`, and related helpers). Those have their own usage pages under [liquid-glass](../liquid-glass/readme.md).

## Usage

Use a public component:

```tsx
import { GlassDialog, GlassDropdownMenu, GlassTabs } from 'aura-glass';
```

Compose a custom surface:

```tsx
import { GlassFocusScope, GlassPortal } from 'aura-glass/primitives';
```

Or import one primitive file:

```tsx
import { Slot } from 'aura-glass/primitives/slot';
import { Portal } from 'aura-glass/primitives/portal';
```

## Accessibility

Each primitive is covered by keyboard, ARIA, focus-lifecycle, SSR, and nested-composition tests under `src/primitives`. Automated app-chrome evidence is in `reports/3.3-release/accessibility-certification.md`. Manual screen-reader and physical-device certification is not recorded as complete.
