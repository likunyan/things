module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "google",
    "prettier",
    "plugin:prettier/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "prettier", "simple-import-sort", "react-hooks"],
  rules: {
    "no-unused-vars": "off",
    "prettier/prettier": "error",
    "require-jsdoc": 0,
    "react/prop-types": 0,
    "react/display-name": 0,
    "simple-import-sort/imports": "error",
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
