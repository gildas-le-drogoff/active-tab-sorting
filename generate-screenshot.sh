#!/usr/bin/env bash
set -euo pipefail

SVG="circle-sort.svg"
OUT="store-images"

mkdir -p "$OUT"

rsvg-convert --dpi-x=300 --dpi-y=300 -w 800 -h 800 "$SVG" -o /tmp/icon-big.png

# Screenshot 1280x800
magick -size 1280x800 xc:'#1a1a2e' \
  /tmp/icon-big.png -gravity center -geometry 400x400+0+0 -composite \
  -alpha off "$OUT/screenshot-1280x800.png"

# Screenshot 640x400
magick -size 640x400 xc:'#1a1a2e' \
  /tmp/icon-big.png -gravity center -geometry 200x200+0+0 -composite \
  -alpha off "$OUT/screenshot-640x400.png"

# Small promo 440x280
magick -size 440x280 xc:'#1a1a2e' \
  /tmp/icon-big.png -gravity center -geometry 180x180+0+0 -composite \
  -alpha off "$OUT/promo-small-440x280.png"

# Large promo 1400x560
magick -size 1400x560 xc:'#1a1a2e' \
  /tmp/icon-big.png -gravity center -geometry 360x360+0+0 -composite \
  -alpha off "$OUT/promo-large-1400x560.png"

rm /tmp/icon-big.png

echo "Done: $(ls -1 "$OUT"/)"
