import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import javascript from './src/sharedLib/eslintRulesets/javascript.js';
import typescript from './src/sharedLib/eslintRulesets/typescript.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
    {
        // Explicitly match files
        files: ['src/**/*.ts', 'src/**/*.tsx'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: path.resolve(__dirname, './tsconfig.json'), // Point to your tsconfig.json file
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
                    project: path.resolve(__dirname, './tsconfig.json') // Resolve aliases from tsconfig.json
                },
            },
        },
        rules: {
            ...javascript,
            ...typescript,
        },
    },
];