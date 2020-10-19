module.exports = {
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
    ],
    coverageReporters: [
        "lcov"
    ],
    testMatch: [
        "<rootDir>/src/**/*.test.js"
    ],
    collectCoverageFrom: [
        'src/**/*.js',
    ],
    moduleFileExtensions: [
        'js'
    ],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    testURL: 'http://localhost',
    setupFilesAfterEnv: ['./jest.setup.js'],
}
