import { Component } from 'react';
import { IndexLink } from 'react-router';
import { asyncConnect } from 'redux-connect';

import { loadWidgets } from './../../../shared/redux/modules/widgets/actions';

@asyncConnect([{
  promise: ({ store }) => store.dispatch(loadWidgets()),
}])
export default class App extends Component {
  render() {
    const s = require('./Home.scss');

    return (
      <div className={s.home}>
        {'Home page'}
        <IndexLink to="/about">{'About'}</IndexLink>
      </div>
    );
  }
}
