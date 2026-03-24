import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { OrangeHRMWorld } from '../support/world';

// ─── NAVIGATION ───────────────────────────────────────────────────────────────

Given(
  'the user navigates to OrangeHRM login page',
  async function (this: OrangeHRMWorld) {
    await this.navigateTo('/');
    await this.page.waitForSelector('input[name="username"]', { timeout: 15000 });
  }
);

// ─── ACTIONS ──────────────────────────────────────────────────────────────────

When(
  'the user enters username {string}',
  async function (this: OrangeHRMWorld, username: string) {
    await this.page.locator('input[name="username"]').fill(username);
  }
);

When(
  'the user enters password {string}',
  async function (this: OrangeHRMWorld, password: string) {
    await this.page.locator('input[name="password"]').fill(password);
  }
);

When(
  'the user clicks the login button',
  async function (this: OrangeHRMWorld) {
    await this.page.locator('button[type="submit"]').click();
    await this.page.waitForLoadState('networkidle');
  }
);

// ─── ASSERTIONS ───────────────────────────────────────────────────────────────

Then(
  'the user should be redirected to the dashboard',
  async function (this: OrangeHRMWorld) {
    await this.page.waitForURL('**/dashboard/index', { timeout: 15000 });
    expect(this.page.url()).toContain('dashboard');
  }
);

Then(
  'the dashboard header should be visible',
  async function (this: OrangeHRMWorld) {
    const header = this.page.locator('.oxd-topbar-header-breadcrumb h6');
    await expect(header).toBeVisible({ timeout: 10000 });
    await expect(header).toContainText('Dashboard');
  }
);

Then(
  'an error message should be displayed',
  async function (this: OrangeHRMWorld) {
    const alert = this.page.locator('.oxd-alert-content-text');
    await expect(alert).toBeVisible({ timeout: 10000 });
    await expect(alert).toContainText('Invalid credentials');
  }
);

Then(
  'validation messages should be displayed for required fields',
  async function (this: OrangeHRMWorld) {
    const validationMessages = this.page.locator('.oxd-input-field-error-message');
    await expect(validationMessages.first()).toBeVisible({ timeout: 10000 });
    const count = await validationMessages.count();
    expect(count).toBeGreaterThan(0);
  }
);
