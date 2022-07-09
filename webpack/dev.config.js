const {config} = require("./webpack.config.js");
const styles = require("./modules/css_dev.js");

config.mode = "development";
config.devServer = {
  hot: false,
};

config.module.rules.push(styles);

module.exports = config;
