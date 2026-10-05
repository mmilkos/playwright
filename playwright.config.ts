import { defineConfig, devices } from '@playwright/test';

import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({path: path.resolve('config', '.env')})

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 2,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL || 'https://realworld.app.is/',
    trace: 'retain-on-failure-and-retries',
    channel: 'chrome',
    headless: true
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
