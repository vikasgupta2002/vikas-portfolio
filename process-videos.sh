#!/bin/bash
set -e
cd ~/workspace/vikas-portfolio
mkdir -p public/videos public/thumbs public/previews
# slugify function
slugify() {
  echo "$1" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//'
}
for src in raw-videos/*.mp4; do
  base=$(basename "$src" .mp4)
  slug=$(slugify "$base")
  echo "=== $base -> $slug ==="
  # 1. Compressed web video: H.264 CRF 26, max 1080 wide, AAC, faststart
  ffmpeg -y -v error -i "$src" -vf "scale='min(1080,iw)':-2" -c:v libx264 -crf 26 -preset medium -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart "public/videos/${slug}.mp4"
  # 2. Thumbnail at ~1s, 720w JPG
  ffmpeg -y -v error -ss 1 -i "$src" -vframes 1 -vf "scale=720:-2" -q:v 3 "public/thumbs/${slug}.jpg"
  # 3. 4s muted silent hover preview, 540w, CRF 28
  ffmpeg -y -v error -i "$src" -t 4 -an -vf "scale=540:-2" -c:v libx264 -crf 28 -preset veryfast -pix_fmt yuv420p -movflags +faststart "public/previews/${slug}.mp4"
  echo "done $slug : $(du -h public/videos/${slug}.mp4 | cut -f1) video, $(du -h public/previews/${slug}.mp4 | cut -f1) preview"
done
echo "--- TOTALS ---"
du -sh public/videos public/thumbs public/previews
ls -lh public/videos/ public/thumbs/ public/previews/
