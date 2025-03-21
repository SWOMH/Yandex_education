const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('./cypress/plugins/index.js')(on, config);
      return config;
    },
    baseUrl: 'http://localhost:5173',
    defaultCommandTimeout: 10000,
    viewportWidth: 1280,
    viewportHeight: 720,
    videoCompression: false,
    retries: {
      runMode: 2,
      openMode: 0
    },
  },
}); 