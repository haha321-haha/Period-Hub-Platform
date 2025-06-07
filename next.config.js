/** @type {import('next').NextConfig} */

const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./lib/i18n.ts');

const nextConfig = {
  reactStrictMode: true,

  // 性能优化配置
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-markdown'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // 编译优化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // 图片优化
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // 压缩配置
  compress: true,

  // 重定向配置
  async redirects() {
    return [
      // Redirect incorrect NSAID article slug to correct one
      {
        source: '/zh/nsaid-medications',
        destination: '/zh/articles/nsaid-menstrual-pain-professional-guide',
        permanent: true,
      },
      {
        source: '/en/nsaid-medications',
        destination: '/en/articles/nsaid-menstrual-pain-professional-guide',
        permanent: true,
      },
      {
        source: '/zh/articles/nsaid-medications',
        destination: '/zh/articles/nsaid-menstrual-pain-professional-guide',
        permanent: true,
      },
      {
        source: '/en/articles/nsaid-medications',
        destination: '/en/articles/nsaid-menstrual-pain-professional-guide',
        permanent: true,
      },
    ];
  },

  // Headers优化
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
