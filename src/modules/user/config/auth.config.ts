import { EnvironmentException } from '../../../shared/domain/errors/Environment.exception';
import z, { ZodError } from 'zod';

const authConfigSchema = z.object({
  token: z.object({
    secret: z.string().default(''),
    expiresIn: z.string().or(z.number()).default(1),
  }),
});

let authConfig: z.infer<typeof authConfigSchema>;

try {
  authConfig = authConfigSchema.parse({
    token: {
      secret: String(process.env.APP_SECRET),
      expiresIn: '1d',
    },
  });
} catch (error) {
  if (error instanceof ZodError) {
    throw new EnvironmentException(error);
  }
}

export { authConfig };
