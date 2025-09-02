import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { PrismaService } from '../common/prisma.service';
import { TodosService } from './todos.service';

@Module({
  controllers: [TodosController],
  providers: [TodosService, PrismaService],
})
export class TodosModule {}
