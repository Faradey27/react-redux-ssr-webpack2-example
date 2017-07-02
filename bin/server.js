require('./server.babel');

const path = require('path');
const rootDir = path.resolve(__dirname, '..');

if (process.env.NODE_ENV !== 'production') {
  if (!require('piping')({
    hook: true,
    ignore: /(\/\.|~$|\.json|\.scss$)/i,
  })) {
    return;
  }
}

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');

global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools')).
  server(rootDir, () => {
    require('../src/ssr/server');
  });
