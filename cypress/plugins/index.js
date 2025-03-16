/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  config.defaultCommandTimeout = 10000;
  config.requestTimeout = 10000;
  
  on('task', {
    log(message) {
      console.log(message);
      return null;
    }
  });
  
  return config;
}; 