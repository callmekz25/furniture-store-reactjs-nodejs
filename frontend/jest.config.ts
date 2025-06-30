import type { Config } from "jest";
import { defaults } from "ts-jest/presets";
const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    ...defaults.transform,
    // "^.+\\.tsx?$": "ts-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!lucide-react)"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: ["**/*.test.(ts|tsx)"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default config;
