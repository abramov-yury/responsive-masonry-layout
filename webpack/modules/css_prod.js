const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  miniCssExtractPlugin: new MiniCssExtractPlugin({
    filename: "css/[name].css",
  }),
  sassRules: {
    test: /\.s[ac]ss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: "css-loader",
      },
      {
        loader: "sass-loader",
      },
    ],
  },
  cssRules: {
    test: /\.css$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: "css-loader",
      },
    ],
  }
}
