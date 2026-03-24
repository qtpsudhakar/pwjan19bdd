import {
  Before,
  After,
  BeforeAll,
  AfterAll,
  Status,
  BeforeStep,
  AfterStep,
  setDefaultTimeout,
} from '@cucumber/cucumber';
import { OrangeHRMWorld } from './world';

// Set global step/hook timeout (must be done via setDefaultTimeout — not cucumber.js config)
setDefaultTimeout(60_000);

// ─── Suite-level hooks ────────────────────────────────────────────────────────

BeforeAll(async function () {
  console.log('\n========================================');
  console.log('  OrangeHRM BDD Test Suite Starting');
  console.log('========================================\n');
});

AfterAll(async function () {
  console.log('\n========================================');
  console.log('  OrangeHRM BDD Test Suite Completed');
  console.log('========================================\n');
});

// ─── Scenario-level hooks ─────────────────────────────────────────────────────

Before(async function (this: OrangeHRMWorld) {
  await this.openBrowser();
});

After(async function (this: OrangeHRMWorld, scenario) {
  // Capture screenshot on failure and attach to report
  if (scenario.result?.status === Status.FAILED) {
    const screenshot = await this.takeScreenshot();
    await this.attach(screenshot, 'image/png');
    console.log(`\n[FAILED] Scenario: ${scenario.pickle.name}`);
  }

  await this.closeBrowser();
});

// ─── Step-level hooks ─────────────────────────────────────────────────────────

BeforeStep(async function (this: OrangeHRMWorld, step) {
  const stepText = step.pickleStep.text;
  console.log(`  → STEP: ${stepText}`);
});

AfterStep(async function (this: OrangeHRMWorld, step) {
  if (step.result.status === Status.FAILED) {
    const screenshot = await this.takeScreenshot();
    await this.attach(screenshot, 'image/png');
  }
});
