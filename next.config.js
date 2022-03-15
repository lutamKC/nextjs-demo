/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn2.thecatapi.com', 'media.tumblr.com'],
  },
}

module.exports = nextConfig
