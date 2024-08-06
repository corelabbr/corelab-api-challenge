import { EnvironmentException } from '../../../shared/domain/errors/Environment.exception';
import { ZodError, z } from 'zod';

const JWTConfigSchema = z.object({
  algorithm: z.string().default('HS256'),
});

let jwtConfig: z.infer<typeof JWTConfigSchema> = {};

try {
  jwtConfig = JWTConfigSchema.parse({
    algorithm: 'HS256',
  });
} catch (error) {
  if (error instanceof ZodError) {
    throw new EnvironmentException(error);
  }
}

export { jwtConfig };
