"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import { formatDuration } from "@/lib/format";
import Reveal, { SectionLabel } from "./Reveal";
import VideoModal from "./VideoModal";

/** Frame-corner brackets on a video card — editor viewfinder cue. */
function Corners() {
  const base = "pointer-events-none absolute z-10 h-4 w-4 border-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100";
  return (
    <>
      <span aria-hidden className={`${base} left-2 top-2 border-l-2 border-t-2`} />
      <span aria-hidden className={`${base} right-2 top-2 border-r-2 border-t-2`} />
      <span aria-hidden className={`${base} bottom-2 left-2 border-b-2 border-l-2`} />
      <span aria-hidden className={`${base} bottom-2 right-2 border-b-2 border-r-2`} />
    </>
  );
}

function WorkCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (p: Project) => void;
}) {
  const previewRef = useRef<HTMLVideoElement>(null);
  // True once the preview clip has a frame ready to show. The clip
  // only fades in after this, so hovering never flashes to a black /
  // unloaded frame while the video is still fetching.
  const [previewReady, setPreviewReady] = useState(false);

  useEffect(() => {
    const v = previewRef.current;
    if (v && v.readyState >= 2) setPreviewReady(true);
  }, []);

  const playPreview = () => {
    const v = previewRef.current;
    if (!v || window.matchMedia("(hover: none)").matches) return;
    if (v.readyState >= 2) {
      v.play().catch(() => {});
    } else {
      // Not ready yet — start playing the moment the first frame
      // exists instead of fading in an empty video element.
      v.addEventListener("canplay", () => v.play().catch(() => {}), {
        once: true,
      });
    }
  };
  const stopPreview = () => {
    const v = previewRef.current;
    if (!v) return;
    // Pause only — do NOT seek back to 0. Seeking to the start forces
    // the next hover to flash through an unbuffered first frame.
    v.pause();
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <button
        type="button"
        data-cursor="play"
        onClick={() => onOpen(project)}
        onMouseEnter={playPreview}
        onMouseLeave={stopPreview}
        onFocus={playPreview}
        onBlur={stopPreview}
        aria-label={`Play ${project.title}, ${project.category}, ${formatDuration(project.duration)}`}
        className="relative block w-full overflow-hidden border border-hairline bg-white/[0.03] text-left focus-visible:outline-accent"
      >
        <div
          className={
            project.orientation === "vertical" ? "aspect-[9/16]" : "aspect-video"
          }
        >
          {/* Placeholder behind the thumbnail — visible only until the
              image paints. The thumbnail itself is never hidden by JS:
              it used to start at opacity-0 and only appear when React's
              onLoad fired, and with server rendering that event can be
              missed, leaving the card dark forever. */}
          <div aria-hidden className="absolute inset-0 bg-white/[0.04]" />
          {/* Thumbnail — a real frame from the video (taken at ~1s) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.thumbnail}
            alt={`Thumbnail for ${project.title}`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Muted hover-preview clip. preload="auto" so its first frame
              is already decoded before anyone hovers — with "metadata"
              it flashed black while fetching. It only fades in once a
              frame is ready (see previewReady above). */}
          <video
            ref={previewRef}
            src={project.preview}
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={() => setPreviewReady(true)}
            aria-hidden
            tabIndex={-1}
            className={`pointer-events-none absolute inset-0 h-full w-full bg-black object-cover opacity-0 transition-opacity duration-300 ${
              previewReady
                ? "group-hover:opacity-100 group-focus-within:opacity-100"
                : ""
            }`}
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          <Corners />
          {/* Duration + category badges */}
          <span className="absolute left-3 top-3 bg-ink/80 px-2 py-1 font-mono text-[10px] tracking-widest text-paper">
            {formatDuration(project.duration)}
          </span>
          <span className="absolute right-3 top-3 bg-accent px-2 py-1 font-mono text-[10px] font-medium tracking-widest text-ink">
            {project.category}
          </span>
          {/* Centre play glyph, appears on hover/focus */}
          <span
            aria-hidden
            className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-accent/95">
              <svg width="12" height="14" viewBox="0 0 10 12" fill="#050505" aria-hidden>
                <path d="M0 0 L10 6 L0 12 Z" />
              </svg>
            </span>
          </span>
        </div>
      </button>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-base font-medium leading-snug">
            {project.title}
          </h3>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-widest2 text-muted">
            {project.orientation === "vertical" ? "9:16" : "16:9"}
            <span className="mx-2 text-white/25">·</span>
            {project.duration}s
          </p>
        </div>
        <span aria-hidden className="mt-1 font-mono text-xs text-accent">↗</span>
      </div>
    </motion.article>
  );
}

export default function Work() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="work" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="01" title="Selected Work" />
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
              The Work<span className="text-accent">.</span>
            </h2>
            <p className="mt-3 max-w-md text-muted">
              Eight cuts, all vertical reels. Hover to preview, click to watch full-screen.
            </p>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-muted">
            {projects.length} projects
          </p>
        </div>
      </Reveal>

      {/* Single grid — no filters, all 8 demos in one section */}
      <motion.div layout className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {projects.map((p) => (
          <WorkCard key={p.id} project={p} onOpen={setActive} />
        ))}
      </motion.div>

      <VideoModal
        project={active}
        projects={projects}
        onClose={() => setActive(null)}
        onNavigate={setActive}
      />
    </section>
  );
}
