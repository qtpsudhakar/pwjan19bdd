# OrangeHRM BDD Framework - Playwright + CucumberJS + TypeScript

A behaviour-driven test automation framework for the OrangeHRM application using Playwright, CucumberJS v12, TypeScript, and a full Page Object Model layer.

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| CucumberJS | 12.x | BDD test runner |
| Playwright | 1.x | Browser automation |
| TypeScript | 6.x | Language |
| ts-node | 10.x | TS execution without compile step |
| allure-cucumberjs | 3.x | Allure reporting integration |
| allure-commandline | 2.x | Allure report generation |
| multiple-cucumber-html-reporter | 3.x | HTML report generation |
| cross-env | 10.x | Cross-platform env variables |

---

## Project Structure

```
pwjan19bdd/
├── features/
│   ├── login.feature                        # Login scenarios (@login)
│   ├── employee-management.feature          # PIM add/search employee (@employee)
│   └── user-management.feature              # Admin add/search user (@user-management)
├── pages/                                   # Page Object Model layer
│   ├── BasePage.ts                          # Abstract base - shared actions & assertions
│   ├── LoginPage.ts
│   ├── DashboardPage.ts
│   ├── EmployeeListPage.ts
│   ├── AddEmployeePage.ts
│   ├── UserManagementPage.ts
│   ├── AddUserPage.ts
│   └── index.ts                             # Barrel export
├── step-definitions/                        # Step defs - direct locator approach (default profile)
│   ├── login.steps.ts
│   ├── employee.steps.ts
│   └── user-management.steps.ts
├── step-definitions-pom/                    # Step defs - Page Object Model approach (pom profile)
│   ├── login.steps.ts
│   ├── employee.steps.ts
│   └── user-management.steps.ts
├── support/
│   ├── world.ts                             # Custom World - browser + page (default profile)
│   ├── hooks.ts                             # Before/After hooks (default profile)
│   ├── pom-world.ts                         # POM World - instantiates all page objects
│   └── pom-hooks.ts                         # Before/After hooks (pom profile)
├── reports/
│   └── generate-report.js                   # multiple-cucumber-html-reporter script
├── .github/
│   ├── agents/                              # VS Code Copilot agent definitions
│   └── workflows/
│       └── copilot-setup-steps.yml
├── .vscode/
│   ├── mcp.json                             # MCP servers (Playwright + Jira)
│   └── settings.json
├── cucumber.js                              # Cucumber config - default & pom profiles
├── tsconfig.json
└── package.json
```

---

## Setup

```bash
npm install
npx playwright install chromium
```

---

## Cucumber Profiles

Two profiles are defined in `cucumber.js`:

| Profile | Step Definitions | World | Description |
|---------|-----------------|-------|-------------|
| `default` | `step-definitions/` | `world.ts` | Direct locator approach |
| `pom` | `step-definitions-pom/` | `pom-world.ts` | Page Object Model approach |

Configuration is centralised in `cucumber.js`:
- **baseUrl**: `https://vibetestq-osondemand.orangehrm.com/auth/login`
- **headless**: `false`
- **slowMo**: `100ms`

---

## Running Tests

### Default Profile

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:login` | Run `@login` tagged tests |
| `npm run test:employee` | Run `@employee` tagged tests |
| `npm run test:user` | Run `@user-management` tagged tests |
| `npm run test:headless` | Run all tests headless |

### POM Profile

| Command | Description |
|---------|-------------|
| `npm run test:pom` | Run all tests (POM) |
| `npm run test:pom:login` | Run `@login` tagged tests (POM) |
| `npm run test:pom:employee` | Run `@employee` tagged tests (POM) |
| `npm run test:pom:user` | Run `@user-management` tagged tests (POM) |

---

## Reporting

### HTML Report (multiple-cucumber-html-reporter)

```bash
npm run report            # Generate report from last run
npm run test:report       # Run all tests + generate report (default)
npm run test:pom:report   # Run all tests + generate report (POM)
```

Output: `reports/html-report/`

### Allure Report

```bash
npm run test:allure           # Run all tests + generate + open Allure report
npm run test:pom:allure       # POM profile + Allure report
npm run test:login:allure     # Login tests (POM) + Allure report

npm run allure:generate       # Generate report from existing results
npm run allure:serve          # Serve live report from allure-results/
npm run allure:open           # Open last generated report
```

Allure results are written to `allure-results/` and the generated report to `allure-report/`.

---

## Page Object Model

All page interactions are encapsulated in `pages/`. Tests never contain locators - they only call page object methods.

```
BasePage (abstract)
├── LoginPage
├── DashboardPage
├── EmployeeListPage
├── AddEmployeePage
├── UserManagementPage
└── AddUserPage
```

`POMWorld` instantiates all page objects after the browser opens and exposes them to step definitions via the custom World.

---

## Jira MCP Integration

The `.vscode/mcp.json` is configured with a Jira MCP server (`mcp-jira-cloud`) so GitHub Copilot can read Jira stories directly and generate feature files.

On first use VS Code will prompt for:
- Jira Cloud base URL (e.g. `https://yourcompany.atlassian.net`)
- Jira account email
- Jira API token (generate at https://id.atlassian.com/manage-profile/security/api-tokens)

---

## Application Under Test

**URL**: `https://vibetestq-osondemand.orangehrm.com/auth/login`
**Credentials**: `testadmin` / `Vibetestq@123`
