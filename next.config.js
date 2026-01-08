/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'stg-washington-freedom.sportz.io',
        pathname: '/**',
      },
    ],
  },
  // Add any additional config options here
};

module.exports = nextConfig;
