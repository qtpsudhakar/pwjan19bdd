import { Given, When, Then } from '@cucumber/cucumber';
import { POMWorld } from '../support/pom-world';

// ─── NAVIGATION ───────────────────────────────────────────────────────────────

Given(
  'the user is logged in as {string} with password {string}',
  async function (this: POMWorld, username: string, password: string) {
    await this.navigateTo('');
    await this.loginPage.navigate();
    await this.loginPage.login(username, password);
    await this.dashboardPage.verifyDashboardLoaded();
  }
);

Given(
  'the user navigates to PIM module',
  async function (this: POMWorld) {
    await this.dashboardPage.navigateToPIM();
  }
);

Given(
  'the user is on the Employee List page',
  async function (this: POMWorld) {
    await this.employeeListPage.verifyPageLoaded();
  }
);

// ─── ADD EMPLOYEE ─────────────────────────────────────────────────────────────

When(
  'the user clicks on Add Employee button',
  async function (this: POMWorld) {
    await this.employeeListPage.clickAddEmployee();
  }
);

When(
  'the user enters first name {string}',
  async function (this: POMWorld, firstName: string) {
    await this.addEmployeePage.enterFirstName(firstName);
  }
);

When(
  'the user enters last name {string}',
  async function (this: POMWorld, lastName: string) {
    await this.addEmployeePage.enterLastName(lastName);
  }
);

When(
  'the user enters employee id {string}',
  async function (this: POMWorld, employeeId: string) {
    await this.addEmployeePage.enterEmployeeId(employeeId);
  }
);

When(
  'the user saves the new employee',
  async function (this: POMWorld) {
    await this.addEmployeePage.saveEmployee();
  }
);

// ─── SEARCH EMPLOYEE ──────────────────────────────────────────────────────────

When(
  'the user enters search name {string}',
  async function (this: POMWorld, name: string) {
    await this.employeeListPage.enterSearchName(name);
  }
);

When(
  'the user enters employee id in search {string}',
  async function (this: POMWorld, empId: string) {
    await this.employeeListPage.enterSearchEmployeeId(empId);
  }
);

When(
  'the user clicks the search button',
  async function (this: POMWorld) {
    await this.employeeListPage.clickSearchButton();
  }
);

// ─── ASSERTIONS ───────────────────────────────────────────────────────────────

Then(
  'the employee profile page should be displayed',
  async function (this: POMWorld) {
    await this.addEmployeePage.verifyEmployeeProfileDisplayed();
  }
);

Then(
  'a success toast message should be visible',
  async function (this: POMWorld) {
    await this.addEmployeePage.verifySuccessToastVisible();
  }
);

Then(
  'the employee list should display results',
  async function (this: POMWorld) {
    await this.employeeListPage.verifyResultsDisplayed();
  }
);

Then(
  'the employee {string} should appear in the search results',
  async function (this: POMWorld, name: string) {
    await this.employeeListPage.verifyEmployeeInResults(name);
  }
);

Then(
  'the no records found message should be displayed',
  async function (this: POMWorld) {
    await this.employeeListPage.verifyNoRecordsFound();
  }
);
