import { Injectable } from '@nestjs/common';
import { TodoRepository } from '../../application/repositories/todo-repository';

@Injectable()
export class FindTodoByIdUseCase {
  constructor(private todoRepository: TodoRepository) {}

  async execute(id: number) {
    return await this.todoRepository.findById(id);
  }
}
