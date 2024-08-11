import { Injectable } from '@nestjs/common';
import { TodoRepository } from '../../application/repositories/todo-repository';

@Injectable()
export class DeleteTodoUseCase {
  constructor(private todoRepository: TodoRepository) {}

  async execute(id: number) {
    const foundTodo = await this.todoRepository.findById(id);

    if (!foundTodo) return;

    return await this.todoRepository.delete(foundTodo);
  }
}
