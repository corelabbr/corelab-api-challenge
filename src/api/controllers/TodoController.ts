import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { TodoApp } from "src/business/app/TodoApp";
import { CreateTodoDto } from "src/types/todo/dto/CreateTodoDto";
import { PaginationTodoDto } from "src/types/todo/dto/PaginationTodosDto";
import { UpdateTodoDto } from "src/types/todo/dto/UpdateTodoDto";

@Controller('todo')
export class TodoController {
  constructor(private readonly app:TodoApp) {}

  @Get()
  async listTodos(@Query() query: PaginationTodoDto) {
    return this.app.listTodos(query)
  }

  @Post()
  async createTodo(@Body() dto: CreateTodoDto) {
    return this.app.createTodo(dto)
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string) {
    return this.app.deleteTodo(id)
  }

  @Patch()
  async updateTodo(@Body() dto: UpdateTodoDto) {
    return this.app.updateTodo(dto)
  }
}
