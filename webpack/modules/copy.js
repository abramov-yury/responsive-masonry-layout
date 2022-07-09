const CopyPlugin = require("copy-webpack-plugin");

module.exports = (path_from, path_to) => {
  return new CopyPlugin({
    patterns: [
      {
        from: `${path_from}/assets/manifest.json`,
        to: `${path_to}`,
        toType: "dir",
      },
      {
        from: `${path_from}/assets/img/`,
        to: `${path_to}/img`,
        toType: "dir",
      }
    ]
  })
}
