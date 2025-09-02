import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ZodValidationException } from 'nestjs-zod';

@Catch(ZodValidationException)
export class ZodValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ZodValidationException, host: ArgumentsHost) {
    const errorMessage = exception
      .getZodError()
      .issues.map((error) => `${error.path} ${error.message}`)
      .join('\n');

    const zodException = new HttpException(errorMessage, 422);
  }
}
