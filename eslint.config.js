import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';

import javascript from './src/sharedLib/eslintRulesets/javascript.js';
import typescript from './src/sharedLib/eslintRulesets/typescript.js';

const filename = fileURLToPath(import.meta.url);
const directory = dirname(filename);

export default [
    {
        // Explicitly match files
        files: [
            'eslint.config.js',
            'vite.config.ts',
            'src/**/*.ts',
            'src/**/*.tsx',
            'tests/**/*.ts',
        ],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: path.resolve(directory, './tsconfig.json'), // Point to your tsconfig.json file
                ecmaVersion: 'latest', // Latest ECMAScript features
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            import: importPlugin,
        },
        settings: {
            'import/resolver': {
                typescript: {
                    project: path.resolve(directory, './tsconfig.json'), // Resolve aliases from tsconfig.json
                },
            },
        },
        rules: {
            ...javascript,
            ...typescript,
        },
    },
];
