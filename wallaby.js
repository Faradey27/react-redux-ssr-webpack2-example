module.exports = (wallaby) => ({
  files: [
    'test/test_helper.js',
    'test/helpers/**/*.js',
    'src/**/*.key',
    'src/**/*.crt',
    'src/**/*.csr',
    'static/favicon.ico',
    'static/manifest.json',
    'static/**/*.js',
    'static/**/*.css',
    'src/**/*.json',
    'lang/locales/json/*.json',
    { pattern: 'test/**/*.spec.js', ignore: true },
    { pattern: 'src/**/*.spec.js', ignore: true },
    'src/**/*.js*',
    'src/**/*.scss',
    'src/**/*.css',
    'src/**/*.less',
  ],

  filesWithNoCoverageCalculated: [
    'src/**/*.dev.js',
    'test/test_helper.js',
    '*.scss',
    '*.css',
    '*.less',
    'src/ssr/services/bootstrap.js',
    'src/ssr/middlewares/http2Push.js',
    'static/**',
  ],

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
