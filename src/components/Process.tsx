"use client";

import Reveal, { SectionLabel } from "./Reveal";

const STEPS = [
  {
    title: "Brief",
    detail: "You send the footage and the goal. We agree on the story, the style and the deadline before a single cut.",
  },
  {
    title: "Rough Cut",
    detail: "Structure first — the best takes, in the right order, with the pacing that carries the story.",
  },
  {
    title: "Polish",
    detail: "Colour, sound, captions and motion graphics. The details that make a good edit feel finished.",
  },
  {
    title: "Delivery",
    detail: "Final exports in the formats you need — 9:16, 16:9, or both — plus a round of revisions.",
  },
];

/** 4-step horizontal timeline. */
export default function Process() {
  return (
    <section id="process" className="border-t border-hairline">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <SectionLabel index="04" title="Process" />
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
            How a project runs<span className="text-accent">.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
            {/* Timeline line */}
            <span aria-hidden className="absolute left-0 right-0 top-[5px] hidden h-px bg-hairline md:block" />
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative">
                <span
                  aria-hidden
                  className="relative z-10 mb-5 block h-[11px] w-[11px] rounded-full border-2 border-accent bg-ink"
                />
                <p className="font-mono text-[11px] uppercase tracking-widest2 text-muted">
                  Step {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold">{s.title}</h3>
                <p className="mt-2 max-w-xs leading-relaxed text-muted">{s.detail}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
