import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src'), // Map `~` to the `src` directory
        },
    },
    test: {
        globals: true,
        environment: 'jsdom', // Or "node" depending on your tests
    },
});
