import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { profilePage } from './profile.page';
import { editProfilePage } from './editProfile.page';
import { navBar } from './navbar.component';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
});

test('Test that profile and editProfile page shows up', async (testController) => {
  await navBar.gotoProfilePage(testController);
  await profilePage.isDisplayed(testController);
  await editProfilePage.isDisplayed(testController);
});


test('Test that discover page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that groups page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});