const path = require('path')

module.exports = {
  stories: ['../src/components/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', 'storybook-addon-next-router'],
  features: {
    babelModeV7: true
  },
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              auto: true
            }
          }
        },
        'sass-loader'
      ],
      include: path.resolve(__dirname, '../')
    })

    config.resolve.alias = {
      ...config.resolve.alias
      // ToDo: public/ に画像を配置する場合はここに追加していく
      // '/logo.png': path.resolve(__dirname, '../public/logo.png'),
    }

    return config
  },
  core: {
    builder: 'webpack5'
  }
}
