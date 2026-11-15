"use client";

import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { formatDuration } from "@/lib/format";

/**
 * Fullscreen modal player — native <video> with controls + autoplay.
 * Esc closes, ← / → step to previous / next project, focus starts
 * on the close button, and body scroll is locked while open.
 */
export default function VideoModal({
  project,
  projects,
  onClose,
  onNavigate,
}: {
  project: Project | null;
  projects: Project[];
  onClose: () => void;
  onNavigate: (p: Project) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const index = project ? projects.findIndex((p) => p.id === project.id) : -1;

  const prev = useCallback(() => {
    if (index < 0) return;
    onNavigate(projects[(index - 1 + projects.length) % projects.length]);
  }, [index, projects, onNavigate]);

  const next = useCallback(() => {
    if (index < 0) return;
    onNavigate(projects[(index + 1) % projects.length]);
  }, [index, projects, onNavigate]);

  useEffect(() => {
    if (!project) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose, prev, next]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Playing: ${project.title}`}
          className="fixed inset-0 z-[95] flex flex-col bg-ink/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-4 md:px-8">
            <p className="truncate font-mono text-[11px] uppercase tracking-widest2 text-muted">
              <span className="text-accent">{project.category}</span>
              <span className="mx-2 text-white/30">/</span>
              {project.title}
              <span className="mx-2 text-white/30">/</span>
              {formatDuration(project.duration)}
              <span className="ml-2 hidden text-white/40 sm:inline">
                {index + 1} of {projects.length}
              </span>
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close player (Escape)"
              className="grid h-10 w-10 shrink-0 place-items-center border border-hairline text-paper transition-colors hover:border-accent hover:text-accent"
            >
              <span aria-hidden className="text-lg leading-none">✕</span>
            </button>
          </div>

          {/* Player — 9:16 for vertical, 16:9 for horizontal */}
          <div className="flex min-h-0 flex-1 items-center justify-center px-4 pb-4 md:px-12">
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={
                project.orientation === "vertical"
                  ? "h-full max-h-full aspect-[9/16] w-auto max-w-full"
                  : "aspect-video w-full max-w-5xl"
              }
            >
              <video
                key={project.video}
                className="h-full w-full bg-black object-contain"
                src={project.video}
                poster={project.thumbnail}
                controls
                autoPlay
                playsInline
                preload="metadata"
              />
            </motion.div>
          </div>

          {/* Prev / next */}
          <div className="flex items-center justify-between px-5 pb-5 md:px-8">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous video"
              className="border border-hairline px-4 py-2 font-mono text-[11px] uppercase tracking-widest2 text-muted transition-colors hover:border-accent hover:text-accent"
            >
              ← Prev
            </button>
            <p className="hidden font-mono text-[11px] text-white/40 md:block">
              Esc to close · ← → to browse
            </p>
            <button
              type="button"
              onClick={next}
              aria-label="Next video"
              className="border border-hairline px-4 py-2 font-mono text-[11px] uppercase tracking-widest2 text-muted transition-colors hover:border-accent hover:text-accent"
            >
              Next →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
