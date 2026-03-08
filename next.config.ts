import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "preview.redd.it" },
      { hostname: "i.redd.it" },
      { hostname: "external-preview.redd.it" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "https://dk-verkefni.vercel.app" },
        ],
      },
    ];
  },
};

export default nextConfig;
