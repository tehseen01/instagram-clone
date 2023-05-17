/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "tinyurl.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api",
        destination: "http://localhost:8080", // Proxy to Backend
      },
    ];
  },

  typescript: {
    tsconfigPath: "./tsconfig.json",

    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
