import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: [],
    clientRouterFilter: true,
  },
};

export default nextConfig;
