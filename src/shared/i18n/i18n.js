import Jed from 'jed';
import en from './../../../lang/locales/json/en.json';
import ru from './../../../lang/locales/json/ru.json';

const locales = {
  en, ru,
};

class I18n {
  constructor({ locale }) {
    this.setLanguage(locale);
  }

  setLanguage = (locale) => {
    this.localeData = locales[locale];
    this.locale = locale;

    this.jed = new Jed(this.localeData);
  }

  l = (text) => this.jed.gettext(text);

  ngettext = (singular, plural, amount) => this.jed.ngettext(singular, plural, amount);

  getLocale = () => this.locale.toLowerCase();
}

export default (
  new I18n({ locale: 'en' })
);
