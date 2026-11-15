"use client";

import { useEffect, useState } from "react";
import { formatTimecode } from "@/lib/format";

/**
 * Live editor timecode — HH:MM:SS:FF at 25 fps, counting up from
 * 00:00:00:00 while the page is open. Pauses when the tab is hidden
 * (rAF stops) and respects reduced motion (stays at 00:00:00:00).
 */
export default function Timecode({ className = "" }: { className?: string }) {
  const [frames, setFrames] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const loop = (now: number) => {
      acc += now - last;
      last = now;
      if (acc >= 40) {
        // 25 fps = one frame every 40ms
        setFrames((f) => f + Math.floor(acc / 40));
        acc = acc % 40;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <span className={`font-mono tabular-nums ${className}`} aria-label="Live timecode">
      <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent align-middle" />
      TC {formatTimecode(frames)}
    </span>
  );
}
