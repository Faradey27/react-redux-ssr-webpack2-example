import React from 'react';
import { object } from 'prop-types';
import Image from './../Image';

import styles from './HeaderBar.scss';

export default class HeaderBar extends React.Component {
  static contextTypes = {
    i18n: object,
  };

  render() {
    const { l } = this.context.i18n;

    return (
      <div className={styles.headerBar}>
        <div className={styles.leftSide}>
          <div className={styles.logo}>
            <Image
              className={styles.logoImg}
              src={require('./imgs/logo.png')}
            />
          </div>
          <div className={styles.title}>
            <h1>{l('React Example')}</h1>
          </div>
        </div>
        <div className={styles.rightSide}>
          <div>{l('Register')}</div>
          <div>{l('Login')}</div>
          <div>{l('Do something')}</div>
        </div>
      </div>
    );
  }
}
