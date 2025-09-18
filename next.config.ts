import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  
  images: {
    unoptimized: true,
    domains: ['localhost'],
  },

  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },

  webpack: (config) => {
    config.resolve.fallback = { 
      fs: false, 
      net: false, 
      tls: false 
    };
    return config;
  },

  typescript: {
    ignoreBuildErrors: false,
  },

  reactStrictMode: true,
  
  outputFileTracingRoot: path.join(__dirname, '../'),
} satisfies NextConfig;

export default nextConfig;
