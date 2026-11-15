"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * Timeline-style scroll progress bar pinned to the very top —
 * the page as an editing timeline, with a cyan playhead.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const left = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[80] h-[2px] bg-white/10"
    >
      <motion.div
        className="h-full origin-left bg-accent"
        style={{ scaleX }}
      />
      {/* playhead tick */}
      <motion.div
        className="absolute top-0 h-[10px] w-[2px] -translate-x-1/2 bg-accent"
        style={{ left }}
      />
    </div>
  );
}
