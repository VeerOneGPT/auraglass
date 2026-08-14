# AuraGlass certification completion matrix — current-tree audit

Audited: 2026-08-13 (America/Los_Angeles)

This is a diagnostic status report, not a certification artifact. It compares the
requirements in `pasted-text-1.txt` with the current worktree and current reports.
Product source was not changed by this audit.

## Executive result

The audit is **not complete**. Inventory and all six ordered static gates are
currently green, and the prescribed recipe-render command has current 28/28
evidence. The authoritative runtime/final evidence is stale and now fails its own
provenance verifier: `node scripts/audit/verify-visual-evidence.js` reports
`0/498` verified because the stored full-run manifest hashes no longer match the
current inventory artifacts. The stored source fingerprint also differs from a
recalculation over the manifest's declared source inputs.

## Requirement matrix

| Section | Requirement | Current state | Authoritative evidence / missing proof |
| --- | --- | --- | --- |
| 1 | Run public-export audit, then API-surface audit | **PASS, current** | Both regenerated 2026-08-13 15:23 local. `reports/public-export-audit.json`; `reports/api-surface-audit.json`. |
| 1 | Current component-like inventory and stale-439 discrepancy | **PASS** | 470 visual component-like exports and one explicitly nonvisual export. The discrepancy is +31 against the 470 visual exports, or +32 for the 471-export scope used by the runtime summary. There are 28 recipes, so 498 screenshot-required targets. |
| 1 | Zero missing source/declaration/story | **PASS** | `missingSourceCount: 0`, `missingDeclarationCount: 0`, `componentExportsMissingDirectStoryCount: 0`, `unclassifiedVisualTargetCount: 0`. |
| 1 | Per-viewport evidence for every export | **STALE / FAIL** | Existing 470-export evidence predates the latest source/style changes. Current verifier invalidates all 498 visual items because the run-manifest inventory hashes are stale. A new source-frozen runtime capture is required. |
| 2 | Canonical token files agree; canonical blur/filter/fill/border/sheen/text/persona invariants | **STATICALLY GREEN; RUNTIME PROOF MISSING** | The current ordered token/style/persona/pipeline/scanner gates all pass. However section 2 explicitly also requires agreement with every rendered export/recipe, and the only complete computed-style runtime evidence is stale. The full runtime rerun is required before section 2 can be certified. |
| 3 | `npm run lint:tokens` | **PASS, current** | Exit 0; 29 files; zero violations. |
| 3 | `npm run lint:styles` | **PASS, current** | Exit 0; 1,222 files; zero issues. |
| 3 | `npm run glass:validate-persona-css` | **PASS, current** | Exit 0. |
| 3 | `npm run glass:validate` | **PASS, current** | Exit 0; 31/31 checks, zero warnings/failures. |
| 3 | `node scripts/glass-violation-scanner.js` | **PASS, current** | Exit 0; 0 definite violations and 0 blocking triage. |
| 3 | `node scripts/ci/audit-css-var-coverage.js` | **PASS, current** | Exit 0; 0 bare variables without fallback. The reported 119 orphan names all have a fallback somewhere and are not blocking under the specification. |
| 4 | `node scripts/ci/verify-recipes-render.js` | **PASS, current snapshot** | Regenerated 2026-08-13 15:31 local: `passed: true`, `recipeCount: 28`, 28 screenshots. Must be rerun if product/recipe source changes again. |
| 4 / expanded user scope | Four-viewport recipe review including 320px | **FAIL** | `reports/audit/recipe-final/320-capture-summary.json` currently lists 14/28 recipes with 320px layout findings. This 320px gate exceeds the pasted spec's three viewports but is required by the user's expanded four-viewport review. |
| 5 | Explicit live-server token-purity/layout spec over all 470 exports + 28 recipes | **MISSING AFTER CURRENT EDITS** | Must run the exact `STORYBOOK_URL=http://localhost:6006 npx playwright test ... --workers=1 --reporter=list` command after source freeze. Current `reports/audit/audit-summary.json` is from the prior source state. |
| 5 | `npm run test:visual:ci` | **MISSING / STALE** | No current successful result artifact proving the post-edit tree. |
| 5 | `npm run test:visual:matrix` | **MISSING** | `test-results/visual-matrix-results.json` is absent. Must run Chromium, Firefox, WebKit, and Mobile Safari matrix after source freeze. |
| 5 | Storybook visual certification guardrail | **STALE AND NARROWER THAN CURRENT AUTHORITY** | `reports/glassmorphism-storybook-visual-certification.json` is based on `reports/component_inventory.json` with 356 entries and 712 desktop/mobile screenshots. It predates the 470-export authority and current edits. Regenerate and verify zero missing stories/blocked items. The guardrail currently has no `missingStoryCount` field; absence is not proof of zero. |
| 5 | Valid atomic screenshot/computed-style evidence | **FAIL** | Current `node scripts/audit/verify-visual-evidence.js` result: 0 passed, 498 failed. Stored public-export and visual-target hashes do not match current artifacts. Stored fingerprint `sha256:2df81c...` differs from current recalculation `sha256:1c5640...`. |
| 6 | Remediate only proven shipped-source violations; rerun sections 3–5 | **INCOMPLETE** | Static violations are now zero, but runtime must be rerun. The user-expanded 320 recipe audit still has 14 findings requiring classification/remediation and fresh evidence. No story/decorator-only source was modified by this diagnostic audit. |
| 7 | Current `audit-summary.json`, `.md`, and `triage.md` for every ID | **STALE / FAIL** | All three were generated before the current source and inventory artifacts. The JSON's embedded matrix evidence cites an old 356-item certification, a then-failing visual summary, and an absent matrix result, while its top-level count claims 498 passed. Regenerate only from a successful current full run. |
| 7 | `npm run audit:components` + runtime spec exit 0 | **PARTIAL** | `npm run audit:components` exits 0, but it reads the legacy 356-component inventory and is intentionally non-failing by implementation. The authoritative runtime spec has not passed on the current frozen source. Both must be recorded, and the runtime spec is the blocking evidence. |

## Exact remaining prescribed commands

After source is frozen and any 320px remediation is complete:

1. Rerun the two section-1 inventory commands if source/export/story resolution changed.
2. Rerun all six section-3 commands in order.
3. Rerun `node scripts/ci/verify-recipes-render.js`.
4. Run the exact live-server runtime spec against port 6006.
5. Run `npm run test:visual:ci`.
6. Run `npm run test:visual:matrix` and require a successful
   `test-results/visual-matrix-results.json`.
7. Run `STORYBOOK_URL=http://localhost:6006 node scripts/audit/storybook-visual-certification.mjs` and verify its inventory/coverage semantics against the current authority.
8. Run `node scripts/audit/verify-visual-evidence.js`; require 498/498 with matching inventory hashes and source fingerprint.
9. Run `npm run audit:components` and the runtime spec with exit code zero.
10. Inspect regenerated `audit-summary.json`, `audit-summary.md`, and `triage.md` requirement by requirement before certifying completion.

## Additional all-story/docs census

The live Storybook index currently exposes 1,598 story entries and 89 docs
entries. The separate all-story/docs four-viewport tint census is a user-requested
expansion beyond the pasted specification's authoritative 498-target gate. Its
current partial ledger has 4,875 rows and is not a final, source-frozen completion
artifact. It therefore cannot be used to claim that every Storybook view has been
reviewed.
