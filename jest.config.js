module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  roots: ['<rootDir>'],
  // setupFiles: ['<rootDir>/.jest/setupFiles.js'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx)',
    '**/(*.)+(spec|test).+(ts|tsx)'
    // '!**/storybook.test.ts'
  ],
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/**/__tests__/*.ts(x)',
    '!src/**/*.stories.ts(x)',
    '!src/types/**.d.ts',
    '!src/pages/**/*.ts(x)'
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.(js|ts|jsx|tsx)$': 'babel-jest'
  }
}
