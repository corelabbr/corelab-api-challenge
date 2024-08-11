import { Injectable } from '@nestjs/common';
import { TodoRepository } from '../../application/repositories/todo-repository';

@Injectable()
export class FindTodosByTitleUseCase {
  constructor(private todoRepository: TodoRepository) {}

  async execute(title: string) {
    return await this.todoRepository.findByTitle(title);
  }
}
