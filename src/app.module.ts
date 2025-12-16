import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './business/models/TodoModel';
import { TodoController } from './api/controllers/TodoController';
import { TodoRepository } from './business/repositories/TodoRepository';
import { TodoApp } from './business/app/TodoApp';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([
      { name: Todo.name, schema: TodoSchema }
    ])
  ],
  controllers: [
    TodoController
  ],
  providers: [
    TodoRepository,
    TodoApp
  ],
})
export class AppModule {}
