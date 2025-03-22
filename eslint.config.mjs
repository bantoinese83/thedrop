import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    env: {
      browser: true,
      es6: true,
      node: true,
    },
    plugins: ["react", "react-hooks", "jsx-a11y", "prettier"],
    extends: ["plugin:react/recommended", "plugin:react-hooks/recommended"],
    rules: {
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/img-redundant-alt": "error",
      "prettier/prettier": ["error", { endOfLine: "auto" }],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];

export default eslintConfig;