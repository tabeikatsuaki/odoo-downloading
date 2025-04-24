import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: false,
  retries: 0,
  workers: 1,
  reporter: 'html',
  outputDir: 'test-results',
  use: {
    trace: 'on',
    headress: true,
  },
  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});