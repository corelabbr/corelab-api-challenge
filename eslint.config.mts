import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        project: "./tsconfig.json",       // aponta para seu tsconfig
        tsconfigRootDir: import.meta.dirname, // força resolver o caminho certo
      },
    },
    plugins: { js },
    extends: ["js/recommended"],
  },

  tseslint.configs.recommended,

  { files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
  { files: ["**/*.jsonc"], plugins: { json }, language: "json/jsonc", extends: ["json/recommended"] },
  { files: ["**/*.md"], plugins: { markdown }, language: "markdown/gfm", extends: ["markdown/recommended"] },
  { files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"] },

  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      indent: "error",
      quotes: ["error", "single"],
      semi: ["error", "always"],
      "no-console": "off",
    },
  },
]);
