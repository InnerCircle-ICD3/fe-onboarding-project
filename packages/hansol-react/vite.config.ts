import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'

const vitestConfig = {
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    tsconfig: './tsconfig.vitest.json'
  }
}

export default defineConfig({
  plugins: [react()],
  ...vitestConfig
});
