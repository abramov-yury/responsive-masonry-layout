const TerserPlugin = require("terser-webpack-plugin");
const {config, paths} = require("./webpack.config.js");
const styles = require("./modules/css_prod.js");
const cleaning = require("./modules/cleaning.js");
const copy = require("./modules/copy.js");

config.mode = "production";
config.plugins.push(
  styles.miniCssExtractPlugin,
  cleaning.cleanWebpackPlugin,
  copy(paths.source, paths.public),
);
config.module.rules.push(
  styles.sassRules,
  styles.cssRules,
);
config.optimization = {
  minimize: true,
  minimizer: [new TerserPlugin({
    extractComments: false,
    parallel: true,
  })],
}

module.exports = config;
