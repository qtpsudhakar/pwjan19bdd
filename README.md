# OrangeHRM BDD Framework — Playwright + CucumberJS + TypeScript

## Tech Stack
- **Test Runner**: CucumberJS 12
- **Browser Automation**: Playwright
- **Language**: TypeScript
- **Reporting**: Multiple-Cucumber-HTML-Reporter + Cucumber HTML Formatter

---

## Project Structure

```
pwjan19bdd/
├── features/
│   ├── login.feature                  # Login scenarios
│   ├── employee-management.feature    # PIM add/search employee
│   └── user-management.feature        # Admin add/search user
├── step-definitions/
│   ├── login.steps.ts
│   ├── employee.steps.ts
│   └── user-management.steps.ts
├── support/
│   ├── world.ts                       # Custom World (browser + page)
│   └── hooks.ts                       # Before/After/BeforeStep/AfterStep
├── reports/
│   └── generate-report.js             # HTML report generator
├── cucumber.json                      # Cucumber configuration
├── tsconfig.json                      # TypeScript configuration
└── package.json
```

---

## Setup

```bash
npm install
npx playwright install chromium
```

---

## Running Tests

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests (headed) |
| `npm run test:login` | Run only login tests |
| `npm run test:employee` | Run only employee tests |
| `npm run test:user` | Run only user management tests |
| `npm run test:headless` | Run all tests headless |
| `npm run report` | Generate HTML report from last run |
| `npm run test:report` | Run tests + generate report |

---

## Reports

After running tests, reports are generated in the `reports/` folder:
- `reports/cucumber-report.json` — raw JSON (input for HTML generators)
- `reports/cucumber-report.html` — built-in Cucumber HTML report
- `reports/html-report/` — rich multiple-cucumber-html-reporter output

---

## Application Under Test

[OrangeHRM Live Demo](https://opensource-demo.orangehrmlive.com)

Default credentials: `Admin` / `admin123`
