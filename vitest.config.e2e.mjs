import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: ['./test/setup-e2e.ts'],
    include: ['**/*.e2e.spec.ts'],
    environmentMatchGlobs: [['./src/http/controllers/**', 'prisma']],
  },
})
