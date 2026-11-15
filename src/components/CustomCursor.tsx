"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom cursor: a small cyan dot + trailing ring.
 * Over video cards ([data-cursor="play"]) it grows into a
 * "PLAY" circle. Disabled on touch devices and when the user
 * prefers reduced motion — the native cursor stays in that case.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<"default" | "play" | "link">("default");
  const [pressed, setPressed] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 400, damping: 35, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 400, damping: 35, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-fine");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      if (t.closest('[data-cursor="play"]')) setVariant("play");
      else if (t.closest("a, button")) setVariant("link");
      else setVariant("default");
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      document.documentElement.classList.remove("cursor-none-fine");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = variant === "play" ? 76 : variant === "link" ? 44 : 12;
  return (
    <>
      {/* Dot — follows instantly */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] rounded-full bg-accent"
        style={{ x, y, width: 6, height: 6, translateX: "-50%", translateY: "-50%" }}
      />
      {/* Ring — springs behind, becomes the PLAY circle */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[89] flex items-center justify-center rounded-full border border-accent/80"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          scale: pressed ? 0.85 : 1,
          backgroundColor:
            variant === "play" ? "rgba(0,229,255,0.92)" : "rgba(0,229,255,0)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
      >
        <span
          className={`font-mono text-[10px] font-medium tracking-widest2 text-ink transition-opacity duration-150 ${
            variant === "play" ? "opacity-100" : "opacity-0"
          }`}
        >
          PLAY
        </span>
      </motion.div>
    </>
  );
}
