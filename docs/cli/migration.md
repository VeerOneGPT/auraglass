# CLI

The package binary is `aura-glass` (`bin/aura-glass.cjs`). It lists and scaffolds recipes, audits forbidden core-UI dependencies, and reports or rewrites Lucide / Radix / MUI imports.

```bash
npx aura-glass --help
```

## Commands

```txt
aura-glass list [--json]
aura-glass info <recipe> [--json]
aura-glass add <recipe|all> [--cwd <dir>] [--out <dir>] [--dry-run] [--force] [--json]
aura-glass audit deps [--cwd <dir>] [--json]
aura-glass audit imports [--cwd <dir>] [--json]
aura-glass migrate icons --from lucide [--cwd <dir>] [--dry-run] [--write] [--json]
aura-glass migrate radix [--cwd <dir>] [--dry-run] [--write] [--json]
aura-glass migrate mui [--cwd <dir>] [--dry-run] [--write] [--json]
aura-glass doctor [--cwd <dir>] [--json]
```

### Recipes

```bash
npx aura-glass list
npx aura-glass info saas-dashboard
npx aura-glass add saas-admin-shell --out src/components/auraglass/recipes
npx aura-glass add all --dry-run --json
```

Recipe IDs and provider-safe behavior are documented in [recipes/readme.md](../recipes/readme.md).

### Audit and migrate

```bash
npx aura-glass audit deps --json
npx aura-glass audit imports --cwd apps/web
npx aura-glass migrate icons --from lucide --dry-run
npx aura-glass migrate icons --from lucide --write
npx aura-glass migrate radix --json
npx aura-glass migrate mui --json
npx aura-glass doctor --json
```

`migrate icons --from lucide` rewrites known named imports when `--write` is passed. `migrate radix` and `migrate mui` are report-first: they do not silently replace layout or behavior.

The audit commands flag Lucide, Radix, and MUI / Material packages and point at AuraGlass replacements. The exact package names and before/after import examples live on the migration pages:

- [Lucide → AuraGlass icons](../migration/lucide-to-auraglass-icons.md)
- [Radix → AuraGlass primitives](../migration/radix-to-auraglass.md)
- [MUI → AuraGlass app chrome](../migration/mui-to-auraglass.md)

## Recommended order

1. `aura-glass audit deps` and remove forbidden production dependencies.
2. `aura-glass audit imports` to list source hits.
3. `aura-glass migrate icons --from lucide --dry-run`, then `--write`.
4. Replace Radix surfaces one component at a time.
5. Replace MUI app shell, forms, overlays, and workflow surfaces by route.
6. `aura-glass doctor`.

Related pages: [icons](../icons/readme.md), [MUI migration](../migration/mui-to-auraglass.md), [Radix migration](../migration/radix-to-auraglass.md), [Lucide migration](../migration/lucide-to-auraglass-icons.md).
