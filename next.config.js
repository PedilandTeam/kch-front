/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  images: {
    domains: [
      'dl.koochaa.com',
      'www.koochaa.com',
      'd11h29rvzk0dwa.cloudfront.net',
    ],
  },
};

module.exports = nextConfig;
