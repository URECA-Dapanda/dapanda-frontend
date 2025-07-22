import type { NextConfig } from "next";
const path = require("path");

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {},
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "src"),
      "@apis": path.resolve(__dirname, "src/apis"),
      "@app": path.resolve(__dirname, "src/app"),
      "@components": path.resolve(__dirname, "src/components"),
      "@ui": path.resolve(__dirname, "src/components/ui"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@lib": path.resolve(__dirname, "src/lib"),
      "@feature": path.resolve(__dirname, "src/feature"),
      "@stores": path.resolve(__dirname, "src/stores"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@type": path.resolve(__dirname, "src/types"),
    };

    return config;
  },
};

export default nextConfig;
