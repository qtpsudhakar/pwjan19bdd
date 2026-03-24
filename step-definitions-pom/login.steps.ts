import { Given, When, Then } from '@cucumber/cucumber';
import { POMWorld } from '../support/pom-world';

// ─── NAVIGATION ───────────────────────────────────────────────────────────────

Given(
  'the user navigates to OrangeHRM login page',
  async function (this: POMWorld) {
    await this.navigateTo('');
    await this.loginPage.navigate();
  }
);

// ─── ACTIONS ──────────────────────────────────────────────────────────────────

When(
  'the user enters username {string}',
  async function (this: POMWorld, username: string) {
    await this.loginPage.enterUsername(username);
  }
);

When(
  'the user enters password {string}',
  async function (this: POMWorld, password: string) {
    await this.loginPage.enterPassword(password);
  }
);

When(
  'the user clicks the login button',
  async function (this: POMWorld) {
    await this.loginPage.clickLogin();
  }
);

// ─── ASSERTIONS ───────────────────────────────────────────────────────────────

Then(
  'the user should be redirected to the dashboard',
  async function (this: POMWorld) {
    await this.dashboardPage.verifyDashboardLoaded();
  }
);

Then(
  'the dashboard header should be visible',
  async function (this: POMWorld) {
    await this.dashboardPage.verifyDashboardHeaderVisible();
  }
);

Then(
  'an error message should be displayed',
  async function (this: POMWorld) {
    await this.loginPage.verifyErrorMessageVisible();
  }
);

Then(
  'validation messages should be displayed for required fields',
  async function (this: POMWorld) {
    await this.loginPage.verifyValidationMessagesDisplayed();
  }
);
