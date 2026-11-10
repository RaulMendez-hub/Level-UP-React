import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import { test } from 'vitest'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setupTests.ts', // 👈 Agrega esta línea
  },
});
