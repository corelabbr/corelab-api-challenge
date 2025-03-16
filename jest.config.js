module.exports = {
    testEnvironment: 'node',
    reporters: [
        'default',
        ['./CustomJsonReporter.js', { outputPath: 'test-results.json' }]
    ]
};
