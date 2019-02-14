import { PoleStarTestPage } from './app.po';

describe('pole-star-test App', () => {
  let page: PoleStarTestPage;

  beforeEach(() => {
    page = new PoleStarTestPage();
  });

  it('should display title \'Screening Profiles\'', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('Screening Profiles');
  });
});
