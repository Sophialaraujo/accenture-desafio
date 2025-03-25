const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Define a task 'log' que imprime a mensagem no terminal
      on('task', {
        log(message) {
          console.log(message);
          return null;
        }
      });
      return config;
    },
  },
});
