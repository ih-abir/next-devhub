/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
  experimental: {
    runtime: 'edge', // Ensure edge runtime if applicable
  },
   publicRuntimeConfig: {
    siteOrigin: "http://localhost:3000",
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
    ],
  },
  webpack(config) {
    // Add support for custom paths
    config.resolve.alias = {
      ...config.resolve.alias,
      '@queries': path.resolve(process.cwd(), 'queries'),
    };
    
    return config;
  },
};

export default nextConfig;
