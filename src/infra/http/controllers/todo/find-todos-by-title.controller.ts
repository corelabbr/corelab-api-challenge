import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { FindTodosByTitleUseCase } from '../../../../domain/use-cases/todo/find-todos-by-title';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';

const findTodosByTitleBodySchema = z.object({
  title: z.string(),
});

type FindTodosByTitleBodySchema = z.infer<typeof findTodosByTitleBodySchema>;

@Controller('/search')
export class FindTodosByTitleController {
  constructor(private findTodosByTitleUseCase: FindTodosByTitleUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async handle(
    @Query(new ZodValidationPipe(findTodosByTitleBodySchema))
    query: FindTodosByTitleBodySchema,
  ) {
    const { title } = query;

    return await this.findTodosByTitleUseCase.execute(title);
  }
}
