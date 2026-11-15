"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import Reveal, { SectionLabel } from "./Reveal";

const TOOLS = [
  { name: "Adobe Premiere Pro", note: "Editing · Timeline · Sequences" },
  { name: "Adobe After Effects", note: "Motion · Titles · VFX" },
];

/** Animated counter: counts 0 → 2.2 once the section is in view. */
function ExperienceCounter() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(2.2);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1200);
      setValue(2.2 * (1 - Math.pow(1 - t, 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce]);

  return (
    <span ref={ref} className="font-display text-7xl font-bold leading-none tracking-tight md:text-8xl">
      {value.toFixed(1)}
      <span className="text-accent">+</span>
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="border-t border-hairline">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-12 md:px-8 md:py-32">
        <Reveal className="md:col-span-5">
          <SectionLabel index="02" title="About" />
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
            The editor behind the cut<span className="text-accent">.</span>
          </h2>
          <div className="mt-10 border-l-2 border-accent pl-6">
            <ExperienceCounter />
            <p className="mt-3 font-mono text-[11px] uppercase tracking-widest2 text-muted">
              Years Experience
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-7">
          <p className="text-xl leading-relaxed text-paper/90 md:text-2xl">
            I turn raw footage into stories that hold attention — pacing,
            rhythm and clean cuts first, effects only when they earn their place.
          </p>
          <p className="mt-5 max-w-xl leading-relaxed text-muted">
            For the past 2.2 years I&apos;ve cut reels, YouTube videos and ads
            that people actually finish watching. Every project starts with the
            story, not the timeline — then I build the edit around the one
            moment the viewer has to remember.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {TOOLS.map((t) => (
              <div key={t.name} className="border border-hairline p-5">
                <p className="font-display text-base font-semibold">{t.name}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest2 text-muted">
                  {t.note}
                </p>
              </div>
            ))}
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-hairline pt-6 text-center md:text-left">
            {[
              ["10", "Projects in reel"],
              ["2", "Editing tools"],
              ["100%", "On-time delivery*"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="font-display text-2xl font-bold">{v}</dd>
                <dd className="mt-1 font-mono text-[10px] uppercase tracking-widest2 text-muted">
                  {l}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 font-mono text-[10px] text-white/30">
            * PLACEHOLDER stat — update the numbers in src/components/About.tsx
            with your real counts.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
