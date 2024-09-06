// eslint.config.js
import globals from "globals";
import pluginJs from "@eslint/js";
export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  {
    ignores: ["**/node_modules/*"],
  },
  {
    files: ["**/*.{js,mjs}"],
}, ];