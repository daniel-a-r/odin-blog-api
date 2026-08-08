import js from '@eslint/js';
import json from '@eslint/json';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import css from '@eslint/css';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  { ignores: ['frontend/**/dist/', 'frontend/reader/src/components/ui/'] },
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    rules: {
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^ignore',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['backend/**/*.{js,mjs,cjs}'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['frontend/**/*.{js,jsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: { react, reactHooks, reactRefresh },
    extends: [
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    ignores: ['frontend/reader/src/app/index.css'],
    files: ['frontend/**/*.css'],
    plugins: { css },
    language: 'css/css',
    extends: ['css/recommended'],
    rules: {
      'css/use-baseline': ['warn', { available: 'newly' }],
    },
  },
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
  },
]);
