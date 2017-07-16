/* eslint-disable react/jsx-no-bind */
import { IndexRoute, Route, Redirect } from 'react-router';
import App from './../shared/components/App';
import Home from './../client/pages/Home';

// eslint-disable-next-line import/no-dynamic-require
if (typeof System === 'undefined') {
  global.System = {};
  System.import = (module) => Promise.resolve(require(module));
}

export default () => (
  <Route
    component={App}
    path="/"
  >
    <IndexRoute component={Home} />
    <Route
      component={Home}
      path="/home"
    />
    <Route
      getComponent={() => System.import('./../client/pages/About')}
      path="/about"
    />
    <Route
      getComponent={() => System.import('./../client/pages/NotFound')}
      path="*"
      status={404}
    />
    <Redirect
      from="/start"
      to="/"
    />
  </Route>
);
