"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { heroProject } from "@/data/projects";
import Timecode from "./Timecode";

/** Magnetic button — restrained: translates a few px toward the cursor, no scale. */
function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  return (
    <motion.a
      ref={ref}
      href="#work"
      onMouseMove={(e) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        ref.current.style.transform = `translate(${dx * 0.18}px, ${dy * 0.28}px)`;
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "translate(0,0)";
      }}
      className="inline-flex items-center gap-3 bg-accent px-7 py-4 font-mono text-xs uppercase tracking-widest2 text-ink transition-colors duration-150 hover:bg-paper"
    >
      {children}
    </motion.a>
  );
}

const NAME_LINES = ["VIKAS", "KUMAR", "GUPTA"];

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="bg-grid grain relative flex min-h-svh flex-col overflow-hidden"
      aria-label="Introduction"
    >
      {/* Muted looping background video — the talking-head clip */}
      {heroProject && (
        <motion.div style={reduce ? undefined : { y: bgY }} className="absolute inset-0" aria-hidden>
          <video
            className="h-full w-full object-cover opacity-35"
            src={heroProject.video}
            poster={heroProject.thumbnail}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            tabIndex={-1}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />
        </motion.div>
      )}

      <motion.div style={reduce ? undefined : { opacity: fade }} className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-10 pt-32 md:px-8">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-widest2 text-accent">
          Portfolio — 2026
          <span className="mx-3 text-white/30">/</span>
          <span className="text-muted">Premiere Pro · After Effects</span>
        </p>

        <h1 className="font-display text-[13.5vw] font-bold leading-[0.92] tracking-tight sm:text-[11vw] lg:text-[8.5rem]">
          {NAME_LINES.map((line, li) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.15 + li * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
                {li === 2 && <span className="text-accent">.</span>}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="max-w-md text-lg leading-relaxed text-paper/85"
          >
            Video Editor <span className="text-accent">/</span> Motion Storyteller
            <span className="mt-2 block text-base text-muted">
              Turning raw footage into stories that hold attention — frame by frame.
            </span>
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="flex items-center gap-6"
          >
            <Magnetic>
              View Work <span aria-hidden>↓</span>
            </Magnetic>
            <a
              href="#contact"
              className="font-mono text-xs uppercase tracking-widest2 text-muted underline-offset-4 transition-colors hover:text-paper hover:underline"
            >
              Hire Me
            </a>
          </motion.div>
        </div>

        {/* Bottom strip: timecode, scroll cue, counts */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.95 }}
          className="mt-14 flex items-center justify-between border-t border-hairline pt-4 font-mono text-[11px] uppercase tracking-widest2 text-muted"
        >
          <Timecode />
          <span className="hidden sm:inline">2.2+ yrs · 10 cuts</span>
          <a href="#work" className="flex items-center gap-2 text-muted transition-colors hover:text-accent" aria-label="Scroll to work">
            Scroll
            <span aria-hidden className="inline-block animate-bounce">↓</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
