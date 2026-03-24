import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AddEmployeePage extends BasePage {
  // ─── Locators ─────────────────────────────────────────────────────────────────

  private get firstNameInput(): Locator {
    return this.page.locator('input[name="firstName"]');
  }

  private get lastNameInput(): Locator {
    return this.page.locator('input[name="lastName"]');
  }

  private get employeeIdInput(): Locator {
    return this.page.locator(
      '.oxd-form-row:has(.oxd-label:text("Employee Id")) input'
    );
  }

  private get profilePageTitle(): Locator {
    return this.page.locator('.orangehrm-main-title');
  }

  // ─── Actions ──────────────────────────────────────────────────────────────────

  async enterFirstName(firstName: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
  }

  async enterLastName(lastName: string): Promise<void> {
    await this.lastNameInput.fill(lastName);
  }

  async enterEmployeeId(employeeId: string): Promise<void> {
    await this.employeeIdInput.clear();
    await this.employeeIdInput.fill(employeeId);
  }

  async saveEmployee(): Promise<void> {
    await this.clickSaveButton();
  }

  // ─── Verifications ────────────────────────────────────────────────────────────

  async verifyEmployeeProfileDisplayed(): Promise<void> {
    await this.page.waitForURL('**/pim/viewPersonalDetails**', { timeout: 15000 });
    await expect(this.profilePageTitle).toBeVisible({ timeout: 10000 });
  }
}
