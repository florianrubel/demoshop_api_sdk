import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src'), // Map `~` to the `src` directory
        },
    },
    test: {
        globals: true,
        environment: 'jsdom', // Or "node" depending on your tests
        coverage: {
            provider: 'v8', // Use v8 as the coverage provider
            reporter: ['text', 'json', 'html'], // Output coverage in multiple formats
            all: true, // Include all files in coverage, even if not directly tested
            include: ['src/**/*.{ts,tsx,js,jsx}'], // Files to include in coverage
            exclude: ['node_modules', 'tests', '**/__mocks__/**'], // Files to exclude
            lines: 80, // Minimum line coverage percentage
            functions: 80, // Minimum function coverage percentage
            branches: 75, // Minimum branch coverage percentage
            statements: 80, // Minimum statement coverage percentage
          },
    },
});
