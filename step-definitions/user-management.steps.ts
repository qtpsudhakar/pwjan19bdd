import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { OrangeHRMWorld } from '../support/world';

// ─── NAVIGATION ───────────────────────────────────────────────────────────────

Given(
  'the user navigates to Admin module',
  async function (this: OrangeHRMWorld) {
    await this.page.locator('a[href="/web/index.php/admin/viewAdminModule"]').click();
    await this.page.waitForURL('**/admin/viewSystemUsers', { timeout: 15000 });
    await this.page.waitForLoadState('networkidle');
  }
);

Given(
  'the user is on the User Management page',
  async function (this: OrangeHRMWorld) {
    await this.page.waitForSelector('.orangehrm-header-container', { timeout: 10000 });
  }
);

// ─── ADD USER ─────────────────────────────────────────────────────────────────

When(
  'the user clicks on Add User button',
  async function (this: OrangeHRMWorld) {
    await this.page.locator('button:has-text("Add")').click();
    await this.page.waitForURL('**/admin/saveSystemUser', { timeout: 10000 });
    await this.page.waitForLoadState('networkidle');
  }
);

When(
  'the user selects user role {string}',
  async function (this: OrangeHRMWorld, role: string) {
    const roleDropdown = this.page
      .locator('.oxd-form-row:has(.oxd-label:text("User Role")) .oxd-select-wrapper')
      .first();
    await roleDropdown.click();
    await this.page.locator(`.oxd-select-option:has-text("${role}")`).click();
  }
);

When(
  'the user selects employee name {string}',
  async function (this: OrangeHRMWorld, employeeName: string) {
    const employeeInput = this.page.locator(
      '.oxd-form-row:has(.oxd-label:text("Employee Name")) input'
    );
    await employeeInput.fill(employeeName.split(' ')[0]);
    await this.page.waitForTimeout(1500);
    const suggestion = this.page
      .locator(`.oxd-autocomplete-option:has-text("${employeeName}")`)
      .first();
    const suggestionVisible = await suggestion.isVisible().catch(() => false);
    if (suggestionVisible) {
      await suggestion.click();
    } else {
      // Fallback: click first available suggestion
      const firstSuggestion = this.page.locator('.oxd-autocomplete-option').first();
      const firstVisible = await firstSuggestion.isVisible().catch(() => false);
      if (firstVisible) {
        await firstSuggestion.click();
      }
    }
  }
);

When(
  'the user enters new username {string}',
  async function (this: OrangeHRMWorld, username: string) {
    const usernameInput = this.page.locator(
      '.oxd-form-row:has(.oxd-label:text("Username")) input'
    );
    await usernameInput.fill(username);
  }
);

When(
  'the user selects status {string}',
  async function (this: OrangeHRMWorld, status: string) {
    const statusDropdown = this.page
      .locator('.oxd-form-row:has(.oxd-label:text("Status")) .oxd-select-wrapper')
      .first();
    await statusDropdown.click();
    await this.page.locator(`.oxd-select-option:has-text("${status}")`).click();
  }
);

When(
  'the user enters user password {string}',
  async function (this: OrangeHRMWorld, password: string) {
    const passwordInput = this.page.locator('input[name="password"]');
    await passwordInput.fill(password);
  }
);

When(
  'the user confirms the password {string}',
  async function (this: OrangeHRMWorld, password: string) {
    const confirmInput = this.page.locator('input[name="confirmPassword"]');
    await confirmInput.fill(password);
  }
);

When(
  'the user saves the new user',
  async function (this: OrangeHRMWorld) {
    await this.page.locator('button[type="submit"]:has-text("Save")').click();
    await this.page.waitForLoadState('networkidle');
  }
);

// ─── SEARCH USER ──────────────────────────────────────────────────────────────

When(
  'the user enters username to search {string}',
  async function (this: OrangeHRMWorld, username: string) {
    const usernameInput = this.page.locator(
      '.oxd-table-filter .oxd-form-row:has(.oxd-label:text("Username")) input'
    );
    await usernameInput.fill(username);
  }
);

When(
  'the user selects user role filter {string}',
  async function (this: OrangeHRMWorld, role: string) {
    const roleDropdown = this.page
      .locator(
        '.oxd-table-filter .oxd-form-row:has(.oxd-label:text("User Role")) .oxd-select-wrapper'
      )
      .first();
    await roleDropdown.click();
    await this.page.locator(`.oxd-select-option:has-text("${role}")`).click();
  }
);

When(
  'the user selects status filter {string}',
  async function (this: OrangeHRMWorld, status: string) {
    const statusDropdown = this.page
      .locator(
        '.oxd-table-filter .oxd-form-row:has(.oxd-label:text("Status")) .oxd-select-wrapper'
      )
      .first();
    await statusDropdown.click();
    await this.page.locator(`.oxd-select-option:has-text("${status}")`).click();
  }
);

When(
  'the user clicks the reset button',
  async function (this: OrangeHRMWorld) {
    await this.page.locator('button[type="reset"]:has-text("Reset")').click();
    await this.page.waitForLoadState('networkidle');
  }
);

// ─── ASSERTIONS ───────────────────────────────────────────────────────────────

Then(
  'the user list page should be displayed',
  async function (this: OrangeHRMWorld) {
    await this.page.waitForURL('**/admin/viewSystemUsers', { timeout: 15000 });
    const header = this.page.locator('.orangehrm-header-container');
    await expect(header).toBeVisible({ timeout: 10000 });
  }
);

Then(
  'the user list should display results',
  async function (this: OrangeHRMWorld) {
    const rows = this.page.locator('.oxd-table-body .oxd-table-row');
    await expect(rows.first()).toBeVisible({ timeout: 10000 });
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);
  }
);

Then(
  'the username {string} should appear in the results',
  async function (this: OrangeHRMWorld, username: string) {
    const tableBody = this.page.locator('.oxd-table-body');
    await expect(tableBody).toContainText(username, { timeout: 10000 });
  }
);

Then(
  'all displayed users should have role {string}',
  async function (this: OrangeHRMWorld, role: string) {
    const roleCells = this.page.locator(
      '.oxd-table-body .oxd-table-row .oxd-table-cell:nth-child(2)'
    );
    const count = await roleCells.count();
    for (let i = 0; i < count; i++) {
      await expect(roleCells.nth(i)).toContainText(role);
    }
  }
);

Then(
  'the search filters should be cleared',
  async function (this: OrangeHRMWorld) {
    const usernameInput = this.page.locator(
      '.oxd-table-filter .oxd-form-row:has(.oxd-label:text("Username")) input'
    );
    await expect(usernameInput).toHaveValue('');
  }
);
