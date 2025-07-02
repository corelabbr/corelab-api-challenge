import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/server.ts'],
  target: 'esnext',
  outDir: 'dist',
  format: ['esm'],
})
