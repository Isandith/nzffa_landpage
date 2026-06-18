import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next.js 16 supports the URL-object form of remotePatterns.
    remotePatterns: [new URL("https://www.nzffa.org.nz/system/assets/**")],
  },
};

export default nextConfig;
