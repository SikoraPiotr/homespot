import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  sassOptions: {
    includePaths: ["./src/styles"],
  },
};

export default nextConfig;
