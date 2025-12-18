import bundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dl.koochaa.com",
      },
      {
        protocol: "https",
        hostname: "www.koochaa.com",
      },
      {
        protocol: "https",
        hostname: "d11h29rvzk0dwa.cloudfront.net",
      },
    ],
    qualities: [75, 100],
  },
  async redirects() {
    return [
      {
        source: "/:country/businesses/lawyers",
        destination: "/:country/lawyers",
        permanent: true, // 301
      },
    ];
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
