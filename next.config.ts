import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "preview.redd.it" },
      { hostname: "i.redd.it" },
      { hostname: "external-preview.redd.it" },
    ],
  },
};

export default nextConfig;
