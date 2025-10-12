import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import css from '@eslint/css';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js },
    settings: {
      react: {
        version: 'detect',
      },
    },
    extends: [
      'js/recommended',
      pluginReact.configs.flat.recommended,
      pluginReact.configs.flat['jsx-runtime'],
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: { globals: globals.browser },
    rules: {
      'no-unused-vars': 'warn',
    },
  },
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    extends: ['css/recommended'],
  },
  eslintPluginPrettierRecommended,
]);
