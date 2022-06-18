const baseConfig = require('./jest.config')

module.exports = {
  ...baseConfig,
  name: 'Storyshots',
  displayName: 'storyshots',
  testMatch: ['<rootDir>/.storybook/storyshots/storybook.test.ts'],
  transform: {
    '^.+\\.(js|ts|jsx|tsx)$': 'babel-jest'
  }
}
