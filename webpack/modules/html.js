const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (arr, dirWithPages) => {
  return arr.map(item => {
    return new HtmlWebpackPlugin({
      filename: `${item}.html`,
      chunks: [item],
      template: `${dirWithPages}/${item}/${item}.pug`,
      minify: true,
    })
  });
}
