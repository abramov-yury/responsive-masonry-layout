module.exports = {
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: "eslint:recommended",
  rules: {
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "functions": "always-multiline",
    }],
  },
};
