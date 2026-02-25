// eslint.config.js
import js from "@eslint/js";
import globals from "globals";

import tseslint from "typescript-eslint";

import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default [
  js.configs.recommended,

  // TypeScript (подхватывает parser + правила)
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
  ...reactPlugin.configs.recommended.rules,
  ...reactHooksPlugin.configs.recommended.rules,

  // React 17+ (Vite использует новый JSX runtime)
  "react/react-in-jsx-scope": "off",
  "react/jsx-uses-react": "off",
},
  },
];