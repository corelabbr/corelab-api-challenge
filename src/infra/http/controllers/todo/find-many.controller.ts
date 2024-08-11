import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { z } from 'zod';
import { FindManyTodosUseCase } from '../../../../domain/use-cases/todo/find-many-todos';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';

const findManyTodosBodySchema = z
  .object({
    skip: z.string().optional().default('0'),
    take: z.string().optional().default('10'),
  })
  .optional();

type FindManyTodosBodySchema = z.infer<typeof findManyTodosBodySchema>;

@Controller('/todos')
export class FindManyTodosController {
  constructor(private findManyTodosUseCase: FindManyTodosUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async handle(
    @Query(new ZodValidationPipe(findManyTodosBodySchema))
    query: FindManyTodosBodySchema,
  ) {
    const { skip, take } = query;

    const skipToNum = parseInt(skip);
    const takeToNum = parseInt(take);

    if (isNaN(skipToNum) || isNaN(takeToNum)) {
      throw new BadRequestException();
    }

    return await this.findManyTodosUseCase.execute({
      skip: skipToNum,
      take: takeToNum,
    });
  }
}
