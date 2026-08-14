#!/usr/bin/env python3
"""Build deterministic recipe tint metrics and four review contact sheets."""

from __future__ import annotations

import json
import math
from collections import deque
from datetime import datetime, timezone
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[3]
EVIDENCE = ROOT / "reports" / "audit" / "visual-all"
OUT = ROOT / "reports" / "audit" / "recipe-final"
VIEWPORTS = ("desktop", "tablet", "mobile", "320")


def census(path: Path) -> dict:
    image = Image.open(path).convert("RGBA")
    width, height = image.size
    step = max(2, min(width, height) // 180)
    columns = math.ceil(width / step)
    rows = math.ceil(height / step)
    colored_grid = bytearray(columns * rows)
    sampled = colored = tinted = cool = warm = 0
    chroma_sum = neutral_chroma_sum = 0.0
    pixels = image.load()
    for gy, y in enumerate(range(0, height, step)):
        for gx, x in enumerate(range(0, width, step)):
            r, g, b, a = pixels[x, y]
            if a / 255 < 0.1:
                continue
            sampled += 1
            maximum, minimum = max(r, g, b), min(r, g, b)
            chroma = maximum - minimum
            light = 0.2126 * r + 0.7152 * g + 0.0722 * b
            chroma_sum += chroma
            if chroma >= 14:
                colored += 1
                colored_grid[gy * columns + gx] = 1
            if light >= 148 and chroma >= 8:
                tinted += 1
                neutral_chroma_sum += chroma
            cool_delta = b - r + max(0, g - r) * 0.45
            warm_delta = r - b + max(0, r - g) * 0.35
            if chroma >= 8 and cool_delta >= 7:
                cool += 1
            if chroma >= 8 and warm_delta >= 7:
                warm += 1

    seen = bytearray(len(colored_grid))
    regions = 0
    for index, value in enumerate(colored_grid):
        if not value or seen[index]:
            continue
        size = 0
        queue = deque([index])
        seen[index] = 1
        while queue:
            current = queue.pop()
            size += 1
            x, y = current % columns, current // columns
            for nxt in (current - 1, current + 1, current - columns, current + columns):
                if nxt < 0 or nxt >= len(colored_grid) or seen[nxt] or not colored_grid[nxt]:
                    continue
                nx, ny = nxt % columns, nxt // columns
                if abs(nx - x) + abs(ny - y) != 1:
                    continue
                seen[nxt] = 1
                queue.append(nxt)
        if size >= 4:
            regions += 1

    colored_ratio = colored / max(1, sampled)
    tinted_ratio = tinted / max(1, sampled)
    cool_ratio = cool / max(1, sampled)
    warm_ratio = warm / max(1, sampled)
    mean_chroma = chroma_sum / max(1, sampled)
    dominant = (
        "cool" if cool_ratio >= 0.12 and cool_ratio > warm_ratio * 1.35
        else "warm" if warm_ratio >= 0.12 and warm_ratio > cool_ratio * 1.35
        else "mixed" if colored_ratio >= 0.16
        else "neutral"
    )
    failed = (
        colored_ratio > 0.18
        or tinted_ratio > 0.28
        or (dominant != "neutral" and mean_chroma > 9)
    )
    return {
        "width": width,
        "height": height,
        "step": step,
        "sampledPixels": sampled,
        "coloredPixels": colored,
        "coloredAreaRatio": colored_ratio,
        "tintedNeutralPixels": tinted,
        "tintedNeutralRatio": tinted_ratio,
        "coolPixels": cool,
        "warmPixels": warm,
        "dominantCast": dominant,
        "meanChroma": mean_chroma,
        "meanNeutralChroma": neutral_chroma_sum / max(1, tinted),
        "localizedColoredRegions": regions,
        "detectorStatus": "fail" if failed else "pass",
    }


def contact_sheet(rows: list[dict], viewport: str) -> Path:
    tile_w, tile_h, label_h = 420, 300, 34
    columns = 4
    sheet_rows = math.ceil(len(rows) / columns)
    sheet = Image.new("RGB", (columns * tile_w, sheet_rows * (tile_h + label_h)), "#e5e5e5")
    draw = ImageDraw.Draw(sheet)
    font = ImageFont.load_default(size=16)
    for index, row in enumerate(rows):
        image = Image.open(ROOT / row["file"]).convert("RGB")
        image.thumbnail((tile_w - 12, tile_h - 12), Image.Resampling.LANCZOS)
        x = (index % columns) * tile_w
        y = (index // columns) * (tile_h + label_h)
        px = x + (tile_w - image.width) // 2
        py = y + (tile_h - image.height) // 2
        sheet.paste(image, (px, py))
        status = row["census"]["detectorStatus"].upper()
        color = "#9b1c1c" if status == "FAIL" else "#14532d"
        draw.text((x + 8, y + tile_h + 7), f'{row["id"]} [{status}]', fill=color, font=font)
    output = OUT / f"contact-sheet-{viewport}.png"
    sheet.save(output)
    return output


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    recipe_ids = sorted(path.name.removeprefix("recipe-") for path in EVIDENCE.glob("recipe-*") if path.is_dir())
    frames = []
    missing = []
    for recipe_id in recipe_ids:
        for viewport in VIEWPORTS:
            screenshot = EVIDENCE / f"recipe-{recipe_id}" / f"{viewport}.png"
            computed = EVIDENCE / f"recipe-{recipe_id}" / f"{viewport}.computed-styles.json"
            if not screenshot.exists() or not computed.exists():
                missing.append({"id": recipe_id, "viewport": viewport})
                continue
            frames.append({
                "id": recipe_id,
                "viewport": viewport,
                "file": screenshot.relative_to(ROOT).as_posix(),
                "computedStyles": computed.relative_to(ROOT).as_posix(),
                "census": census(screenshot),
            })
    contacts = []
    for viewport in VIEWPORTS:
        output = contact_sheet([frame for frame in frames if frame["viewport"] == viewport], viewport)
        contacts.append(output.relative_to(ROOT).as_posix())
    payload = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "algorithm": "whole-frame census copied from token-purity-layout-audit.spec.ts",
        "thresholds": {"coloredAreaRatio": 0.18, "tintedNeutralRatio": 0.28, "dominantMeanChroma": 9},
        "recipeCount": len(recipe_ids),
        "expectedFrameCount": len(recipe_ids) * len(VIEWPORTS),
        "actualFrameCount": len(frames),
        "missing": missing,
        "detectorFailureCount": sum(frame["census"]["detectorStatus"] == "fail" for frame in frames),
        "contactSheets": contacts,
        "frames": frames,
    }
    (OUT / "pixel-census.json").write_text(json.dumps(payload, indent=2) + "\n")
    print(json.dumps({key: payload[key] for key in ("recipeCount", "expectedFrameCount", "actualFrameCount", "missing", "detectorFailureCount", "contactSheets")}, indent=2))


if __name__ == "__main__":
    main()
