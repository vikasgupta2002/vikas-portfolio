"use client";

/** Footer with the giant outlined wordmark + back-to-top. */
export default function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-14 md:px-8">
        <p aria-hidden className="text-outline select-none text-center font-display text-[16vw] font-bold leading-none tracking-tight md:text-[10rem]">
          VIKAS
        </p>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-hairline pt-6 font-mono text-[11px] uppercase tracking-widest2 text-muted sm:flex-row">
          <p>© Vikas Kumar Gupta</p>
          <a
            href="#top"
            className="border border-hairline px-4 py-2 text-muted transition-colors hover:border-accent hover:text-accent"
            aria-label="Back to top"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
