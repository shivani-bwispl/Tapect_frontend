/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output:'standalone',

    eslint: {
        ignoreDuringBuilds: true,
    },
    env: {
        NEXT_PUBLIC_BASE_URL: 'http://localhost:3000/',
      },   
      images: {
        domains: ['localhost', 'http://localhost:3001/'], // Add your domain here
      }, 
};

module.exports = nextConfig;
