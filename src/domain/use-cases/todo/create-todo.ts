import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { TodoRepository } from '../../application/repositories/todo-repository';

@Injectable()
export class CreateTodoUseCase {
  constructor(private todoRepository: TodoRepository) {}

  async execute({ data }: { data: Prisma.TodoCreateInput }) {
    return await this.todoRepository.create(data);
  }
}
