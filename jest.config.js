module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/singleton.ts'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
}
