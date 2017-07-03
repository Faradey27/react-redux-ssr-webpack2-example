/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { applyRouterMiddleware, Router, browserHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-connect';
import { AppContainer as HotEnabler } from 'react-hot-loader';
import { useScroll } from 'react-router-scroll';
import Provider from './../shared/components/Provider';
import createStore from './../shared/redux/create';
import getRoutes from './../shared/routes';
import Api from './../shared/helpers/Api';

import isOnline from './utils/isOnline';

const api = new Api();
const dest = document.getElementById('content');

Promise.all([window.__data ? true : isOnline()]).
  then(([online]) => {
    const data = !online ? { ...window.__data, online } : { ...window.__data, online };
    const store = createStore(browserHistory, { api }, data);
    const history = syncHistoryWithStore(browserHistory, store);

    const renderRouter = (props) => (
      <ReduxAsyncConnect
        filter={(item) => !item.deferred} // eslint-disable-line
        helpers={{ api }}
        render={applyRouterMiddleware(useScroll())}
        {...props}
      />
    );

    const render = (routes) => {
      match({ history, routes }, (error, redirectLocation, renderProps) => {
        ReactDOM.render(
          <HotEnabler>
            <Provider
              key="provider"
              store={store}
            >
              <Router
                history={history}
                render={renderRouter}
                {...renderProps}
              >
                {routes}
              </Router>
            </Provider>
          </HotEnabler>,
          dest
        );
      });
    };

    render(getRoutes(store));

    if (module.hot) {
      module.hot.accept('./../shared/routes', () => {
        const nextRoutes = require('./../shared/routes')(store);

        render(nextRoutes);
      });
    }

    if (process.env.NODE_ENV !== 'production') {
      window.React = React; // enable debugger

      if (!dest || !dest.firstChild || !dest.firstChild.attributes ||
        !dest.firstChild.attributes['data-react-checksum']) {
        console.error('Server-side React render was discarded.' +
          'Make sure that your initial render does not contain any client-side code.');
      }
    }

    if (process.env.NODE_ENV !== 'production' && !window.devToolsExtension) {
      const devToolsDest = document.createElement('div');

      window.document.body.insertBefore(devToolsDest, null);
      const DevTools = require('./components/DevTools/DevTools');

      ReactDOM.render(
        <Provider
          key="provider"
          store={store}
        >
          <DevTools />
        </Provider>,
        devToolsDest
      );
    }

    if (online && process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/dist/service-worker.js', { scope: '/' }).
        then(() => {
          console.info('Service worker registered!');
        }).
        catch((error) => {
          console.info('Error registering service worker: ', error);
        });

      navigator.serviceWorker.ready.then((/* registration */) => {
        console.info('Service Worker Ready');
      });
    }
  });
