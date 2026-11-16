"use client";

import { useState, type FormEvent } from "react";
import Reveal, { SectionLabel } from "./Reveal";

const EMAIL = "vikasgupta123975@gmail.com";
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "";
// Instagram is live (@magnificentsolution, confirmed 2026-11-15).
// YouTube / LinkedIn / Behance are still "#" placeholders.
const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/magnificentsolution/" },
  { label: "YouTube", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Behance", href: "#" },
];

/**
 * Contact: email with copy-to-clipboard + mailto, and a form.
 * If NEXT_PUBLIC_FORMSPREE_ID is set, the form posts to Formspree;
 * otherwise it opens the user's mail app with the message pre-filled.
 * See README → "Contact form".
 */
export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (non-secure context) — the mailto button still works.
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    if (!FORMSPREE_ID) {
      // No Formspree configured — fall back to the mail app.
      const subject = encodeURIComponent(`Project enquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
      setStatus("sent");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error("Formspree rejected the submission");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="border-t border-hairline">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <SectionLabel index="05" title="Contact" />
          <h2 className="mt-4 max-w-3xl font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl">
            Let&apos;s cut something great<span className="text-accent">.</span>
          </h2>
          <p className="mt-5 max-w-xl text-muted">
            Got footage, an idea, or a half-finished edit? Send it over — I reply
            within a day.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          {/* Email + socials */}
          <Reveal delay={0.1}>
            <p className="font-mono text-[11px] uppercase tracking-widest2 text-muted">
              Email
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="break-all font-display text-xl font-medium text-paper underline-offset-4 hover:text-accent hover:underline md:text-2xl"
              >
                {EMAIL}
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={copyEmail}
                className="border border-hairline px-4 py-2 font-mono text-[11px] uppercase tracking-widest2 text-muted transition-colors hover:border-accent hover:text-accent"
              >
                {copied ? "✓ Copied" : "Copy email"}
              </button>
              <a
                href={`mailto:${EMAIL}`}
                className="border border-accent/70 px-4 py-2 font-mono text-[11px] uppercase tracking-widest2 text-accent transition-colors hover:bg-accent hover:text-ink"
              >
                Write an email →
              </a>
            </div>

            <p className="mt-12 font-mono text-[11px] uppercase tracking-widest2 text-muted">
              Elsewhere
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.href === "#" ? `${s.label} (link not set yet)` : s.label}
                    className="group font-display text-lg text-paper/85 transition-colors hover:text-accent"
                  >
                    {s.label}
                    <span aria-hidden className="ml-1 text-xs text-muted group-hover:text-accent">↗</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-[10px] text-white/30">
              Instagram is linked — YouTube, LinkedIn and Behance are still
              placeholders until you add those profiles.
            </p>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.2}>
            <form onSubmit={onSubmit} className="space-y-5" aria-label="Contact form">
              <div>
                <label htmlFor="name" className="mb-2 block font-mono text-[11px] uppercase tracking-widest2 text-muted">
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  className="w-full border border-hairline bg-transparent px-4 py-3 text-paper placeholder:text-white/25 focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block font-mono text-[11px] uppercase tracking-widest2 text-muted">
                  Your email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full border border-hairline bg-transparent px-4 py-3 text-paper placeholder:text-white/25 focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block font-mono text-[11px] uppercase tracking-widest2 text-muted">
                  Tell me about the project
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="What are we cutting? Link your footage if you have it…"
                  className="w-full resize-y border border-hairline bg-transparent px-4 py-3 text-paper placeholder:text-white/25 focus:border-accent focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-accent px-7 py-4 font-mono text-xs uppercase tracking-widest2 text-ink transition-colors duration-150 hover:bg-paper disabled:opacity-60 sm:w-auto"
              >
                {status === "sending" ? "Sending…" : "Send message →"}
              </button>
              {status === "sent" && (
                <p role="status" className="font-mono text-xs text-accent">
                  ✓ {FORMSPREE_ID ? "Message sent — I'll get back to you soon." : "Opening your mail app with the message ready to send."}
                </p>
              )}
              {status === "error" && (
                <p role="alert" className="font-mono text-xs text-red-400">
                  Something went wrong sending that — please email me directly instead.
                </p>
              )}
              {!FORMSPREE_ID && (
                <p className="font-mono text-[10px] text-white/30">
                  No Formspree ID set yet — this form opens your mail app instead.
                  Add NEXT_PUBLIC_FORMSPREE_ID to send directly (see README).
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
