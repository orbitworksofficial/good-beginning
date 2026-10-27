/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lets the dev site be opened from other devices on the local network
  // (e.g. http://192.168.18.79:3000). Without this, Next.js blocks its dev
  // scripts for that address and the page never becomes interactive.
  allowedDevOrigins: ["192.168.18.79"],
  // Google's client loads protocol files at runtime; keep it out of the bundle.
  serverExternalPackages: ["@google-analytics/data"],
};

export default nextConfig;
