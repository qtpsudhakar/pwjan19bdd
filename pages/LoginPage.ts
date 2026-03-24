import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // ─── Locators ─────────────────────────────────────────────────────────────────

  private get usernameInput(): Locator {
    return this.page.locator('input[name="username"]');
  }

  private get passwordInput(): Locator {
    return this.page.locator('input[name="password"]');
  }

  private get loginButton(): Locator {
    return this.page.locator('button[type="submit"]');
  }

  private get errorAlert(): Locator {
    return this.page.locator('.oxd-alert-content-text');
  }

  private get validationMessages(): Locator {
    return this.page.locator('.oxd-input-field-error-message');
  }

  // ─── Actions ──────────────────────────────────────────────────────────────────

  async navigate(): Promise<void> {
    await this.page.waitForSelector('input[name="username"]', { timeout: 15000 });
  }

  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  // ─── Verifications ────────────────────────────────────────────────────────────

  async verifyErrorMessageVisible(): Promise<void> {
    await expect(this.errorAlert).toBeVisible({ timeout: 10000 });
    await expect(this.errorAlert).toContainText('Invalid credentials');
  }

  async verifyValidationMessagesDisplayed(): Promise<void> {
    await expect(this.validationMessages.first()).toBeVisible({ timeout: 10000 });
    const count = await this.validationMessages.count();
    expect(count).toBeGreaterThan(0);
  }
}
