const fs = require("fs");
const path = require("path");
const html = require("./modules/html.js");

const pugRules = require("./modules/pug.js");
const babelRules = require("./modules/babel.js");
const imagesRules = require("./modules/images.js");
const fontsRules = require("./modules/fonts.js");

const PATHS = {
  source: path.join(__dirname, "../src"),
  public: path.join(__dirname, "../public"),
};

const dirWithPages = `${PATHS.source}/pages`;

const getPagesNames = () => {
  return fs.readdirSync(dirWithPages).map(page => {
    const pathToDataFile = path.join(`${dirWithPages}/${page}`, "data.json");
    const entryPoint = JSON.parse(fs.readFileSync(pathToDataFile, "utf-8"))["name"];
    if(!entryPoint) throw new Error(`В pages/${page}/data.json отсутствует свойство - "name"...!`);
    return entryPoint;
  });
};

const pagesNames = getPagesNames();

const config = {
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  entry: new function () {
    for(let item of pagesNames) {
      this[item] = `${dirWithPages}/${item}/${item}.js`;
    }
  },
  output: {
    filename: "js/[name].js",
    path: `${PATHS.public}`,
  },
  plugins: [/* the objects */].concat( // the arrays
    html(pagesNames, dirWithPages),
  ),
  module: {
    rules: [pugRules, babelRules, imagesRules, fontsRules],
  },
};

module.exports = {
  config: config,
  paths: PATHS
};
