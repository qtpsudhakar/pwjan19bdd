import { Given, When, Then } from '@cucumber/cucumber';
import { POMWorld } from '../support/pom-world';

// ─── NAVIGATION ───────────────────────────────────────────────────────────────

Given(
  'the user navigates to Admin module',
  async function (this: POMWorld) {
    await this.dashboardPage.navigateToAdmin();
  }
);

Given(
  'the user is on the User Management page',
  async function (this: POMWorld) {
    await this.userManagementPage.verifyPageLoaded();
  }
);

// ─── ADD USER ─────────────────────────────────────────────────────────────────

When(
  'the user clicks on Add User button',
  async function (this: POMWorld) {
    await this.userManagementPage.clickAddUser();
  }
);

When(
  'the user selects user role {string}',
  async function (this: POMWorld, role: string) {
    await this.addUserPage.selectUserRole(role);
  }
);

When(
  'the user selects employee name {string}',
  async function (this: POMWorld, employeeName: string) {
    await this.addUserPage.selectEmployeeName(employeeName);
  }
);

When(
  'the user enters new username {string}',
  async function (this: POMWorld, username: string) {
    await this.addUserPage.enterUsername(username);
  }
);

When(
  'the user selects status {string}',
  async function (this: POMWorld, status: string) {
    await this.addUserPage.selectStatus(status);
  }
);

When(
  'the user enters user password {string}',
  async function (this: POMWorld, password: string) {
    await this.addUserPage.enterPassword(password);
  }
);

When(
  'the user confirms the password {string}',
  async function (this: POMWorld, password: string) {
    await this.addUserPage.enterConfirmPassword(password);
  }
);

When(
  'the user saves the new user',
  async function (this: POMWorld) {
    await this.addUserPage.saveUser();
  }
);

// ─── SEARCH USER ──────────────────────────────────────────────────────────────

When(
  'the user enters username to search {string}',
  async function (this: POMWorld, username: string) {
    await this.userManagementPage.enterUsernameToSearch(username);
  }
);

When(
  'the user selects user role filter {string}',
  async function (this: POMWorld, role: string) {
    await this.userManagementPage.selectUserRoleFilter(role);
  }
);

When(
  'the user selects status filter {string}',
  async function (this: POMWorld, status: string) {
    await this.userManagementPage.selectStatusFilter(status);
  }
);

When(
  'the user clicks the reset button',
  async function (this: POMWorld) {
    await this.userManagementPage.clickResetButton();
  }
);

// ─── ASSERTIONS ───────────────────────────────────────────────────────────────

Then(
  'the user list page should be displayed',
  async function (this: POMWorld) {
    await this.userManagementPage.verifyUserListPageDisplayed();
  }
);

Then(
  'the user list should display results',
  async function (this: POMWorld) {
    await this.userManagementPage.verifyResultsDisplayed();
  }
);

Then(
  'the username {string} should appear in the results',
  async function (this: POMWorld, username: string) {
    await this.userManagementPage.verifyUsernameInResults(username);
  }
);

Then(
  'all displayed users should have role {string}',
  async function (this: POMWorld, role: string) {
    await this.userManagementPage.verifyAllUsersHaveRole(role);
  }
);

Then(
  'the search filters should be cleared',
  async function (this: POMWorld) {
    await this.userManagementPage.verifySearchFiltersCleared();
  }
);
