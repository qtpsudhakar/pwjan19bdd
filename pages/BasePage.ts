import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ─── Navigation ──────────────────────────────────────────────────────────────

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  // ─── Toast / Alerts ──────────────────────────────────────────────────────────

  async getSuccessToast(): Promise<Locator> {
    return this.page.locator('.oxd-toast--success');
  }

  async verifySuccessToastVisible(): Promise<void> {
    const toast = await this.getSuccessToast();
    await expect(toast).toBeVisible({ timeout: 10000 });
  }

  async verifyNoRecordsFound(): Promise<void> {
    await expect(
      this.page.locator('.oxd-text:has-text("No Records Found")')
    ).toBeVisible({ timeout: 10000 });
  }

  // ─── Common actions ───────────────────────────────────────────────────────────

  async clickSearchButton(): Promise<void> {
    await this.page.locator('button[type="submit"]:has-text("Search")').click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(500);
  }

  async clickResetButton(): Promise<void> {
    await this.page.locator('button[type="reset"]:has-text("Reset")').click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickSaveButton(): Promise<void> {
    await this.page.locator('button[type="submit"]:has-text("Save")').click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectDropdownOption(dropdownLocator: Locator, option: string): Promise<void> {
    await dropdownLocator.click();
    await this.page.locator(`.oxd-select-option:has-text("${option}")`).click();
  }
}
