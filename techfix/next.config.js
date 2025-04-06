/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'cdn.discordapp.com'],
    unoptimized: true,
  },
}

module.exports = nextConfig
