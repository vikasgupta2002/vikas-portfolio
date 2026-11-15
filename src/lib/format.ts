/** Format seconds as M:SS, e.g. 47 -> "0:47", 125 -> "2:05". */
export function formatDuration(seconds: number): string {
  const s = Math.round(seconds);
  const m = Math.floor(s / 60);
  const rest = s % 60;
  return `${m}:${rest.toString().padStart(2, "0")}`;
}

/** Format a frame count as an editor timecode HH:MM:SS:FF (25 fps). */
export function formatTimecode(totalFrames: number, fps = 25): string {
  const frames = totalFrames % fps;
  const totalSeconds = Math.floor(totalFrames / fps);
  const s = totalSeconds % 60;
  const m = Math.floor(totalSeconds / 60) % 60;
  const h = Math.floor(totalSeconds / 3600);
  const p = (n: number) => n.toString().padStart(2, "0");
  return `${p(h)}:${p(m)}:${p(s)}:${p(frames)}`;
}

/** "Video-26817" -> "Video 26817"; "talking head vikas" -> "Talking Head Vikas". */
export function cleanTitle(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim();
  return base
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}
