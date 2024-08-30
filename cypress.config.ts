import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: 'http://localhost:4000'
  },
    component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  }
});
