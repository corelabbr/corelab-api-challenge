import { z } from 'zod'

const schema = z.object({
  BASE_URL: z.string().url(),
  WEBSITE_BASE_URL: z.string().url(),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().trim().min(1),
  RESEND_API_KEY: z.string().trim().min(1),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.coerce.number().default(3333),
})

export const config = schema.parse(process.env)
