/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: "",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
