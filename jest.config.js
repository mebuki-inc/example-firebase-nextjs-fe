module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  roots: ['<rootDir>'],
  // setupFiles: ['<rootDir>/.jest/setupFiles.js'],
  testMatch: [
    '**/(*.)+(spec|test).+(ts|tsx)'
    // '!**/storybook.test.ts'
  ],
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/**/*.test.ts(x)',
    '!src/**/*.stories.ts(x)',
    '!src/types/**.d.ts',
    '!src/components/App/*.ts(x)',
    '!src/**/index.ts'
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/$1'
  },
  transform: {
    '^.+\\.(js|ts|jsx|tsx)$': 'babel-jest'
  }
}
