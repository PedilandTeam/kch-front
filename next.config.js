/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint:{
    ignoreDuringBuilds: true
  },
  typescript:{
    ignoreBuildErrors: true
  },
  reactStrictMode: true,
  output: "standalone",
  images:{
    domains:[
      "dl.koochaa.com",
      "www.koochaa.com"
    ]
  }
}

module.exports = nextConfig
