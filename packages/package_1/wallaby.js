/* eslint strict:off, global-require:off */

'use strict';

module.exports = wallaby => {
    return {
        files: [
            { pattern: '.babelrc+(.js|)', instrument: false },
            'src/**/*.js',
            'jest.config.js',
            '.env',
            'src/**/*.snap',
            '!src/**/*.test.js',
        ],

        tests: [
            'src/**/*.test.js',
        ],

        compilers: {
            '**/*.js': wallaby.compilers.babel(),
        },

        env: {
            type: 'node',
            runner: 'node',
        },

        testFramework: 'jest',

        setup: w => {
            process.env.NODE_ENV = 'test';
            const jestConfig = require('./jest.config');
            jestConfig.transform = { '__sandbox__.+\\.jsx?$': 'babel-jest' };
            w.testFramework.configure(jestConfig);
        },
    };
};
