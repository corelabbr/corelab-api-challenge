module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/config/**',
    '!<rootDir>/src/@types/**',
    '!<rootDir>/src/main/**'
  ],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    "<rootDir>/src/infra/",
    "<rootDir>/src/db/",
  ],
  coverageProvider: 'babel',
  moduleNameMapper: {
    '@/tests/(.+)': '<rootDir>/tests/$1',
    '@/(.+)': '<rootDir>/src/$1'
  },
  testMatch: ['**/*.spec.ts'],
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests'
  ],
  transform: {
    '\\.ts$': 'ts-jest'
  },
  clearMocks: true
}
