/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Videos are served from /public/videos. Keep them out of the
  // JS bundle — they are plain static files, loaded lazily.
  images: {
    // Thumbnails are plain <img> (fast, no optimisation pipeline
    // needed for local JPGs), so remotePatterns are not required.
    unoptimized: true,
  },
};

module.exports = nextConfig;
