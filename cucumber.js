module.exports = {
  // ─── Step 1: No POM — direct locators in step definitions ───────────────────
  default: {
    requireModule: ['ts-node/register'],
    require: [
      'support/hooks.ts',
      'support/world.ts',
      'step-definitions/**/*.ts',
    ],
    features: ['features/**/*.feature'],
    format: [
      'progress-bar',
      'json:reports/cucumber-report.json',
      'html:reports/cucumber-report.html',
      'allure-cucumberjs/reporter',
    ],
    formatOptions: {
      snippetInterface: 'async-await',
      resultsDir: 'allure-results',
    },
    publishQuiet: true,
    parallel: 1,
    worldParameters: {
      baseUrl: 'https://vibetestq-osondemand.orangehrm.com/auth/login',
      headless: false,
      slowMo: 100,
    },
  },

  // ─── Step 2: POM — all locators inside page objects ──────────────────────────
  pom: {
    requireModule: ['ts-node/register'],
    require: [
      'support/pom-hooks.ts',
      'support/pom-world.ts',
      'step-definitions-pom/**/*.ts',
    ],
    features: ['features/**/*.feature'],
    format: [
      'progress-bar',
      'json:reports/cucumber-report-pom.json',
      'html:reports/cucumber-report-pom.html',
      'allure-cucumberjs/reporter',
    ],
    formatOptions: {
      snippetInterface: 'async-await',
      resultsDir: 'allure-results',
    },
    publishQuiet: true,
    parallel: 1,
    worldParameters: {
      baseUrl: 'https://vibetestq-osondemand.orangehrm.com/auth/login',
      headless: false,
      slowMo: 100,
    },
  },
};
