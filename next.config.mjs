import path from 'path'
import { fileURLToPath } from 'url'

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AZURO_UNSTABLE_DEV_ENABLED: process.env.AZURO_UNSTABLE_DEV_ENABLED,
  },
  reactStrictMode: true,
  turbopack: {},
  webpack: (config, { isServer, webpack }) => {
    // fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback.fs = false
    }

    config.externals.push('pino-pretty', 'lokijs', 'encoding')

    config.plugins.push(
      new webpack.DefinePlugin({
        '__CLIENT__': !isServer,
        '__SERVER__': isServer,
      })
    )

    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    // 内存优化：减少并行处理
    config.parallelism = 1

    return config
  },
  serverExternalPackages: ['pino-pretty', 'lokijs', 'encoding'],
  headers: () => ([
    {
      source: '/(images|js)/:file*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, must-revalidate'
        }
      ]
    }
  ]),
  sassOptions: {
    additionalData: `@import '~src/scss/index.scss';`,
    includePaths: [
      path.join(path.dirname(fileURLToPath(import.meta.url)), 'styles')
    ]
  },
  async redirects() {
    return []
  },
  productionBrowserSourceMaps: false,
  modularizeImports: {
    '@headlessui/react': {
      transform: '@headlessui/react/dist/components/{{member}}/{{member}}.js',
      skipDefaultConversion: true,
    }
  },
  experimental: {
    gzipSize: false,
    // 优化大型依赖包的导入
    optimizePackageImports: [
      'components/dataDisplay',
      'components/feedback',
      'components/inputs',
      'components/layout',
      'components/navigation',
      'components/ui',
      'wallet',
      'contexts',
      'helpers',
      'helpers/getters',
      'hooks',
      // 添加大型第三方包
      '@lifi/widget',
      'viem',
      'wagmi',
      '@azuro-org/sdk',
      '@azuro-org/toolkit',
      'dayjs',
      'graphql'
    ],
    // 禁用 worker 线程，减少内存占用
    webpackBuildWorker: false,
    // 禁用并行路由
    parallelServerCompiles: false,
    parallelServerBuildTraces: false,
  }
}

export default nextConfig
