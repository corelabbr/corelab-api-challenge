import dotenv from 'dotenv'
import { z } from 'zod'

const environment = process.env.NODE_ENV || 'prod'
console.log('Environment:', environment)

let MONGODB_URI = z.string().default('mongodb://localhost:27017/corelab')
if (environment === 'test') {
  dotenv.config({ path: '.env.test' })
  MONGODB_URI = z.string().default('mongodb://localhost:27017/corelab-test')
} else {
  dotenv.config()
}

const envSchema = z.object({
  PORT: z.string().default('8080'),
  NODE_ENV: z.union([z.literal('prod'), z.literal('test')]).default('prod'),
  MONGODB_URI,
})

export const env = envSchema.parse(process.env)
