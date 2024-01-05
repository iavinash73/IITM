/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  reactStrictMode: true,
    images: {
      domains : ['lh3.googleusercontent.com', 'localhost', ''], // <== Domain name
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'replicate.delivery',
          port: '',
        },
      ],
    },
  }
