module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: ['utils/functions.tsx'],
  coverageDirectory: 'coverage',
};