import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.url(),
  NODE_ENV: z
    .enum(['test', 'development', 'production'])
    .default('development'),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Variables is required', _env.error.format())
  throw new Error('Variables is required')
}

export const env = _env.data
