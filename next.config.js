/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/fn-model-shop',
  assetPrefix: '/fn-model-shop',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/fn-model-shop',
    NEXT_PUBLIC_ASSETS_BASE: 'https://funnypdc.github.io/fn-model-assets',
  },
}

module.exports = nextConfig