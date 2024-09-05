import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {rules: {
    "no-unused-vars": ["error", { "vars": "local" }],
    "@typescript-eslint/no-unused-vars": "off",
    "react/react-in-jsx-scope": "off"
}},
];