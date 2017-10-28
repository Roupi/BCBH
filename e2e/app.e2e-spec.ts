import { BcbhPage } from './app.po';

describe('bcbh App', () => {
  let page: BcbhPage;

  beforeEach(() => {
    page = new BcbhPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
