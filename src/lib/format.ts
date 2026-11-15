/** Format seconds as M:SS, e.g. 47 -> "0:47", 125 -> "2:05". */
export function formatDuration(seconds: number): string {
  const s = Math.round(seconds);
  const m = Math.floor(s / 60);
  const rest = s % 60;
  return `${m}:${rest.toString().padStart(2, "0")}`;
}

/** "Video-26817" -> "Video 26817"; "talking head vikas" -> "Talking Head Vikas". */
export function cleanTitle(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim();
  return base
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}
