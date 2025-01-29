import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    // Enable top-level await
    config.experiments = {
      topLevelAwait: true,
      layers: true
    };
    return config;
  },
  // Increase serverless function timeout
  serverRuntimeConfig: {
    // Will only be available on the server side
    timeoutSeconds: 60,
  },
};

export default nextConfig;