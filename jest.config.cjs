module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    transform: {
        '^.+\\.jsx?$' : 'babel-jest',
    },
    moduleNameMapper: {
        '\\.(css|scss)$' : 'identity-obj-proxy',
    },
};