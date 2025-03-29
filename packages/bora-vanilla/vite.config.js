import { defineConfig } from 'vite';

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
  },
  test: {
    globals: true,
    include: ['__test__/*.spec.js?(x)'],
  },
});
