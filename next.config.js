/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dl.koochaa.com"
      },
      {
        protocol: "https",
        hostname: "www.koochaa.com"
      },
      {
        protocol: "https",
        hostname: "d11h29rvzk0dwa.cloudfront.net"
      }
    ]
  }
}

module.exports = nextConfig
