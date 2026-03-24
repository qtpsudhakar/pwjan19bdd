import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  // ─── Locators ─────────────────────────────────────────────────────────────────

  private get dashboardHeader(): Locator {
    return this.page.locator('.oxd-topbar-header-breadcrumb h6');
  }

  private get pimNavLink(): Locator {
    return this.page.locator('a[href="/web/index.php/pim/viewPimModule"]');
  }

  private get adminNavLink(): Locator {
    return this.page.locator('a[href="/web/index.php/admin/viewAdminModule"]');
  }

  // ─── Actions ──────────────────────────────────────────────────────────────────

  async navigateToPIM(): Promise<void> {
    await this.pimNavLink.click();
    await this.page.waitForURL('**/pim/viewEmployeeList', { timeout: 15000 });
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToAdmin(): Promise<void> {
    await this.adminNavLink.click();
    await this.page.waitForURL('**/admin/viewSystemUsers', { timeout: 15000 });
    await this.page.waitForLoadState('networkidle');
  }

  // ─── Verifications ────────────────────────────────────────────────────────────

  async verifyDashboardLoaded(): Promise<void> {
    await this.page.waitForURL('**/dashboard/index', { timeout: 15000 });
    expect(this.page.url()).toContain('dashboard');
  }

  async verifyDashboardHeaderVisible(): Promise<void> {
    await expect(this.dashboardHeader).toBeVisible({ timeout: 10000 });
    await expect(this.dashboardHeader).toContainText('Dashboard');
  }
}
