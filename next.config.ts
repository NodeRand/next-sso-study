import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_S3_IMAGE_BUCKET_HOSTNAME || '',
      },
    ],
    unoptimized: true,
  },
  output: 'standalone',
};

export default nextConfig;
