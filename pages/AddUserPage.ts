import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AddUserPage extends BasePage {
  // ─── Locators ─────────────────────────────────────────────────────────────────

  private get userRoleDropdown(): Locator {
    return this.page
      .locator('.oxd-form-row:has(.oxd-label:text("User Role")) .oxd-select-wrapper')
      .first();
  }

  private get employeeNameInput(): Locator {
    return this.page.locator(
      '.oxd-form-row:has(.oxd-label:text("Employee Name")) input'
    );
  }

  private get usernameInput(): Locator {
    return this.page.locator(
      '.oxd-form-row:has(.oxd-label:text("Username")) input'
    );
  }

  private get statusDropdown(): Locator {
    return this.page
      .locator('.oxd-form-row:has(.oxd-label:text("Status")) .oxd-select-wrapper')
      .first();
  }

  private get passwordInput(): Locator {
    return this.page.locator('input[name="password"]');
  }

  private get confirmPasswordInput(): Locator {
    return this.page.locator('input[name="confirmPassword"]');
  }

  // ─── Actions ──────────────────────────────────────────────────────────────────

  async selectUserRole(role: string): Promise<void> {
    await this.selectDropdownOption(this.userRoleDropdown, role);
  }

  async selectEmployeeName(employeeName: string): Promise<void> {
    await this.employeeNameInput.fill(employeeName.split(' ')[0]);
    await this.page.waitForTimeout(1500);
    const exactSuggestion = this.page
      .locator(`.oxd-autocomplete-option:has-text("${employeeName}")`)
      .first();
    if (await exactSuggestion.isVisible().catch(() => false)) {
      await exactSuggestion.click();
    } else {
      const firstSuggestion = this.page.locator('.oxd-autocomplete-option').first();
      if (await firstSuggestion.isVisible().catch(() => false)) {
        await firstSuggestion.click();
      }
    }
  }

  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async selectStatus(status: string): Promise<void> {
    await this.selectDropdownOption(this.statusDropdown, status);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async enterConfirmPassword(password: string): Promise<void> {
    await this.confirmPasswordInput.fill(password);
  }

  async saveUser(): Promise<void> {
    await this.clickSaveButton();
  }
}
