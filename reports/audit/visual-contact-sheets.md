# Full visual contact-sheet review

The generator in this directory turns one complete, atomic `reports/audit/visual-all` run into manageable labeled contact sheets and an index that links every original screenshot. It does not edit, copy over, crop, replace, or add files beneath the evidence root. A post-render SHA-256 check also fails if a source PNG, sidecar, or the manifest changes while output is being built.

## Prerequisites

- `reports/audit/visual-all/visual-run-manifest.json` exists and declares a full run.
- The manifest matches the current authoritative public-export, public visual-target, and recipe inventory hashes, and its source fingerprint matches those reports plus every audited source/test input.
- The evidence root contains exactly 498 declared visual directories: 470 exports and 28 recipes.
- Every visual target has exactly the expected desktop, tablet, and mobile PNG, for 1,494 PNGs total.
- Every PNG has the expected viewport dimensions and a companion computed-style JSON file carrying the same run, item, provenance, and viewport identity.
- ImageMagick 7 is available as `magick` when rendering. Dry-run validation does not require it.

The generator deliberately fails on missing, extra, partial, or mixed-run evidence. It does not accept a directory scan as a substitute for the full-run manifest.

## Commands

Validate without writing anything:

```sh
node reports/audit/generate-visual-contact-sheets.js --dry-run
```

Generate the review set after dry-run passes:

```sh
node reports/audit/generate-visual-contact-sheets.js
```

The generated entry points are:

- `reports/audit/visual-contact-sheets/index.html` — searchable, filterable index and contact-sheet gallery.
- `reports/audit/visual-contact-sheets/index.md` — portable Markdown index.
- `reports/audit/visual-contact-sheets/inventory.json` — exact file inventory, full SHA-256 hashes, run provenance, status, and sheet mapping.
- `reports/audit/visual-contact-sheets/sheets/{export,recipe}/{desktop,tablet,mobile}/` — labeled JPEG contact sheets in deterministic ID order, 24 screenshots per batch by default.

Every original PNG is linked from both indexes. Sheet labels show the kind ordinal, target ID, viewport, dimensions, and same-run automated verifier result (`PASS`, `FAIL`, or `UNVERIFIED`). A missing, stale, or malformed `visual-summary.json` never hides the screenshots: sheets are clearly marked `UNVERIFIED`, while same-run failures remain visibly labeled and their reasons are retained in the indexes and JSON inventory.

## Optional layout controls

```sh
node reports/audit/generate-visual-contact-sheets.js \
  --batch-size 20 \
  --columns 4 \
  --font /absolute/path/to/monospace-font.ttf
```

Custom evidence and output roots are supported for fixture testing with `--root` and `--output`. Output must remain a dedicated directory below `reports/audit` and cannot contain or sit inside the evidence root, so generation never alters the verifier's exact evidence-tree inventory.

## Review semantics

Generation validates provenance and makes the evidence navigable. It is not itself an assertion that all 1,494 images were manually viewed or visually approved. A reviewer should open `index.html`, inspect every batch at all three viewports, open any suspicious original PNG at full resolution, and record the human findings separately. Automated verifier failures are displayed rather than filtered out.
