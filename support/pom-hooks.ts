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
import { POMWorld } from './pom-world';

setDefaultTimeout(60_000);

// ─── Suite-level hooks ────────────────────────────────────────────────────────

BeforeAll(async function () {
  console.log('\n========================================');
  console.log('  OrangeHRM BDD Test Suite Starting [POM]');
  console.log('========================================\n');
});

AfterAll(async function () {
  console.log('\n========================================');
  console.log('  OrangeHRM BDD Test Suite Completed [POM]');
  console.log('========================================\n');
});

// ─── Scenario-level hooks ─────────────────────────────────────────────────────

Before(async function (this: POMWorld) {
  await this.openBrowser();
});

After(async function (this: POMWorld, scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const screenshot = await this.takeScreenshot();
    await this.attach(screenshot, 'image/png');
    console.log(`\n[FAILED] Scenario: ${scenario.pickle.name}`);
  }
  await this.closeBrowser();
});

// ─── Step-level hooks ─────────────────────────────────────────────────────────

BeforeStep(async function (this: POMWorld, step) {
  console.log(`  → STEP: ${step.pickleStep.text}`);
});

AfterStep(async function (this: POMWorld, step) {
  if (step.result.status === Status.FAILED) {
    const screenshot = await this.takeScreenshot();
    await this.attach(screenshot, 'image/png');
  }
});
