import type { NextConfig } from "next";

/**
 * Next.js Configuration
 * Optimized for performance and Lighthouse scores
 */
const nextConfig: NextConfig = {
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "axiom.trade",
      },
      {
        protocol: "https",
        hostname: "axiomtrading.sfo3.cdn.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },

  // Compress output
  compress: true,

  // Optimize production builds
  // swcMinify: true,

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ["lucide-react", "remixicon"],
  },

  // Headers for security, performance, and Lighthouse scores
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Performance headers
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          // Security headers (Best Practices score)
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
