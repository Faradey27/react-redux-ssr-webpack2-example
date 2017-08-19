require('./server.babel');

const path = require('path');
const rootDir = path.resolve(__dirname, '..');

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');

global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools')).
  server(rootDir, () => {
    require('../src/ssr/server');
  });
