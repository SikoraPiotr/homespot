import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isStaticExport
      ? {
        output: "export" as const,
        trailingSlash: true,
        basePath: "/homespot",
      }
    : {}),
  images: {
    formats: ["image/avif", "image/webp"],
    ...(isStaticExport
        ? {
          loader: "custom" as const,
          loaderFile: "./src/lib/export-image-loader.ts",
        }
      : {}),
  },
  sassOptions: {
    includePaths: ["./src/styles"],
  },
  ...(isStaticExport
    ? {
        typescript: {
          ignoreBuildErrors: true,
        },
      }
    : {}),
};

export default nextConfig;
