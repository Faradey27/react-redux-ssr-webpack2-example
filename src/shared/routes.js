/* eslint-disable react/jsx-no-bind */
import { IndexRoute, Route } from 'react-router';
import App from './../client/containers/App';

// eslint-disable-next-line import/no-dynamic-require
if (typeof System.import === 'undefined') System.import = (module) => Promise.resolve(require(module));

export default () => (
  <Route
    component={App}
    path="/"
  >
    <IndexRoute getComponent={() => System.import('./../client/pages/Home')} />
    <Route
      getComponent={() => System.import('./../client/pages/About')}
      path="/about"
    />
    <Route
      getComponent={() => System.import('./../client/pages/NotFound')}
      path="*"
      status={404}
    />
  </Route>
);
