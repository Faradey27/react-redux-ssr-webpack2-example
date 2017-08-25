import { mount } from 'enzyme';
import { stub } from 'sinon';
import Provider from './index';

const NUMBER_OF_DEFAULT_ERRORS = 2; // from redux devtools

export default class AboutDriver {
  when = {
    created: (props) => {
      this.component = mount(<Provider
        children={<div />}
        store={{
          subscribe: () => {},
          dispatch: () => {},
          getState: () => {},
        }}
        {...props}
      />);

      stub(console, 'error');

      return this;
    },
    updateStore: (store = {}) => {
      this.component.setProps({ store });

      return this;
    },
  };

  is = {
    warnCalled: () => console.error.callCount === (NUMBER_OF_DEFAULT_ERRORS + 1),
  }

  get = {
    isOk: () => Boolean(typeof this.component === 'object' && Object.keys(this.component).length > 0),
  }

  cleanup = () => console.error.restore();
}
