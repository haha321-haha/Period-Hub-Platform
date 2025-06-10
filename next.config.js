const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './i18n.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🚀 Vercel 部署配置 - 简化版本确保部署成功

  // 图片优化配置
  images: {
    unoptimized: true, // 保持图片优化禁用以提高兼容性
  },

  // 配置尾部斜杠
  trailingSlash: false, // Vercel 推荐设置为 false

  reactStrictMode: true,

  // 编译优化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // 实验性功能
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-markdown'],
  },

  // PWA 和性能优化
  poweredByHeader: false,

  // TypeScript 和 ESLint 配置
  typescript: {
    ignoreBuildErrors: false, // 启用类型检查
  },

  eslint: {
    ignoreDuringBuilds: false, // 启用 ESLint 检查
  },
};

module.exports = withNextIntl(nextConfig);
