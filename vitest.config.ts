import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: ['/test/setup.ts'],
    exclude: [
      ...configDefaults.exclude,
      '**/*.e2e-{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      '**/*.e2e.spec.ts',
      './build/**',
    ],
  },
})
