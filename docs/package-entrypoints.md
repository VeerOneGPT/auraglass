# Package entrypoints

AuraGlass `4.1.0` is an npm package (`aura-glass`). Import from the focused subpath that matches the surface you need. Every path on this page exists in the current `package.json` `exports` map.

## Install

```bash
npm install aura-glass
```

Peer requirements for core UI are `react` and `react-dom` (`>=18 <20`). Optional peers (`framer-motion`, `openai`, `three`, and the other entries in `peerDependenciesMeta`) are only needed when you import the matching optional surface.

## Root package

```tsx
import { GlassButton, GlassCard } from 'aura-glass';
import 'aura-glass/styles';
```

The root entrypoint is the broad component catalog. Prefer a focused subpath when you only need icons, primitives, app chrome, theme helpers, tokens, or a recipe.

## Focused runtime subpaths

These entrypoints have their own compiled files. Use them when you want a smaller, explicit import graph.

| Import path | What it exports | Source |
| --- | --- | --- |
| `aura-glass/icons` | `GlassIcon` and named icon components | `src/icons` |
| `aura-glass/icons/action` | Action-family icons | `src/icons/action.ts` |
| `aura-glass/icons/navigation` | Navigation-family icons | `src/icons/navigation.ts` |
| `aura-glass/icons/status` | Status-family icons | `src/icons/status.ts` |
| `aura-glass/icons/media` | Media-family icons | `src/icons/media.ts` |
| `aura-glass/icons/data` | Data-family icons | `src/icons/data.ts` |
| `aura-glass/icons/commerce` | Commerce-family icons | `src/icons/commerce.ts` |
| `aura-glass/icons/collaboration` | Collaboration-family icons | `src/icons/collaboration.ts` |
| `aura-glass/icons/ai` | AI-family icons | `src/icons/ai.ts` |
| `aura-glass/primitives` | Slot, portal, focus, dismissable layer, roving focus, positioner, Liquid Glass primitives | `src/primitives` |
| `aura-glass/primitives/slot` | `Slot` / `GlassSlot` | `src/primitives/Slot.tsx` |
| `aura-glass/primitives/portal` | `Portal` / `GlassPortal` | `src/primitives/Portal.tsx` |
| `aura-glass/primitives/focus` | `FocusScope` / `GlassFocusScope` | `src/primitives/FocusScope.tsx` |
| `aura-glass/primitives/dismissable-layer` | `DismissableLayer` / `GlassDismissableLayer` | `src/primitives/DismissableLayer.tsx` |
| `aura-glass/primitives/roving-focus` | `RovingFocusGroup` / `GlassRovingFocusGroup` | `src/primitives/RovingFocusGroup.tsx` |
| `aura-glass/primitives/positioning` | `Positioner` / `GlassPositioner` | `src/primitives/Positioner.tsx` |
| `aura-glass/app-shell` | Native app frame: `GlassAppShell`, `GlassTopBar`, rails, pages, status bar | `src/app-shell` |
| `aura-glass/workspace` | Workspace chrome: `GlassWorkspace`, `GlassWorkflowShell`, inspector, canvas, timeline | `src/workspace` |
| `aura-glass/workflows` | Same runtime as `aura-glass/workspace` | `src/workflows/index.ts` re-exports `../workspace` |
| `aura-glass/theme` | Theme Engine 2.0 helpers and provider | `src/theme` |
| `aura-glass/registry` | Recipe registry used by the CLI | `src/registry` |
| `aura-glass/client` | Client-only helpers | `src/client` |
| `aura-glass/server` | Package server helpers | `src/server` |
| `aura-glass/ssr` | SSR helpers | `src/ssr` |
| `aura-glass/three` | Optional Three.js surfaces | `src/three` |

`aura-glass/workflows` does **not** export `GlassDataTable`, `GlassEmptyState`, or other product workflow components. Those live on the root `aura-glass` entrypoint. See [workflows](./workflows/readme.md).

## Typed subpaths that resolve to the root bundle

These paths exist and have dedicated `.d.ts` files. Their `import` / `require` fields currently point at the root `dist/index.mjs` / `dist/index.js` bundle, so they do not create a smaller runtime graph.

| Import path | Types come from | Runtime |
| --- | --- | --- |
| `aura-glass/forms` | `src/forms` → form templates (`GlassFormTemplate`, `GlassWizardTemplate`, `GlassFormWizardSteps`) | root bundle |
| `aura-glass/data` | `src/data` → `src/components/data-display` | root bundle |
| `aura-glass/navigation` | `src/navigation` → `src/components/navigation` | root bundle |
| `aura-glass/overlays` | `src/overlays` → `src/components/modal` | root bundle |
| `aura-glass/marketing` | `src/marketing` → `src/components/marketing` | root bundle |

Import day-to-day form controls such as `GlassForm`, `GlassInput`, and `GlassSelect` from `aura-glass`, not from `aura-glass/forms`.

## Tokens and styles

```ts
import { personas, auraTokens } from 'aura-glass/tokens';
```

| Import path | File |
| --- | --- |
| `aura-glass/tokens` | JS token module |
| `aura-glass/tokens/json` | `dist/tokens/tokens.json` |
| `aura-glass/tokens/tailwind` | Tailwind theme helper |
| `aura-glass/tokens/manifest` | Token manifest module |
| `aura-glass/tokens/css` | `dist/tokens/tokens.css` |
| `aura-glass/tokens/keyframes` | `dist/tokens/tokens.keyframes.css` |
| `aura-glass/styles` | `dist/styles/index.css` |

## Optional service modules

These are for apps that wire AuraGlass services into their own backend. They are not required for package-only UI.

```ts
import { createAIConfig } from 'aura-glass/services/ai/config';
import { OpenAIService } from 'aura-glass/services/ai/openai-service';
import { VisionService } from 'aura-glass/services/ai/vision-service';
```

| Import path | Module |
| --- | --- |
| `aura-glass/services/ai/config` | Config, feature flags, provider-unconfigured error |
| `aura-glass/services/ai/cache-service` | Redis-backed AI cache |
| `aura-glass/services/ai/openai-service` | OpenAI service class |
| `aura-glass/services/ai/vision-service` | Vision / background-removal service |
| `aura-glass/services/websocket/collaboration-service` | Client collaboration transport |
| `aura-glass/core/mixins/glassMixins` | Glass mixin helpers |
| `aura-glass/utils/env` | Environment helpers |
| `aura-glass/hooks/useGlassProbes` | Probe hook |

## CLI

The package binary is `aura-glass` (`bin/aura-glass.cjs`). Recipe and migration commands are documented in [cli/migration.md](./cli/migration.md) and [recipes/readme.md](./recipes/readme.md).

## What this package is not

- AuraGlass is package-first. You do not need the optional hosted API or WebSocket servers to use components.
- The published tarball includes `bin/`, `dist/`, `workers/`, `README.md`, and `LICENSE`. It does not include `server/` source.
- `server/api-server.js` is a repo-local demo/mock API and is not a production entrypoint. See [deployment.md](./deployment.md).
