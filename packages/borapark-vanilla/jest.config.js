/** @type {import('jest').Config} */
export default {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  testMatch: ["**/*.test.js"],
  moduleFileExtensions: ["js", "json", "node"],
  testEnvironmentOptions: {
    url: "http://localhost",
  },
};
