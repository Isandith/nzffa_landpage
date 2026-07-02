import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.nzffa.org.nz",
        pathname: "/system/assets/**",
      },
      // Placeholder forestry photography for the Library dummy data, until
      // the real CMS-served cover images are wired up.
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
