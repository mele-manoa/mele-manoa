import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class RegisterPage {
  constructor() {
    this.pageId = '#register-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async signupUser(testController, username, password) {
    await this.isDisplayed(testController);
    await testController.typeText('#register-form-email', username);
    await testController.typeText('#register-form-password', password);
    await testController.click('#register-form-submit input.btn.btn-light');
    await navBar.isLoggedIn(testController, username);
  }
}

export const signupPage = new RegisterPage();
