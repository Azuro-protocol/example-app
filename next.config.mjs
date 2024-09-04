import path from 'path'
import { fileURLToPath } from 'url'

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AZURO_UNSTABLE_DEV_ENABLED: process.env.AZURO_UNSTABLE_DEV_ENABLED,
  },
  reactStrictMode: false,
  webpack: (config, { isServer, webpack }) => {
    // fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback.fs = false
    }

    config.externals.push('pino-pretty', 'lokijs', 'encoding')

    if (config.name === 'client') {
      config.target = [ 'web', 'es7' ]
    }

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

    return config
  },
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
  output: 'standalone',
  productionBrowserSourceMaps: true,
  modularizeImports: {
    '@headlessui/react': {
      transform: '@headlessui/react/dist/components/{{member}}/{{member}}.js',
      skipDefaultConversion: true,
    }
  },
  experimental: {
    gzipSize: true,
    optimizePackageImports: [
      'components/dataDisplay',
      'components/feedback',
      'components/inputs',
      'components/layout',
      'components/navigation',
      'components/ui',
      'wallet',
      'contexts',
      'graph/liquidity',
      'graph/stake',
      'graph/uniswap',
      'helpers',
      'helpers/getters',
      'hooks'
    ]
  }
}

export default nextConfig
