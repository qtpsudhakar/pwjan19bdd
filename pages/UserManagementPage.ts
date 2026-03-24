import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class UserManagementPage extends BasePage {
  // ─── Locators ─────────────────────────────────────────────────────────────────

  private get addButton(): Locator {
    return this.page.locator('button:has-text("Add")');
  }

  private get usernameSearchInput(): Locator {
    return this.page.locator(
      '.oxd-table-filter .oxd-form-row:has(.oxd-label:text("Username")) input'
    );
  }

  private get userRoleFilterDropdown(): Locator {
    return this.page.locator(
      '.oxd-table-filter .oxd-form-row:has(.oxd-label:text("User Role")) .oxd-select-wrapper'
    ).first();
  }

  private get statusFilterDropdown(): Locator {
    return this.page.locator(
      '.oxd-table-filter .oxd-form-row:has(.oxd-label:text("Status")) .oxd-select-wrapper'
    ).first();
  }

  private get tableRows(): Locator {
    return this.page.locator('.oxd-table-body .oxd-table-row');
  }

  private get tableBody(): Locator {
    return this.page.locator('.oxd-table-body');
  }

  private get pageHeader(): Locator {
    return this.page.locator('.orangehrm-header-container');
  }

  // ─── Actions ──────────────────────────────────────────────────────────────────

  async verifyPageLoaded(): Promise<void> {
    await expect(this.pageHeader).toBeVisible({ timeout: 10000 });
  }

  async clickAddUser(): Promise<void> {
    await this.addButton.click();
    await this.page.waitForURL('**/admin/saveSystemUser', { timeout: 10000 });
    await this.page.waitForLoadState('networkidle');
  }

  async enterUsernameToSearch(username: string): Promise<void> {
    await this.usernameSearchInput.fill(username);
  }

  async selectUserRoleFilter(role: string): Promise<void> {
    await this.selectDropdownOption(this.userRoleFilterDropdown, role);
  }

  async selectStatusFilter(status: string): Promise<void> {
    await this.selectDropdownOption(this.statusFilterDropdown, status);
  }

  // ─── Verifications ────────────────────────────────────────────────────────────

  async verifyUserListPageDisplayed(): Promise<void> {
    await this.page.waitForURL('**/admin/viewSystemUsers', { timeout: 15000 });
    await expect(this.pageHeader).toBeVisible({ timeout: 10000 });
  }

  async verifyResultsDisplayed(): Promise<void> {
    await expect(this.tableRows.first()).toBeVisible({ timeout: 10000 });
    const count = await this.tableRows.count();
    expect(count).toBeGreaterThan(0);
  }

  async verifyUsernameInResults(username: string): Promise<void> {
    await expect(this.tableBody).toContainText(username, { timeout: 10000 });
  }

  async verifyAllUsersHaveRole(role: string): Promise<void> {
    const roleCells = this.page.locator(
      '.oxd-table-body .oxd-table-row .oxd-table-cell:nth-child(2)'
    );
    const count = await roleCells.count();
    for (let i = 0; i < count; i++) {
      await expect(roleCells.nth(i)).toContainText(role);
    }
  }

  async verifySearchFiltersCleared(): Promise<void> {
    await expect(this.usernameSearchInput).toHaveValue('');
  }
}
