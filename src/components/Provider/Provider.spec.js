/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-let */

import ProviderDriver from './Provider.driver';

describe('Provider', () => {
  let driver = null;

  beforeEach(() => {
    driver = new ProviderDriver();
  });

  afterEach(() => driver.cleanup());

  it('should render correctly', () => {
    expect(driver.when.created().get.isOk()).toBeTruthy();
  });

  it('should called warn when store change', () => {
    expect(driver.when.created().when.updateStore().is.warnCalled()).toBeTruthy();
  });

  it('should not warn again after first warn', () => {
    expect(driver.when.created().when.updateStore().is.warnCalled()).toBeFalsy();
  });
});
