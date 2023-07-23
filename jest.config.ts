/** @type {import("ts-jest/dist/types").InitialOptionsTsJest} */

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: [
    "<rootDir>/src/test"
  ],
  moduleNameMapper: {
    '^mocks/(.*)$': '<rootDir>/src/test/__mocks__/$1'
  },
};