const baseConfig = require('./jest.config')

module.exports = {
  ...baseConfig,
  displayName: 'storyshots',
  testMatch: ['<rootDir>/.storybook/storyshots/storybook.test.ts'],
  transform: {
    '^.+\\.(js|ts|jsx|tsx)$': 'babel-jest'
  }
}
