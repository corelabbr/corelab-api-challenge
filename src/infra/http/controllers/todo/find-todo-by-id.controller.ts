import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { FindTodoByIdUseCase } from '../../../../domain/use-cases/todo/find-todo-by-id';

@Controller('/todos/:id')
export class FindTodoByIdController {
  constructor(private findTodoById: FindTodoByIdUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async handle(@Param('id') id: string) {
    const numId = Number(id);

    if (isNaN(numId)) throw new BadRequestException();

    const foundTodo = await this.findTodoById.execute(numId);

    if (!foundTodo) throw new NotFoundException();

    return foundTodo;
  }
}
