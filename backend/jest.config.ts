
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  verbose: true,
  globalSetup: '<rootDir>/src/tests/globalSetup.ts',
  roots: ['<rootDir>/src/'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};

export default createJestConfig(customJestConfig);
