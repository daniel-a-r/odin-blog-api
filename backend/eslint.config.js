import globals from 'globals';
import { defineConfig } from 'eslint/config';
import baseConfig from '../eslint.config.js';

export default defineConfig([
  ...baseConfig,
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: { globals: globals.node },
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
]);
