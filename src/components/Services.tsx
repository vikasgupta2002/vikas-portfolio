"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal, { SectionLabel } from "./Reveal";

/**
 * Minimal expandable rows. Descriptions are drafts written from the
 * brief — edit them in this file to match how you actually work.
 */
const SERVICES = [
  {
    title: "Video Editing",
    detail:
      "Full edits from raw footage to final export — structure, pacing, rhythm and clean cuts, in Premiere Pro. Long-form YouTube, talking-head and documentary-style pieces.",
    meta: "Premiere Pro · DaVinci-ready handoff",
  },
  {
    title: "Reels & Shorts",
    detail:
      "Vertical 9:16 cuts built to hook in the first 2 seconds: punchy pacing, captions, jump cuts and sound design that keep people watching to the end.",
    meta: "9:16 · 30–60s · Captions included",
  },
  {
    title: "Motion Graphics",
    detail:
      "Titles, lower thirds, animated logos and transitions in After Effects — movement that explains, not decoration that distracts.",
    meta: "After Effects · Titles · Transitions",
  },
  {
    title: "Color Grading",
    detail:
      "Consistent, cinematic colour across a whole video: exposure and white-balance correction, a clean grade, and skin tones that stay natural.",
    meta: "Correction · Grade · LUTs",
  },
  {
    title: "Sound Design",
    detail:
      "Music selection, SFX, clean dialogue and level balancing — audio that carries the edit instead of fighting it.",
    meta: "Mix · SFX · Music",
  },
  {
    title: "Subtitles & Captions",
    detail:
      "Accurate, well-timed subtitles and animated captions in your style — so videos work with the sound off, which is how most people watch them.",
    meta: "Burned-in · SRT · Animated",
  },
];

export default function Services() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section id="services" className="border-t border-hairline">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <SectionLabel index="03" title="Services" />
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
            What I do<span className="text-accent">.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 border-t border-hairline">
            {SERVICES.map((s, i) => {
              const isOpen = open === i;
              return (
                <div key={s.title} className="border-b border-hairline">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`service-${i}`}
                    className="flex w-full items-center justify-between gap-4 py-6 text-left"
                  >
                    <span className="flex items-baseline gap-4 md:gap-8">
                      <span className="font-mono text-xs text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-xl font-medium md:text-3xl">
                        {s.title}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={`grid h-9 w-9 shrink-0 place-items-center border transition-colors duration-150 ${
                        isOpen ? "border-accent text-accent" : "border-hairline text-muted"
                      }`}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`service-${i}`}
                        initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                        exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-7 pl-8 pr-4 md:pl-16">
                          <p className="max-w-2xl leading-relaxed text-muted">{s.detail}</p>
                          <p className="mt-3 font-mono text-[10px] uppercase tracking-widest2 text-accent">
                            {s.meta}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
