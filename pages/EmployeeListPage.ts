import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class EmployeeListPage extends BasePage {
  // ─── Locators ─────────────────────────────────────────────────────────────────

  private get addButton(): Locator {
    return this.page.locator('button:has-text("Add")');
  }

  private get employeeNameSearchInput(): Locator {
    return this.page.locator(
      '.oxd-table-filter input[placeholder="Type for hints..."]'
    );
  }

  private get employeeIdSearchInput(): Locator {
    return this.page.locator(
      '.oxd-table-filter .oxd-form-row:nth-child(1) .oxd-grid-2 > div:nth-child(2) input'
    );
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

  async clickAddEmployee(): Promise<void> {
    await this.addButton.click();
    await this.page.waitForURL('**/pim/addEmployee', { timeout: 10000 });
    await this.page.waitForLoadState('networkidle');
  }

  async enterSearchName(name: string): Promise<void> {
    await this.employeeNameSearchInput.fill(name);
    await this.page.waitForTimeout(1000);
    const suggestion = this.page.locator('.oxd-autocomplete-option').first();
    if (await suggestion.isVisible()) {
      await suggestion.click();
    }
  }

  async enterSearchEmployeeId(empId: string): Promise<void> {
    await this.employeeIdSearchInput.fill(empId);
  }

  // ─── Verifications ────────────────────────────────────────────────────────────

  async verifyResultsDisplayed(): Promise<void> {
    await expect(this.tableRows.first()).toBeVisible({ timeout: 10000 });
    const count = await this.tableRows.count();
    expect(count).toBeGreaterThan(0);
  }

  async verifyEmployeeInResults(name: string): Promise<void> {
    await expect(this.tableBody).toContainText(name, { timeout: 10000 });
  }
}
