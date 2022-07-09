const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  cleanWebpackPlugin: new CleanWebpackPlugin({
    cleanStaleWebpackAssets: false,
  })
}
