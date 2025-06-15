const eslintPluginPrettier = require('eslint-plugin-prettier');
const eslintPluginReact = require('eslint-plugin-react');
const parser = require('@typescript-eslint/parser');
const tseslintPlugin = require('@typescript-eslint/eslint-plugin');

module.exports = [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tseslintPlugin,
      react: eslintPluginReact,
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...tseslintPlugin.configs.recommended.rules,
      ...eslintPluginReact.configs.recommended.rules,
      'prettier/prettier': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
