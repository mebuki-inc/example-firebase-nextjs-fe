/**
 * ToDo: 適宜修正
 */
const config = (() => {
  switch (process.env.NEXT_APP_ENV) {
    case 'development':
      return require('./config/development')

    case 'staging':
      return require('./config/staging')

    default:
      return require('./config/production')
  }
})()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /**
   * 【環境変数】
   * 変数を追加する場合は src/utils/config の type Config を修正してください
   * https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
   */
  publicRuntimeConfig: {
    apiHost: config.apiHost,
    firebase: config.firebase,
    env: process.env.NEXT_APP_ENV
  },

  /**
   * Static HTML Export setting
   * https://nextjs.org/docs/api-reference/next.config.js/exportPathMap
   */
  exportPathMap: async (_defaultPathMap, { _dev, _dir, _outDir, _distDir, _buildId }) => {
    return {
      '/': { page: '/' }
    }
  }
}

module.exports = nextConfig
