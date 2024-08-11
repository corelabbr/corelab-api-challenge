import { Injectable } from '@nestjs/common';
import { TodoRepository } from '../../application/repositories/todo-repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class FindManyTodosUseCase {
  constructor(private todoRepository: TodoRepository) {}

  async execute({ skip, take }: Prisma.TodoFindManyArgs) {
    return await this.todoRepository.findMany({ skip, take });
  }
}
