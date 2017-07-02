import { Component } from 'react';
import { IndexLink } from 'react-router';
import { asyncConnect } from 'redux-connect';

@asyncConnect([{
  promise: () => new Promise((resolve) => {
    const DELAY = 100;

    setTimeout(() => {
      resolve(true);
    }, DELAY);
  }),
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
