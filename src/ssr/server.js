import express from 'express';
import http from 'http';
import http2 from 'spdy';
import fs from 'fs';
import path from 'path';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import VError from 'verror';
import PrettyError from 'pretty-error';

import React from 'react';
import ReactDOM from 'react-dom/server';
import favicon from 'serve-favicon';
import { match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import createHistory from 'react-router/lib/createMemoryHistory';

import config from './../shared/configs/appConfig';

import Provider from './../shared/components/Provider';
import Api from './../shared/helpers/Api';
import Html from './../shared/helpers/Html';
import getRoutes from './../shared/routes';

import createStore from './../shared/redux/create';

global.React = React;

process.on('unhandledRejection', (error) => console.error(error));

const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, '/httpsConfig/server.key')), // eslint-disable-line
  cert: fs.readFileSync(path.join(__dirname, '/httpsConfig/server.crt')), // eslint-disable-line
  ca: fs.readFileSync(path.join(__dirname, '/httpsConfig/server.csr')), // eslint-disable-line
};

const pretty = new PrettyError();
const app = express();
const server = new http.Server(app);
const http2Server = http2.createServer(httpsOptions, app);

const pathToStatic = path.join(__dirname, '../../', 'static');

app.use(cookieParser());
app.use(compression());
app.use(favicon(path.join(pathToStatic, 'favicon.ico')));
app.get('/manifest.json', (req, res) => res.sendFile(path.join(pathToStatic, 'manifest.json')));

app.use('/dist/service-worker.js', (req, res, next) => {
  res.setHeader('Service-Worker-Allowed', '/');

  return next();
});

app.use(express.static(pathToStatic));

app.use((req, res, next) => {
  res.setHeader('X-Forwarded-For', req.ip);

  return next();
});

app.use('/v1/api/widgets', (req, res) => res.json([{}, {}, {}]));

app.use((req, res) => {
  if (process.env.NODE_ENV !== 'production') {
    webpackIsomorphicTools.refresh();
  }
  const providers = {
    api: new Api(req),
  };
  const memoryHistory = createHistory(req.originalUrl);
  const store = createStore(memoryHistory, providers);
  const history = syncHistoryWithStore(memoryHistory, store);

  const hydrateOnClient = () => {
    const stringToReturn = ReactDOM.renderToString(
      <Html
        assets={webpackIsomorphicTools.assets()}
        store={store}
      />
    );

    res.send(`<!doctype html>
      ${stringToReturn}`);
  };

  if (process.env.DISABLE_SSR) {
    return hydrateOnClient();
  }

  match({
    history,
    routes: getRoutes(store),
    location: req.originalUrl,
  }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient();
    } else if (renderProps) {
      const redirect = (to) => {
        throw new VError({ name: 'RedirectError', info: { to } });
      };

      loadOnServer({ ...renderProps, store, helpers: { ...providers, redirect } }).then(() => {
        const component = (
          <Provider
            key="provider"
            store={store}
          >
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        );

        res.status(200);

        global.navigator = { userAgent: req.headers['user-agent'] };

        const stringToReturn = ReactDOM.renderToString(
          <Html
            assets={webpackIsomorphicTools.assets()}
            component={component}
            store={store}
          />
        );

        res.send(`<!doctype html>
          ${stringToReturn}`);
      }).catch((mountError) => {
        if (mountError.name === 'RedirectError') {
          return res.redirect(VError.info(mountError).to);
        }
        console.error('MOUNT ERROR:', pretty.render(mountError));
        res.status(500);
        hydrateOnClient();

        return true;
      });
    } else {
      res.status(404).send('Not found');
    }
  });

  return true;
});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
    }
  });

  http2Server.
    listen(config.httpsPort, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.info('==> 💻  HTTP2 Open https://%s:%s in a browser to view the app.', config.host, config.httpsPort);
      }
    });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
