/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-let */

import HeaderBarDriver from './HeaderBar.driver';

describe('Header', () => {
  let driver = null;

  beforeEach(() => {
    driver = new HeaderBarDriver().when.created();
  });

  it('should render correctly', () => {
    expect(driver.get.isOk()).toBeTruthy();
  });
});
