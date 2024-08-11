import { Injectable } from '@nestjs/common';
import { TodoRepository } from '../../application/repositories/todo-repository';
import { Todo } from '@prisma/client';

@Injectable()
export class UpdateTodoUseCase {
  constructor(private todoRepository: TodoRepository) {}

  async execute(todo: Todo) {
    return await this.todoRepository.update(todo);
  }
}
