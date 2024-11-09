import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  roots: ['<rootDir>'],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/*.ts",
    "!<rootDir>/src/config/*.ts",
    "!<rootDir>/src/app/interfaces/**/*.ts",
    "!<rootDir>/src/app/middlewares/**/*.ts",
    "!<rootDir>/src/app/routes/*.ts",
    "!<rootDir>/src/app/services/*.ts",
    "!<rootDir>/src/app/validations/*.ts",
    "!<rootDir>/src/infra/**/*.ts",
    "!<rootDir>/src/infra/db/sequelize/config.js",
    "!<rootDir>/src/infra/db/sequelize/index.ts",
    "!<rootDir>/src/infra/db/sequelize/**/*.ts",
    "!<rootDir>/src/infra/db/sequelize/migrations/**/*.ts",
    "!<rootDir>/src/infra/db/sequelize/models/**/*.ts",
    "!<rootDir>/src/infra/db/sequelize/repositories/**/*.ts",
    "!<rootDir>/dist/**/*.js"
  ],
  collectCoverage: true
};

export default config;