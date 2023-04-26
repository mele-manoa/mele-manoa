import { Selector } from 'testcafe';

class ProfilePage {
  constructor() {
    this.pageId = '#profile';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async gotoEditProfilePage(testController) {
    await testController.click('#edit-profile-button');
  }
}

export const profilePage = new ProfilePage();
