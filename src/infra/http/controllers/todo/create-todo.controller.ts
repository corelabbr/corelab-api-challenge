import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { CreateTodoUseCase } from '../../../../domain/use-cases/todo/create-todo';

const createTodoBodySchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  color: z.string().optional(),
});

type CreateTodoBodySchema = z.infer<typeof createTodoBodySchema>;

@Controller('/todos')
export class CreateTodoController {
  constructor(private createTodoUseCase: CreateTodoUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ZodValidationPipe(createTodoBodySchema))
  async handle(@Body() body: CreateTodoBodySchema) {
    const { title, description, color } = body;

    const createdTodo = await this.createTodoUseCase.execute({
      data: {
        title,
        description,
        color,
      },
    });

    if (!createdTodo) throw new BadRequestException();

    return createdTodo;
  }
}
