import { browser, by, element } from 'protractor';

export class PoleStarTestPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitle() {
    return element(by.css('app-root h1')).getText();
  }
}
