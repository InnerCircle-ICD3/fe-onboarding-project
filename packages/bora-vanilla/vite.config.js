import { defineConfig } from 'vite';

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['__test__/*.spec.js?(x)'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['db/productsData.js', 'js/dom-selectors.js', 'js/main.js'],
    },
  },
});
