const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './'
})

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/__tests__/**/*.+(ts|tsx)', '**/(*.)+(spec|test).+(ts|tsx)'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.(js|ts|jsx|tsx)$': 'babel-jest'
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/**/__tests__/*.ts',
    '!src/**/*.test.ts(x)',
    '!src/**/__stories__/*.ts(x)',
    '!src/types/**.d.ts',
    '!src/pages/**/*.ts(x)',
    '!src/utils/index.ts'
  ]
}

module.exports = createJestConfig(customJestConfig)
