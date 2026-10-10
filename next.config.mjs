/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: { unoptimized: true },
  transpilePackages: ['three'],
  productionBrowserSourceMaps: true,
};

export default nextConfig;
