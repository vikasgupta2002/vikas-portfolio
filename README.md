# Vikas Kumar Gupta — Video Editor Portfolio

Minimal, futuristic, single-page portfolio. Dark (`#050505`), off-white text,
one accent — electric cyan `#00E5FF`. Built with **Next.js 14 (App Router) +
TypeScript + Tailwind CSS**, **Framer Motion** for animation and **Lenis** for
smooth scroll. Vercel-ready.

Live sections: Hero (with a muted looping video background + live timecode) →
Work (filterable grid, hover previews, fullscreen modal player) → About →
Services → Process → Contact → Footer.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build check
npm run start
```

Requires Node 18+ and `ffmpeg` / `ffprobe` on your PATH (only for the
video pipeline below — not needed to run the site).

## The videos

The 10 portfolio videos came from the public Google Drive folder
`1FXMZtdC08lOKKhEz6bvNzWbUD6SpnpoA` (downloaded 2026-11-15 with `gdown`).
All 10 are **vertical 9:16, under 60s**:

| File | Duration | Size (raw → web) |
| --- | --- | --- |
| Talking Head Vikas (1080×1920) | 38s | 174 MB → 6.4 MB |
| Video 26817 (716×1274) | 47s | 6.7 MB → 6.6 MB |
| Video 28204 (716×1274) | 58s | 9.1 MB → 8.8 MB |
| Video 33455 (716×1274) | 45s | 6.8 MB → 6.7 MB |
| Video 35918 (716×1274) | 55s | 8.9 MB → 8.1 MB |
| Video 37082 (716×1274) | 50s | 6.8 MB → 6.8 MB |
| Video 5771 (716×1274) | 42s | 7.1 MB → 6.6 MB |
| Video 58620 (716×1274) | 23s | 2.1 MB → 1.9 MB |
| Video 60549 (716×1274) | 40s | 6.3 MB → 5.8 MB |
| Video 89652 (720×1280) | 32s | 5.8 MB → 5.4 MB |

**Total: 234 MB raw → 62.7 MB web (`public/videos`), under the 100 MB
Vercel warning threshold — the videos can ship with the site as-is.** No
Cloudinary / R2 needed unless you add a lot more footage.

Files in the repo:

- `public/videos/<slug>.mp4` — H.264, CRF 26, max 1080p, AAC, `+faststart`
- `public/thumbs/<slug>.jpg` — thumbnail taken at ~1s, 720w
- `public/previews/<slug>.mp4` — 4-second muted hover-preview clip, 540w

### ⚠️ Size warning — read before deploying

Check the total before you deploy:

```bash
du -sh public/videos
```

Vercel has limits on deployment size and on large static files. **If
`public/videos` is over ~100 MB, do not deploy the videos with the site.**
Instead, host them on **Cloudinary or Cloudflare R2** and change the `video`
(and `thumbnail` / `preview`) fields in `src/data/projects.ts` to those URLs —
the player, grid and modal all work unchanged with remote URLs. The
`generate-projects` script prints a warning when the total is over 100 MB.

## Add or remove a video

**Add:**

1. Put the source file in `raw-videos/` (or download the Drive folder again):
   ```bash
   gdown --folder "https://drive.google.com/drive/folders/1FXMZtdC08lOKKhEz6bvNzWbUD6SpnpoA" -O ./raw-videos
   ```
2. Compress + make thumb + preview:
   ```bash
   npm run process-videos   # runs process-videos.sh for every raw-videos/*.mp4
   ```
   (Or run the three `ffmpeg` commands in `process-videos.sh` by hand for
   one file: CRF 26, `scale='min(1080,iw)':-2`, AAC 128k, `+faststart`;
   thumb at `-ss 1`; preview `-t 4 -an` at 540w.)
3. Regenerate the data file (keeps any titles/categories you hand-edited):
   ```bash
   npm run generate-projects
   ```
4. Edit the guessed title/category in `src/data/projects.ts` if needed,
   then `npm run build`.

**Remove:** delete the three files (`public/videos/<slug>.mp4`,
`public/thumbs/<slug>.jpg`, `public/previews/<slug>.mp4`), delete the entry
from `src/data/projects.ts` (or re-run `npm run generate-projects`), rebuild.

**Rename / re-categorise:** edit `title` and `category` directly in
`src/data/projects.ts`. Valid categories: `Reels`, `YouTube`, `Ads`,
`Motion Graphics` — the Work filters come from the `categories` array in
the same file. Add a category there and the filter button appears.

> **Titles are guesses.** The Drive filenames were `Video-26817.mp4` etc.,
> so the titles are just cleaned-up filenames and every category was
> guessed as `Reels` (vertical + under 60s). Give each project its real
> name in `src/data/projects.ts` — e.g. `"Skincare Brand Reel — Launch Cut"`.

## Change the text and colours

- **Copy:** Hero / About / Services / Process text lives in
  `src/components/Hero.tsx`, `About.tsx`, `Services.tsx`, `Process.tsx`.
  Contact email + social links: `src/components/Contact.tsx`
  (social links are currently `"#"` placeholders — replace them).
- **Colours:** one place — `tailwind.config.ts` (`ink`, `paper`, `muted`,
  `accent`). Change `accent` and the whole site follows. The accent is
  deliberately used sparingly.
- **Fonts:** Space Grotesk (headings), Inter (body), JetBrains Mono
  (labels/timecodes) — self-hosted via `@fontsource/*`, imported in
  `src/app/layout.tsx` (no build-time Google Fonts fetch).
- **Hero background video:** `heroProject` in `src/data/projects.ts` —
  currently the talking-head clip, falling back to the first project.
- **Stats:** the “10 projects / 2 tools / 100% on-time” numbers in
  `src/components/About.tsx` are placeholders — update them with real counts.

## Contact form

The form in `src/components/Contact.tsx` works two ways:

- **No setup (default):** submitting opens the visitor's mail app with the
  message pre-filled to `vikasgupta123975@gmail.com`.
- **Direct sending:** create a free form at [formspree.io](https://formspree.io),
  then set `NEXT_PUBLIC_FORMSPREE_ID=<your form id>` in `.env.local`
  (and in Vercel → Project Settings → Environment Variables). The form then
  posts to Formspree. Resend is an alternative — swap the `fetch` call in
  `Contact.tsx` for your Resend endpoint.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel: **Add New → Project → Import** the repo. Framework preset:
   Next.js. Build command `npm run build`, output directory: default.
3. Add `NEXT_PUBLIC_FORMSPREE_ID` in Environment Variables if you use it.
4. Deploy. Every push to `main` redeploys automatically.
5. Update the placeholder domain in `src/app/layout.tsx`
   (`metadataBase` / Open Graph `url`) to your real domain, and add an
   `og.jpg` (1200×630) to `public/` for link previews.

> If `public/videos` is over 100 MB, host the videos on Cloudinary / R2
> first (see “Size warning” above) — otherwise the Vercel deployment can
> fail or be very slow.

## Accessibility & performance notes

- Videos use `preload="metadata"` and lazy thumbnails; hover previews only
  play on devices with a hover pointer. The modal player is a native
  `<video>` with controls, `Esc` to close, `←`/`→` to browse, `aria-label`s
  and focus on the close button when it opens.
- Reduced motion (`prefers-reduced-motion`) disables Lenis smooth scroll,
  the custom cursor, the timecode counter and all entrance animations.
- The custom cursor only appears on fine-pointer devices; touch users keep
  the native cursor.
