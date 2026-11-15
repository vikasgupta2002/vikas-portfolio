"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Timecode from "./Timecode";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

/** Minimal sticky navbar — hairline bottom border, no lift on hover. */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-[70] transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-hairline bg-ink/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8"
        aria-label="Main"
      >
        <a href="#top" className="flex items-center gap-3" aria-label="Vikas Kumar Gupta — back to top">
          {/* Logo mark: play triangle in a frame corner */}
          <span className="grid h-8 w-8 place-items-center border border-accent/60" aria-hidden>
            <svg width="10" height="12" viewBox="0 0 10 12" fill="#00E5FF" aria-hidden>
              <path d="M0 0 L10 6 L0 12 Z" />
            </svg>
          </span>
          <span className="font-display text-sm font-semibold tracking-wide">
            VKG<span className="text-accent">.</span>
            <span className="ml-2 hidden font-mono text-[10px] font-normal uppercase tracking-widest2 text-muted sm:inline">
              Video Editor
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-mono text-[11px] uppercase tracking-widest2 text-muted transition-colors duration-150 hover:text-paper"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <Timecode className="hidden text-[11px] text-muted lg:inline" />
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 border border-accent/70 px-4 py-2 font-mono text-[11px] uppercase tracking-widest2 text-accent transition-colors duration-150 hover:bg-accent hover:text-ink"
          >
            Hire Me
            <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-0.5">→</span>
          </a>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center border border-hairline text-paper md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden className="font-mono text-sm">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      {open && (
        <ul className="border-t border-hairline bg-ink px-5 py-4 md:hidden">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-mono text-xs uppercase tracking-widest2 text-muted hover:text-paper"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </motion.header>
  );
}
