import { ZodError } from 'zod';

export class EnvironmentException extends Error {
  constructor(error: ZodError) {
    const errorMessage = error.issues
      .map((issue) => `${issue.path.join('.')} ${issue.message}`)
      .join('\n');
    super(errorMessage);
  }
}
