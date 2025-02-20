/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    serverActions: true,
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        child_process: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },

  // Update serverless configuration without __dirname
  serverRuntimeConfig: {
    // Use relative paths instead
    PROJECT_ROOT: '.',
  },
};

export default nextConfig;