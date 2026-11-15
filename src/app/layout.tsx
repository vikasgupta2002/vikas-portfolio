import type { Metadata } from "next";
import "./globals.css";
// Self-hosted fonts via Fontsource (no build-time fetch to Google Fonts —
// next/font/google failed in this environment on one of the files).
// Keep the weights actually used: Space Grotesk 400/500/600/700,
// Inter 400/500/600, JetBrains Mono 400/500.
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Vikas Kumar Gupta — Video Editor",
  description:
    "Vikas Kumar Gupta is a video editor crafting reels, YouTube edits and motion stories in Adobe Premiere Pro and After Effects. Watch the work, then let's cut something great.",
  keywords: [
    "video editor",
    "Vikas Kumar Gupta",
    "Premiere Pro",
    "After Effects",
    "reels editor",
    "YouTube editor",
    "motion graphics",
  ],
  authors: [{ name: "Vikas Kumar Gupta" }],
  openGraph: {
    title: "Vikas Kumar Gupta — Video Editor",
    description:
      "Turning raw footage into stories that hold attention. Reels, YouTube, ads and motion graphics.",
    type: "website",
    // PLACEHOLDER: set your live domain here once deployed, e.g.
    // url: "https://vikasgupta.video",
    // images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vikas Kumar Gupta — Video Editor",
    description:
      "Turning raw footage into stories that hold attention. Reels, YouTube, ads and motion graphics.",
  },
  metadataBase: new URL("https://vikasgupta.video"), // PLACEHOLDER domain — update in README when you deploy
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="bg-ink font-sans text-paper">
        <SmoothScroll />
        <CustomCursor />
        <ScrollProgress />
        {/* Skip link for keyboard users */}
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-ink"
        >
          Skip to work
        </a>
        {children}
      </body>
    </html>
  );
}
