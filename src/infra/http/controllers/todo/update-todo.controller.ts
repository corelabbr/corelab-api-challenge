import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { FindTodoByIdUseCase } from '../../../../domain/use-cases/todo/find-todo-by-id';
import { UpdateTodoUseCase } from '../../../../domain/use-cases/todo/update-todo';

import { z } from 'zod';

const updateTodoBodySchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  description: z.string().optional(),
  color: z.string().optional(),
  favorite: z.boolean(),
});

type UpdateTodoBodySchema = z.infer<typeof updateTodoBodySchema>;

@Controller('/todos')
export class UpdateTodoController {
  constructor(
    private findTodoById: FindTodoByIdUseCase,
    private updateTodoUseCase: UpdateTodoUseCase,
  ) {}

  @Patch()
  @HttpCode(HttpStatus.OK)
  async handle(@Body() body: UpdateTodoBodySchema) {
    const { description, title, color, favorite } = body;

    const foundTodo = await this.findTodoById.execute(body.id);

    if (!foundTodo) throw new NotFoundException();

    const updatedTodo = {
      ...foundTodo,
      ...(title && { title }),
      ...(description && { description }),
      ...(color && { color }),
      ...(favorite !== undefined && { favorite }),
    };

    return await this.updateTodoUseCase.execute(updatedTodo);
  }
}
