import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaTodoRepository } from './prisma/repositories/todo/prisma-todo-repository';
import { TodoRepository } from '../../domain/application/repositories/todo-repository';

@Module({
  providers: [
    PrismaService,
    { provide: TodoRepository, useClass: PrismaTodoRepository },
  ],
  exports: [PrismaService, TodoRepository],
})
export class DatabaseModule {}
