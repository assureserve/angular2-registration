import { Angular2RegistrationPage } from './app.po';

describe('angular2-registration App', function() {
  let page: Angular2RegistrationPage;

  beforeEach(() => {
    page = new Angular2RegistrationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
