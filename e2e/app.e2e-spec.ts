import { PoleStarTestPage } from './app.po';

describe('pole-star-test App', () => {
  let page: PoleStarTestPage;

  beforeEach(() => {
    page = new PoleStarTestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
