/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
