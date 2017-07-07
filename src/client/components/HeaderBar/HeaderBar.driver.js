import { mount } from 'enzyme';
import HeaderBar from './index';
import styles from './HeaderBar.scss';

export default class HeaderBarDriver {
  when = {
    created: (props) => {
      this.component = mount(
        <HeaderBar {...props} />,
      );

      return this;
    },
  };

  has = {
    headerBarClassNameFromStyles: () => this.component.hasClass(styles.headerBar),
  }

  get = {
    isOk: () => Boolean(typeof this.component === 'object' && Object.keys(this.component).length > 0),
    component: () => this.component,
  }
}