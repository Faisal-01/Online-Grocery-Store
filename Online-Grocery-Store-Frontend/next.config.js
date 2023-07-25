/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  reactStrictMode: false,
  images: {
    // domains: ["fakestoreapi.com"],
    domains: ["i.dummyjson.com", 'localhost'],
  },
};

module.exports = nextConfig
