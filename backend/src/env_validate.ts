import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
  API_PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().min(12),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('Variáveis de ambiente não existem:', _env.error.format());
  process.exit(1);
}

export const env_validate = _env.data;
