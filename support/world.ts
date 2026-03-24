import { Browser, BrowserContext, Page, chromium } from '@playwright/test';
import { IWorldOptions, World, setWorldConstructor } from '@cucumber/cucumber';

export interface OrangeHRMWorldOptions extends IWorldOptions {
  parameters: {
    baseUrl?: string;
    headless?: boolean;
    slowMo?: number;
  };
}

// All test parameters (baseUrl, headless, slowMo, etc.) are passed centrally from cucumber.js via the parameters property.
export class OrangeHRMWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  readonly baseUrl: string;
  readonly headless: boolean;
  readonly slowMo: number;

  constructor(options: OrangeHRMWorldOptions) {
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
  }

  async closeBrowser(): Promise<void> {
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
  }

  async navigateTo(path: string = ''): Promise<void> {
    
    console.log(`Navigating to: ${this.baseUrl}${path}`);
    if (path == '/' || path === '') {
      await this.page.goto(`${this.baseUrl}`, { waitUntil: 'networkidle' });
    } else {
      await this.page.goto(`${this.baseUrl}${path}`, { waitUntil: 'networkidle' });
    }
  }

  async takeScreenshot(): Promise<Buffer> {
    return this.page.screenshot({ fullPage: true });
  }
}

setWorldConstructor(OrangeHRMWorld);
