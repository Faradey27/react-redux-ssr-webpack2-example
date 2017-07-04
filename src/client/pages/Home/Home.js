import { Component } from 'react';
import PropTypes from 'prop-types';
import { IndexLink } from 'react-router';
import { asyncConnect } from 'redux-connect';

import { loadWidgets } from './../../../shared/redux/modules/widgets/actions';

@asyncConnect([{
  promise: ({ store }) => store.dispatch(loadWidgets()),
}])
export default class App extends Component {
  static contextTypes = {
    i18n: PropTypes.object,
  }

  render() {
    const { l } = this.context.i18n;
    const s = require('./Home.scss');

    return (
      <div className={s.home}>
        {l('Home page')}
        <IndexLink to="/about">{l('About')}</IndexLink>
      </div>
    );
  }
}
