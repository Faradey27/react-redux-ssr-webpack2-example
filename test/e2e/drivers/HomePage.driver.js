import { browser, element, by } from 'protractor';

class HomeDriver {
  when = {
    navigated: (url = '/') => {
      browser.get(url);

      return this;
    },
  };
  is = {
    ok: () => element(by.css('[data-testid=homePage]')).isDisplayed(),
  };
  get = {

  }
}

export default HomeDriver;

