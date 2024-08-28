/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
   publicRuntimeConfig: {
    siteOrigin: "http://localhost:3000",
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 828, 1024, 1280, 1440, 1536, 1920, 2048, 3840],
    imageSizes: [128, 190, 230, 270, 386],
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '**' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com', pathname: '**' },
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
