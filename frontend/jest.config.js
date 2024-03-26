module.exports = {
    collectCoverage: true,
    coveragePathIgnorePatterns: [
        "styleMock.js",
    ],
    coverageDirectory: "coverage",
    testEnvironment: "jsdom",
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[tj]s?(x)"
    ],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    },
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
    moduleDirectories: [
        "node_modules",
        "src"
    ],
    moduleFileExtensions: [
        "js",
        "jsx",
    ],
    moduleNameMapper: {
        '^/src/(.*)$': '<rootDir>/src/$1',
        '\\.(css|less|scss|sass)$': '<rootDir>/styleMock.js',
    },
    setupFilesAfterEnv: [
      "<rootDir>/setupTests.js",
    ],
};
