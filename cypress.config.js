module.exports = {
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);
      return config;
    },
  },
  env: {
    codeCoverageTasksRegistered: true,
  },
};

// import { defineConfig } from "cypress";

// export default defineConfig({
//   e2e: {
//     baseUrl: 'http://localhost:3000'
//   },
//   component: {
//     setupNodeEvents(on, config) {
//       require('@bahmutov/cypress-code-coverage/plugin')(on, config)
//       return config
//     },
//     supportFile: "cypress/support/index.js",
//     supportFolder: "cypress/support",
//     fixturesFolder: "cypress/fixtures",
//     devServer: {
//       framework: "create-react-app",
//       bundler: "webpack",
//     },
//   },
// });
