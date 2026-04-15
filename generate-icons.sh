#!/usr/bin/env bash
set -euo pipefail

SVG="circle-sort.svg"
OUT="images"

mkdir -p "$OUT"

for size in 16 32 48 128 256 512; do
  rsvg-convert -w "$size" -h "$size" "$SVG" -o "${OUT}/icon-${size}.png"
done

echo "Done: $(ls -1 "$OUT"/icon-*.png)"
