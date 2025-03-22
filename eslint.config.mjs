import nextPlugin from "@next/eslint-plugin-next";

const eslintConfig = [
  {
    files: ["**/*"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    env: {
      browser: true,
      es6: true,
      node: true,
    },
    plugins: ["react", "react-hooks", "jsx-a11y", "prettier", "@next/eslint-plugin-next"],
    rules: {
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/img-redundant-alt": "error",
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      ...nextPlugin.configs.recommended.rules, // Add the next/recommended rules
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    linterOptions: { // Add this to disable eslintrc lookups
      reportUnusedDisableDirectives: true,
    },
  },
];

export default eslintConfig;