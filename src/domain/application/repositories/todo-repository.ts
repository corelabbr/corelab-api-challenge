import { Prisma, Todo } from '@prisma/client';

export abstract class TodoRepository {
  abstract findById(id: number): Promise<Todo | undefined>;
  abstract create(data: Prisma.TodoCreateInput): Promise<Todo>;
  abstract findMany(skip?: any, take?: any): Promise<Todo[]>;
  abstract delete(todo: Todo): Promise<Todo | undefined>;
  abstract update(todo: Todo): Promise<Todo>;
  abstract findByTitle(title: string): Promise<Todo[]>;
}
