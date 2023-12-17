// config-overrides.js
const path = require("path");

module.exports = function override(config, env) {
  // Add your custom webpack configurations here
  config.resolve.alias = {
    ...config.resolve.alias,
    "@": path.resolve(__dirname, "src"),
  };

  // You can add more customizations as needed

  return config;
};
