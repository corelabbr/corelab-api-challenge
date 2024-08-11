import { Prisma, Todo } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { Injectable } from '@nestjs/common';
import { TodoRepository } from '../../../../../domain/application/repositories/todo-repository';

@Injectable()
export class PrismaTodoRepository implements TodoRepository {
  constructor(private prisma: PrismaService) {}

  async findByTitle(title: string): Promise<Todo[]> {
    return await this.prisma.todo.findMany({
      where: {
        title: {
          contains: title,
        },
      },
    });
  }

  async findById(id: number): Promise<Todo | undefined> {
    return await this.prisma.todo.findFirst({ where: { id } });
  }

  async create(data: Prisma.TodoCreateInput): Promise<Todo> {
    return await this.prisma.todo.create({ data });
  }

  async findMany({
    skip = 0,
    take = 10,
  }: Prisma.TodoFindManyArgs): Promise<Todo[]> {
    return await this.prisma.todo.findMany({
      skip,
      take,
      orderBy: [{ favorite: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async update(todo: Todo): Promise<Todo> {
    await this.prisma.todo.update({
      where: { id: todo.id },
      data: { ...todo },
    });

    return todo;
  }

  async delete(todo: Todo): Promise<Todo | undefined> {
    return await this.prisma.todo.delete({ where: { id: todo.id } });
  }
}
