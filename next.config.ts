import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "preview.redd.it" },  // Reddit preview thumbnails
      { hostname: "i.redd.it" },        // Reddit direct image uploads
      { hostname: "external-preview.redd.it" }, // Reddit external image previews
    ],
  },
};

export default nextConfig;
