exports.config = {
  framework: 'jasmine',
  capabilities: {
    browserName: 'chrome',
  },
  SELENIUM_PROMISE_MANAGER: false,
  specs: ['test/**/*.e2e.js'],
  onPrepare() {
    require('babel-register');
    browser.ignoreSynchronization = true; // eslint-disable-line
  },
};
