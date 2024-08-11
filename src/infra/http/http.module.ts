import { Module } from '@nestjs/common';
import { FindTodosByTitleUseCase } from '../../domain/use-cases/todo/find-todos-by-title';
import { CreateTodoUseCase } from '../../domain/use-cases/todo/create-todo';
import { DeleteTodoUseCase } from '../../domain/use-cases/todo/delete-todo';
import { FindManyTodosUseCase } from '../../domain/use-cases/todo/find-many-todos';
import { FindTodoByIdUseCase } from '../../domain/use-cases/todo/find-todo-by-id';
import { UpdateTodoUseCase } from '../../domain/use-cases/todo/update-todo';
import { DatabaseModule } from '../database/database.module';
import { CreateTodoController } from './controllers/todo/create-todo.controller';
import { DeleteTodoController } from './controllers/todo/delete-todo.controller';
import { FindManyTodosController } from './controllers/todo/find-many.controller';
import { FindTodoByIdController } from './controllers/todo/find-todo-by-id.controller';
import { UpdateTodoController } from './controllers/todo/update-todo.controller';
import { FindTodosByTitleController } from './controllers/todo/find-todos-by-title.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateTodoController,
    DeleteTodoController,
    FindManyTodosController,
    UpdateTodoController,
    FindTodoByIdController,
    FindTodosByTitleController,
  ],
  providers: [
    CreateTodoUseCase,
    DeleteTodoUseCase,
    FindManyTodosUseCase,
    UpdateTodoUseCase,
    FindTodoByIdUseCase,
    FindTodosByTitleUseCase,
  ],
})
export class HttpModule {}
