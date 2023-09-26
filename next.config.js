/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental:{
    appDir: true
  },
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
      "dl.koochaa.com"
    ]
  }
}

module.exports = nextConfig
