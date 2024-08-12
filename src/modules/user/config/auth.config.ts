import z, { ZodError } from 'zod';

const authConfigSchema = z.object({
  token: z.object({
    secret: z.string().default(''),
    expiresIn: z.string().or(z.number()).default(1),
  }),
});

let authConfig: z.infer<typeof authConfigSchema> = {};

try {
  authConfig = authConfigSchema.parse({
    token: {
      secret: String(process.env.JWT_KEY),
      expiresIn: '30d',
    },
  });
} catch (error) {
  if (error instanceof ZodError) {
  }
}

export { authConfig };
