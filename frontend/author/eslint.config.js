import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import css from '@eslint/css';
import { defineConfig } from 'eslint/config';
import baseConfig from '../../eslint.config.js';

export default defineConfig([
  ...baseConfig,
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
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
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    extends: ['css/recommended'],
    rules: {
      'css/use-baseline': ['warn', { available: 'newly' }],
    },
  },
]);
