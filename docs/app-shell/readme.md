# App shell

The focused app-chrome entrypoint is `aura-glass/app-shell`. It ships the native application frame used by the package recipes: top bar, sidebar rail and panel, main column, page header, action bar, split panes, command dock, status bar, and a mobile shell.

Import these components from `aura-glass/app-shell`, not from the root `aura-glass` package. The root export named `GlassAppShell` is a different, older layout component (`src/components/layout/GlassAppShell.tsx`) with a `header` / `sidebar` / `footer` API.

## Install and import

```tsx
import {
  GlassActionBar,
  GlassAppShell,
  GlassBreadcrumbs,
  GlassCommandDock,
  GlassMain,
  GlassMobileShell,
  GlassPage,
  GlassPageHeader,
  GlassResizablePanel,
  GlassSidebarPanel,
  GlassSidebarRail,
  GlassSplitPane,
  GlassStatusBar,
  GlassTopBar,
} from 'aura-glass/app-shell';
import { DashboardIcon, SettingsIcon, UsersIcon } from 'aura-glass/icons/navigation';
import { GlassButton, GlassCard } from 'aura-glass';
import 'aura-glass/styles';
```

## Components

| Component | Role | Notable props |
| --- | --- | --- |
| `GlassAppShell` | Page frame | `topBar`, `sidebar`, `actionBar`, `statusBar`, `sidebarPlacement` (`left` \| `right`), `density` (`compact` \| `comfortable` \| `spacious`) |
| `GlassTopBar` | Sticky header | `brand`, `navigation`, `actions`, `sticky` (default `true`) |
| `GlassSidebarRail` | Icon-only nav | `items: { id, label, icon?, active?, disabled?, onSelect? }[]`, `aria-label` |
| `GlassSidebarPanel` | Collapsible labeled aside | `title`, `footer`, `collapsed` |
| `GlassMain` | Landmark main column | standard main element props |
| `GlassPage` | Constrained page column | `constrained` (default `true`, max width `7xl`) |
| `GlassPageHeader` | Title block | `eyebrow`, `title`, `description`, `actions` |
| `GlassBreadcrumbs` | Breadcrumb nav | `items: { label, href? }[]` |
| `GlassActionBar` | In-content toolbar row | children |
| `GlassSplitPane` | Two-pane grid | `ratio` (`third` \| `half` \| `two-thirds`), `direction` (`horizontal` \| `vertical`) |
| `GlassResizablePanel` | Sized pane | `minSize` (default `220`), `maxSize` (default `1fr`) |
| `GlassCommandDock` | Search / command strip | `input`, `actions` |
| `GlassStatusBar` | Footer status (`role="status"`) | children |
| `GlassMobileShell` | Mobile frame | `topBar`, `bottomBar` |
| `GlassIconButton` | Square icon control | required `label` (used as `aria-label`) |

## Desktop shell

```tsx
export function AdminShell() {
  const nav = [
    { id: 'dash', label: 'Dashboard', icon: <DashboardIcon aria-hidden="true" />, active: true },
    { id: 'users', label: 'Users', icon: <UsersIcon aria-hidden="true" /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon aria-hidden="true" /> },
  ];

  return (
    <GlassAppShell
      density="comfortable"
      sidebarPlacement="left"
      topBar={
        <GlassTopBar
          brand={<strong>Northstar</strong>}
          actions={<GlassButton size="sm">Invite member</GlassButton>}
        />
      }
      sidebar={
        <>
          <GlassSidebarRail items={nav} aria-label="Primary navigation" />
          <GlassSidebarPanel title="Workspace">
            Accounts, billing, and members
          </GlassSidebarPanel>
        </>
      }
      actionBar={<GlassActionBar>Filters and bulk actions</GlassActionBar>}
      statusBar={<GlassStatusBar>Ready</GlassStatusBar>}
    >
      <GlassMain>
        <GlassPage>
          <GlassBreadcrumbs
            items={[
              { label: 'Admin', href: '/admin' },
              { label: 'Revenue' },
            ]}
          />
          <GlassPageHeader
            eyebrow="Operations"
            title="Revenue"
            description="Workspace billing and plan usage."
          />
          <GlassCard>Revenue operations</GlassCard>
        </GlassPage>
      </GlassMain>
    </GlassAppShell>
  );
}
```

`GlassAppShell` lays out `topBar`, then a body row (`sidebar` + `actionBar` + children), then `statusBar`. Density only changes the frame gap and padding (`compact` / `comfortable` / `spacious`).

## Mobile shell

```tsx
export function MobileAdmin() {
  return (
    <GlassMobileShell
      topBar={<GlassTopBar brand={<strong>Northstar</strong>} sticky={false} />}
      bottomBar={<GlassStatusBar>3 unread</GlassStatusBar>}
    >
      <GlassPage constrained={false}>
        <GlassPageHeader title="Inbox" />
      </GlassPage>
    </GlassMobileShell>
  );
}
```

`GlassMobileShell` is a three-row grid (`topBar` / scrollable `<main>` / `bottomBar`). It does not reuse the desktop sidebar props.

## Workspace chrome

Multi-panel product rooms (inspector, canvas, timeline, workflow shell) live on `aura-glass/workspace`. That same runtime is also exported as `aura-glass/workflows`. See [workflows](../workflows/readme.md).

## Older root `GlassAppShell`

`import { GlassAppShell } from 'aura-glass'` still works. That component accepts `header`, `sidebar`, `footer`, `variant`, `collapsible`, and related layout props. Do not mix those prop names with the `aura-glass/app-shell` frame.

## Migration from MUI layout

When replacing MUI `AppBar`, `Toolbar`, `Drawer`, `Container`, and `Grid`, migrate in vertical slices: outer `GlassAppShell`, then `GlassTopBar` / `GlassSidebarRail`, then page content. AuraGlass does not claim full MUI enterprise layout parity.

Related pages: [MUI migration](../migration/mui-to-auraglass.md), [icons](../icons/readme.md), [theme](../theme/theme-engine.md).
