import { DiaryPage } from './app.po';

describe('diary App', function() {
  let page: DiaryPage;

  beforeEach(() => {
    page = new DiaryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
