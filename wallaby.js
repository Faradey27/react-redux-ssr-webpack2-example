module.exports = (wallaby) => ({
  files: [
    'test/test_helper.js',
    { pattern: 'test/**/*.spec.js', ignore: true },
    { pattern: 'src/**/*.spec.js', ignore: true },
    'src/**/*.js*',
    'src/**/*.scss',
    'src/**/*.css',
    'src/**/*.less',
  ],

  filesWithNoCoverageCalculated: ['test/test_helper.js', '*.scss', '*.css', '*.less'],

  tests: [
    { pattern: 'node_modules/*', ignore: true, instrument: false },
    'src/**/*.spec.js*',
    'test/**/*.spec.js*',
  ],

  compilers: {
    '**/*.js?(x)': wallaby.compilers.babel(),
  },

  env: {
    type: 'node',
  },

  testFramework: 'jest',
});
