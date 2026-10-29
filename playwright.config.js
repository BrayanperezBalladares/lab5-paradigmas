const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  use: {
    baseURL: 'http://127.0.0.1:3012',
    trace: 'on-first-retry'
  },
  webServer: {
    command: 'node server.js',
    url: 'http://127.0.0.1:3012',
    reuseExistingServer: true,
    env: {
      PORT: '3012',
      UNA_CHAT_TEST_AUTH: '1'
    }
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
