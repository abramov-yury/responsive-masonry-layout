module.exports = {
  test: /\.(jpe?g|png|svg|webp|ico)$/,
  type: "asset/resource",
  generator: {
    filename: "img/[name][ext]"
  }
}
