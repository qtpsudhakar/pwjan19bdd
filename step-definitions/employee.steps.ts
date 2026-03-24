import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { OrangeHRMWorld } from '../support/world';

// ─── NAVIGATION ───────────────────────────────────────────────────────────────

Given(
  'the user is logged in as {string} with password {string}',
  async function (this: OrangeHRMWorld, username: string, password: string) {
    await this.navigateTo('/web/index.php/auth/login');
    await this.page.waitForSelector('input[name="username"]', { timeout: 15000 });
    await this.page.locator('input[name="username"]').fill(username);
    await this.page.locator('input[name="password"]').fill(password);
    await this.page.locator('button[type="submit"]').click();
    await this.page.waitForURL('**/dashboard/index', { timeout: 15000 });
  }
);

Given(
  'the user navigates to PIM module',
  async function (this: OrangeHRMWorld) {
    await this.page.locator('a[href="/web/index.php/pim/viewPimModule"]').click();
    await this.page.waitForURL('**/pim/viewEmployeeList', { timeout: 15000 });
    await this.page.waitForLoadState('networkidle');
  }
);

Given(
  'the user is on the Employee List page',
  async function (this: OrangeHRMWorld) {
    await this.page.waitForSelector('.orangehrm-header-container', { timeout: 10000 });
  }
);

// ─── ADD EMPLOYEE ─────────────────────────────────────────────────────────────

When(
  'the user clicks on Add Employee button',
  async function (this: OrangeHRMWorld) {
    await this.page.locator('button:has-text("Add")').click();
    await this.page.waitForURL('**/pim/addEmployee', { timeout: 10000 });
    await this.page.waitForLoadState('networkidle');
  }
);

When(
  'the user enters first name {string}',
  async function (this: OrangeHRMWorld, firstName: string) {
    await this.page.locator('input[name="firstName"]').fill(firstName);
  }
);

When(
  'the user enters last name {string}',
  async function (this: OrangeHRMWorld, lastName: string) {
    await this.page.locator('input[name="lastName"]').fill(lastName);
  }
);

When(
  'the user enters employee id {string}',
  async function (this: OrangeHRMWorld, employeeId: string) {
    const empIdField = this.page.locator(
      '.oxd-form-row:has(.oxd-label:text("Employee Id")) input'
    );
    await empIdField.clear();
    await empIdField.fill(employeeId);
  }
);

When(
  'the user saves the new employee',
  async function (this: OrangeHRMWorld) {
    await this.page.locator('button[type="submit"]:has-text("Save")').click();
    await this.page.waitForLoadState('networkidle');
  }
);

// ─── SEARCH EMPLOYEE ──────────────────────────────────────────────────────────

When(
  'the user enters search name {string}',
  async function (this: OrangeHRMWorld, name: string) {
    const employeeNameInput = this.page.locator(
      '.oxd-table-filter input[placeholder="Type for hints..."]'
    );
    await employeeNameInput.fill(name);
    await this.page.waitForTimeout(1000);
    // Select autocomplete suggestion if visible
    const suggestion = this.page.locator('.oxd-autocomplete-option').first();
    const suggestionVisible = await suggestion.isVisible();
    if (suggestionVisible) {
      await suggestion.click();
    }
  }
);

When(
  'the user enters employee id in search {string}',
  async function (this: OrangeHRMWorld, empId: string) {
    const empIdInput = this.page.locator(
      '.oxd-table-filter .oxd-form-row:nth-child(1) .oxd-grid-2 > div:nth-child(2) input'
    );
    await empIdInput.fill(empId);
  }
);

When(
  'the user clicks the search button',
  async function (this: OrangeHRMWorld) {
    await this.page.locator('button[type="submit"]:has-text("Search")').click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
  }
);

// ─── ASSERTIONS ───────────────────────────────────────────────────────────────

Then(
  'the employee profile page should be displayed',
  async function (this: OrangeHRMWorld) {
    await this.page.waitForURL('**/pim/viewPersonalDetails**', { timeout: 15000 });
    const heading = this.page.locator('.orangehrm-main-title');
    await expect(heading).toBeVisible({ timeout: 10000 });
  }
);

Then(
  'a success toast message should be visible',
  async function (this: OrangeHRMWorld) {
    const toast = this.page.locator('.oxd-toast--success');
    await expect(toast).toBeVisible({ timeout: 10000 });
  }
);

Then(
  'the employee list should display results',
  async function (this: OrangeHRMWorld) {
    const rows = this.page.locator('.oxd-table-body .oxd-table-row');
    await expect(rows.first()).toBeVisible({ timeout: 10000 });
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);
  }
);

Then(
  'the employee {string} should appear in the search results',
  async function (this: OrangeHRMWorld, name: string) {
    const tableBody = this.page.locator('.oxd-table-body');
    await expect(tableBody).toContainText(name, { timeout: 10000 });
  }
);

Then(
  'the no records found message should be displayed',
  async function (this: OrangeHRMWorld) {
    const noRecords = this.page.locator('.oxd-text:has-text("No Records Found")');
    await expect(noRecords).toBeVisible({ timeout: 10000 });
  }
);
