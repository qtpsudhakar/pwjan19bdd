import { Browser, BrowserContext, Page, chromium } from '@playwright/test';
import { IWorldOptions, World, setWorldConstructor } from '@cucumber/cucumber';
import {
  LoginPage,
  DashboardPage,
  EmployeeListPage,
  AddEmployeePage,
  UserManagementPage,
  AddUserPage,
} from '../pages';

export interface POMWorldOptions extends IWorldOptions {
  parameters: {
    baseUrl?: string;
    headless?: boolean;
    slowMo?: number;
  };
}

// All test parameters (baseUrl, headless, slowMo) are passed centrally from cucumber.js via worldParameters.
export class POMWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  readonly baseUrl: string;
  readonly headless: boolean;
  readonly slowMo: number;

  // ─── Page objects ──────────────────────────────────────────────────────────────
  loginPage!: LoginPage;
  dashboardPage!: DashboardPage;
  employeeListPage!: EmployeeListPage;
  addEmployeePage!: AddEmployeePage;
  userManagementPage!: UserManagementPage;
  addUserPage!: AddUserPage;

  constructor(options: POMWorldOptions) {
    super(options);
    this.baseUrl = options.parameters?.baseUrl ?? '';
    this.headless = options.parameters?.headless ?? false;
    this.slowMo = options.parameters?.slowMo ?? 0;
  }

  async openBrowser(): Promise<void> {
    this.browser = await chromium.launch({
      headless: this.headless,
      slowMo: this.slowMo,
    });
    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 },
      ignoreHTTPSErrors: true,
    });
    this.page = await this.context.newPage();
    this.initPages();
  }

  private initPages(): void {
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.employeeListPage = new EmployeeListPage(this.page);
    this.addEmployeePage = new AddEmployeePage(this.page);
    this.userManagementPage = new UserManagementPage(this.page);
    this.addUserPage = new AddUserPage(this.page);
  }

  async closeBrowser(): Promise<void> {
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
  }

  async navigateTo(path: string = ''): Promise<void> {
    await this.page.goto(`${this.baseUrl}${path}`, { waitUntil: 'networkidle' });
  }

  async takeScreenshot(): Promise<Buffer> {
    return this.page.screenshot({ fullPage: true });
  }
}

setWorldConstructor(POMWorld);
