import React from 'react';
import { object } from 'prop-types';

import styles from './HeaderBar.scss';

export default class HeaderBar extends React.Component {
  static contextTypes = {
    i18n: object,
  };

  render() {
    return (
      <div className={styles.headerBar} />
    );
  }
}
