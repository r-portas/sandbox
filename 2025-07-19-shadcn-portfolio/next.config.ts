import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    devtoolNewPanelUI: true,
    devtoolSegmentExplorer: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
