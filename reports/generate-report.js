const reporter = require('multiple-cucumber-html-reporter');
const path = require('path');

reporter.generate({
  jsonDir: path.join(__dirname, 'reports'),
  reportPath: path.join(__dirname, 'reports', 'html-report'),
  metadata: {
    browser: {
      name: 'chromium',
      version: 'latest',
    },
    device: 'Local Development Machine',
    platform: {
      name: 'Windows',
      version: '10',
    },
  },
  customData: {
    title: 'OrangeHRM BDD Test Report',
    data: [
      { label: 'Project', value: 'OrangeHRM Employee Management' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Cycle', value: 'Regression' },
      { label: 'Execution Start Time', value: new Date().toLocaleString() },
    ],
  },
  displayDuration: true,
  durationInMS: true,
});
