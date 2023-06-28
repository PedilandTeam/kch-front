/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental:{
    appDir: true
  },
  eslint:{
    ignoreDuringBuilds: true
  },
  output: "standalone"
}

module.exports = nextConfig
