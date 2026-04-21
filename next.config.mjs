/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Exclude legacy from webpack compilation
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader'],
    });
    return config;
  },
};

export default nextConfig;
