import 'dotenv/config';

import z, { ZodError } from 'zod';
import { EnvironmentException } from '../domain/errors/Environment.exception';

export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
  LOCAL = 'local',
}

const appConfigurationsSchema = z.object({
  FRONTEND_URL: z.string().min(1),

  DATABASE_URL: z.string().min(1),

  SHADOW_DATABASE_URL: z.string().optional(),

  PORT: z.number(),

  NODE_ENV: z.nativeEnum(Environment).default(Environment.DEVELOPMENT),

  CRYPTO_SECRET: z.string().min(1),
  CRYPTO_IV: z.string().min(1),

  APP_SECRET: z.string().min(1),

  REDIS_PRODUCTION_HOST: z.string().optional(),
  REDIS_PRODUCTION_PORT: z.number().optional(),
  REDIS_PRODUCTION_USER: z.string().optional(),
  REDIS_PRODUCTION_PASSWORD: z.string().optional(),

  REDIS_HOST: z.string().optional(),
  REDIS_PORT: z.number().optional(),
});

let appConfigurations: z.infer<typeof appConfigurationsSchema>;

try {
  appConfigurations = appConfigurationsSchema.parse({
    FRONTEND_URL: process.env.FRONTEND_URL,

    DATABASE_URL: process.env.DATABASE_URL,

    SHADOW_DATABASE_URL: process.env.SHADOW_DATABASE_URL,

    PORT: Number(process.env.PORT),

    NODE_ENV: process.env.NODE_ENV,

    CRYPTO_SECRET: process.env.CRYPTO_SECRET,
    CRYPTO_IV: process.env.CRYPTO_IV,

    APP_SECRET: process.env.APP_SECRET,

    REDIS_PRODUCTION_HOST: process.env.REDIS_PRODUCTION_HOST
      ? process.env.REDIS_PRODUCTION_HOST
      : '',
    REDIS_PRODUCTION_PORT: process.env.REDIS_PRODUCTION_PORT
      ? Number(process.env.REDIS_PRODUCTION_PORT)
      : 0,
    REDIS_PRODUCTION_USER: process.env.REDIS_PRODUCTION_USER
      ? process.env.REDIS_PRODUCTION_USER
      : '',
    REDIS_PRODUCTION_PASSWORD: process.env.REDIS_PRODUCTION_PASSWORD
      ? process.env.REDIS_PRODUCTION_PASSWORD
      : '',

    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT
      ? Number(process.env.REDIS_PORT)
      : undefined,
  });
} catch (error) {
  if (error instanceof ZodError) {
    throw new EnvironmentException(error);
  }
}

export { appConfigurations };
