import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  // Optional: Disable image optimization if needed for strict static export
  images: { unoptimized: true },
};

export default nextConfig;
