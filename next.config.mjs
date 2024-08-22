/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
   publicRuntimeConfig: {
    siteOrigin: "http://localhost:3000",
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    imageSizes: [230],
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
