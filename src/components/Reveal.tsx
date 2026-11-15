"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** Fade-up on scroll — the one restrained entrance used site-wide. */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Small mono section label, e.g. "01 — WORK". */
export function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-widest2 text-accent">
      {index} <span className="mx-2 text-white/30">/</span>
      <span className="text-muted">{title}</span>
    </p>
  );
}
