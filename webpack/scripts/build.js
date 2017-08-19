const path = require('path');
const { exec } = require('child_process');
const spawn = require('react-dev-utils/crossSpawn');

const WEBPACK = path.resolve('node_modules', 'webpack/bin/webpack.js');

const BUILD_ENV = {
  "NODE_ENV": "production",
}

const updateEnvironment = (env = {}) => Object.assign(process.env, env);
updateEnvironment(BUILD_ENV);

spawn.sync(WEBPACK, ['--colors', '--display-error-details', '--display-optimization-bailout', '--config=webpack/prod.config.js'], { stdio: [ 'pipe', 'pipe', 'inherit' ] });
