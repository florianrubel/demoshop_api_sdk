import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default [
  // Without React
  ...compat.extends('airbnb-base'),
  ...compat.extends('@kesills/airbnb-typescript/base'),

  // Either way
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];