import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const http2Push = (pathToStatic) => (req, res, next) => {
  if (req.isSpdy) {
    const headers = {
      'content-type': 'application/javascript',
      'accept-encoding': 'gzip',
      'Content-Encoding': 'gzip',
    };
    const options = {
      status: 200,
      method: 'GET',
      request: {
        accept: '*/*',
      },
      response: {
        ...headers,
      },
    };
    const assets = webpackIsomorphicTools.assets();

    const coreStream = res.push(assets.javascript.core, options);
    const mainStream = res.push(assets.javascript.main, options);
    const mainCssStream = res.push(assets.styles.main, options);

    const coreJsFile = fs.readFileSync(path.join(pathToStatic, assets.javascript.core)); // eslint-disable-line
    const mainJsFile = fs.readFileSync(path.join(pathToStatic, assets.javascript.main)); // eslint-disable-line
    const mainCssFile = fs.readFileSync(path.join(pathToStatic, assets.styles.main)); // eslint-disable-line

    coreStream.end(zlib.gzipSync(coreJsFile));// eslint-disable-line
    mainStream.end(zlib.gzipSync(mainJsFile));// eslint-disable-line
    mainCssStream.end(zlib.gzipSync(mainCssFile));// eslint-disable-line
  }

  res.status(200);

  next();
};

export default http2Push;
