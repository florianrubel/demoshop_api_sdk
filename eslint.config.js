import { FlatCompat } from '@eslint/eslintrc';
import pluginImport from "eslint-plugin-import";

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname,
});

export default [
    ...compat.extends('airbnb-base'),
    ...compat.extends('@kesills/airbnb-typescript/base'),

    // Either way
    {
        plugins: {
            import: pluginImport,
        },
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        ignores: [
            'eslint.config.js'
        ],
        rules: {
            "@stylistic/indent": ["error", 4],
            "@typescript-eslint/no-unused-vars": [
                "error",
                { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
            ],
            "import/extensions": [
                "error",
                "ignorePackages",
                {
                    "ts": "never",
                    "tsx": "never"
                }
            ],
            "max-len": ["warn", 200],
        },
        settings: {
            'import/resolver': {
                node: {
                    extensions: ['.ts', '.js', '.tsx', '.json'],
                },
                alias: {
                    map: [
                        ['~', './src'],
                    ],
                    extensions: ['.ts', '.js', '.tsx', '.json'],
                },
            },
        },
    },
];