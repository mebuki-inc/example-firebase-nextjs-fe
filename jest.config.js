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
    '!src/**/__tests__/*.ts',
    '!src/**/__stories__/*.ts(x)',
    '!src/types/**.d.ts',
    '!src/pages/**/*.ts(x)',
    '!src/redux/index.ts'
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.(js|ts|jsx|tsx)$': 'babel-jest'
  }
}
